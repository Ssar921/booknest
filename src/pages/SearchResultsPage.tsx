import useSearchSuggestions from "../hooks/useSearchSuggestions";
import { useParams, Link } from "react-router-dom";
import { useToggleContext } from "../context/ToggleContext";
import { GrFormPrevious } from "react-icons/gr";
import Skeleton from "react-loading-skeleton";
import BookResult from "../components/BookResult";

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
			<div className="bg-themeColor flex justify-between pb-4 px-6 text-white">
				<div className="w-1/3">
					<Link
						to="/"
						className="font-bold text-3xl hover:text-secondary-dark"
					>
						<GrFormPrevious />
					</Link>
				</div>
				<h1 className="text-3xl font-bold font-serif text-center w-1/3 text-secondary-dark">
					Search results for:{" "}
					<b className="text-secondary-light">{searchQuery}</b>
				</h1>
				<div className="w-1/3"></div>
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
