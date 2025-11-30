import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";
axios.defaults.baseURL = 'https://inventoryonline.onrender.com';
import MakeSale from "../components/MakeSale";

function Sales() {
    const [sales, setSales] = useState([]); // Ensure sales is initialized as an array
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const deleteSale = async (saleId) => {
        if (!window.confirm("Are you sure you want to delete this sale?")) return;

        try {
            // Read bearer token from storage (change key if you store it elsewhere)
            const token = localStorage.getItem('authToken');
            const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
            await axios.delete(`/api/sales/${saleId}`, config);
            setSales((prevSales) => prevSales.filter((sale) => sale.id !== saleId));
        } catch (err) {
            alert(err.response?.data?.message || err.message || "Failed to delete sale");
        }
    };
    const refreshSales = () => {
        let canceled = false;

        const fetchSales = async () => {
            setLoading(true);
            setError(null);
            try {
                // Read bearer token from storage (change key if you store it elsewhere)
                const token = localStorage.getItem('authToken');
                const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
                const res = await axios.get("/api/sales", config);
                console.log("Sales data:", res.data.data);
                if (!canceled) setSales(Array.isArray(res.data.data) ? res.data.data : []);
               

            } catch (err) {
                if (!canceled) setError(err.response?.data?.message || err.message || "Failed to load sales");
            } finally {
                if (!canceled) setLoading(false);
            }
        };

        fetchSales();
        return () => {
            canceled = true;
        };
    };
    useEffect(refreshSales, []);
    const [expandedId, setExpandedId] = useState(null);

    return (
        <div className="p-4 lg:ml-72">
            <h1 className="text-3xl font-bold  text-center rounded-2xl bg-white mt-4 p-2 
         transition-all duration-300 dark:bg-gray-700 dark:hover:bg-gray-500 ">Sales</h1>
            <MakeSale refreshSales={refreshSales} />

            {loading && <Loading text="Loading sales..." />}

            {error && (
                <div className="mt-4 text-red-600 text-center" role="alert">
                    {error}
                </div>
            )}

            {!loading && !error && (
                <>
                    {sales.length === 0 ? (
                        <div className="mt-6 text-center text-gray-500">No sales found.</div>
                    ) : (
                        <table className="table-auto w-full mt-6 border-collapse border border-black dark:border-gray-300" >
                            <thead className="bg-gray-200 dark:bg-gray-700">
                                <tr className="border border-black dark:border-gray-300">
                                    <th className="px-4 py-2">Serial No.</th>
                                    <th className="px-4 py-2">Date/Time</th>
                                    <th className="px-4 py-2">Barcode</th>
                                    <th className="px-4 py-2">Product Name</th>
                                    <th className="px-4 py-2">Quantity</th>
                                    <th className="px-4 py-2">Selling Price</th>
                                    <th className="px-4 py-2">Total</th>
                                    
                                    <th className="px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody id="sales-tbody">
                                {sales.map((sale, index) => (
                                    <tr key={sale.id} className="border border-black dark:border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <td className="px-4 py-2">{index + 1}</td>
                                        <td className="px-4 py-2">{new Date(sale.saleDate).toLocaleString()}</td>
                                        <td className="px-4 py-2">{sale.barcode}</td>
                                        <td className="px-4 py-2">{sale.productName}</td>
                                        <td className="px-4 py-2">{sale.quantity}</td>
                                        <td className="px-4 py-2">₹{sale.sellingPrice.toFixed(2)}</td>
                                        <td className="px-4 py-2"><strong>₹{(sale.sellingPrice * sale.quantity).toFixed(2)}</strong></td>
                                        
                                        <td className="px-4 py-2">
                                            <button className="btn btn-sm bg-red-500/80 p-3 rounded-lg translate-y-0.5" onClick={() => deleteSale(sale.id)} title="Delete Sale">
                                                🗑️
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                               
                            </tbody>
                            <thead className="bg-gray-200 dark:bg-gray-700">
                                <tr className="border border-black dark:border-gray-300">
                                    <th className="px-4 py-2 text-left" colSpan="6">Total Sales Amount:</th>
                                    
                                    <th className="px-4 py-2">
                                        ₹{sales.reduce((sum, sale) => sum + (sale.sellingPrice * sale.quantity), 0).toFixed(2)}
                                    </th>
                                    <th className="px-4 py-2"></th>
                                </tr>
                            </thead>
                        </table>

                    )}
                </>
            )}
        </div>
    );
}

export default Sales;