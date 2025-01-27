import { useState, useEffect } from "react";

// Custom hook for fetching book suggestions
const useSearchSuggestions = (query: string, limit: number = 5) => {
	const [suggestions, setSuggestions] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (query.length < 2) {
			setSuggestions([]);
			return;
		}

		const fetchSuggestions = async () => {
			setLoading(true);
			setError(null);
			try {
				const response = await fetch(
					`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${limit}&langRestrict=en`
				);
				const data = await response.json();
				setSuggestions(data.items || []);
			} catch (err) {
				setError("Error fetching suggestions.");
				console.error("Error fetching search suggestions:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchSuggestions();
	}, [query, limit]);
	return { suggestions, loading, error };
};

export default useSearchSuggestions;
