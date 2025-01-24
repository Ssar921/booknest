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
		<div
			className={`flex flex-col sm:w-[22%] w-[45%] items-start rounded-lg justify-between text-center mx-2 my-4 border border-gray-300 shadow-lg overflow-hidden transform group transition-transform duration-300 ${
				isToggled ? "bg-gray-800 text-white" : "bg-white text-gray-900"
			}`}
		>
			{/* Book Image */}
			<div className="relative w-full h-[220px]">
				<img
					src={book.volumeInfo.imageLinks?.thumbnail || placeholder}
					alt={book.volumeInfo.title}
					className="w-full h-full object-cover rounded-t-lg transition-all duration-300 transform group-hover:scale-105"
				/>
			</div>

			{/* Book Information (Title & Author) */}
			<div className="px-4 py-3 w-full flex flex-col justify-between">
				{/* Title */}
				<h4 className="text-lg font-semibold text-left mb-2 truncate">
					{truncateTitle(book.volumeInfo.title)}
				</h4>

				{/* Author(s) */}
				<p className="text-sm text-gray-600 text-left truncate">
					{book.volumeInfo.authors
						? book.volumeInfo.authors.join(", ")
						: "Unknown Author"}
				</p>
			</div>

			{/* View Details Button */}
			<Link
				to={`/book/${book.id}`}
				className={`text-xs font-semibold rounded-md py-2 px-4 mt-3 block w-full text-center transition ease-in-out duration-300 ${
					isToggled
						? "bg-blue-300 hover:bg-blue-400 text-white"
						: "bg-gray-300 hover:bg-gray-400 text-gray-800"
				}`}
			>
				View Details
			</Link>
		</div>
	);
};
export default BookResult;
