import {
	FaHome,
	FaUserCircle,
	FaSignInAlt,
	FaUserPlus,
	FaSignOutAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import the useAuth hook

const Footer = () => {
	const { user, logout } = useAuth(); // Access user and logout from AuthContext

	return (
		<div className="fixed bottom-0 w-full rounded-tl-lg rounded-tr-lg md:w-9/12 mx-auto flex justify-between items-center px-6 py-2 transition-all duration-300 bg-themeColor shadow-md md:left-1/2 md:-translate-x-1/2 text-white z-40">
			{/* Home Icon */}
			<Link
				to="/"
				className="flex items-center space-x-2 hover:text-secondary-dark transition-all duration-300"
			>
				<FaHome size={24} />
				<span className="hidden md:block">Home</span>
			</Link>

			{/* Auth Links (either login or profile/logout depending on user authentication) */}
			{user ? (
				<>
					{/* Profile Icon */}
					<Link to="/profile" className="flex items-center space-x-2">
						<FaUserCircle size={24} />
						<span className="hidden md:block">Profile</span>
					</Link>

					{/* Logout Icon */}
					<button
						onClick={logout}
						className="flex items-center space-x-2 text-red-500"
					>
						<FaSignOutAlt size={24} />
						<span className="hidden md:block">Logout</span>
					</button>
				</>
			) : (
				<>
					{/* Login Icon */}
					<Link
						to="/login"
						className="flex items-center space-x-2 hover:text-secondary-dark transition-all duration-300"
					>
						<FaSignInAlt size={24} />
						<span className="hidden md:block">Login</span>
					</Link>

					{/* Sign Up Icon */}
					<Link
						to="/register"
						className="flex items-center space-x-2 hover:text-secondary-dark transition-all duration-300"
					>
						<FaUserPlus size={24} />
						<span className="hidden md:block">Sign Up</span>
					</Link>
				</>
			)}
		</div>
	);
};

export default Footer;
