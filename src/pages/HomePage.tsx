import SearchBar from "../components/SearchBar";
import { useToggleContext } from "../context/ToggleContext";
import CategoryCarousel from "../components/CategoryCarousel";
const HomePage: React.FC = () => {
	const { isToggled } = useToggleContext();

	return (
		<div
			className={
				isToggled ? "bg-gray-900 text-white" : "bg-white text-gray-900"
			}
		>
			<SearchBar />
			{/* Popular Books Carousel */}
			<CategoryCarousel
				categoryTitle="Popular Books"
				query="book"
				categoryLink="/category/book"
			/>
		</div>
	);
};

export default HomePage;
