import { Book } from "../types";
import { useState, useEffect } from "react";

// Custom hook for fetching book suggestions
const SearchSuggestions = (
	query: string,
	currentPage: number,
	booksPerPage: number
) => {
	const [loading, setLoading] = useState(true);
	const [books, setBooks] = useState<Book[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (query.length < 2) {
			setBooks([]);
			return;
		}

		const fetchSuggestions = async () => {
			const startIndex = (currentPage - 1) * booksPerPage;
			setLoading(true);
			setError(null);
			try {
				const response = await fetch(
					`https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=${booksPerPage}&fields=items(id,volumeInfo(title,authors,imageLinks/thumbnail)),totalItems`
				);
				const data = await response.json();
				setBooks(data.items || []);
			} catch (err) {
				setError("Error fetching suggestions.");
				console.error("Error fetching search suggestions:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchSuggestions();
	}, [query, currentPage, booksPerPage]);
	return { books, loading, error };
};

export default SearchSuggestions;
