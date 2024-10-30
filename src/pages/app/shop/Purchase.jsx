import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "http://127.0.0.1:8000";

const Purchase = () => {
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch purchase history for all users
    const fetchPurchases = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/api/game/purchases`);
            const userPurchases = response.data; // This is now an object with user IDs as keys
            
            // Extract purchases for each user and store them in an array
            const purchasesArray = [];
            for (const userId in userPurchases) {
                const userData = userPurchases[userId];
                userData.purchases.forEach(purchase => {
                    purchasesArray.push({
                        userId: userId,
                        username: userData.username, // Get the username
                        email: userData.email, 
                        game: purchase.game,
                        points_used: purchase.points_used,
                        purchase_date: purchase.purchase_date
                    });
                });
            }
            setPurchases(purchasesArray);
        } catch (error) {
            console.error("Failed to fetch purchase history:", error);
            toast.error("Failed to load purchase history.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPurchases();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Tous les achats</h2>
            {loading ? (
                <p>Chargement...</p>
            ) : purchases.length > 0 ? (
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                           
                            <th className="border px-4 py-2">Nom d'utilisateur</th>
                            <th className="border px-4 py-2">Email</th>
                            <th className="border px-4 py-2">Jeu</th>
                            <th className="border px-4 py-2">Points utilisés</th>
                            <th className="border px-4 py-2">Date d'achat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchases.map((purchase, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                               
                                <td className="border px-4 py-2">{purchase.username}</td>
                                <td className="border px-4 py-2">{purchase.email}</td>
                                <td className="border px-4 py-2">{purchase.game}</td>
                                <td className="border px-4 py-2">{purchase.points_used}</td>
                                <td className="border px-4 py-2">{new Date(purchase.purchase_date).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Aucun achat trouvé.</p>
            )}
        </div>
    );
};

export default Purchase;
