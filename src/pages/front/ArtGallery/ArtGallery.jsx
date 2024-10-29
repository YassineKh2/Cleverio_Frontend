import React, { useEffect, useState } from 'react';
import { fetchArts, deleteArt } from '../../../Services/apiForum'; // Ensure to import the deleteArt function
import CreateArtModal from './CreateArtModal';

const ArtGallery = () => {
  const [artworks, setArtworks] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const loadArtworks = async () => {
    try {
      const data = await fetchArts();
      setArtworks(data);
    } catch (err) {
      setError('Error loading artworks: ' + err.message);
    }
  };

  useEffect(() => {
    loadArtworks();
  }, []);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // Callback to refresh art list after creating new artwork
  const handleArtCreated = () => {
    loadArtworks();
    closeModal();
  };

  // Function to delete artwork
  const handleDelete = async (id) => {
    try {
      await deleteArt(id);
      loadArtworks(); 
    } catch (err) {
      setError('Error deleting artwork: ' + err.message);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Art Gallery</h1>
      <button
        onClick={openModal}
        className="mb-6 bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600 transition duration-200"
      >
        Create Art
      </button>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {artworks.map((art) => (
          <div key={art.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={`http://localhost:8000${art.image}`}
              alt={art.title}
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '../../../../images/placeholder.jpg';
              }}
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{art.title}</h2>
              <p className="text-gray-700">{art.description}</p>
              <button
                onClick={() => handleDelete(art.id)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded-md shadow hover:bg-red-600 transition duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <CreateArtModal isOpen={isModalOpen} onClose={closeModal} onArtCreated={handleArtCreated} />
    </div>
  );
};

export default ArtGallery;
