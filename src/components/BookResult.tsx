import { Book } from "../types";
import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";
import { useToggleContext } from "../context/ToggleContext";
import placeholder from "../assets/images/book-placeholder.jpg";

interface BookProps {
	book: Book;
}

const BookResult: React.FC<BookProps> = ({ book }) => {
	const { isToggled } = useToggleContext();
	// Shorten Title
	const truncateTitle = (title: string) => {
		const words = title.split(" ");
		return words.slice(0, 3).join(" ") + (words.length > 3 ? "..." : "");
	};

	return (
		<div
			className={`flex-col w-[45%] sm:w-[15%] min-w-[250px] shadow-lg h-[280px] sm:m-8 mx-2 my-4 rounded-t-lg ${
				isToggled
					? " bg-primary-dark text-text-dark shadow-lg shadow-black"
					: " bg-primary-light text-text-light shadow-lg shadow-gray-400"
			}  hover:shadow-none`}
		>
			<Link to={`/book/${book.id}`}>
				<div className="flex flex-col w-full h-[90%] items-start justify-between text-center overflow-hidden transform group transition-transform duration-300">
					{/* Book Image */}
					<div className="relative w-full h-[60%]">
						<img
							src={
								book.volumeInfo.imageLinks?.thumbnail ||
								placeholder
							}
							alt={book.volumeInfo.title}
							className="w-full h-full object-cover rounded-t-lg transition-all duration-300 transform group-hover:scale-105"
						/>
					</div>
					{/* Book Information (Title & Author) */}
					<div className="px-4 py-3 w-full flex flex-col justify-between">
						{/* Author(s) */}
						<p className="text-sm text-secondary-dark font-semibold text-left truncate">
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
			<FavoriteButton bookId={book?.id} page="carousel" />
		</div>
	);
};
export default BookResult;
