import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const BASE_URL = "http://127.0.0.1:8000"; // Replace with your actual base URL

const AddReviewFront = ({ onClose, onAdd, courseId }) => {
  const [formData, setFormData] = useState({
    rating: "",
    comment: "",
  });
  const [errors, setErrors] = useState({});
  const [currentUserId, setCurrentUserId] = useState(null); // To hold current user ID

  useEffect(() => {
    // Get the token from local storage and decode it to get the user ID
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token); // Call default function from the imported module
        setCurrentUserId(decoded.user_id); // Adjust based on your token structure
      } catch (error) {
        console.error("Failed to decode token:", error);
        toast.error("Failed to get user ID from token.");
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    const newErrors = {};
    if (!formData.rating) newErrors.rating = "Rating is required";
    if (!formData.comment) newErrors.comment = "Comment is required";
    setErrors(newErrors);

    // If there are errors, do not proceed
    if (Object.keys(newErrors).length > 0) return;

    // Prepare the review data
    const reviewData = {
      user: currentUserId, // Use the current user ID
      course: parseInt(courseId, 10), // Use the course ID from props
      rating: formData.rating,
      comment: formData.comment,
    };

    try {
      const response = await axios.post(`${BASE_URL}/api/reviews/`, reviewData);
      onAdd(response.data); // Call the onAdd function passed from parent
      toast.success("Review added successfully!");
      onClose(); // Close the modal or form
    } catch (error) {
      console.error("Failed to add review:", error);
      toast.error("Failed to add review.");
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark transparent background
        zIndex: 1000, // Ensure this is above other elements
      }}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-96"
        style={{ zIndex: 1001 }} // Ensure modal content is above backdrop
      >
        <h2 className="text-xl font-semibold mb-4">Add Review</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleInputChange}
            placeholder="Rating"
            required
            className={`w-full p-2 border ${
              errors.rating ? "border-red-500" : "border-gray-300"
            } rounded mb-2`}
          />

          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleInputChange}
            placeholder="Comment"
            required
            className={`w-full p-2 border ${
              errors.comment ? "border-red-500" : "border-gray-300"
            } rounded mb-2`}
          />

          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Add Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReviewFront;
