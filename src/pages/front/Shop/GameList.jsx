import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import UserPoints from "./UserPoints";
import "react-toastify/dist/ReactToastify.css";
import PurchaseHistory from "./PurchaseHistory";

const BASE_URL = "http://127.0.0.1:8000";

const GameList = ({ selectedCategory }) => {
    const [games, setGames] = useState([]);
    const [filteredGames, setFilteredGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showPurchaseHistory, setShowPurchaseHistory] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [userPoints, setUserPoints] = useState(null);

    const getUserIdFromToken = () => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwtDecode(token);
            return decoded.user_id;
        }
        return null;
    };

    const userId = getUserIdFromToken();

    const fetchGames = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/api/game`);
            setGames(response.data);
            setFilteredGames(response.data);
        } catch (error) {
            console.error("Failed to fetch games:", error);
            toast.error("Failed to load games.");
        } finally {
            setLoading(false);
        }
    };

    const fetchUserPoints = async () => {
        const userId = getUserIdFromToken();
        if (userId) {
            try {
                const response = await axios.get(`${BASE_URL}/api/persons/${userId}`);
                setUserPoints(response.data.points);
            } catch (error) {
                console.error("Failed to fetch user points:", error);
            }
        }
    };

    useEffect(() => {
        fetchGames();
        fetchUserPoints();
    }, []);

    useEffect(() => {
        if (selectedCategory === "all") {
            setFilteredGames(games);
        } else {
            const filtered = games.filter((game) => game.category_name === selectedCategory);
            setFilteredGames(filtered);
        }
    }, [selectedCategory, games]);

    const buyGame = async (gameId, gamePoints) => {
        const userId = getUserIdFromToken();
        if (!userId) {
            toast.error("User not logged in.");
            return;
        }

        if (userPoints < gamePoints) {
            toast.error("Insufficient points to complete the purchase.");
            return;
        }

        try {
            await axios.post(`${BASE_URL}/api/game/purchase`, {
                user_id: userId,
                game_id: gameId,
            });
            toast.success("Game purchased successfully!");
            setShowSuccessModal(true);
            fetchGames();
            fetchUserPoints(); // Update user points after purchase
        } catch (error) {
            console.error("Purchase failed:", error);
            toast.error("Failed to purchase the game.");
        }
    };

    const navigateToAmazon = (gameName) => {
        const searchQuery = encodeURIComponent(gameName);
        const amazonLink = `https://www.amazon.com/s?k=${searchQuery}`;
        window.open(amazonLink, '_blank'); // Open the link in a new tab
    };

    const handleUpdatePoints = (points) => {
        setUserPoints(prevPoints => prevPoints + points);
    };

    return (
        <div className="p-4 w-full h-full relative">
            <ToastContainer />
            <div className="absolute top-4 right-4 z-10">
                <UserPoints refreshTrigger={userPoints} />
            </div>
            <button
                onClick={() => setShowPurchaseHistory(true)}
                className="bg-gray-700 text-white px-4 py-2 rounded mb-4"
            >
                Voir l'historique des achats
            </button>
            {loading ? (
                <p className="text-center">Chargement...</p>
            ) : filteredGames.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
                    {filteredGames.map((game) => (
                        <div key={game.id} className="border rounded p-4 shadow">
                            <img
                                src={game.picture_url ? `${BASE_URL}/media/${game.picture_url}` : `${BASE_URL}/media/games/default.png`}
                                alt={game.name}
                                className="w-full h-40 object-cover mb-4 rounded"
                            />
                            <h3 className="text-xl font-semibold mb-2">{game.name}</h3>
                            <p className="text-gray-700 mb-2">Description: {game.description}</p>
                            <p className="text-gray-700 mb-2">Categorie: {game.category_name}</p>
                            <p className="text-gray-700 mb-2">stockage: {game.stock_quantity}</p>
                            <button
                                onClick={() => buyGame(game.id, game.points)}
                                className="bg-black-500 text-white px-4 py-2 rounded w-full"
                            >
                               Achetez pour {game.points} points
                            </button>
                            <button
                                onClick={() => navigateToAmazon(game.name)}
                                className="bg-green-500 text-white px-4 py-2 rounded w-full mt-2"
                            >
                                Voir sur Amazon
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center">Aucun jeu disponible dans cette catégorie.</p>
            )}
            
            {showPurchaseHistory && (
                <PurchaseHistory
                    userId={userId}
                    onClose={() => setShowPurchaseHistory(false)}
                    onUpdatePoints={handleUpdatePoints}
                />
            )}

            {showSuccessModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg w-1/3">
                        <h3 className="text-xl font-semibold mb-4">Achat réussi !</h3>
                        <p className="mb-4">Merci pour votre achat !</p>
                        <button
                            onClick={() => setShowSuccessModal(false)}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GameList;
