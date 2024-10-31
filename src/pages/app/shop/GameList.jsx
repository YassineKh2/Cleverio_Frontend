import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { ToastContainer, toast } from "react-toastify";
import EditGameModal from "./EditGameModal";
import Categories from "./Categories";
import AddGame from "./AddGame";
import Purchase from "./Purchase";
const GameList = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedGame, setSelectedGame] = useState(null);
    const BASE_URL = "http://127.0.0.1:8000";
    const defaultGameImage = `${BASE_URL}/media/games/default.png`;
    const [showAddModal, setShowAddModal] = useState(false);

    const fetchGames = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/api/game`);
            setGames(response.data);
        } catch (err) {
            console.error("Failed to load games:", err);
            toast.error("Failed to load games.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGames(); // Initial fetch on component mount
    }, []);

    const handleDelete = async (gameId) => {
        // Show a confirmation dialog before deleting
        const confirmDelete = window.confirm("Are you sure you want to delete this game?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`${BASE_URL}/api/game/${gameId}`);
            setGames(games.filter((game) => game.id !== gameId));
            toast.success("Game deleted successfully!");
        } catch (error) {
            console.error("Failed to delete game:", error);
            toast.error("Failed to delete game.");
        }
    };

    const handleEdit = (game) => {
        setSelectedGame(game);
    };

    const handleSaveEdit = async (updatedGame) => {
        setSelectedGame(null);
        await fetchGames();
        toast.success("Game updated successfully!");
    };

    return (
        <>
            <Categories />
            <div className="flex ">
                <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 overflow-y-auto">
                        <ToastContainer />

                        <Card
                            title="Collection de jeux"
                            headerslot={
                                <Button
                                    text="Ajouter un jeu"
                                    onClick={() => setShowAddModal(true)}
                                    className="bg-black-600 text-white"
                                />
                            }
                        >
                            {loading ? (
                                <p>Chargement...</p>
                            ) : (
                                <table className="min-w-full bg-white dark:bg-slate-800 rounded-lg shadow-md">
                                    <thead>
                                        <tr>
                                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-slate-900 dark:text-white">Photo</th>
                                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-slate-900 dark:text-white">Nom</th>
                                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-slate-900 dark:text-white">Points</th>
                                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-slate-900 dark:text-white">Categorie</th>
                                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-slate-900 dark:text-white">Stockage</th>
                                            <th className="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-slate-900 dark:text-white">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {games.map((game) => (
                                            <tr key={game.id} className="text-slate-700 dark:text-slate-300">
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                                                    <img
                                                        src={game.picture_url ? `${BASE_URL}/media/${game.picture_url}` : defaultGameImage}
                                                        alt={game.name}
                                                        className="w-10 h-10 rounded object-cover"
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = defaultGameImage;
                                                        }}
                                                    />
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">{game.name}</td>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">{game.points}</td>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">{game.category_name}</td>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">{game.stock_quantity}</td>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-center">
                                                    <Button
                                                        text="Modifier"
                                                        onClick={() => handleEdit(game)}
                                                        className="bg-black-500 text-white px-2 py-1 mr-2"
                                                    />
                                                    <Button
                                                        text="Supprmier"
                                                        onClick={() => handleDelete(game.id)}
                                                        className="bg-black-900 text-white px-2 py-1"
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </Card>
                    </div>

                    {/* Add Game Modal */}
                    {showAddModal && (
                        <AddGame
                            onClose={() => setShowAddModal(false)}
                            onAdd={fetchGames} // Refresh game list after adding
                        />
                    )}

                    {/* Edit Game Modal */}
                    {selectedGame && (
                        <EditGameModal
                            game={selectedGame}
                            onClose={() => setSelectedGame(null)}
                            onSave={handleSaveEdit}
                        />
                    )}
                </div>
            </div>
            <Purchase></Purchase>
        </>
    );
};

export default GameList;
