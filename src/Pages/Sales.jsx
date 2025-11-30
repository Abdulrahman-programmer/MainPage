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
            setSales((prevSales) => {
                const next = prevSales.filter((sale) => sale.id !== saleId);
                setDisplayedSales(Array.isArray(next) ? next : []);
                return next;
            });
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
    // Date filter state
    const [filterType, setFilterType] = useState('all'); // 'all' | 'single' | 'range'
    const [singleDate, setSingleDate] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [displayedSales, setDisplayedSales] = useState([]);

    useEffect(() => {
        // Initialize displayedSales when raw sales change
        setDisplayedSales(Array.isArray(sales) ? sales : []);
    }, [sales]);

    const applyFilter = async () => {
        if (!Array.isArray(sales)) return;

        if (filterType === 'single') {
            if (!singleDate) {
                setDisplayedSales(sales);
                return;
            }

            // Use server endpoint for single-date searches
            let canceled = false;
            try {
                setLoading(true);
                setError(null);
                const token = localStorage.getItem('authToken');
                const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
                // singleDate is in YYYY-MM-DD format from the <input type="date" />
                const res = await axios.get(`/api/sales/date/${singleDate}`, config);
                if (!canceled) setDisplayedSales(Array.isArray(res.data?.data) ? res.data.data : []);
            } catch (err) {
                setError(err.response?.data?.message || err.message || 'Failed to fetch sales for date');
            } finally {
                if (!canceled) setLoading(false);
            }

            return;
        }

        if (filterType === 'range') {
            if (!startDate && !endDate) {
                setDisplayedSales(sales);
                return;
            }

            // Use server endpoint for range searches
            let canceled = false;
            try {
                setLoading(true);
                setError(null);
                const token = localStorage.getItem('authToken');
                const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

                // Build ISO datetimes: start at 00:00:00.000, end at 23:59:59.999 local
                let startISO = null;
                let endISO = null;
                if (startDate) {
                    const s = new Date(startDate);
                    s.setHours(0, 0, 0, 0);
                    startISO = s.toISOString();
                }
                if (endDate) {
                    const e = new Date(endDate);
                    e.setHours(23, 59, 59, 999);
                    endISO = e.toISOString();
                }

                const params = [];
                if (startISO) params.push(`startDate=${encodeURIComponent(startISO)}`);
                if (endISO) params.push(`endDate=${encodeURIComponent(endISO)}`);
                const query = params.length ? `?${params.join('&')}` : '';

                const res = await axios.get(`/api/sales/date-range${query}`, config);
                if (!canceled) setDisplayedSales(Array.isArray(res.data?.data) ? res.data.data : []);
            } catch (err) {
                setError(err.response?.data?.message || err.message || 'Failed to fetch sales for range');
            } finally {
                if (!canceled) setLoading(false);
            }

            return;
        }

        // default: all
        setDisplayedSales(sales);
    };

    const clearFilters = () => {
        setFilterType('all');
        setSingleDate('');
        setStartDate('');
        setEndDate('');
        setDisplayedSales(Array.isArray(sales) ? sales : []);
    };


    return (
        <div className="p-4 lg:ml-72">
            <div className="relative mb-4 bg-white dark:bg-gray-700 p-2 rounded-lg flex items-center">

                {/* CENTERED TITLE */}
                <h1 className="absolute left-1/2 -translate-x-1/2 text-3xl font-bold">
                    Sales Page
                </h1>

                {/* RIGHT BUTTON */}
                <div className="ml-auto">
                    <MakeSale refreshSales={refreshSales} />
                </div>

            </div>

            {loading && <Loading text="Loading sales..." />}

            {error && (
                <div className="mt-4 text-red-600 text-center" role="alert">
                    {error}
                </div>
            )}

            {!loading && !error && (
                <>
                    <div className="mt-4 p-3 bg-white dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center gap-4 mb-2">
                            <label className="flex items-center gap-2">
                                <input type="radio" name="filterType" value="all" checked={filterType === 'all'} onChange={() => setFilterType('all')} />
                                <span>All</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="radio" name="filterType" value="single" checked={filterType === 'single'} onChange={() => setFilterType('single')} />
                                <span>Single Date</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="radio" name="filterType" value="range" checked={filterType === 'range'} onChange={() => setFilterType('range')} />
                                <span>Date Range</span>
                            </label>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            {filterType === 'single' && (
                                <label className="flex items-center gap-2">
                                    <span className="text-sm">Date:</span>
                                    <input type="date" value={singleDate} onChange={(e) => setSingleDate(e.target.value)} className="p-1 rounded" />
                                </label>
                            )}

                            {filterType === 'range' && (
                                <>
                                    <label className="flex items-center gap-2">
                                        <span className="text-sm">Start:</span>
                                        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="p-1 rounded" />
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <span className="text-sm">End:</span>
                                        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="p-1 rounded" />
                                    </label>
                                </>
                            )}

                            <div className="ml-2">
                                <button onClick={applyFilter} className="bg-blue-500 text-white px-3 py-1 rounded mr-2">Apply</button>
                                <button onClick={clearFilters} className="bg-gray-300 text-black px-3 py-1 rounded">Clear</button>
                            </div>
                        </div>
                    </div>

                    {displayedSales.length === 0 ? (
                        <div className="mt-6 text-center text-gray-500">No sales found.</div>
                    ) : (
                        <table className="table-auto w-full mt-6 border-collapse border border-black dark:border-gray-300" >
                            <thead className="bg-gray-200 dark:bg-gray-700">
                                <tr className="border border-black dark:border-gray-300">
                                    <th className="px-4 py-2">Serial No.</th>
                                    <th className="px-4 py-2 hidden md:table-cell">Date/Time</th>
                                    <th className="px-4 py-2 hidden md:table-cell">Barcode</th>
                                    <th className="px-4 py-2">Product Name</th>
                                    <th className="px-4 py-2">Quantity</th>
                                    <th className="px-4 py-2 hidden md:table-cell">Selling Price</th>
                                    <th className="px-4 py-2">Total</th>

                                    <th className="px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody id="sales-tbody">
                                {displayedSales.map((sale, index) => (
                                    <tr key={sale.id} className="border border-black dark:border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <td className="px-4 py-2">{index + 1}</td>
                                        <td className="px-4 py-2 hidden md:table-cell">{new Date(sale.saleDate).toLocaleString()}</td>
                                        <td className="px-4 py-2 hidden md:table-cell">{sale.barcode}</td>
                                        <td className="px-4 py-2">{sale.productName}</td>
                                        <td className="px-4 py-2">{sale.quantity}</td>
                                        <td className="px-4 py-2 hidden md:table-cell">₹{sale.sellingPrice.toFixed(2)}</td>
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
                                    <th className="px-4 py-2 text-left" colSpan={window.innerWidth < 1026 ? 3 : 6} >Total Sales Amount:</th>

                                    <th className="px-4 py-2">
                                        ₹{displayedSales.reduce((sum, sale) => sum + (sale.sellingPrice * sale.quantity), 0).toFixed(2)}
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