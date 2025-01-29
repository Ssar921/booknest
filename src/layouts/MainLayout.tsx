import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useToggleContext } from "../context/ToggleContext";
const MainLayout: React.FC = () => {
	const { isToggled } = useToggleContext();
	return (
		<div className="min-h-screen flex-col items-center justify-center">
			<Navbar />
			<Footer />
			<Outlet />
			<ToastContainer
				position="top-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme={isToggled ? "dark" : "light"}
			/>
		</div>
	);
};

export default MainLayout;
