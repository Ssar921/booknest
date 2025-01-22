import { useEffect, useState } from "react";
import { Book } from "../types";
import Carousel from "./Carousel";
import { toast } from "react-toastify"; // Import toast from react-toastify

interface CategoryCarouselProps {
	categoryTitle: string;
	query: string;
	categoryLink: string;
}

const CategoryCarousel: React.FC<CategoryCarouselProps> = ({
	categoryTitle,
	query,
	categoryLink,
}) => {
	const [books, setBooks] = useState<Book[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchBooks = async () => {
			try {
				const response = await fetch(
					`https://www.googleapis.com/books/v1/volumes?q=${query}&orderBy=relevance&fields=items(id,volumeInfo(title,imageLinks/thumbnail))`
				);

				if (!response.ok) {
					throw new Error("Network response was not ok");
				}

				const data = await response.json();
				setBooks(data.items);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching books:", error);
				setError(
					"Something went wrong while fetching books. Please try again later."
				);
				setLoading(false);
				// Show a toast notification for the error
				toast.error("Failed to fetch books. Please try again later.");
			}
		};

		fetchBooks();
	}, [query]);

	if (loading) {
		return (
			<Carousel
				title={categoryTitle}
				books={Array(10).fill(null)} // Render 10 skeletons as placeholders
				categoryLink={categoryLink}
				isLoading={loading}
			/>
		);
	}

	if (error) {
		return (
			<div className="error-message">
				<h2>{categoryTitle}</h2>
				<p>{error}</p>
			</div>
		);
	}

	return (
		<Carousel
			title={categoryTitle}
			books={books}
			categoryLink={categoryLink}
			isLoading={loading}
		/>
	);
};

export default CategoryCarousel;
