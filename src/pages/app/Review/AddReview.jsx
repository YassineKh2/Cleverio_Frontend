import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const BASE_URL = "http://127.0.0.1:8000"; // Replace with your actual base URL

const AddReview = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    rating: "",
    comment: "",
    course: "", // This will store the selected course ID
  });
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState([]); // Array to hold courses
  const [currentUserId, setCurrentUserId] = useState(null); // To hold current user ID

  useEffect(() => {
    // Fetch all courses
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/courses/`); // Adjust URL to your courses endpoint
        setCourses(response.data);
      } catch (error) {
        console.error("Failed to load courses:", error);
        toast.error("Failed to load courses.");
      }
    };

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

    fetchCourses();
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
    if (!formData.course) newErrors.course = "Course is required";
    setErrors(newErrors);

    // If there are errors, do not proceed
    if (Object.keys(newErrors).length > 0) return;

    // Prepare the review data
    const reviewData = {
      user: currentUserId, // Use the current user ID
      course: parseInt(formData.course, 10), // Use the selected course ID
      rating: formData.rating,
      comment: formData.comment,
    };
    console.log(reviewData);

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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Add Review</h2>
        <form onSubmit={handleSubmit}>
          <select
            name="course"
            value={formData.course}
            onChange={handleInputChange}
            required
            className={`w-full p-2 border ${
              errors.course ? "border-red-500" : "border-gray-300"
            } rounded mb-2`}
          >
            <option value="">Select a Course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>

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

export default AddReview;
