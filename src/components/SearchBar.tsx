import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTimes, FaSearch } from "react-icons/fa";
import { useToggleContext } from "../context/ToggleContext";

const SearchBar = () => {
	const { isToggled } = useToggleContext();
	const [query, setQuery] = useState("");
	const [suggestions, setSuggestions] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	// Fetch suggestions only if the query has a minimum of 2 valid characters
	const fetchSuggestions = async (searchQuery: string) => {
		if (searchQuery.length < 2) {
			setSuggestions([]);
			return;
		}

		setLoading(true);
		try {
			const response = await fetch(
				`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&maxResults=5&langRestrict=en`
			);
			const data = await response.json();
			setSuggestions(data.items || []);
		} catch (error) {
			console.error("Error fetching search suggestions:", error);
		} finally {
			setLoading(false);
		}
	};

	// Handle changes in input
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		// Remove non-alphanumeric characters (keep spaces)
		const sanitizedValue = value.replace(/[^a-zA-Z0-9 ]/g, "");
		setQuery(sanitizedValue);

		// Fetch suggestions only after sanitization and if query has a minimum length
		fetchSuggestions(sanitizedValue);
	};

	// Handle suggestion click
	const handleSuggestionClick = (bookId: string) => {
		navigate(`/book/${bookId}`);
		setQuery(""); // Clear the search query after selection
		setSuggestions([]); // Clear the suggestions
	};

	// useCallback to prevent unnecessary re-renders
	const debouncedFetchSuggestions = useCallback(
		debounce(fetchSuggestions, 500),
		[]
	);

	useEffect(() => {
		if (query.length >= 2) {
			debouncedFetchSuggestions(query);
		} else {
			setSuggestions([]);
		}
	}, [query, debouncedFetchSuggestions]);

	return (
		<>
			<div className="relative flex justify-center px-8 py-4 w-full bg-themeColor">
				{/* Search Bar */}
				<div className="w-[95%] sm:w-[50%] relative">
					<input
						type="text"
						value={query}
						onChange={handleInputChange}
						placeholder="Search for books, authors, genres..."
						className={`w-full pl-10 pr-3 py-3 shadow-md focus:outline-none focus:ring-2 focus:ring-themeColor rounded-3xl backdrop-blur-lg bg-secondary-dark/40 border border-white/20  ${
							isToggled ? "text-white" : "text-gray-900"
						}`}
					/>

					{/* Magnifying Glass Icon */}
					<FaSearch
						className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
							isToggled ? "text-white" : "text-gray-800"
						}`}
						size={20}
					/>

					{/* Clear Button */}
					{query && (
						<button
							onClick={() => setQuery("")} // Clears the input field
							className={`absolute right-3 top-1/2 transform -translate-y-1/2
          ${
				isToggled
					? "text-white hover:text-gray-400"
					: "text-gray-500 hover:text-gray-700"
			}
        `}
						>
							<FaTimes size={20} />
						</button>
					)}
				</div>

				{/* Suggestions Dropdown */}
				{suggestions.length > 0 && (
					<ul
						className={`absolute top-[85%] w-[95%] sm:w-[45%] left-1/2 transform -translate-x-1/2 ${
							isToggled
								? "bg-primary-dark text-text-dark "
								: "bg-primary-light text-text-light"
						} shadow-lg z-10 rounded-lg`}
					>
						{loading ? (
							<li className="p-2 text-gray-500">Loading...</li>
						) : (
							suggestions.map((book: any) => (
								<li
									key={book.id}
									className={`p-2 cursor-pointer hover:bg-gray-200 border-b border-gray-200
										${isToggled ? "hover:bg-gray-600" : "hover:bg-gray-200"}`}
									onClick={() =>
										handleSuggestionClick(book.id)
									}
								>
									{book.volumeInfo.title}
								</li>
							))
						)}
						<Link
							to={`search/${query}`}
							className={`p-2 bg-themeColor text-center font-serif text-white rounded-md w-full block border-b border-gray-200 hover:bg-secondary-dark`}
						>
							See More Results →
						</Link>
					</ul>
				)}
			</div>
		</>
	);
};

// Helper function to debounce the API calls
const debounce = (func: Function, delay: number) => {
	let timer: number;
	return (...args: any[]) => {
		clearTimeout(timer);
		timer = window.setTimeout(() => func(...args), delay); // Use window.setTimeout
	};
};
export default SearchBar;
