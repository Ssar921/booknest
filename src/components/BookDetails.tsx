import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To get the book ID from the URL
import { useToggleContext } from "../context/ToggleContext"; // Importing the context

interface BookDetailsProps {
	book: {
		id: string;
		volumeInfo: {
			title: string;
			authors: string[];
			description: string;
			publishedDate: string;
			publisher: string;
			pageCount: number;
			imageLinks?: {
				thumbnail: string;
			};
			categories?: string[];
			previewLink?: string;
		};
	};
}

const BookDetails: React.FC = () => {
	const { id } = useParams(); // Get book ID from URL
	const [book, setBook] = useState<BookDetailsProps["book"] | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	// Accessing dark mode state
	const { isToggled } = useToggleContext();

	useEffect(() => {
		const fetchBookDetails = async () => {
			try {
				setLoading(true);
				const response = await fetch(
					`https://www.googleapis.com/books/v1/volumes/${id}`
				);
				const data = await response.json();
				setBook(data);
			} catch (err) {
				setError("Failed to fetch book details");
			} finally {
				setLoading(false);
			}
		};

		if (id) {
			fetchBookDetails();
		}
	}, [id]);

	if (loading) {
		return (
			<div className="text-center py-4">
				<p>Loading book details...</p>
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

	if (!book) {
		return (
			<div className="text-center py-4">
				<p>Book not found.</p>
			</div>
		);
	}

	const {
		title,
		authors,
		description,
		publishedDate,
		publisher,
		pageCount,
		imageLinks,
		categories,
		previewLink,
	} = book.volumeInfo;

	return (
		<div
			className={`max-w-4xl mx-auto px-4 py-8 ${
				isToggled ? "dark:bg-gray-800 dark:text-white" : ""
			}`} // Apply dark mode styling based on isToggled
			style={{ transition: "all 0.3s ease" }}
		>
			<div className="flex flex-col sm:flex-row items-center">
				{/* Image */}
				<img
					src={
						imageLinks?.thumbnail ||
						"https://via.placeholder.com/200x300"
					}
					alt={title}
					className="w-48 h-72 object-contain mb-4 sm:mb-0 sm:mr-8"
				/>
				{/* Book details */}
				<div>
					<h1 className="text-3xl font-bold mb-2">{title}</h1>
					<p className="text-lg text-gray-600 mb-2">
						<strong>Authors:</strong> {authors?.join(", ")}
					</p>
					<p className="text-sm text-gray-500 mb-4">
						<strong>Published:</strong> {publishedDate}
					</p>
					{categories && (
						<p className="text-sm text-gray-600 mb-4">
							<strong>Categories:</strong> {categories.join(", ")}
						</p>
					)}
					{publisher && (
						<p className="text-sm text-gray-600 mb-4">
							<strong>Publisher:</strong> {publisher}
						</p>
					)}
					{pageCount && (
						<p className="text-sm text-gray-600 mb-4">
							<strong>Page Count:</strong> {pageCount}
						</p>
					)}
					<div className="mb-4">
						<strong>Description:</strong>
						<p className="text-sm">
							{description || "No description available."}
						</p>
					</div>
					{previewLink && (
						<a
							href={previewLink}
							target="_blank"
							rel="noopener noreferrer"
							className="mt-4 inline-block text-blue-500 hover:underline"
						>
							Preview this Book
						</a>
					)}
				</div>
			</div>
		</div>
	);
};

export default BookDetails;
