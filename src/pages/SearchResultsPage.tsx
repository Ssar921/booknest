import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import SearchBar from "../components/SearchBar";
import BookResult from "../components/BookResult";
import { useToggleContext } from "../context/ToggleContext";
import useSearchSuggestions from "../hooks/useSearchSuggestions";

const SearchResultsPage: React.FC = () => {
	const { isToggled } = useToggleContext();
	const { query } = useParams<{ query: string }>();
	// Provide a fallback for query if undefined
	const searchQuery = query || ""; // Default to empty string if query is undefined

	const { suggestions, loading, error } = useSearchSuggestions(
		searchQuery,
		15
	);

	const renderSkeletons = () => {
		return Array(15)
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
					{suggestions.map((book) => (
						<BookResult book={book} key={book.id} />
					))}
				</div>
			)}
		</div>
	);
};
export default SearchResultsPage;
