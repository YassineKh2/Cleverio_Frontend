import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { createArt } from "../../../Services/apiForum"; // Import createArt API function

function UploadArtModal({ open, handleClose, onArtCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!title || !description || !image) {
      setError("All fields are required.");
      return;
    }

    const artData = {
      title,
      description,
      image,
    };

    try {
      const formData = new FormData();
      Object.entries(artData).forEach(([key, value]) => formData.append(key, value));
      
      await createArt(formData); // Call backend API to create art
      onArtCreated(); // Refresh gallery after art creation
      handleClose(); // Close modal on success
    } catch (err) {
      setError("Failed to upload art. Please try again.");
      console.error(err);
    }
  };

  return (
    <Dialog open={open} handler={handleClose} size="sm">
      <DialogHeader>Upload New Art</DialogHeader>
      <DialogBody divider>
        {error && <Typography color="red" className="text-center mb-4">{error}</Typography>}
        <div className="flex w-72 flex-col gap-6">
        {/* Title Input */}
        <Input
          variant="outlined"
          label=""
          placeholder="Enter the title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-4"
        />
        
        {/* Description Textarea */}
        <Input
          variant="outlined"
          label=""
          placeholder="Enter a description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="mt-4"
        />
        
        
        {/* Image Upload */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Image <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            required
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button color="gray" onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button color="blue" onClick={handleSubmit}>
          Upload
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default UploadArtModal;
