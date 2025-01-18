const BookFilters: React.FC = () => {
	return (
		<>
			{/* Filters */}
			<section className="p-2">
				<div className="flex justify-center sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0">
					<div>
						<label className="block mb-2 text-sm sm:text-base">
							Genre
						</label>
						<select className="p-2 border-2 border-gray-300 rounded-md">
							<option>All Genres</option>
							<option>Fiction</option>
							<option>Non-Fiction</option>
							<option>Science Fiction</option>
							<option>Fantasy</option>
						</select>
					</div>
					<div>
						<label className="block mb-2 text-sm sm:text-base">
							Price Range
						</label>
						<select className="p-2 border-2 border-gray-300 rounded-md">
							<option>All Prices</option>
							<option>$0 - $10</option>
							<option>$10 - $20</option>
							<option>$20+</option>
						</select>
					</div>
					<div>
						<label className="block mb-2 text-sm sm:text-base">
							Sort By
						</label>
						<select className="p-2 border-2 border-gray-300 rounded-md">
							<option>Relevance</option>
							<option>Newest</option>
							<option>Price</option>
						</select>
					</div>
				</div>
			</section>
		</>
	);
};
export default BookFilters;
