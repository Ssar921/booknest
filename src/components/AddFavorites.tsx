// src/components/FavoriteButton.tsx
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useSupabase } from "../context/SupabaseContext";
import { supabase } from "../lib/supabaseClient";

interface FavoriteButtonProps {
	bookId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ bookId }) => {
	const { user } = useSupabase();
	const [loading, setLoading] = useState(false);
	const [isFavorited, setIsFavorited] = useState(false);
	const [favoriteId, setFavoriteId] = useState<number | null>(null); // Track the row id

	// Check if the book is already favorited
	const checkIfFavorited = async () => {
		if (!user) return;

		setLoading(true);
		const { data, error } = await supabase
			.from("favorites")
			.select("id")
			.eq("user_id", user.id)
			.eq("book_id", bookId)
			.single();

		if (error && error.code !== "PGRST116") {
			console.error("Error checking favorite:", error.message);
			toast.error("Failed to check favorite status.");
		}

		if (data) {
			setIsFavorited(true);
			setFavoriteId(data.id);
		} else {
			setIsFavorited(false);
			setFavoriteId(null);
		}

		setLoading(false);
	};

	const handleFavorite = async () => {
		if (!user) {
			toast.error("You must be logged in to add favorites.");
			return;
		}

		setLoading(true);

		if (isFavorited && favoriteId !== null) {
			// Remove favorite
			const { error } = await supabase
				.from("favorites")
				.delete()
				.eq("id", favoriteId)
				.eq("user_id", user.id);

			if (error) {
				console.error("Error removing favorite:", error.message);
				toast.error("Failed to remove from favorites.");
			} else {
				setIsFavorited(false);
				setFavoriteId(null);
				toast.success("Book removed from favorites!");
			}
		} else {
			// Add to favorites
			const { data, error } = await supabase
				.from("favorites")
				.insert([{ book_id: bookId, user_id: user.id }])
				.select()
				.single();

			if (error) {
				console.error("Error adding favorite:", error.message);
				toast.error("Failed to add to favorites.");
			} else {
				setIsFavorited(true);
				setFavoriteId(data.id);
				toast.success("Book added to favorites!");
			}
		}

		setLoading(false);
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
