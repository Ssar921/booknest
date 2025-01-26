import { Link } from "react-router-dom";
import { FaUser, FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import { useToggleContext } from "../context/ToggleContext";
import { useState } from "react";
import { useAuth } from "../context/AuthContext"; // Import the useAuth hook

const Navbar: React.FC = () => {
	const { isToggled, setIsToggled } = useToggleContext();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

	// Access the user and logout function from AuthContext
	const { user, logout } = useAuth();

	const toggleHandler = () => {
		setIsToggled(!isToggled);
	};

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	return (
		<>
			{/* Navbar */}
			<nav
				className={`flex items-center justify-between p-4 shadow-lg transition-all ${
					isToggled
						? "bg-background-dark text-text-dark"
						: "bg-background-light text-text-light"
				}`}
			>
				<div className="flex items-center space-x-4">
					<Link
						to="/"
						className={`text-3xl font-bold transition-all font-serif ${
							isToggled ? "text-text-dark" : "text-text-light"
						}`}
					>
						BookNest
					</Link>
				</div>

				{/* Mobile menu button */}
				<button
					onClick={toggleMobileMenu}
					className={`sm:hidden text-2xl transition-all ${
						isToggled ? "text-text-dark" : "text-text-light"
					}`}
				>
					{isMobileMenuOpen ? <FaTimes /> : <FaBars />}
				</button>

				{/* Auth Links and Profile (for Desktop) */}
				<div className="hidden sm:flex items-center space-x-4">
					{/* Show this part if user is not logged in */}
					{!user ? (
						<>
							<Link
								to="/register"
								className={`px-4 py-2 rounded transition-all ${
									isToggled
										? "bg-button-signupDark text-white"
										: "bg-button-signupLight text-white"
								}`}
							>
								Sign Up
							</Link>
							<Link
								to="/login"
								className={`px-4 py-2 rounded transition-all ${
									isToggled
										? "bg-button-signupDark text-white"
										: "bg-button-signupLight text-white"
								}`}
							>
								Login
							</Link>
						</>
					) : (
						<>
							{/* Show this part if user is logged in */}
							<button
								onClick={logout}
								className={`px-4 py-2 rounded transition-all ${
									isToggled
										? "bg-button-logoutDark text-white"
										: "bg-button-logoutLight text-white"
								}`}
							>
								Logout
							</button>
							<div className="relative">
								<Link
									to="/profile"
									className={`text-lg transition-all ${
										isToggled
											? "text-text-dark"
											: "text-text-light"
									}`}
								>
									<FaUser />
								</Link>
							</div>
						</>
					)}

					<button onClick={toggleHandler} className="text-xl">
						{isToggled ? <FaSun /> : <FaMoon />}
					</button>
				</div>
			</nav>

			{/* Mobile Menu (for Mobile Screens) */}
			{isMobileMenuOpen && (
				<div
					className={`sm:hidden flex flex-col items-center space-y-4 p-6 transition-all ${
						isToggled ? "dark-mode-basic" : "light-mode-basic"
					}`}
				>
					{/* Show mobile buttons based on user's login status */}
					<button
						onClick={toggleHandler}
						className={`w-full text-center text-xl transition-all ${
							isToggled ? "text-text-dark" : "text-text-light"
						}`}
					>
						{isToggled ? <FaSun /> : <FaMoon />}
					</button>

					{!user ? (
						<>
							<Link
								to="/register"
								className={`w-full px-4 py-2 text-center rounded transition-all ${
									isToggled
										? "bg-button-signupDark text-white"
										: "bg-button-signupLight text-white"
								}`}
							>
								Sign Up
							</Link>
							<Link
								to="/login"
								className={`w-full px-4 py-2 text-center rounded transition-all ${
									isToggled
										? "bg-button-signupDark text-white"
										: "bg-button-signupLight text-white"
								}`}
							>
								Login
							</Link>
						</>
					) : (
						<>
							<button
								onClick={logout}
								className={`w-full px-4 py-2 text-center rounded transition-all ${
									isToggled
										? "bg-button-logoutDark text-text-dark"
										: "bg-button-logoutLight text-text-light"
								}`}
							>
								Logout
							</button>
						</>
					)}
				</div>
			)}
		</>
	);
};

export default Navbar;
