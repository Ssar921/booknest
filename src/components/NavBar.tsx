import { FaSun, FaMoon } from "react-icons/fa";
import { useToggleContext } from "../context/ToggleContext";
import { Link } from "react-router-dom";

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
				<Link
					to="/"
					className={`text-3xl font-bold transition-all font-serif`}
				>
					BookNest
				</Link>
			</div>

			<button onClick={toggleHandler} className="text-xl transition-all">
				{isToggled ? <FaSun /> : <FaMoon />}
			</button>
		</nav>
	);
};

export default Navbar;
