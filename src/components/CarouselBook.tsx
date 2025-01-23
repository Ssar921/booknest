import { Link } from "react-router-dom";
import { Book } from "../types";
import placeholder from "../assets/images/book-placeholder.png";
import { useToggleContext } from "../context/ToggleContext";
interface CarouselBookProps {
	book: Book;
}
const CarouselBook: React.FC<CarouselBookProps> = ({ book }) => {
	const { isToggled } = useToggleContext();
	return (
		<div
			key={book.id}
			className={`carousel-item p-2 m-2 rounded-lg transition-all duration-300
				${
					isToggled
						? "border-gray-700 bg-gray-800 text-white shadow-md shadow-gray-600"
						: "border-gray-300 bg-white text-gray-900 shadow-md shadow-gray-400"
				} 
				hover:shadow-none`}
		>
			<div className="flex">
				{/* <!-- Image Section --> */}
				<div className="flex-shrink-0 w-[120px] h-[180px] mr-4">
					<Link to={`/book/${book.id}`}>
						<img
							src={
								book.volumeInfo.imageLinks?.thumbnail ||
								placeholder
							}
							alt={book.volumeInfo.title}
							className="w-full h-full object-cover rounded-lg transition-all duration-300 transform group-hover:scale-105"
						/>
					</Link>
				</div>

				{/* <!-- Info Section --> */}
				<div className="flex flex-col justify-between items-start">
					{/* <!-- Title --> */}
					<h4 className="text-lg w-full font-semibold mt-1">
						{book.volumeInfo.title}
					</h4>

					{/* <!-- Author and Year --> */}
					<p
						className={`text-sm mt-1 ${
							isToggled ? "text-gray-400" : "text-gray-700"
						}`}
					>
						{book.volumeInfo.authors?.join(", ") || ""}
					</p>

					{/* <!-- CTA Button --> */}
					<Link
						to={`/book/${book.id}`}
						className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-all duration-300"
					>
						View Details
					</Link>
				</div>
			</div>
		</div>
	);
};
export default CarouselBook;
