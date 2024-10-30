import React, { useState } from "react";
import axios from "axios";
import Button from "@/components/ui/Button";
import { toast } from "react-toastify";

const AddCategory = ({ onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: "",
        description: ""
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    const validateInputs = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.description) newErrors.description = "Description is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (!validateInputs()) return;

        try {
            await axios.post("http://127.0.0.1:8000/api/game-categories", formData);
            toast.success("Category added successfully!");
            onSuccess(); // Refresh categories in parent component
        } catch (error) {
            console.error("Failed to add category:", error);
            toast.error("Failed to add category.");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
                <div className="space-y-4">
                    <div>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Category Name"
                            className="w-full p-2 border rounded"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>
                    <div>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Category Description"
                            className="w-full p-2 border rounded"
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
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

export default AddCategory;
