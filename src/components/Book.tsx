interface BookProps {
	book: number;
}

const Book: React.FC<BookProps> = ({ book }) => {
	return (
		<div
			key={book}
			className="group relative rounded-lg overflow-hidden shadow-lg"
		>
			<img
				src={`https://picsum.photos/400/300?random=${book}`}
				alt="Book cover"
				className="w-full h-60 object-cover group-hover:scale-110 transition-all duration-300"
			/>
			<div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-all duration-300"></div>
			<div className="absolute inset-x-0 bottom-4 px-4 text-white">
				<h3 className="font-bold text-lg">Book Title {book + 1}</h3>
				<p className="mt-2 text-sm">Author Name</p>
			</div>
		</div>
	);
};

export default Book;
