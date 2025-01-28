import { FaSun, FaMoon, FaArrowLeft } from "react-icons/fa";
import { useToggleContext } from "../context/ToggleContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
	const { isToggled, setIsToggled } = useToggleContext();
	const location = useLocation();
	const navigate = useNavigate();

	const toggleHandler = () => {
		setIsToggled(!isToggled);
	};

	// Check if the current location is not the homepage
	const isOnHomePage = location.pathname === "/";

	// Check if there's a previous page in history using React Router's navigate
	const canGoBack = location.key !== "default"; // Default key means this page is the first in history stack

	return (
		<nav className="flex items-center justify-between p-4 shadow-lg transition-all bg-themeColor text-gray-200">
			<div className="flex items-center">
				{/* Back button (only if there's a previous page and not on the homepage) */}
				{!isOnHomePage && canGoBack && (
					<button
						onClick={() => navigate(-1)} // Navigate to the previous page
						className="text-xl mr-4 transition-all"
					>
						<FaArrowLeft />
					</button>
				)}
			</div>

			{/* Center the logo */}
			<div className="flex-1 flex justify-center">
				<Link
					to="/"
					className="text-3xl font-bold transition-all font-serif"
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
