// src/components/Login.tsx
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext"; // Using the context's login function

const Login: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { login } = useAuth(); // Use the login function from context

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		if (!email || !password) {
			setError("Please fill in both email and password.");
			setLoading(false);
			return;
		}

		try {
			await login(email, password); // Use the login function from context
			toast.success("Login successful!");
			navigate("/"); // Redirect to homepage
		} catch (err: any) {
			toast.error(`Error: ${err.message}`);
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<h2 className="text-3xl font-bold text-center text-gray-900">
				Login
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
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor sm:text-sm"
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
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor sm:text-sm"
					/>
				</div>

				{/* Error Message */}
				{error && <p className="text-sm text-red-500 mt-2">{error}</p>}

				{/* Submit Button */}
				<button
					type="submit"
					disabled={loading}
					className="w-full py-2 px-4 bg-themeColor text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-themeColor focus:ring-opacity-50 disabled:opacity-50 hover:bg-secondary-dark transition-colors duration-300"
				>
					{loading ? "Logging in..." : "Login"}
				</button>
			</form>
		</div>
	);
};

export default Login;
