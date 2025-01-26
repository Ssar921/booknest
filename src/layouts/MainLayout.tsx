import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer";

const MainLayout: React.FC = () => {
	return (
		<div className="min-h-screen flex-col items-center justify-center">
			<Navbar />
			<Footer />
			<Outlet />
			<ToastContainer />
		</div>
	);
};

export default MainLayout;
