import Slider from "react-slick";
import { useState } from "react";
import { categoryConfig, Category } from "../utils/categories";

interface ChildComponentProps {
	setBookCategory: React.Dispatch<React.SetStateAction<Category>>; // Expect setBookCategory function
}
const ButtonCarousel: React.FC<ChildComponentProps> = ({ setBookCategory }) => {
	const defaultCategory =
		categoryConfig.find((category) => category.title === "Popular") ||
		categoryConfig[0]; // Fallback to the first category if not found

	const [selectedCategory, setSelectedCategory] =
		useState<Category>(defaultCategory);
	// Carousel settings
	const settings = {
		dots: false,
		infinite: true,
		slidesToShow: 6,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
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
			<div className="pt-8 w-full mx-auto bg-themeColor">
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
										${isActive ? "border-b-2 border-gray-300" : "hover:border-b-2 border-white"}
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
