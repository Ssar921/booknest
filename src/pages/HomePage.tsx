import SearchBar from "../components/SearchBar";
import { useToggleContext } from "../context/ToggleContext";
import CategoryCarousel from "../components/CategoryCarousel";
import { categoryConfig } from "../utils/categories";

const HomePage: React.FC = () => {
	const { isToggled } = useToggleContext();

	return (
		<div
			className={`min-h-full flex-col ${
				isToggled ? "bg-gray-900 text-white" : "bg-white text-gray-900"
			}`}
		>
			<SearchBar />
			{/* Popular Books Carousel */}
			{categoryConfig.map((category, index) => (
				<CategoryCarousel
					key={index}
					categoryTitle={`${category.title} Books`}
					query={category.query}
					categoryLink={`/category/${category.query}`}
				/>
			))}
		</div>
	);
};

export default HomePage;
