import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { ToastContainer, toast } from "react-toastify";
import AddReview from "./AddReview";
import UpdateReview from "./UpdateReview";
// import EditReviewModal from "./EditReviewModal"; // Import your EditReviewModal component
// import AddReview from "./AddReview"; // Import your AddReview component

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState(null);
  const BASE_URL = "http://127.0.0.1:8000";
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/api/reviews/`);
      setReviews(response.data);
    } catch (err) {
      console.error("Failed to load reviews:", err);
      toast.error("Failed to load reviews.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews(); // Initial fetch on component mount
  }, []);

  const handleDelete = async (reviewId) => {
    // Show a confirmation dialog before deleting
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this review?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${BASE_URL}/api/reviews/${reviewId}/`);
      setReviews(reviews.filter((review) => review.id !== reviewId));
      toast.success("Review deleted successfully!");
    } catch (error) {
      console.error("Failed to delete review:", error);
      toast.error("Failed to delete review.");
    }
  };

  const handleEdit = (review) => {
    setSelectedReview(review);
  };

  const handleSaveEdit = async (updatedReview) => {
    setSelectedReview(null);
    await fetchReviews(); // Refresh review list after editing
    toast.success("Review updated successfully!");
  };

  return (
    <>
      <div className="flex">
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 overflow-y-auto">
            <ToastContainer />

            <Card
              title="Liste des avis"
              headerslot={
                <Button
                  text="Ajouter un avis"
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
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-slate-900 dark:text-white">
                        Utilisateur
                      </th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-slate-900 dark:text-white">
                        Cours
                      </th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-slate-900 dark:text-white">
                        Note
                      </th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-slate-900 dark:text-white">
                        Commentaire
                      </th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-center leading-4 text-slate-900 dark:text-white">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {reviews.map((review) => (
                      <tr
                        key={review.id}
                        className="text-slate-700 dark:text-slate-300"
                      >
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                          {review.username}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                          {review.course_title}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                          {review.rating}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                          {review.comment}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300 text-center">
                          <Button
                            text="Modifier"
                            onClick={() => handleEdit(review)}
                            className="bg-black-500 text-white px-2 py-1 mr-2"
                          />
                          <Button
                            text="Supprimer"
                            onClick={() => handleDelete(review.id)}
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
          {/* Add Review Modal */}
          {showAddModal && (
            <AddReview
              onClose={() => setShowAddModal(false)}
              onAdd={fetchReviews} // Refresh Review list after adding
            />
          )}
          {/* Edit Review Modal */}
          {selectedReview && (
            <UpdateReview
              review={selectedReview}
              onClose={() => setSelectedReview(null)}
              onUpdate={handleSaveEdit}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ReviewList;
