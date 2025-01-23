import Slider from "react-slick";
import { Book } from "../types"; // Define your Book type elsewhere if you have a custom type
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import CarouselBook from "./CarouselBook";
import Skeleton from "react-loading-skeleton";

interface CarouselProps {
	title: string;
	books: Book[];
	categoryLink?: string;
	isLoading: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
	title,
	books,
	categoryLink,
	isLoading,
}) => {
	const settings = {
		dots: false, // Disable dots for a more streamlined look
		infinite: true,
		speed: 500,
		slidesToShow: 3, // Show 6 books at once, adjust as needed
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2, // Show 3 books on tablet screens
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1, // Show 1 book on smaller screens
					slidesToScroll: 1,
				},
			},
		],
	};

	const renderSkeletons = () => {
		return (
			<div className="carousel-item p-4">
				<div className="flex">
					<Skeleton width={120} height={180} />
					<div className="flex flex-col ml-4">
						<Skeleton width={180} height={20} />
						<Skeleton width={180} height={20} />
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className="carousel-container mt-8 w-[90%] mx-auto py-4">
			{/* Title and View All Button */}
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-2xl font-semibold">{title}</h2>
				{categoryLink && (
					<Link
						to={categoryLink}
						className=" bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold mr-2 mb-2 cursor-pointer hover:bg-blue-200 transition ease-in-out duration-300"
					>
						View All
					</Link>
				)}
			</div>

			{/* Carousel with books */}
			<Slider {...settings}>
				{isLoading
					? Array(6)
							.fill(null)
							.map((_, index) => renderSkeletons()) // Show skeleton for each book
					: books?.map((book) => (
							<CarouselBook key={book.id} book={book} />
					  ))}
			</Slider>
		</div>
	);
};

export default Carousel;
