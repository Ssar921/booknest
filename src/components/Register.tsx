import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase"; // Import Firebase
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore"; // Firestore
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

const Register: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState(""); // Username input
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate(); // Initialize the navigate function

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true); // Set loading to true when the request starts

		try {
			// Create the user with email and password
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;

			// Save user data to Firestore with the username
			await setDoc(doc(db, "users", user.uid), {
				username, // Store the username in Firestore
			});

			toast.success("Registered successfully!");

			// Redirect to home page after successful registration
			navigate("/"); // You can change the path if needed
		} catch (err: any) {
			toast.error(`Error: ${err.message}`);
			setError(err.message);
		}

		setLoading(false); // Set loading to false after the process is finished
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
				<h2 className="text-3xl font-bold text-center text-gray-900">
					Register
				</h2>
				<form className="space-y-4" onSubmit={handleSubmit}>
					{/* Email Input */}
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700"
						>
							Email
						</label>
						<input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
					</div>

					{/* Password Input */}
					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700"
						>
							Password
						</label>
						<input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							minLength={6}
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
					</div>

					{/* Username Input */}
					<div>
						<label
							htmlFor="username"
							className="block text-sm font-medium text-gray-700"
						>
							Username
						</label>
						<input
							id="username"
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
					</div>

					{/* Error Message */}
					{error && (
						<p className="text-sm text-red-500 mt-2">{error}</p>
					)}

					{/* Submit Button with Loading Indicator */}
					<button
						type="submit"
						disabled={loading} // Disable button during loading
						className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md"
					>
						{loading ? (
							<span className="spinner-border animate-spin w-5 h-5 border-4 border-white border-t-transparent rounded-full"></span> // Simple loading spinner
						) : (
							"Register"
						)}
					</button>
				</form>

				<p className="mt-4 text-center text-sm text-gray-600">
					Already have an account?{" "}
					<Link
						to="/login"
						className="text-indigo-600 hover:text-indigo-500"
					>
						Log in
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Register;
