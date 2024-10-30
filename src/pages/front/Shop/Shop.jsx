// src/components/Shop.jsx
import React, { useState } from "react";
import CategoryList from "./CategoryList";
import GameList from "./GameList";
import UserPoints from "./UserPoints";
function Shop() {
    const [selectedCategory, setSelectedCategory] = useState("all");

    return (
        <div className="flex h-screen bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
            {/* Category List on the Left */}
            <div className="w-1/4 p-4">
                <CategoryList onSelectCategory={setSelectedCategory} />
            </div>
           
            {/* Game List on the Right */}
            <div className="w-3/4 p-6 overflow-y-auto">
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
               
                    <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-200 mb-4">Shop</h1>
                    
              
            
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Browse through various games available for purchase with points. Use the categories to filter by game type.
                    </p>
                    {/* <UserPoints /> */}
                    <GameList selectedCategory={selectedCategory} />
                </div>
            </div>
        </div>
    );
}

export default Shop;
