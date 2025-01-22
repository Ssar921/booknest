import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Book } from "../types"; // Assuming you have the Book type defined
import Pagination from "../components/Pagination"; // A separate Pagination component
import CarouselBook from "../components/CarouselBook";
import Skeleton from "react-loading-skeleton";

const CategoryPage: React.FC = () => {
	const { categoryId } = useParams<{ categoryId: string }>(); // Get categoryId from URL
	const [books, setBooks] = useState<Book[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalBooks, setTotalBooks] = useState(0); // Total number of books in the category
	const [loading, setLoading] = useState(true);

	// Google Books API pagination parameters
	const booksPerPage = 15;

	useEffect(() => {
		const fetchBooks = async () => {
			setLoading(true);
			try {
				const startIndex = (currentPage - 1) * booksPerPage; // Calculate the startIndex for pagination
				const response = await fetch(
					`https://www.googleapis.com/books/v1/volumes?q=subject:${categoryId}&startIndex=${startIndex}&maxResults=${booksPerPage}&fields=items(id,volumeInfo(title,imageLinks/thumbnail)),totalItems`
				);
				const data = await response.json();

				// Update the state with the books and total number of books
				setBooks(data.items || []);
				setTotalBooks(data.totalItems);
			} catch (error) {
				console.error("Error fetching books:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchBooks();
	}, [categoryId, currentPage]);

	// Calculate the total number of pages based on total books and books per page
	const totalPages = Math.ceil(totalBooks / booksPerPage);

	const renderSkeletons = () => {
		return (
			<div className="carousel-item p-4">
				<div className="flex flex-col items-center justify-center">
					<Skeleton width={180} height={270} />
					<Skeleton width={180} height={20} />
				</div>
			</div>
		);
	};

	return (
		<div className="category-page w-[90%] mx-auto my-8">
			<h1 className="text-3xl font-bold mb-4">Books in {categoryId}</h1>

			{loading ? (
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
					{Array(booksPerPage)
						.fill(null)
						.map((_, index) => renderSkeletons())}
				</div>
			) : (
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
					{books.map((book) => (
						<CarouselBook book={book} />
					))}
				</div>
			)}

			{/* Pagination */}
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={(page) => setCurrentPage(page)}
			/>
		</div>
	);
};

export default CategoryPage;
