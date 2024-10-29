import React, { useState } from 'react';
import { createArt } from '../../../Services/apiForum';

const CreateArtModal = ({ isOpen, onClose, onArtCreated }) => {
  const [artData, setArtData] = useState({
    title: '',
    description: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArtData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setArtData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createArt(artData);
      onArtCreated(); // Trigger parent update
    } catch (error) {
      console.error("Error creating art:", error);
      // Handle error (e.g., show a message to the user)
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Create Art</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={artData.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={artData.description}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Image</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              accept="image/*"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateArtModal;
