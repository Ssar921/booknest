import { Book } from "../types";
import { Link } from "react-router-dom";
import CarouselBook from "./CarouselBook";
import Skeleton from "react-loading-skeleton";

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
	// Function to render loading skeletons
	const renderSkeletons = (index: number) => {
		return (
			<div className="p-4 flex items-center" key={index}>
				<Skeleton width="22vw" height="20vh" key={index} />
			</div>
		);
	};

	return (
		<div className="mt-1 w-[90%] mx-auto py-4 relative">
			{/* Title and View All Button */}
			<div className="flex flex-col w-full justify-center items-center mb-4">
				<h2 className="text-2xl font-bold text-center font-serif">
					{title}
				</h2>
				{categoryLink && (
					<Link
						to={categoryLink}
						className=" bg-themeColor text-secondary-light px-4 py-1 rounded-md text-md font-semibold mx-auto my-2 cursor-pointer hover:bg-secondary-dark transition ease-in-out duration-300"
					>
						View All →
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
