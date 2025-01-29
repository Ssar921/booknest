import Slider from "react-slick";
import { Book } from "../types";
import CarouselBook from "./CarouselBook";
import Skeleton from "react-loading-skeleton";
import CustomArrow from "./CustomArrow";

interface ProfileCarouselProps {
	books: Book[];
	isLoading: boolean;
}

const ProfileCarousel: React.FC<ProfileCarouselProps> = ({
	books,
	isLoading,
}) => {
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		prevArrow: <CustomArrow direction="prev" onClick={() => {}} />,
		nextArrow: <CustomArrow direction="next" onClick={() => {}} />,
		centerMode: true,
		centerPadding: "20px",
	};

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
		<div className="carousel-container mt-2 w-full mx-auto py-2 relative sm:w-[25vw] min-w-[250px]">
			{/* Title and View All Button */}
			<h2 className="text-2xl font-bold font-serif text-center">
				Your Favorites
			</h2>

			{/* ProfileCarousel with books */}
			<Slider {...settings}>
				{isLoading
					? Array(1)
							.fill(null)
							.map((_, index) => renderSkeletons(index)) // Show skeleton for each book
					: books?.map((book) => (
							<div key={book.id}>
								<CarouselBook book={book} />
							</div>
					  ))}
			</Slider>
		</div>
	);
};

export default ProfileCarousel;
