import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Book } from "../types"; // Assuming you have the Book type defined
import Pagination from "../components/Pagination"; // A separate Pagination component
import Skeleton from "react-loading-skeleton";
import { categoryConfig } from "../utils/categories";
import { Link } from "react-router-dom";
import { useToggleContext } from "../context/ToggleContext";

import BookResult from "../components/BookResult";
const CategoryPage: React.FC = () => {
	const { isToggled } = useToggleContext();

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
					`https://www.googleapis.com/books/v1/volumes?q=subject:${categoryId}&startIndex=${startIndex}&maxResults=${booksPerPage}&fields=items(id,volumeInfo(title,authors,imageLinks/thumbnail)),totalItems`
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
	const category = categoryConfig.find((cat) => cat.query === categoryId);
	const categoryTitle = category ? category.title : categoryId;
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
		<div
			className={`category-page w-full px-6 mx-auto py-8 ${
				isToggled ? "bg-gray-900 text-white" : "bg-white"
			}`}
		>
			<div className="mb-4">
				<Link
					to="/"
					className={`${
						isToggled
							? "text-blue-300 hover:text-blue-400"
							: "text-blue-600 hover:text-blue-800"
					} text-lg font-semibold`}
				>
					&larr; Back to Home
				</Link>
			</div>
			<h1
				className={`text-3xl font-bold mb-4 ${
					isToggled ? "text-gray-300" : "text-gray-900"
				}`}
			>
				{categoryTitle} Books
			</h1>

			{loading ? (
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
					{Array(booksPerPage)
						.fill(null)
						.map((_) => renderSkeletons())}
				</div>
			) : (
				<div className="flex justify-center flex-wrap">
					{books.map((book) => (
						<BookResult book={book} key={book.id} />
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
