import React, { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { toast } from "react-toastify";
import { useSupabase } from "../../context/SupabaseContext";
import { FiSend } from "react-icons/fi";

interface AddCommentProps {
	bookId: string;
}

const AddComment: React.FC<AddCommentProps> = ({ bookId }) => {
	const [comment, setComment] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { user } = useSupabase();

	// Handle form submission
	const handleCommentSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Check if the user is logged in
		if (!user) {
			toast.error("Login is required to post a comment!");
			return;
		}

		// Set submitting state
		setIsSubmitting(true);

		try {
			// Insert comment into the book_comments table
			const { error } = await supabase.from("book_comments").insert([
				{
					comment,
					book_id: bookId,
					user: user.id, // User's ID from Supabase Auth
				},
			]);

			if (error) {
				throw new Error(error.message);
			}

			toast.success("Comment added successfully!");
			setComment(""); // Clear the comment input after successful submission
		} catch (error) {
			toast.error("An error occurred while posting your comment");
		} finally {
			setIsSubmitting(false); // Reset the submitting state
		}
	};

	return (
		<div className="add-comment w-full mx-auto mt-2">
			<form onSubmit={handleCommentSubmit} className="flex items-center">
				<textarea
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					placeholder="Write your comment..."
					rows={1}
					required
					className="flex-1 p-3 border border-gray-300 rounded-l-md resize-none focus:outline-none focus:ring-themeColor h-12 focus:border-themeColor"
				/>
				<button
					type="submit"
					disabled={isSubmitting || !comment.trim()}
					className="p-3 bg-themeColor h-12 rounded-r-md text-white hover:bg-themeColor disabled:bg-gray-300 disabled:cursor-not-allowed"
				>
					{isSubmitting ? (
						<span>Submitting...</span>
					) : (
						<FiSend className="text-xl" />
					)}
				</button>
			</form>
		</div>
	);
};

export default AddComment;
