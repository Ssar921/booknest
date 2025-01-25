import { Book } from "../types";
import placeholder from "../assets/images/book-placeholder.jpg";
import { useToggleContext } from "../context/ToggleContext";
import { Link } from "react-router-dom";
interface BookProps {
	book: Book;
}

const BookResult: React.FC<BookProps> = ({ book }) => {
	const { isToggled } = useToggleContext();
	const truncateTitle = (title: string) => {
		const words = title.split(" ");
		return words.slice(0, 3).join(" ") + (words.length > 3 ? "..." : "");
	};

	return (
		<Link
			to={`/book/${book.id}`}
			className="w-[45%] sm:w-[20%] min-w-200px h-[250px] mx-2 my-4 "
		>
			<div
				className={`flex flex-col w-full h-full items-start rounded-lg justify-between text-center shadow-lg overflow-hidden transform group transition-transform duration-300 ${
					isToggled
						? "bg-gray-800 text-white"
						: "bg-white text-gray-900"
				} hover:shadow-none`}
			>
				{/* Book Image */}
				<div className="relative w-full h-[60%]">
					<img
						src={
							book.volumeInfo.imageLinks?.thumbnail || placeholder
						}
						alt={book.volumeInfo.title}
						className="w-full h-full object-cover rounded-t-lg transition-all duration-300 transform group-hover:scale-105"
					/>
				</div>
				{/* Book Information (Title & Author) */}
				<div className="px-4 py-3 w-full flex flex-col justify-between">
					{/* Author(s) */}
					<p className="text-sm text-gray-600 text-left truncate">
						{book.volumeInfo.authors
							? book.volumeInfo.authors.join(", ")
							: "Unknown Author"}
					</p>
					{/* Title */}
					<h4 className="text-lg font-semibold text-left my-2 truncate font-serif">
						{truncateTitle(book.volumeInfo.title)}
					</h4>
				</div>
			</div>
		</Link>
	);
};
export default BookResult;
