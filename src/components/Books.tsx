import Book from "./Book";

const Books: React.FC = () => {
	return (
		<>
			{/* Books Grid */}
			<section className="px-8 py-2">
				<h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
					Featured Books
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
					{Array.from({ length: 8 }).map((_, idx) => (
						<Book key={idx} book={idx} />
					))}
				</div>
			</section>
		</>
	);
};

export default Books;
