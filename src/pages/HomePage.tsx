import SearchBar from "../components/SearchBar";
import Books from "../components/Books";
import { useToggleContext } from "../context/ToggleContext";

const HomePage2: React.FC = () => {
	const { isToggled } = useToggleContext();

	return (
		<div
			className={
				isToggled ? "bg-gray-900 text-white" : "bg-white text-gray-900"
			}
		>
			<SearchBar />
			<Books />
		</div>
	);
};

export default HomePage2;
