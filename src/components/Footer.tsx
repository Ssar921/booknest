import {
	FaHome,
	FaUserCircle,
	FaSignInAlt,
	FaUserPlus,
	FaSignOutAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSupabase } from "../context/SupabaseContext";

const Footer = () => {
	const { user, signOut } = useSupabase();
	const linkClassOne =
		"flex items-center space-x-2 hover:text-secondary-dark transition-all duration-300";
	const linkClassInner = "hidden md:block";
	const iconSize = 25;
	return (
		<div className="fixed bottom-0 w-full rounded-t-lg md:w-9/12 mx-auto flex justify-between items-center px-6 py-2 transition-all duration-300 bg-themeColor shadow-md md:left-1/2 md:-translate-x-1/2 text-white z-40">
			{/* Home Icon */}
			<Link to="/" className={linkClassOne}>
				<FaHome size={24} />
				<span className="hidden md:block">Home</span>
			</Link>

			{/* Auth Links (either login or profile/logout depending on user authentication) */}
			{user ? (
				<>
					{/* Profile Icon */}
					<Link to="/profile" className={linkClassOne}>
						<FaUserCircle size={iconSize} />
						<span className={linkClassInner}>Profile</span>
					</Link>

					{/* Logout Icon */}
					<button
						onClick={signOut}
						className="flex items-center space-x-2 text-red-500"
					>
						<FaSignOutAlt size={iconSize} />
						<span className={linkClassInner}>Logout</span>
					</button>
				</>
			) : (
				<>
					{/* Login Icon */}
					<Link to="/login" className={linkClassOne}>
						<FaSignInAlt size={iconSize} />
						<span className={linkClassInner}>Login</span>
					</Link>

					{/* Sign Up Icon */}
					<Link to="/register" className={linkClassOne}>
						<FaUserPlus size={iconSize} />
						<span className={linkClassInner}>Sign Up</span>
					</Link>
				</>
			)}
		</div>
	);
};

export default Footer;
