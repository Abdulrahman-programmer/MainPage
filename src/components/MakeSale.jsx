import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { param } from 'framer-motion/client';
axios.defaults.baseURL = 'https://inventoryonline.onrender.com';

export default function MakeSale(params) {
    const [saleCompleted, setSaleCompleted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [productsLoading, setProductsLoading] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        if (!isModalOpen) return;
        const fetchProducts = async () => {
            setProductsLoading(true);
            const token = localStorage.getItem('authToken');
            const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
            try {
                const res = await axios.get('/api/products', config);
                console.log(res.data.data);

                setProducts(Array.isArray(res.data.data) ? res.data.data : (res.data.payload || []));
            } catch (err) {
                setError('Could not load products');
                setProducts([]);
            } finally {
                setProductsLoading(false);
            }
        };
        fetchProducts();
    }, [isModalOpen]);

    const openModal = () => {
        setError(null);
        setSelectedIds([]);
        setIsModalOpen(true);
    };

    const toggleSelect = (id) => {
        setSelectedIds((prev) => {
            const isSelected = prev.includes(id);
            const next = isSelected ? prev.filter((x) => x !== id) : [...prev, id];

            // when selecting, initialize quantity if not present
            if (!isSelected) {
                setQuantities((q) => ({
                    ...q,
                    [id]: q[id] ?? 1
                }));
            }

            // when unselecting, keep quantity (so user doesn't lose it) but it's ignored unless selected
            return next;
        });
    };

    const setQuantityFor = (id, value) => {
        const v = Number(value);
        if (Number.isNaN(v) || v < 1) return;
        setQuantities((q) => ({ ...q, [id]: Math.floor(v) }));
    };

    const handleConfirmSale = async () => {
        if (selectedIds.length === 0) {
            setError('Please select at least one product');
            return;
        }
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('authToken');
        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
        try {
            // Build payload in the form { barcode, quantity, sellingPrice }
            const items = selectedIds.map((id) => {
                const p = products.find((x) => {
                    const candidateId = x.id ?? x._id ?? x.productId ?? x.barcode ?? String(x);
                    return String(candidateId) === String(id);
                }) || {};

                return {
                    barcode: p.barcode ?? id,
                    quantity: Number(quantities[id] ?? p.quantity ?? 1),
                    sellingPrice: Number(p.sellingPrice ?? p.price ?? 0)
                };
            });

            const postConfig = {
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {})
                }
            };

            // If multiple items selected, post each item separately
            const results = { success: [], failed: [] };
            for (const item of items) {
                try {
                    await axios.post('/api/sales', item, postConfig);
                    results.success.push(item.barcode);
                } catch (e) {
                    results.failed.push({ barcode: item.barcode, message: e?.response?.data?.message || e.message || 'Unknown error' });
                }
            }

            if (results.failed.length === 0) {
                setSaleCompleted(true);
                setIsModalOpen(false);
                // refresh parent sales list if provided
                try { params.refreshSales?.(); } catch (e) { console.warn('refreshSales callback error', e); }
                setTimeout(() => setSaleCompleted(false), 2000);
            } else {
                // Report a concise error summary and keep modal open for retry/fixing quantities
                const messages = results.failed.map(f => `${f.barcode}: ${f.message}`).join('; ');
                setError(`${results.failed.length} item(s) failed: ${messages}`);
            }

        } catch (err) {
            setError(err?.response?.data?.message || err.message || 'Sale failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px' }} className='dark:text-white dark:bg-grey-500'>
            <button
                onClick={openModal}
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px'
                }}
            >
                Make Sale
            </button>

            {saleCompleted && <p style={{ marginTop: '10px', color: 'green' }}>Sale completed!</p>}
            {error && <p style={{ marginTop: '10px', color: 'red' }}>Error: {error}</p>}

            {isModalOpen && (
                <div
                    className='fixed flex justify-center items-center z-9999 top-0 left-0 w-full h-full bg-black/30 bg-opacity-10 dark:text-amber-50'>
                    <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 max-w-2xl' style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                            <h3 style={{ margin: 0 }}>Select Products</h3>
                            <div>
                                <button onClick={() => setIsModalOpen(false)} style={{ marginRight: 8 }}>Close</button>
                            </div>
                        </div>

                        {productsLoading ? (
                            <p>Loading products...</p>
                        ) : (
                            <div>
                                {products.length === 0 ? (
                                    <p>No products available</p>
                                ) : (
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                        {products.map((p) => {
                                            const id = p.id ?? p._id ?? p.productId ?? p.barcode ?? String(p);
                                            const isSelected = selectedIds.includes(id);
                                            return (
                                                <li key={id} style={{ display: 'flex', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #eee' }}>
                                                    <input type="checkbox" checked={isSelected} onChange={() => toggleSelect(id)} style={{ marginRight: 12 }} />
                                                    <div style={{ flex: 1 }}>
                                                        <div style={{ fontWeight: 600 }}>{p.name ?? p.productName ?? p.title ?? `Product ${id}`}</div>
                                                        <div style={{ fontSize: 12, color: '#555', display: 'flex', alignItems: 'center', gap: 12 }}>
                                                            <div className='dark:text-amber-50'>Available: {p.quantity ?? p.stock ?? 'N/A'}</div>
                                                            <div className='dark:text-amber-50'>Price: {p.sellingPrice ?? p.price ?? 'N/A'}</div>
                                                        </div>
                                                    </div>

                                                    <div className ='w-40 flex justify-end items-center gap-2' >
                                                        <label className='dark:text-amber-50'>Qty</label>
                                                        <input
                                                            type="number"
                                                            min={1}
                                                            value={quantities[id] ?? (p.quantity ?? 1)}
                                                            onChange={(e) => setQuantityFor(id, e.target.value)}
                                                            disabled={!isSelected}
                                                            className='w-28 p-2 text-sm rounded border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-amber-50'
                                                        />
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </div>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
                            <button onClick={() => setIsModalOpen(false)} style={{ padding: '8px 12px' }}>Cancel</button>
                            <button onClick={handleConfirmSale} disabled={loading} style={{ padding: '8px 12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: 4 }}>
                                {loading ? 'Processing...' : `Make Sale (${selectedIds.length})`}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}