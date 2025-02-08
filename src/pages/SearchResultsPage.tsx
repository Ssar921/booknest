import { useState } from "react";
import { useParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import BookResults from "../components/BookResults";
import SearchSuggestions from "../hooks/SearchSuggestions";

const SearchResultsPage: React.FC = () => {
	const { query } = useParams<{ query: string }>();

	const [currentPage, setCurrentPage] = useState(1);
	const booksPerPage = 16;

	// Provide a fallback for query if undefined
	const searchQuery = query || ""; // Default to empty string if query is undefined

	const { books, loading, error } = SearchSuggestions(
		searchQuery,
		currentPage,
		booksPerPage
	);
	const totalPages = 10;

	return (
		<>
			<BookResults
				booksPerPage={16}
				title={`Showing Results For : ${searchQuery}`}
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

export default SearchResultsPage;
