import React, { useState } from "react";
import Hero from "./Hero";
import SearchBar from "./SearchBar";
import BookFilters from "./BookFilters";
import Books from "./Books";
const HomePage2: React.FC = () => {
	const [darkMode] = useState(false);

	return (
		<div
			className={
				darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
			}
		>
			<Hero />
			<SearchBar />
			<BookFilters />
			<Books />
		</div>
	);
};

export default HomePage2;
