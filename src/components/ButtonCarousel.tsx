import { categoryConfig, Category } from "../utils/categories";
import Slider from "react-slick";
import { useToggleContext } from "../context/ToggleContext";

interface ChildComponentProps {
	setBookCategory: React.Dispatch<React.SetStateAction<Category>>; // Expect setBookCategory function
}
const ButtonCarousel: React.FC<ChildComponentProps> = ({ setBookCategory }) => {
	const { isToggled } = useToggleContext();

	const settings = {
		dots: false, // Disable dots for a more streamlined look
		infinite: true,
		speed: 500,
		slidesToShow: 6,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3, // Show 3 books on tablet screens
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2, // Show 1 book on smaller screens
					slidesToScroll: 1,
				},
			},
		],
	};

	const handleCategoryChange = (newCategory: Category) => {
		setBookCategory(newCategory); // Call setBookCategory to update the state
	};

	return (
		<>
			<div className="carousel-container mt-8 w-[90%] mx-auto">
				<Slider {...settings}>
					{categoryConfig.map((category, index) => {
						return (
							<div className="text-center p-2">
								<button
									onClick={() => {
										handleCategoryChange(category);
									}}
									key={index}
									className={`
                                        py-2 rounded-md w-full
                                        transition-all
                                        focus:outline-none
                                        ${
											isToggled
												? "bg-gray-800 text-white hover:bg-gray-700"
												: "bg-white text-gray-800 hover:bg-gray-200 hover:text-gray-900"
										}
                                      `}
								>
									{category.title}
								</button>
							</div>
						);
					})}
				</Slider>
			</div>
		</>
	);
};
export default ButtonCarousel;
