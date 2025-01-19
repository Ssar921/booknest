import React from "react";
import { Link } from "react-router-dom";

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
			className="group relative rounded-lg overflow-hidden shadow-lg m-3"
		>
			<Link
				to={`/book/${book.id}`}
				className="relative z-10" // Ensure Link is above other elements
			>
				<img
					src={
						imageLinks?.thumbnail ||
						"https://via.placeholder.com/128x193"
					}
					alt={title}
					className="w-full h-full object-contain group-hover:scale-110 transition-all duration-300"
				/>
			</Link>
			<div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-all duration-300 z-0"></div>
			<div className="absolute inset-x-0 bottom-4 px-4 text-white z-0">
				<h3 className="font-bold text-lg">{title}</h3>
				<p className="mt-2 text-sm">{authors?.join(", ")}</p>
			</div>
		</div>
	);
};

export default Book;
