import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { categoryConfig } from "../utils/categories";
import { useToggleContext } from "../context/ToggleContext";
import Pagination from "../components/Pagination";
import Skeleton from "react-loading-skeleton";
import BookResult from "../components/BookResult";
import useFetchCategoryBooks from "../hooks/FetchCategoryBooks";

const CategoryPage: React.FC = () => {
	const { isToggled } = useToggleContext();
	const { categoryId } = useParams<{ categoryId: string }>();
	const navigate = useNavigate(); // Hook to navigate programmatically

	const [currentPage, setCurrentPage] = useState(1);
	const booksPerPage = 15;

	// Redirect if no categoryId is found or if the category doesn't exist
	useEffect(() => {
		if (
			!categoryId ||
			!categoryConfig.some((cat) => cat.query === categoryId)
		) {
			navigate("/404"); // Redirect to 404 page
		}
	}, [categoryId, navigate]);

	// Use the custom hook
	const { books, totalBooks, loading, error } = useFetchCategoryBooks(
		categoryId || "",
		currentPage,
		booksPerPage
	);

	const totalPages = Math.ceil(totalBooks / booksPerPage);
	const category = categoryConfig.find((cat) => cat.query === categoryId);
	const categoryTitle = category ? category.title : categoryId;

	const renderSkeletons = () => {
		return Array(booksPerPage)
			.fill(null)
			.map((_, index) => (
				<div className="carousel-item p-4" key={index}>
					<div className="flex flex-col items-center justify-center">
						<Skeleton width={200} height={270} />
						<Skeleton width={200} height={20} />
					</div>
				</div>
			));
	};

	return (
		<div
			className={`category-page w-full mx-auto pb-10 ${
				isToggled
					? "bg-background-dark text-text-dark"
					: "bg-background-light text-text-light"
			}`}
		>
			<div className="bg-themeColor flex justify-center pb-4 px-6 text-white">
				<h1 className="text-3xl font-bold font-serif text-center w-1/3 text-secondary-dark">
					{categoryTitle} Books
				</h1>
			</div>

			{loading ? (
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
					{renderSkeletons()}
				</div>
			) : error ? (
				<div className="text-red-500 text-center">{error}</div> // Show error if any
			) : (
				<div className="flex justify-center flex-wrap">
					{books.map((book) => (
						<BookResult book={book} key={book.id} />
					))}
				</div>
			)}

			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={setCurrentPage}
			/>
		</div>
	);
};

export default CategoryPage;
