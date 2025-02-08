import { useState } from "react";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import CarouselBook from "../components/CarouselBook";
import SearchSuggestions from "../hooks/SearchSuggestions";
import { useToggleContext } from "../context/ToggleContext";

const SearchResultsPage: React.FC = () => {
	const { isToggled } = useToggleContext();
	const { query } = useParams<{ query: string }>();
	const [currentPage, setCurrentPage] = useState(1);
	const booksPerPage = 16;

	// Provide a fallback for query if undefined
	const searchQuery = query || ""; // Default to empty string if query is undefined

	const { books, totalBooks, loading, error } = SearchSuggestions(
		searchQuery,
		currentPage,
		booksPerPage
	);

	const totalPages = Math.ceil(totalBooks / booksPerPage);

	const renderSkeletons = () => {
		return Array(booksPerPage)
			.fill(null)
			.map((_, index) => (
				<div className="carousel-item p-4" key={index}>
					<div className="flex flex-col items-center justify-center">
						<Skeleton width={250} height={270} />
						<Skeleton width={250} height={20} />
					</div>
				</div>
			));
	};

	return (
		<div
			className={`w-full mx-auto pb-10 ${
				isToggled
					? "bg-background-dark text-text-dark"
					: "bg-background-light text-text-light"
			}`}
		>
			<div className="bg-themeColor flex flex-col justify-center pb-4 px-6 text-white">
				<h1 className="text-3xl font-bold font-serif text-center mx-auto text-secondary-dark">
					Search results for:{" "}
					<b className="text-secondary-light">{searchQuery}</b>
				</h1>
				<SearchBar />
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
						<CarouselBook book={book} key={book.id} />
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
export default SearchResultsPage;
