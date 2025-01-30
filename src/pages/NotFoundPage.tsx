import { FaExclamationTriangle } from "react-icons/fa";

const NotFoundPage: React.FC = () => {
	return (
		<div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-themeColor via-green-900 to-secondary-dark">
			<div className="text-center p-6 bg-white rounded-lg shadow-lg max-w-md w-full">
				<FaExclamationTriangle className="text-5xl text-red-500 mb-4 mx-auto" />
				<h1 className="text-3xl font-semibold text-gray-800">
					404 - Page Not Found
				</h1>
				<p className="mt-4 text-gray-600">
					Oops! The page you're looking for doesn't exist.
				</p>
			</div>
		</div>
	);
};

export default NotFoundPage;
