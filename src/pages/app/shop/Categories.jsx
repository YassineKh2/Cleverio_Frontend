import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { ToastContainer, toast } from "react-toastify";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null); // For edit modal

    // Fetch categories from API
    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/game-categories");
            setCategories(response.data);
        } catch (error) {
            console.error("Failed to load categories:", error);
            toast.error("Failed to load categories.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories(); // Fetch categories on component mount
    }, []);

    const handleAddCategorySuccess = () => {
        fetchCategories();
        setIsAddModalOpen(false);
    };

    const handleEditCategorySuccess = () => {
        fetchCategories();
        setSelectedCategory(null);
    };

    const handleDelete = async (categoryId) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/game-categories/${categoryId}`);
            setCategories(categories.filter(category => category.id !== categoryId));
            toast.success("Category deleted successfully!");
        } catch (error) {
            console.error("Failed to delete category:", error);
            toast.error("Failed to delete category.");
        }
    };

    return (
        <div className="flex  ">
            <div className="flex-1 flex flex-col overflow-hidden p-6 bg-gray-100 dark:bg-gray-900">
                <ToastContainer />
                <Card title="Game Categories" headerslot={
                    <Button text="Add New Category" onClick={() => setIsAddModalOpen(true)} className="bg-black-600 text-white" />
                }>
                    {loading ? (
                        <p>Loading categories...</p>
                    ) : categories.length > 0 ? (
                        <table className="min-w-full bg-white dark:bg-slate-800 rounded-lg shadow-md">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-slate-900 dark:text-white">Name</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-slate-900 dark:text-white">Description</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-slate-900 dark:text-white">Edit</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-slate-900 dark:text-white">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category) => (
                                    <tr key={category.id} className="text-slate-700 dark:text-slate-300">
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">{category.name}</td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">{category.description}</td>
 
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-center"> <Button
                                                text="Edit"
                                                onClick={() => setSelectedCategory(category)}
                                                className="bg-gray-700 text-white px-2 py-1 mr-2"
                                            />
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-center">
                                            <Button
                                                text="Delete"
                                                onClick={() => handleDelete(category.id)}
                                                className="bg-gray-700 text-white px-2 py-1"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No categories available.</p>
                    )}
                </Card>

                {/* Add Category Modal */}
                {isAddModalOpen && (
                    <AddCategory onClose={() => setIsAddModalOpen(false)} onSuccess={handleAddCategorySuccess} />
                )}

                {/* Edit Category Modal */}
                {selectedCategory && (
                    <EditCategory
                        category={selectedCategory}
                        onClose={() => setSelectedCategory(null)}
                        onSuccess={handleEditCategorySuccess}
                    />
                )}
            </div>
        </div>
    );
};

export default Categories;
