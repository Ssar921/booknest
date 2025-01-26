import SearchBar from "../components/SearchBar";
import { useToggleContext } from "../context/ToggleContext";
import CategoryCarousel from "../components/CategoryCarousel";
import { categoryConfig, Category } from "../utils/categories";
import ButtonCarousel from "../components/ButtonCarousel";
import { useState } from "react";

const HomePage: React.FC = () => {
	const { isToggled } = useToggleContext();
	const [bookCategory, setBookCategory] = useState<Category>(
		categoryConfig[0]
	);

	return (
		<div
			className={`min-h-screen flex-col ${
				isToggled
					? "bg-background-dark text-text-dark"
					: "bg-background-light text-text-light"
			}`}
		>
			<SearchBar />

			<ButtonCarousel setBookCategory={setBookCategory} />

			<CategoryCarousel
				categoryTitle={`${bookCategory.title} Books`}
				query={bookCategory.query}
				categoryLink={`/category/${bookCategory.query}`}
			/>
		</div>
	);
};

export default HomePage;
