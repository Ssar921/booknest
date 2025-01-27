import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/NavBar";
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
