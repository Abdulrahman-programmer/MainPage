import React, { useState, useEffect } from 'react';
import axios from 'axios';
function InventoryManager() {
    const [items, setItems] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('inventory') || '[]');
        } catch {
            return [];
        }
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [qty, setQty] = useState('');
    const [costPrice, setCostPrice] = useState('');
    const [sellingPrice, setSellingPrice] = useState('');
    const [purchaseDate, setPurchaseDate] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        localStorage.setItem('inventory', JSON.stringify(items));
    }, [items]);

    // Fetch from backend on mount, fallback to localStorage if request fails
    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await axios.get('/api/inventory');
                // expect server to return an array of items
                if (Array.isArray(res.data)) {
                    setItems(res.data);
                    setItems(res.data);
                }
            } catch (err) {
                // network or server error -- we'll keep localStorage items
                setError('Could not fetch from server, using local data.');
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    const resetForm = () => {
        setName('');
        setCategory('');
        setQty('');
        setCostPrice('');
        setSellingPrice('');
        setPurchaseDate('');
        setExpiryDate('');
        setEditingId(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        const item = {
            id: editingId ?? Date.now(),
            name: name.trim(),
            category: category.trim(),
            qty: Number(qty) || 0,
            costPrice: Number(costPrice) || 0,
            sellingPrice: Number(sellingPrice) || 0,
            purchaseDate: purchaseDate || null,
            expiryDate: expiryDate || null,
        };
        const save = async () => {
            setError(null);
            try {
                if (editingId) {
                    // update on server
                    await axios.put(`/api/inventory/${item.id}`, item);
                    setItems((prev) => prev.map((it) => (it.id === editingId ? item : it)));
                } else {
                    const res = await axios.post('/api/inventory', item);
                    // if server returns created item (with id), use it; otherwise keep local id
                    const created = (res && res.data) ? res.data : item;
                    setItems((prev) => [created, ...prev]);
                }
            } catch (err) {
                // fallback: persist locally if backend unavailable
                setError('Could not save to server — saved locally.');
                if (editingId) {
                    setItems((prev) => prev.map((it) => (it.id === editingId ? item : it)));
                } else {
                    setItems((prev) => [item, ...prev]);
                }
            } finally {
                resetForm();
            }
        };
        save();
    };

    const handleEdit = (it) => {
        setName(it.name);
        setCategory(it.category || '');
        setQty(String(it.qty));
        setCostPrice(String(it.costPrice ?? ''));
        setSellingPrice(String(it.sellingPrice ?? ''));
        setPurchaseDate(it.purchaseDate ?? '');
        setExpiryDate(it.expiryDate ?? '');
        setEditingId(it.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = (id) => {
        if (!window.confirm('Delete this item?')) return;
        const remove = async () => {
            setError(null);
            try {
                await axios.delete(`/api/inventory/${id}`);
                setItems((prev) => prev.filter((it) => it.id !== id));
            } catch (err) {
                // fallback to local delete
                setError('Could not delete on server — removed locally.');
                setItems((prev) => prev.filter((it) => it.id !== id));
            } finally {
                if (editingId === id) resetForm();
            }
        };
        remove();
    };

    return (
        <div className="max-w-5xl mx-auto mt-6 p-4 bg-white rounded-lg shadow-sm dark:bg-gray-800 lg:ml-72">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-6 gap-3 items-end">
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border rounded-md dark:bg-gray-700" placeholder="Item name" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <input value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 border rounded-md dark:bg-gray-700" placeholder="Category" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Quantity</label>
                    <input value={qty} onChange={(e) => setQty(e.target.value)} type="number" min="0" className="w-full px-3 py-2 border rounded-md dark:bg-gray-700" placeholder="0" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Cost Price</label>
                    <input value={costPrice} onChange={(e) => setCostPrice(e.target.value)} type="number" step="0.01" min="0" className="w-full px-3 py-2 border rounded-md dark:bg-gray-700" placeholder="0.00" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Selling Price</label>
                    <input value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} type="number" step="0.01" min="0" className="w-full px-3 py-2 border rounded-md dark:bg-gray-700" placeholder="0.00" />
                </div>
               

                <div className="md:col-span-3">
                    <label className="block text-sm font-medium mb-1">Purchase Date</label>
                    <input value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} type="date" className="w-full px-3 py-2 border rounded-md dark:bg-gray-700" />
                </div>
                <div className="md:col-span-3">
                    <label className="block text-sm font-medium mb-1">Expiry Date</label>
                    <input value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} type="date" className="w-full px-3 py-2 border rounded-md dark:bg-gray-700" />
                </div>
                 <div className="flex gap-2">
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500">
                        {editingId ? 'Update' : 'Add'}
                    </button>
                    <button type="button" onClick={resetForm} className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500">
                        Clear
                    </button>
                </div>
            </form>

            <div className="overflow-x-auto mt-6">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium">#</th>
                            <th className="px-4 py-2 text-left text-sm font-medium">Name</th>
                            <th className="px-4 py-2 text-left text-sm font-medium">Category</th>
                            <th className="px-4 py-2 text-right text-sm font-medium">Quantity</th>
                            <th className="px-4 py-2 text-right text-sm font-medium">Cost</th>
                            <th className="px-4 py-2 text-right text-sm font-medium">Selling</th>
                            <th className="px-4 py-2 text-left text-sm font-medium">Purchase Date</th>
                            <th className="px-4 py-2 text-left text-sm font-medium">Expiry Date</th>
                            <th className="px-4 py-2 text-center text-sm font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                        {items.length === 0 ? (
                            <tr>
                                <td colSpan="9" className="px-4 py-6 text-center text-gray-500">
                                    No items yet.
                                </td>
                            </tr>
                        ) : (
                            items.map((it, idx) => (
                                <tr key={it.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="px-4 py-3 text-sm">{idx + 1}</td>
                                    <td className="px-4 py-3 text-sm">{it.name}</td>
                                    <td className="px-4 py-3 text-sm">{it.category || '-'}</td>
                                    <td className="px-4 py-3 text-sm text-right">{it.qty}</td>
                                    <td className="px-4 py-3 text-sm text-right">₹{Number(it.costPrice).toFixed(2)}</td>
                                    <td className="px-4 py-3 text-sm text-right">₹{Number(it.sellingPrice).toFixed(2)}</td>
                                    <td className="px-4 py-3 text-sm">{it.purchaseDate || '-'}</td>
                                    <td className="px-4 py-3 text-sm">{it.expiryDate || '-'}</td>
                                    <td className="px-4 py-3 text-sm text-center space-x-2">
                                        <button onClick={() => handleEdit(it)} className="px-2 py-1 bg-yellow-400 rounded-md hover:bg-yellow-300">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(it.id)} className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-400">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                    {items.length > 0 && (
                        <tfoot className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <td className="px-4 py-2 text-sm font-medium">Totals</td>
                                <td />
                                <td />
                                <td className="px-4 py-2 text-right text-sm font-medium">
                                    {items.reduce((s, it) => s + Number(it.qty), 0)}
                                </td>
                                <td className="px-4 py-2 text-right text-sm font-medium">
                                    ₹{items.reduce((s, it) => s + Number(it.costPrice) * Number(it.qty), 0).toFixed(2)}
                                </td>
                                <td className="px-4 py-2 text-right text-sm font-medium">
                                    ₹{items.reduce((s, it) => s + Number(it.sellingPrice) * Number(it.qty), 0).toFixed(2)}
                                </td>
                                <td />
                                <td />
                                <td />
                            </tr>
                        </tfoot>
                    )}
                </table>
            </div>
        </div>
    );
}

export default InventoryManager;
