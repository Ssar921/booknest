import React, { useState } from "react";
import { Link } from "react-router-dom"; // Importing Link from react-router-dom
import { FaMoon, FaSun, FaUser, FaBars } from "react-icons/fa"; // Importing React Icons for dark mode toggle and others
import { useAuth } from "../context/AuthContext"; // Import the useAuth hook
import { toast } from "react-toastify";

const Navbar: React.FC = () => {
	const { user, logout } = useAuth(); // Access user and logout from the AuthContext
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isDarkMode, setIsDarkMode] = useState(false); // For light/dark toggle

	const toggleDropdown = () => {
		setIsDropdownOpen((prev) => !prev);
	};

	const closeDropdown = () => {
		setIsDropdownOpen(false); // Close dropdown when an option is clicked
	};

	const toggleDarkMode = () => {
		setIsDarkMode(!isDarkMode);
		document.documentElement.classList.toggle("dark", !isDarkMode); // Toggle dark mode class
	};

	const handleLoginLogout = () => {
		if (user) {
			logout(); // If user is logged in, log them out
			toast.success("Logged Out");
			closeDropdown(); // Close dropdown after logout
		}
	};

	return (
		<nav
			className={`p-4 ${
				isDarkMode
					? "bg-gradient-to-r from-gray-800 to-gray-900"
					: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
			} transition-all`}
		>
			<div className="max-w-7xl mx-auto flex justify-between items-center">
				{/* Logo */}
				<div className="text-white text-2xl font-bold">
					<Link to="/">MyLogo</Link>
				</div>

				{/* Right-side Menu */}
				<div className="flex items-center space-x-4">
					{/* Dark Mode Toggle */}
					<button
						onClick={toggleDarkMode}
						className="text-white p-2 rounded-md focus:outline-none"
						aria-label="Toggle Dark Mode"
					>
						{isDarkMode ? (
							<FaSun className="w-6 h-6" />
						) : (
							<FaMoon className="w-6 h-6" />
						)}
					</button>

					{/* Dropdown Menu */}
					<div className="relative">
						<button
							className="text-white px-4 py-2 rounded-md focus:outline-none"
							onClick={toggleDropdown}
						>
							{user ? (
								<FaUser className="w-6 h-6" /> // Use FaUser for Profile
							) : (
								<FaBars className="w-6 h-6" /> // Use FaBars for Menu
							)}
						</button>

						{isDropdownOpen && (
							<div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 shadow-lg rounded-md z-10">
								<ul className="text-gray-700 dark:text-white">
									{user ? (
										<>
											<li>
												<Link
													to="/profile"
													className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
													onClick={closeDropdown} // Close dropdown on click
												>
													Profile
												</Link>
											</li>
											<li>
												<Link
													to="/settings"
													className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
													onClick={closeDropdown} // Close dropdown on click
												>
													Settings
												</Link>
											</li>
											<li>
												<button
													onClick={handleLoginLogout}
													className="block px-4 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-600"
												>
													Logout
												</button>
											</li>
										</>
									) : (
										<>
											<li>
												<Link
													to="/login"
													className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
													onClick={closeDropdown} // Close dropdown on click
												>
													Login
												</Link>
											</li>
											<li>
												<Link
													to="/signup"
													className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
													onClick={closeDropdown} // Close dropdown on click
												>
													Sign Up
												</Link>
											</li>
										</>
									)}
								</ul>
							</div>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
