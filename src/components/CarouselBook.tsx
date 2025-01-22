import { Link } from "react-router-dom";
import { Book } from "../types";
import placeholder from "../assets/images/book-placeholder.png";

interface CarouselBookProps {
	book: Book;
}
const CarouselBook: React.FC<CarouselBookProps> = ({ book }) => {
	// Function to truncate title to 3 words
	const truncateTitle = (title: string) => {
		const words = title.split(" ");
		return words.slice(0, 3).join(" ") + (words.length > 3 ? "..." : "");
	};

	return (
		<div key={book.id} className="carousel-item p-4">
			<div className="flex flex-col items-center justify-center group">
				<Link to={`/book/${book.id}`}>
					<img
						src={
							book.volumeInfo.imageLinks?.thumbnail || placeholder
						}
						alt={book.volumeInfo.title}
						className="w-[180px] h-[270px] object-contain transition-all duration-300 transform group-hover:scale-105" // Adjust image size and add zoom effect on hover
					/>
				</Link>
				<Link to={`/book/${book.id}`}>
					<h4 className="text-sm text-center mt-2 truncate">
						{truncateTitle(book.volumeInfo.title)}
					</h4>
				</Link>
			</div>
		</div>
	);
};
export default CarouselBook;
