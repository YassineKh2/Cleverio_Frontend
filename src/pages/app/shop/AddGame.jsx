import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = "http://127.0.0.1:8000";

const AddGame = ({ onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        name: '',
        points: '',
        category_name: '',
        description: '',
        stock_quantity: '',
        picture: null,
    });
    const [errors, setErrors] = useState({});
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/game-categories`);
                setCategories(response.data);
            } catch (error) {
                console.error('Failed to load categories:', error);
                toast.error('Failed to load categories.');
            }
        };
        fetchCategories();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        if (errors[name]) {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
        }
    };

    const handleFileChange = (e) => {
        setFormData((prevData) => ({ ...prevData, picture: e.target.files[0] }));
    };

    const validateInputs = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Game name is required';
        if (!formData.points || formData.points <= 0) newErrors.points = 'Points must be a positive number';
        if (!formData.category_name) newErrors.category_name = 'Category is required';
        if (!formData.description) newErrors.description = 'Description is required';
        if (!formData.stock_quantity || formData.stock_quantity <= 0) newErrors.stock_quantity = 'Stock quantity must be a positive number';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateInputs()) return;

        const form = new FormData();
        form.append('name', formData.name);
        form.append('points', formData.points);
        form.append('category_name', formData.category_name);
        form.append('description', formData.description);
        form.append('stock_quantity', formData.stock_quantity);
        if (formData.picture) form.append('picture', formData.picture);

        try {
            await axios.post(`${BASE_URL}/api/game`, form, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            toast.success('Game added successfully!');
            onAdd(); // Refresh game list
            onClose(); // Close modal
        } catch (err) {
            console.error('Failed to add game:', err);
            toast.error('Failed to add game.');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Ajouter un nouveau jeu</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Game Name"
                        required
                        className={`w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded mb-2`}
                    />
                    
                    <input
                        type="number"
                        name="points"
                        value={formData.points}
                        onChange={handleInputChange}
                        placeholder="Points"
                        required
                        className={`w-full p-2 border ${errors.points ? 'border-red-500' : 'border-gray-300'} rounded mb-2`}
                    />
                    
                    <select
                        name="category_name"
                        value={formData.category_name}
                        onChange={handleInputChange}
                        required
                        className={`w-full p-2 border ${errors.category_name ? 'border-red-500' : 'border-gray-300'} rounded mb-2`}
                    >
                        <option value="">Sélectionnez une catégorie</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Description"
                        required
                        className={`w-full p-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded mb-2`}
                    />
                    
                    <input
                        type="number"
                        name="stock_quantity"
                        value={formData.stock_quantity}
                        onChange={handleInputChange}
                        placeholder="Stock Quantity"
                        required
                        className={`w-full p-2 border ${errors.stock_quantity ? 'border-red-500' : 'border-gray-300'} rounded mb-2`}
                    />
                    
                    <input
                        type="file"
                        name="picture"
                        onChange={handleFileChange}
                        className="w-full p-2 mb-2"
                    />

                    <div className="flex justify-end space-x-2 mt-4">
                        <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
                            Annuler
                        </button>
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                        Ajouter un jeu
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddGame;
