import { Link } from "react-router-dom";
import { FaUser, FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import { useToggleContext } from "../context/ToggleContext";
import { useState } from "react";

const Navbar: React.FC = () => {
	const { isToggled, setIsToggled } = useToggleContext();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const toggleHandler = () => {
		setIsToggled(!isToggled);
	};

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	return (
		<>
			{/* Navbar */}
			<nav className="flex items-center justify-between p-4 shadow-lg">
				<div className="flex items-center space-x-4">
					<Link to="/" className="text-xl font-bold">
						BookBrowse
					</Link>
				</div>

				{/* Mobile menu button */}
				<button
					onClick={toggleMobileMenu}
					className="sm:hidden text-2xl text-gray-600"
				>
					{isMobileMenuOpen ? <FaTimes /> : <FaBars />}
				</button>

				{/* Auth Links and Profile (for Desktop) */}
				<div className="hidden sm:flex items-center space-x-4">
					<button className="px-4 py-2 text-white bg-blue-500 rounded">
						Sign Up
					</button>
					<button className="px-4 py-2 text-white bg-blue-500 rounded">
						Login
					</button>
					<div className="relative">
						<button className="text-lg">
							<FaUser />
						</button>
					</div>
					<button onClick={toggleHandler} className="text-xl">
						{isToggled ? <FaSun /> : <FaMoon />}
					</button>
				</div>
			</nav>

			{/* Mobile Menu (for Mobile Screens) */}
			{isMobileMenuOpen && (
				<div className="sm:hidden flex flex-col items-center space-y-4 bg-gray-800 text-white p-6">
					<button className="w-full px-4 py-2 text-center bg-blue-500 rounded">
						Sign Up
					</button>
					<button className="w-full px-4 py-2 text-center bg-blue-500 rounded">
						Login
					</button>
					<button
						onClick={toggleHandler}
						className="w-full text-center text-xl"
					>
						{isToggled ? <FaSun /> : <FaMoon />}
					</button>
				</div>
			)}
		</>
	);
};

export default Navbar;
