import { Link } from "react-router-dom"; // Import Link for navigation

const HomePage: React.FC = () => {
	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
				<h1 className="text-3xl font-bold text-center text-gray-900">
					Welcome to the Homepage
				</h1>

				{/* Links for Login and Register */}
				<div className="mt-4 text-center">
					<p className="text-lg text-gray-700">
						<Link
							to="/login"
							className="text-indigo-600 hover:text-indigo-500 font-semibold"
						>
							Login
						</Link>{" "}
						or{" "}
						<Link
							to="/register"
							className="text-indigo-600 hover:text-indigo-500 font-semibold"
						>
							Register
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
