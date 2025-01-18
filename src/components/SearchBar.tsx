const SearchBar = () => {
	return (
		<>
			{/* Search Bar */}
			<section className="flex justify-center px-8 py-4">
				<input
					type="text"
					placeholder="Search for books, authors, genres..."
					className="w-11/12 sm:w-1/2 p-3 border-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</section>
		</>
	);
};
export default SearchBar;
