import { FaHome, FaUserCircle } from "react-icons/fa";

const Footer = () => {
	return (
		<div className="fixed bottom-0 sm:bottom-5 w-full sm:rounded-md md:w-9/12 mx-auto flex justify-between items-center p-3 bg-blue-500 text-white shadow-md md:left-1/2 md:-translate-x-1/2">
			<a href="/home" className="flex items-center space-x-2">
				<FaHome size={24} />
				<span className="hidden md:block">Home</span>
			</a>
			<a href="/profile" className="flex items-center space-x-2">
				<FaUserCircle size={24} />
				<span className="hidden md:block">Profile</span>
			</a>
		</div>
	);
};

export default Footer;
