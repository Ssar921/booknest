import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar"; // Assuming Navbar.tsx is in the same directory
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const MainLayout: React.FC = () => {
	return (
		<div className="min-h-full bg-black flex-col">
			<Navbar />
			<Outlet />
			<ToastContainer />
		</div>
	);
};

export default MainLayout;
