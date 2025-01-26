import { categoryConfig, Category } from "../utils/categories";
import Slider from "react-slick";
import { useToggleContext } from "../context/ToggleContext";
import { useState } from "react";

interface ChildComponentProps {
	setBookCategory: React.Dispatch<React.SetStateAction<Category>>; // Expect setBookCategory function
}
const ButtonCarousel: React.FC<ChildComponentProps> = ({ setBookCategory }) => {
	const { isToggled } = useToggleContext();
	const defaultCategory =
		categoryConfig.find((category) => category.title === "Popular") ||
		categoryConfig[0]; // Fallback to the first category if not found

	const [selectedCategory, setSelectedCategory] =
		useState<Category>(defaultCategory);
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
		setSelectedCategory(newCategory);
		setBookCategory(newCategory); // Call setBookCategory to update the state
	};

	return (
		<>
			<div className="carousel-container pt-8 w-full mx-auto bg-themeColor">
				<div className="w-[85%] sm:w-[90%] mx-auto">
					<Slider {...settings}>
						{categoryConfig.map((category, index) => {
							const isActive =
								selectedCategory?.title === category.title;
							return (
								<div className="text-center p-2" key={index}>
									<button
										onClick={() => {
											handleCategoryChange(category);
										}}
										key={index}
										className={`
										py-2 w-full my-1
										transition-all
										focus:outline-none
										text-white
										${
											isActive
												? "border-b-2 border-gray-300" // Add bottom border for active state
												: "hover:border-b-2 border-white"
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
			</div>
		</>
	);
};
export default ButtonCarousel;

/* 
className={`
										py-2 rounded-md w-full
										transition-all
										focus:outline-none
										${
											isToggled
												? "bg-gray-800 text-white hover:bg-gray-700 hover:text-gray-200 "
												: "bg-gray-300 text-gray-800 hover:bg-gray-200 hover:text-gray-900"
										}
									  `} */
