import React from "react";
import {
	IoChevronBackCircleSharp,
	IoChevronForwardCircleSharp,
} from "react-icons/io5";
// Define types for the component props
interface CustomArrowProps {
	direction: "prev" | "next"; // direction can either be "prev" or "next"
	onClick: () => void; // onClick function that takes no parameters and returns void
}

const CustomArrow: React.FC<CustomArrowProps> = ({ direction, onClick }) => {
	return (
		<button
			onClick={onClick}
			className={`absolute top-1/2 transform -translate-y-1/2 text-themeColor text-3xl z-10 bg-transparent hover:text-secondary-dark focus:outline-none ${
				direction === "prev"
					? "-left-5 sm:-left-10"
					: "-right-5 sm:-right-10"
			}`}
		>
			{direction === "prev" ? (
				<IoChevronBackCircleSharp />
			) : (
				<IoChevronForwardCircleSharp />
			)}
		</button>
	);
};

export default CustomArrow;
