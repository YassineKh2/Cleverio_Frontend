import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { ClockIcon, TrashIcon } from "@heroicons/react/24/solid";
import { fetchArtById, fetchComments, createComment, deleteComment, updateArt, deleteArt } from "../../../Services/apiForum"; // Import necessary functions

function ArtModal({ artId, open, handleClose, onArtUpdated }) {
  const [art, setArt] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedImage, setUpdatedImage] = useState(null);

  useEffect(() => {
    if (artId) {
      const fetchData = async () => {
        try {
          const artData = await fetchArtById(artId);
          const commentData = await fetchComments(artId);
          setArt(artData);
          setComments(commentData);
        } catch (error) {
          console.error("Error fetching art or comments", error);
        }
      };
      fetchData();
    }
  }, [artId]);

  const handleCommentSubmit = async (e) => {
    if (e.key === "Enter" && newComment.trim()) {
      try {
        const comment = await createComment(artId, { content: newComment });
        setComments([...comments, comment]);
        setNewComment("");
      } catch (error) {
        console.error("Error adding comment", error);
      }
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(artId, commentId);
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error("Error deleting comment", error);
    }
  };

  const handleDeleteArt = async () => {
    try {
      await deleteArt(artId);
      handleClose();
      onArtUpdated();
    } catch (error) {
      console.error("Error deleting art", error);
    }
  };

  const handleUpdateArt = async () => {
    const updatedData = {
      title: updatedTitle || art.title,
      description: updatedDescription || art.description,
      image: updatedImage,
    };
  
    try {
      const formData = new FormData();
      Object.entries(updatedData).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
      
      await updateArt(artId, formData);
      setIsEditing(false);
      onArtUpdated();
    } catch (error) {
      console.error("Error updating art", error);
    }
  };
  
  return (
    <Dialog open={open} handler={handleClose} size="xl">
      <DialogHeader>{art?.title}</DialogHeader>
      
      <DialogBody divider className="max-h-[80vh] overflow-y-auto"> {/* Scrollable body */}
        <Card className="w-full">
          <CardHeader color="blue-gray" className="relative h-60">
            <img
              src={`http://localhost:8000${art?.image}`}
              alt={art?.title}
              className="w-full h-full object-cover"
            />
          </CardHeader>

          <CardBody>
            {!isEditing ? (
              <>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {art?.title}
                </Typography>
                <Typography color="gray" className="mt-1 font-normal text-sm">
                  {art?.description}
                </Typography>
              </>
            ) : (
              <div className="flex flex-col gap-4">
                <Input
                  variant="outlined"
                  label="Title"
                  placeholder="Update title"
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                />
                <Textarea
                  variant="outlined"
                  label="Description"
                  placeholder="Update description"
                  value={updatedDescription}
                  onChange={(e) => setUpdatedDescription(e.target.value)}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Update Image
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setUpdatedImage(e.target.files[0])}
                    className="block w-full text-sm text-gray-500"
                  />
                </div>
              </div>
            )}
          </CardBody>
          
          <CardFooter className="pt-0">
            <div className="flex items-center text-gray-600 space-x-1">
              <ClockIcon className="h-3 w-3 text-gray-500" />
              <Typography variant="small" color="gray" className="text-xs">
                {new Date(art?.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </Typography>
            </div>
          </CardFooter>
        </Card>

        {/* Comments Section */}
        <div className="mt-6">
          <Typography variant="h6" color="blue-gray" className="mb-4">
            Comments
          </Typography>
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="flex items-start space-x-2 mb-4 border-b border-gray-200 pb-4"
            >
              <button onClick={() => handleDeleteComment(comment.id)}>
                <TrashIcon className="h-5 w-5 text-gray-500 hover:text-red-500" />
              </button>
              <div className="w-full">
                <div className="flex items-center justify-between">
                  <Typography variant="small" color="blue-gray" className="font-semibold">
                    {comment.user_name}
                  </Typography>
                  <Typography variant="small" color="gray">
                    {new Date(comment.created_at).toLocaleDateString()}
                  </Typography>
                </div>
                <Typography variant="small" color="gray" className="mt-1">
                  {comment.content}
                </Typography>
              </div>
            </div>
          ))}
          <Input
            placeholder="Write your comment and press Enter"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={handleCommentSubmit}
            className="mt-2"
          />
        </div>
      </DialogBody>
      
      <DialogFooter>
        <Button color="red" onClick={handleDeleteArt} className="mr-auto">
          Delete Art
        </Button>
        {!isEditing ? (
          <Button color="blue" onClick={() => setIsEditing(true)}>
            Update Art
          </Button>
        ) : (
          <>
            <Button color="gray" onClick={() => setIsEditing(false)} variant="outlined">
              Cancel
            </Button>
            <Button color="green" onClick={handleUpdateArt}>
              Save Changes
            </Button>
          </>
        )}
      </DialogFooter>
    </Dialog>
  );
}

export default ArtModal;
