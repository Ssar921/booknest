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
			className={`flex flex-col sm:w-[22%] w-[45%] items-center rounded-lg justify-center text-center mx-1 my-3 border border-black ${
				isToggled ? "text-white" : "text-gray-900"
			}`}
		>
			<img
				src={book.volumeInfo.imageLinks?.thumbnail || placeholder}
				alt={book.volumeInfo.title}
				className="w-[120px] h-[180px] mr-1 object-cover rounded-lg transition-all duration-300 transform group-hover:scale-105"
			/>

			<h4 className="text-lg font-semibold mt-1 w-[calc(100% - 140px)]">
				{truncateTitle(book.volumeInfo.title)}
			</h4>
			<Link
				to={`/book/${book.id}`}
				className={`text-blue-800 px-3 rounded-md py-1 text-xs font-semibold cursor-pointer hover:bg-gray-500 transition ease-in-out duration-300 w-full ${
					isToggled
						? "bg-gray-800 text-white"
						: "bg-gray-300 text-black"
				}`}
			>
				View Details
			</Link>
		</div>
	);
};
export default BookResult;
