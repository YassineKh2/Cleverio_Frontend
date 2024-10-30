// src/components/CategoryList.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaGamepad, FaThList } from "react-icons/fa";

const BASE_URL = "http://127.0.0.1:8000";

const CategoryList = ({ onSelectCategory }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/game-categories`);
                setCategories(response.data);
            } catch (error) {
                console.error("Failed to load categories:", error);
                toast.error("Failed to load categories.");
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">les Categories</h2>
            {loading ? (
                <p className="text-gray-600 dark:text-gray-300">Loading...</p>
            ) : (
                <ul className="space-y-3 space-x-2">
                    <li
                        className="flex items-center cursor-pointer p-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        onClick={() => onSelectCategory("all")}
                    >
                        <FaThList className="text-gray-600 dark:text-gray-400 mr-3" />
                        <span className="text-gray-800 dark:text-gray-200">toutes les catégories</span>
                    </li>
                    {categories.map((category) => (
                        <li
                            key={category.id}
                            className="flex items-center cursor-pointer p-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            onClick={() => onSelectCategory(category.name)}
                        >
                            <FaGamepad className="text-blue-500 mr-3" />
                            <div>
                                <span className="text-gray-800 dark:text-gray-200 font-medium">{category.name}</span>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{category.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CategoryList;
