import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const BASE_URL = "http://127.0.0.1:8000";

const UserPoints = ({ refreshTrigger }) => {
    const [points, setPoints] = useState(null);
    const [loading, setLoading] = useState(true);

    const getUserIdFromToken = () => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwtDecode(token);
            return decoded.user_id;
        }
        return null;
    };

    const fetchUserPoints = async () => {
        const userId = getUserIdFromToken();
        if (!userId) {
            toast.error("User not logged in.");
            return;
        }

        try {
            const response = await axios.get(`${BASE_URL}/api/persons/${userId}`);
            setPoints(response.data.points);
        } catch (error) {
            console.error("Failed to fetch user points:", error);
            toast.error("Failed to load points. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserPoints();
    }, [refreshTrigger]); // Fetch points whenever refreshTrigger changes

    return (
        <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm text-center max-w-[15rem] mx-auto">
            {loading ? (
                <div className="flex justify-center items-center text-xs">
                    <div className="loader ease-linear rounded-full border-2 border-t-2 border-gray-200 h-3 w-3 mb-1"></div>
                    <p className="ml-2">Loading...</p>
                </div>
            ) : points !== null ? (
                <p className="text-lg font-medium text-green-500">Balance: {points} Points</p>
            ) : (
                <p className="text-red-500 text-xs">Failed to load points.</p>
            )}
        </div>
    );
};

export default UserPoints;
