import { useEffect, useState } from "react";
import { Book } from "../types";
import Carousel from "./Carousel";

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

	useEffect(() => {
		const fetchBooks = async () => {
			try {
				// Make a GET request using the fetch API
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
				setLoading(false);
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
