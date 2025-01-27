import CarouselBook from "./CarouselBook";
import { Book } from "../types";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

interface BookGridProps {
	title: string;
	books: Book[];
	categoryLink?: string;
	isLoading: boolean;
}

const BookGrid: React.FC<BookGridProps> = ({
	title,
	books,
	categoryLink,
	isLoading,
}) => {
	const renderSkeletons = (index: number) => {
		return (
			<div className="carousel-item p-4" key={index}>
				<div className="flex items-center">
					<Skeleton width={75} height={90} />
					<div className="flex flex-col ml-4">
						<Skeleton width={180} height={20} />
						<Skeleton width={180} height={20} />
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className="carousel-container mt-8 w-[90%] mx-auto py-4 relative">
			{/* Title and View All Button */}
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-2xl font-bold font-serif">{title}</h2>
				{categoryLink && (
					<Link
						to={categoryLink}
						className=" bg-themeColor text-secondary-light px-3 py-1 rounded-full text-xs font-semibold mr-2 mb-2 cursor-pointer hover:bg-secondary-dark transition ease-in-out duration-300"
					>
						View All
					</Link>
				)}
			</div>

			{/* Carousel with books */}
			<div className="flex justify-center w-90% flex-wrap mb-10">
				{isLoading
					? Array(6)
							.fill(null)
							.map((_, index) => renderSkeletons(index)) // Show skeleton for each book
					: books?.map((book) => (
							<CarouselBook key={book.id} book={book} />
					  ))}
			</div>
		</div>
	);
};
export default BookGrid;
