import React, { useEffect, useState } from "react";
import Book from "./Book";

// Define the interface for a book object from Google Books API
interface GoogleBooksAPIResponse {
	kind: string;
	totalItems: number;
	items: Array<{
		id: string;
		volumeInfo: {
			title: string;
			authors: string[];
			imageLinks?: {
				thumbnail: string;
			};
		};
	}>;
}

const Books: React.FC = () => {
	// Initialize books as an empty array to avoid undefined issues
	const [books, setBooks] = useState<GoogleBooksAPIResponse["items"]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchBooks = async () => {
			try {
				setLoading(true);
				const response = await fetch(
					"https://www.googleapis.com/books/v1/volumes?q=book&orderBy=relevance"
				);
				const data: GoogleBooksAPIResponse = await response.json();

				// Check if data.items exists and set books to the response data
				if (data.items) {
					setBooks(data.items);
				} else {
					setError("No books found");
				}
			} catch (err) {
				setError("Failed to fetch books");
			} finally {
				setLoading(false);
			}
		};

		fetchBooks();
	}, []);

	// Display loading text or error message
	if (loading) {
		return (
			<div className="text-center py-4">
				<p>Loading books...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="text-center py-4">
				<p>{error}</p>
			</div>
		);
	}

	return (
		<>
			{/* Books Grid */}
			<section className="px-8 py-2">
				<h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
					Featured Books
				</h2>
				<div className="flex justify-center flex-wrap">
					{books.length > 0 ? (
						books.map((book) => <Book key={book.id} book={book} />)
					) : (
						<p>No books available.</p>
					)}
				</div>
			</section>
		</>
	);
};

export default Books;
