import React, { useState } from "react";
import CategoryList from "./CategoryList";
import GameList from "./GameList";
import UserPoints from "./UserPoints";
import { jwtDecode } from "jwt-decode";
import Quiz from "./Quiz";

function Shop() {
    const [selectedCategory, setSelectedCategory] = useState("all");

    const getUserIdFromToken = () => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwtDecode(token);
            return decoded.user_id;
        }
        return null;
    };

    const userId = getUserIdFromToken();
    
    return (
        <div className="flex h-screen bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
            {/* Category List on the Left */}
            <div className="w-1/4 p-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-4">
                    <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Categories</h2>
                    <CategoryList onSelectCategory={setSelectedCategory} />
                </div>
                
            </div>

            {/* Game List on the Right */}
            <div className="w-3/4 p-4 overflow-y-auto">
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">Shop</h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Parcourez les différents jeux disponibles à l'achat avec des points. Utilisez les catégories pour filtrer par type de jeu.
                    </p>
                    <GameList selectedCategory={selectedCategory} />
                </div>
                
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
                    <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Quiz</h2>
                    <Quiz userId={userId} />
                </div>            
        </div>
    );
}

export default Shop;
