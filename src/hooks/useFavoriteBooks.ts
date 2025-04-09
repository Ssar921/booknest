import { useState, useEffect } from "react";
import { Book } from "../types";
import { getBooksById } from "./getBooksById"; // Assuming you have this function already

const useFavoriteBooks = (favorites: string[] | undefined) => {
	const [favoriteBooks, setFavoriteBooks] = useState<Book[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchFavoriteBooks = async () => {
			if (favorites && favorites.length > 0) {
				try {
					const booksData = await getBooksById(favorites);
					setFavoriteBooks(booksData);
				} catch (error) {
					console.error("Error fetching favorite books:", error);
				} finally {
					setLoading(false);
				}
			} else {
				setFavoriteBooks([]);
				setLoading(false);
			}
		};

		if (favorites) {
			fetchFavoriteBooks();
		}
	}, [favorites]);

	return { favoriteBooks, loading };
};

export default useFavoriteBooks;
