import Hero from "./Hero";
import SearchBar from "./SearchBar";
import Books from "./Books";
import { useToggleContext } from "../context/ToggleContext";

const HomePage2: React.FC = () => {
	const { isToggled } = useToggleContext();

	return (
		<div
			className={
				isToggled ? "bg-gray-900 text-white" : "bg-white text-gray-900"
			}
		>
			<Hero />
			<SearchBar />
			<Books />
		</div>
	);
};

export default HomePage2;
