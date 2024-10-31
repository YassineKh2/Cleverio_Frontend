import React, { useEffect, useState } from 'react';
import { fetchArts } from '../../../Services/apiForum';
import ArtCard from './ArtCard';
import ArtModal from './ArtModal';
import UploadArtModal from './UploadArtModal';
import { Button } from "@material-tailwind/react";

export function MasonryGridGallery() {
  const [artworks, setArtworks] = useState([]);
  const [error, setError] = useState(null);
  const [selectedArtId, setSelectedArtId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Fetch artworks from the backend
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

  const handleArtClick = (artId) => {
    setSelectedArtId(artId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedArtId(null);
  };

  const handleOpenUploadModal = () => setIsUploadModalOpen(true);
  const handleCloseUploadModal = () => setIsUploadModalOpen(false);

  // Function to refresh the list of artworks after update
  const handleArtUpdated = () => {
    loadArtworks(); // Refresh the list of artworks
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-center">Art Gallery</h1>
        <Button color="blue" onClick={handleOpenUploadModal}>
          Upload your Art
        </Button>
      </div>
      {error && <div className="text-red-500 text-center">{error}</div>}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {artworks.map((art) => (
          <ArtCard key={art.id} art={art} onClick={() => handleArtClick(art.id)} />
        ))}
      </div>

      {/* Art Details Modal */}
      {selectedArtId && (
        <ArtModal
          artId={selectedArtId}
          open={isModalOpen}
          handleClose={handleCloseModal}
          onArtUpdated={handleArtUpdated} // Pass the onArtUpdated function
        />
      )}

      {/* Upload Art Modal */}
      <UploadArtModal
        open={isUploadModalOpen}
        handleClose={handleCloseUploadModal}
        onArtCreated={loadArtworks} // Refresh gallery after new art upload
      />
    </div>
  );
}

export default MasonryGridGallery;
