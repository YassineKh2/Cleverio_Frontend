import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@/components/ui/Button";

const EditGameModal = ({ game, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: "",
        points: 0,
        category_name: "", // Use category_name for dropdown selection
        description: "",
        stock_quantity: 0,
    });
    const [categories, setCategories] = useState([]); // List of categories
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Initialize formData when game prop is available
        if (game) {
            setFormData({
                name: game.name || "",
                points: game.points || 0,
                category_name: game.category_name || "", // Using category_name here
                description: game.description || "",
                stock_quantity: game.stock_quantity || 0,
            });
        }

        // Fetch existing categories for the dropdown
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/game-categories");
                setCategories(response.data);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };

        fetchCategories();
    }, [game]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Clear specific field error when user modifies input
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    const validateInputs = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.points || formData.points <= 0) newErrors.points = "Points must be a positive number";
        if (!formData.category_name) newErrors.category_name = "Category is required"; // Validate category_name
        if (!formData.stock_quantity || formData.stock_quantity <= 0) newErrors.stock_quantity = "Stock quantity must be a positive number";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (!validateInputs()) return; // Run validation only on save

        try {
            // PUT request with the correct payload format
            await axios.put(`http://127.0.0.1:8000/api/game/${game.id}`, formData);
            onSave(formData); // Callback to update the UI in GameList
            onClose(); // Close the modal
        } catch (error) {
            console.error("Failed to update game:", error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-xl font-semibold mb-4">Modifier le jeu</h2>
                <div className="space-y-4">
                    <div>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Name"
                            className="w-full p-2 border rounded"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>
                    <div>
                        <input
                            type="number"
                            name="points"
                            value={formData.points}
                            onChange={handleInputChange}
                            placeholder="Points"
                            className="w-full p-2 border rounded"
                        />
                        {errors.points && <p className="text-red-500 text-sm">{errors.points}</p>}
                    </div>
                    <div>
                        <select
                            name="category_name"
                            value={formData.category_name}
                            onChange={(e) => setFormData({ ...formData, category_name: e.target.value })}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Sélectionnez une catégorie</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.name}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.category_name && <p className="text-red-500 text-sm">{errors.category_name}</p>}
                    </div>
                    <div>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Description"
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <input
                            type="number"
                            name="stock_quantity"
                            value={formData.stock_quantity}
                            onChange={handleInputChange}
                            placeholder="Stock Quantity"
                            className="w-full p-2 border rounded"
                        />
                        {errors.stock_quantity && <p className="text-red-500 text-sm">{errors.stock_quantity}</p>}
                    </div>
                </div>
                <div className="flex justify-end mt-4 space-x-2">
                    <Button text="Cancel" onClick={onClose} className="bg-gray-500 text-white px-4 py-2" />
                    <Button 
                        text="Save" 
                        onClick={handleSave} 
                        className="bg-blue-600 text-white px-4 py-2"
                    />
                </div>
            </div>
        </div>
    );
};

export default EditGameModal;
