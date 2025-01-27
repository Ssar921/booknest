import { useState, useEffect } from "react";
import { db } from "../firebase"; // your Firestore instance
import {
	doc,
	updateDoc,
	arrayUnion,
	arrayRemove,
	getDoc,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext"; // Custom hook for auth
import { toast } from "react-toastify"; // react-toastify for notifications
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"; // react-icons for heart icons
import { FaSpinner } from "react-icons/fa"; // Loading spinner icon

const FavoriteButton = ({ bookId }: { bookId: string }) => {
	const { user } = useAuth();
	const [isFavorited, setIsFavorited] = useState(false);
	const [loading, setLoading] = useState(false); // Track loading state

	// Check if the book is in the user's favorites array
	const checkIfFavorited = async () => {
		if (user) {
			try {
				const userRef = doc(db, "users", user.uid);
				const userDoc = await getDoc(userRef);

				if (userDoc.exists()) {
					const favorites = userDoc.data()?.favorites || [];
					setIsFavorited(favorites.includes(bookId));
				}
			} catch (error) {
				console.error("Error checking favorites:", error);
				toast.error(
					"Failed to check favorite status. Please try again."
				);
			}
		}
	};

	const handleFavorite = async () => {
		if (!user) {
			toast.error("You must be logged in to add favorites.");
			return;
		}

		const userRef = doc(db, "users", user.uid);
		setLoading(true); // Start loading when operation begins

		try {
			if (isFavorited) {
				// Remove the book from favorites
				await updateDoc(userRef, {
					favorites: arrayRemove(bookId),
				});
				setIsFavorited(false);
				toast.success("Book removed from favorites!");
			} else {
				// Add the book to favorites
				await updateDoc(userRef, {
					favorites: arrayUnion(bookId),
				});
				setIsFavorited(true);
				toast.success("Book added to favorites!");
			}
		} catch (error) {
			console.error("Error updating favorites:", error);
			toast.error("Failed to update favorite. Please try again.");
		} finally {
			setLoading(false); // Stop loading after operation is complete
		}
	};

	useEffect(() => {
		checkIfFavorited();
	}, [user, bookId]);

	return (
		<button
			onClick={handleFavorite}
			disabled={loading} // Disable button while loading
			className={`${
				loading
					? "bg-gray-300 cursor-not-allowed opacity-50" // Disabled state
					: isFavorited
					? "bg-pink-600 text-white"
					: "text-pink-600 border border-pink-600"
			} inline-flex items-center justify-center w-full max-w-xs px-5 py-2 border rounded-lg text-sm font-semibold space-x-2 transition-all duration-200 hover:bg-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-50 mx-2`}
		>
			{/* Loading Spinner */}
			{loading ? (
				<FaSpinner className="animate-spin text-white" />
			) : isFavorited ? (
				<AiFillHeart className="text-white" />
			) : (
				<AiOutlineHeart className="text-pink-600" />
			)}

			{/* Button Text */}
			<span>
				{loading
					? "Loading..."
					: isFavorited
					? "Remove from Favorites"
					: "Add to Favorites"}
			</span>
		</button>
	);
};

export default FavoriteButton;
