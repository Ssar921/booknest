import { Book } from "../types";
import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";
import { useToggleContext } from "../context/ToggleContext";
import placeholder from "../assets/images/book-placeholder.jpg";

interface CarouselBookProps {
	book: Book;
}

const CarouselBook: React.FC<CarouselBookProps> = ({ book }) => {
	const { isToggled } = useToggleContext();
	// Shorten title
	const truncateTitle = (title: string) => {
		const words = title.split(" ");
		return words.slice(0, 3).join(" ") + (words.length > 3 ? " ..." : "");
	};

	return (
		<div
			className={`flex-col w-full sm:w-[22vw] min-w-[250px] m-2 rounded-lg hover:shadow-none ${
				isToggled
					? " bg-primary-dark text-text-dark shadow-md shadow-black"
					: " bg-primary-light text-text-light shadow-md shadow-gray-400"
			}`}
		>
			<Link to={`/book/${book.id}`}>
				<div className="w-full p-2 rounded-t-lg transition-all duration-300">
					<div className="flex">
						{/* <!-- Image Section --> */}
						<div className="flex-shrink-0 w-[75px] h-[90px] mr-4">
							<img
								src={
									book.volumeInfo.imageLinks?.thumbnail ||
									placeholder
								}
								alt={book.volumeInfo.title}
								className="w-full h-full object-cover rounded-lg"
							/>
						</div>

						{/* <!-- Info Section --> */}
						<div className="flex flex-col justify-between items-start">
							{/* Year */}
							<small className="text-secondary-dark font-semibold">
								{book.volumeInfo.publishedDate &&
									book.volumeInfo.publishedDate.split("-")[0]}
							</small>
							{/* <!-- Title --> */}
							<h4 className="text-lg w-full font-semibold mt-1 font-serif">
								{truncateTitle(book.volumeInfo.title)}
							</h4>

							{/* <!-- Author --> */}
							<p
								className={`text-sm mt-1 ${
									isToggled
										? "text-gray-400"
										: "text-gray-700"
								}`}
							>
								{book.volumeInfo.authors &&
								book.volumeInfo.authors.length > 1
									? `${book.volumeInfo.authors[0]} + ${
											book.volumeInfo.authors.length - 1
									  } more`
									: book.volumeInfo.authors?.[0]?.slice(
											0,
											20
									  ) || ""}
							</p>
						</div>
					</div>
				</div>
			</Link>
			<FavoriteButton bookId={book?.id} page="carousel" />
		</div>
	);
};
export default CarouselBook;
