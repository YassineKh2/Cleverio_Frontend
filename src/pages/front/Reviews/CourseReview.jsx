import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import { useParams } from "react-router-dom";
import AddReview from "./AddReviewFront"; // Import AddReview component

const BASE_URL = "http://127.0.0.1:8000"; // Replace with your actual base URL

const ReviewSlider = () => {
  const { courseId } = useParams(); // Extract courseId from URL

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  useEffect(() => {
    const fetchCourseReviews = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/courses/${courseId}/reviews/`
        );
        setReviews(response.data.reviews);
      } catch (error) {
        console.error("Failed to fetch course reviews:", error);
        setError("Failed to load course reviews.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourseReviews();
  }, [courseId]);

  const handleAddReview = (newReview) => {
    setReviews([...reviews, newReview]); // Update reviews with the new review
  };

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="my-5 flex flex-col h-full">
      <h3 className="text-center mb-4">Student Reviews</h3>

      <div className="flex-grow">
        <Swiper
          effect="cards"
          grabCursor
          modules={[EffectCards]}
          className="w-72 mx-auto"
        >
          {reviews.length === 0 ? (
            <p>No reviews available.</p>
          ) : (
            reviews.map((review, index) => (
              <SwiperSlide key={index}>
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-4 rounded-lg shadow-md">
                  <div className="flex justify-center mb-4">
                    <img
                      src={
                        review.user__profile_image ||
                        "https://via.placeholder.com/100"
                      }
                      alt={review.user__username}
                      className="rounded-full w-16 h-16 object-cover"
                    />
                  </div>
                  <h5 className="text-lg font-semibold text-center mb-1">
                    {review.user__username}
                  </h5>
                  <p className="text-center italic mb-3">"{review.comment}"</p>
                  <div className="text-center">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`fa-star text-yellow-400 ${
                          i < review.rating ? "fas" : "far"
                        }`}
                      ></i>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>

      {/* Button at the bottom */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4 mx-auto mt-2"
      >
        Add a Review
      </button>

      {/* Conditionally render AddReview modal */}
      {isModalOpen && (
        <AddReview
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddReview}
          courseId={courseId} // Pass courseId to AddReview
        />
      )}
    </div>
  );
};

export default ReviewSlider;
