interface BookProps {
	book: {
		id: string;
		volumeInfo: {
			title: string;
			authors: string[];
			imageLinks?: {
				thumbnail: string;
			};
		};
	};
}

const Book: React.FC<BookProps> = ({ book }) => {
	const { title, authors, imageLinks } = book.volumeInfo;

	return (
		<div
			key={book.id}
			className="group relative rounded-lg overflow-hidden shadow-lg"
		>
			<img
				src={
					imageLinks?.thumbnail ||
					"https://via.placeholder.com/400x300"
				}
				alt={title}
				className="w-full h-60 object-cover group-hover:scale-110 transition-all duration-300"
			/>
			<div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-all duration-300"></div>
			<div className="absolute inset-x-0 bottom-4 px-4 text-white">
				<h3 className="font-bold text-lg">{title}</h3>
				<p className="mt-2 text-sm">{authors?.join(", ")}</p>
			</div>
		</div>
	);
};

export default Book;
