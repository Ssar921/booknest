// src/hooks/useFetchBooks.ts
import { useState, useEffect, useCallback } from "react";
import { Book } from "../types";
import { toast } from "react-toastify";

const useFetchBooks = (query: string) => {
	const [books, setBooks] = useState<Book[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [retryCount, setRetryCount] = useState<number>(0); // Track the number of retries

	const fetchBooks = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await fetch(
				`https://www.googleapis.com/books/v1/volumes?q=${query}&orderBy=relevance&fields=items(id,volumeInfo(title,authors,imageLinks/thumbnail))`
			);

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const data = await response.json();
			setBooks(data.items || []);
			setLoading(false);
		} catch (error) {
			console.error("Error fetching books:", error);
			setError(
				"Something went wrong while fetching books. Please try again later."
			);
			setLoading(false);
			toast.error("Failed to fetch books. Please try again later.");
		}
	}, [query]);

	useEffect(() => {
		if (query) {
			fetchBooks();
		}
	}, [query, fetchBooks]);

	// Retry logic
	const retryFetch = () => {
		setRetryCount((prevCount) => prevCount + 1);
		fetchBooks();
	};

	// Trigger fetch again when retryCount changes
	useEffect(() => {
		if (retryCount > 0) {
			fetchBooks();
		}
	}, [retryCount, fetchBooks]);

	return { books, loading, error, retryFetch };
};

export default useFetchBooks;
