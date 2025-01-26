import { FaSun, FaMoon } from "react-icons/fa";
import { useToggleContext } from "../context/ToggleContext";

const Navbar: React.FC = () => {
	const { isToggled, setIsToggled } = useToggleContext();
	const toggleHandler = () => {
		setIsToggled(!isToggled);
	};

	return (
		<nav
			className={`flex items-center justify-between p-4 shadow-lg transition-all bg-themeColor text-gray-200`}
		>
			<div className="flex-1 flex justify-center">
				<h1 className={`text-3xl font-bold transition-all font-serif`}>
					BookNest
				</h1>
			</div>

			<button onClick={toggleHandler} className="text-xl transition-all">
				{isToggled ? <FaSun /> : <FaMoon />}
			</button>
		</nav>
	);
};

export default Navbar;
