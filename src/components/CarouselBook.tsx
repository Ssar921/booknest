import { Link } from "react-router-dom";
import { Book } from "../types";
import placeholder from "../assets/images/book-placeholder.jpg";
import { useToggleContext } from "../context/ToggleContext";
interface CarouselBookProps {
	book: Book;
}
const CarouselBook: React.FC<CarouselBookProps> = ({ book }) => {
	const { isToggled } = useToggleContext();
	const truncateTitle = (title: string) => {
		const words = title.split(" ");
		return words.slice(0, 3).join(" ") + (words.length > 3 ? " ..." : "");
	};

	return (
		<Link
			to={`/book/${book.id}`}
			className="w-full sm:w-[21vw] min-w-[250px] m-2"
		>
			<div
				className={`carousel-item w-full p-2 rounded-lg transition-all duration-300
				${
					isToggled
						? " bg-primary-dark text-text-dark shadow-md shadow-black"
						: " bg-primary-light text-text-light shadow-md shadow-gray-400"
				} 
				hover:shadow-none`}
			>
				<div className="flex">
					{/* <!-- Image Section --> */}
					<div className="flex-shrink-0 w-[75px] h-[90px] mr-4">
						<img
							src={
								book.volumeInfo.imageLinks?.thumbnail ||
								placeholder
							}
							alt={book.volumeInfo.title}
							className="w-full h-full object-cover rounded-lg transition-all duration-300 transform group-hover:scale-105"
						/>
					</div>

					{/* <!-- Info Section --> */}
					<div className="flex flex-col justify-between items-start">
						<small className="text-secondary-dark font-semibold">
							{book.volumeInfo.publishedDate &&
								book.volumeInfo.publishedDate.split("-")[0]}
						</small>
						{/* <!-- Title --> */}
						<h4 className="text-lg w-full font-semibold mt-1 font-serif">
							{truncateTitle(book.volumeInfo.title)}
						</h4>

						{/* <!-- Author and Year --> */}
						<p
							className={`text-sm mt-1 ${
								isToggled ? "text-gray-400" : "text-gray-700"
							}`}
						>
							{book.volumeInfo.authors &&
							book.volumeInfo.authors.length > 1
								? `${book.volumeInfo.authors[0]} + ${
										book.volumeInfo.authors.length - 1
								  } more`
								: book.volumeInfo.authors?.[0]?.slice(0, 20) ||
								  ""}
						</p>
					</div>
				</div>
			</div>
		</Link>
	);
};
export default CarouselBook;
