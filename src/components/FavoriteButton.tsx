import { db } from "../firebase";
import {
	doc,
	updateDoc,
	arrayUnion,
	arrayRemove,
	getDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

interface FavoriteButtonProps {
	bookId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ bookId }) => {
	const { user } = useAuth();
	const [loading, setLoading] = useState(false);
	const [isFavorited, setIsFavorited] = useState(false);

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
			setLoading(false);
		}
	};

	useEffect(() => {
		checkIfFavorited();
	}, [user, bookId]);

	return (
		<button
			onClick={handleFavorite}
			disabled={loading}
			className={`${
				loading
					? "bg-gray-300 cursor-not-allowed opacity-50"
					: isFavorited
					? "bg-pink-600 text-white"
					: "text-pink-600 border border-pink-600"
			} inline-flex items-center justify-center w-full max-w-xs px-5 py-2 border rounded-lg text-sm font-semibold space-x-2 transition-all duration-200 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-50 mx-2`}
		>
			{loading ? (
				<FaSpinner className="animate-spin text-white" />
			) : isFavorited ? (
				<AiFillHeart className="text-white" />
			) : (
				<AiOutlineHeart className="text-pink-600" />
			)}

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
