import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const BASE_URL = "http://127.0.0.1:8000";

const PurchaseHistory = ({ onClose, onUpdatePoints }) => {
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);

    // Function to get user_id from token
    const getUserIdFromToken = () => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwtDecode(token);
            return decoded.user_id;
        }
        return null;
    };

    const userId = getUserIdFromToken();

    // Fetch purchase history for the given user
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

    // Function to delete a purchase
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
            fetchPurchases(); // Refresh the purchase history
        } catch (error) {
            console.error("Failed to delete purchase:", error);
            toast.error("Failed to delete purchase.");
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3 relative max-h-[80vh] overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4">Purchase History</h2>
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
                >
                    &times;
                </button>

                {loading ? (
                    <p>Loading...</p>
                ) : purchases.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                        {purchases.map((purchase, index) => (
                            <li key={index} className="py-2 px-2 hover:bg-gray-100 flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">{purchase.game}</p>
                                    <p>Points Used: {purchase.points_used}</p>
                                    <p className="text-sm text-gray-500">Date: {new Date(purchase.purchase_date).toLocaleString()}</p>
                                </div>
                                <button
                                    onClick={() => deletePurchase(purchase.game)}
                                    className="text-red-500 hover:text-red-700 ml-4"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No purchases found.</p>
                )}
            </div>
        </div>
    );
};

export default PurchaseHistory;
