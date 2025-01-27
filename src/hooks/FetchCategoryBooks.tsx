// hooks/useFetchCategoryBooks.ts

import { useState, useEffect } from "react";
import { Book } from "../types";

const FetchCategoryBooks = (
	categoryId: string,
	currentPage: number,
	booksPerPage: number
) => {
	const [books, setBooks] = useState<Book[]>([]);
	const [totalBooks, setTotalBooks] = useState(0);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchBooks = async () => {
			setLoading(true);
			setError(null);
			try {
				const startIndex = (currentPage - 1) * booksPerPage;
				const response = await fetch(
					`https://www.googleapis.com/books/v1/volumes?q=subject:${categoryId}&startIndex=${startIndex}&maxResults=${booksPerPage}&fields=items(id,volumeInfo(title,authors,imageLinks/thumbnail)),totalItems`
				);
				if (!response.ok) {
					throw new Error("Failed to fetch books");
				}
				const data = await response.json();
				setBooks(data.items || []);
				setTotalBooks(data.totalItems);
			} catch (error: any) {
				setError(error.message || "An unexpected error occurred");
			} finally {
				setLoading(false);
			}
		};

		fetchBooks();
	}, [categoryId, currentPage, booksPerPage]);

	return { books, totalBooks, loading, error };
};

export default FetchCategoryBooks;
