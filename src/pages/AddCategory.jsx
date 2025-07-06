import React, { useState } from 'react';
import axios from 'axios';

const AddCategory = () => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const res = await axios.post('http://localhost:5000/api/category', { name });
            setMessage(res.data.message);
            setName('');
        } catch (err) {
            setError(err.response?.data?.message || 'Error adding category');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Add New Category</h2>

                <label className="block text-gray-700 mb-2">Category Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter category name"
                    className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
                >
                    Add Category
                </button>

                {message && <p className="mt-4 text-green-600">{message}</p>}
                {error && <p className="mt-4 text-red-500">{error}</p>}
            </form>
        </div>
    );
};

export default AddCategory;
