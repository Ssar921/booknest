import { useState, useEffect } from "react";
import { categoryConfig } from "../utils/categories";
import { useParams, useNavigate } from "react-router-dom";
import useFetchCategoryBooks from "../hooks/FetchCategoryBooks";
import BookResults from "../components/BookResults";
import Pagination from "../components/Pagination";

const CategoryPage: React.FC = () => {
	const navigate = useNavigate();
	const { categoryId } = useParams<{ categoryId: string }>();

	const [currentPage, setCurrentPage] = useState(1);
	const booksPerPage = 16;

	// Redirect if no categoryId is found or if the category doesn't exist
	useEffect(() => {
		if (
			!categoryId ||
			!categoryConfig.some((cat) => cat.query === categoryId)
		) {
			navigate("/404"); // Redirect to 404 page
		}
	}, [categoryId, navigate]);

	// Use the custom hook to get books
	const { books, totalBooks, loading, error } = useFetchCategoryBooks(
		categoryId || "",
		currentPage,
		booksPerPage
	);
	const totalPages = Math.ceil(totalBooks / booksPerPage);
	const category = categoryConfig.find((cat) => cat.query === categoryId);
	const categoryTitle = category ? category.title : categoryId;

	return (
		<>
			<BookResults
				booksPerPage={16}
				title={`${categoryTitle} Books`}
				loading={loading}
				error={error}
				books={books}
			/>
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={setCurrentPage}
			/>
		</>
	);
};

export default CategoryPage;
