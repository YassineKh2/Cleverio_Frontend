import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode"; // Update import statement for jwt-decode

const BASE_URL = "http://127.0.0.1:8000"; // Replace with your actual base URL

const UpdateReview = ({ review, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    rating: "",
    comment: "",
    course: "",
  });
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/courses/`);
        setCourses(response.data);
      } catch (error) {
        console.error("Failed to load courses:", error);
        toast.error("Failed to load courses.");
      }
    };

    const fetchReviewData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/reviews/${review.id}/`
        );
        setFormData({
          rating: response.data.rating,
          comment: response.data.comment,
          course: response.data.course, // Assuming the API returns the course ID
        });
      } catch (error) {
        console.error("Failed to load review:", error);
        toast.error("Failed to load review.");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setCurrentUserId(decoded.user_id);
      } catch (error) {
        console.error("Failed to decode token:", error);
        toast.error("Failed to get user ID from token.");
      }
    }

    fetchCourses();
    fetchReviewData();
  }, [review.id]);

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
      user: currentUserId,
      course: parseInt(formData.course, 10),
      rating: formData.rating,
      comment: formData.comment,
    };

    try {
      const response = await axios.put(
        `${BASE_URL}/api/reviews/${review.id}/`,
        reviewData
      );

      // Immediately update the local state (if applicable)
      onUpdate(response.data);
      toast.success("Review updated successfully!");
      onClose(); // Close the modal or form
    } catch (error) {
      console.error("Failed to update review:", error);
      // Check if the error response exists and handle accordingly
      if (error.response) {
        const { data } = error.response;
        if (data.errors) {
          // Handle specific validation errors returned from the server
          setErrors(data.errors);
          toast.error("Validation failed. Please check your inputs.");
        } else {
          toast.error("Failed to update review. Please try again.");
        }
      } else {
        toast.error("Failed to update review. Please try again.");
      }
    }
  };

  // Show loading spinner while fetching data
  if (loading) {
    return <div>Loading...</div>; // Replace with your loading indicator
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Update Review</h2>
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
              Update Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateReview;
