/* eslint-disable react/prop-types */
import { FaThumbsUp, FaTrash } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

const OComplain = ({ complaint }) => {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);

  // Fetch authenticated user data
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  // Upvote mutation
  const { mutate: upvoteC, isPending: isUpvoting } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/complaints/${complaint._id}/upvote`, {
        method: "POST",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Something went wrong");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["complaints"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Delete mutation
  const { mutate: deleteComplaint, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/complaints/${complaint._id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to delete complaint");
      }

      return res.json();
    },
    onSuccess: () => {
      toast.success("Complaint deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["complaints"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Check if the user is authorized to delete this complaint
  const isMyComplaint = authUser?._id === String(complaint.user);

  // Handle upvote
  const handleUpvote = () => {
    if (isUpvoting) return;
    upvoteC();
  };

  // Handle delete
  const handleDelete = () => {
    if (isDeleting) return;
    deleteComplaint();
  };

  // Ensure likes count is valid
  const likesCount = (complaint.upvotes || []).length;
  const isUpvoted = (complaint.upvotes || []).includes(authUser?._id);

  // Get image source
  const imageSource = complaint.img || (complaint.attachments && complaint.attachments.length > 0 && complaint.attachments[0].fileUrl);

  return (
    <div className="p-7 border-b border-gray-700 flex flex-col gap-7">
      {/* Complaint Title */}
      <div className="font-bold text-xl text-center text-info">
        {complaint.title}
      </div>
      <div className="text-md text-center">
        {complaint.complainText || "No description available"}
      </div>

      {/* Categories and Severity */}
      <div className="flex justify-between items-center text-sm text-secondary">
        <div>
          <strong>Severity:</strong> {complaint.severity || "Not available"}
        </div>
        <div>
          <strong>Category:</strong> {complaint.categories || "Not available"}
        </div>
      </div>

      {/* Complaint Image - Single compact display */}
      {imageSource && (
        <div className="flex justify-center">
          <div 
            className="w-40 h-40 rounded-lg border border-gray-700 mt-3 overflow-hidden cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            <img
              src={imageSource}
              className="w-full h-full object-cover"
              alt="Complaint Image"
              onError={(e) => {
                console.error("Image failed to load:", e);
                e.target.style.display = 'none';
              }}
            />
          </div>
        </div>
      )}

      {/* Image Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75" onClick={() => setShowModal(false)}>
          <div className="relative bg-gray-900 p-2 rounded-lg max-w-3xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute top-2 right-2 text-white bg-red-500 rounded-full p-1"
              onClick={() => setShowModal(false)}
            >
              <IoClose size={20} />
            </button>
            <div className="overflow-auto">
              <img 
                src={imageSource} 
                alt="Full size image" 
                className="max-h-[80vh] max-w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* Actions: Upvote and Delete */}
      <div className="flex justify-around items-center mt-3 ml-11 mr-11">
        {/* Upvote Button */}
        <button
          className={`flex items-center gap-1 text-lg ${
            isUpvoted ? "text-blue-500" : "text-gray-500"
          }`}
          onClick={handleUpvote}
        >
          <FaThumbsUp className="w-7 h-7" />
          <span>{likesCount}</span>
        </button>

        {/* Delete Button (Visible only to the complaint owner) */}
        {isMyComplaint && (
          <span className='flex justify-end flex-1'>
          {!isDeleting && <FaTrash className='cursor-pointer hover:text-red-500' 
          onClick={handleDelete} />}
          {isDeleting && (
            <LoadingSpinner size="sm"/>
          )}
        </span>
        )}
      </div>
    </div>
  );
};

export default OComplain;
