import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const BASE_URL = "http://127.0.0.1:8000";

const PurchaseHistory = ({ onClose, onUpdatePoints }) => {
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);

    const getUserIdFromToken = () => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwtDecode(token);
            return decoded.user_id;
        }
        return null;
    };

    const userId = getUserIdFromToken();

    const fetchPurchases = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/api/game/purchase/${userId}`);
            setPurchases(response.data.purchases);
        } catch (error) {
            console.error("No purchase history Found:", error);
            toast.error("No purchase history Found.");
        } finally {
            setLoading(false);
        }
    };

    const deletePurchase = async (gameName) => {
        try {
            const response = await axios.delete(`${BASE_URL}/api/game/purchase/delete`, {
                data: {
                    user_id: userId,
                    game: gameName,
                },
            });
            toast.success(response.data.message || "Purchase deleted successfully!");
            onUpdatePoints(response.data.points_refunded); // Call function to update points
            fetchPurchases(); // Refresh the purchase history after deletion
        } catch (error) {
            console.error("Failed to delete purchase:", error);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchPurchases();
        } else {
            toast.error("User not logged in.");
        }
    }, [userId]);

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-80 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-11/12 md:w-1/3 relative max-h-[80vh] overflow-y-auto border border-gray-300">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">L'historique des achats</h2>
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
                >
                    &times;
                </button>

                {loading ? (
                    <div className="flex justify-center items-center">
                        <div className="loader" />
                        <p className="text-gray-600 ml-2">Chargement...</p>
                    </div>
                ) : purchases.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                        {purchases.map((purchase, index) => (
                            <li key={index} className="py-4 px-4 bg-gray-50 hover:bg-gray-100 flex justify-between items-center rounded-lg transition duration-200 ease-in-out">
                                <div className="flex flex-col">
                                    <p className="font-semibold text-gray-800">{purchase.game}</p>
                                    <p className="text-gray-600">Points utilisés: {purchase.points_used}</p>
                                    <p className="text-sm text-gray-500">Date: {new Date(purchase.purchase_date).toLocaleString()}</p>
                                </div>
                                <button
                                    onClick={() => deletePurchase(purchase.game)}
                                    className="text-red-600 hover:text-red-800 transition duration-200"
                                    title="Supprimer"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600">Aucun achat trouvé.</p>
                )}

                <div className="text-center mt-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow hover:bg-gray-400 transition duration-200 ease-in-out"
                    >
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PurchaseHistory;
