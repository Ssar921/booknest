import { FaSun, FaMoon } from "react-icons/fa";
import { useToggleContext } from "../context/ToggleContext";
import { useState } from "react";

const Navbar: React.FC = () => {
	const { isToggled, setIsToggled } = useToggleContext();
	const toggleHandler = () => {
		setIsToggled(!isToggled);
	};

	return (
		<nav
			className={`flex items-center justify-between p-4 shadow-lg transition-all ${
				isToggled
					? "bg-background-dark text-text-dark"
					: "bg-background-light text-text-light"
			}`}
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
