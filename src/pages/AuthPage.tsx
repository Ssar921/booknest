// src/components/Auth.tsx
import React, { useState } from "react";
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthPage: React.FC = () => {
	const [authMode, setAuthMode] = useState<"login" | "register">("login");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		if (!email || !password) {
			setError("Please fill in both fields.");
			setLoading(false);
			return;
		}

		try {
			if (authMode === "login") {
				await signInWithEmailAndPassword(auth, email, password);
				toast.success("Login successful!");
				navigate("/"); // Redirect to the homepage after successful login
			} else {
				await createUserWithEmailAndPassword(auth, email, password);
				toast.success("Registration successful!");
				navigate("/"); // Redirect after successful registration
			}
		} catch (err: any) {
			toast.error(`Error: ${err.message}`);
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
				<h2 className="text-3xl font-bold text-center text-gray-900">
					{authMode === "login" ? "Login" : "Register"}
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
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						/>
					</div>

					{/* Error Message */}
					{error && (
						<p className="text-sm text-red-500 mt-2">{error}</p>
					)}

					{/* Submit Button */}
					<button
						type="submit"
						disabled={loading}
						className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 disabled:opacity-50 hover:bg-indigo-700 transition-colors duration-300"
					>
						{loading
							? authMode === "login"
								? "Logging in..."
								: "Registering..."
							: authMode === "login"
							? "Login"
							: "Register"}
					</button>
				</form>

				<p className="mt-4 text-center text-sm text-gray-600">
					{authMode === "login" ? (
						<>
							Don't have an account?{" "}
							<a
								href="#"
								onClick={() => setAuthMode("register")}
								className="text-indigo-600 hover:text-indigo-500"
							>
								Register here
							</a>
						</>
					) : (
						<>
							Already have an account?{" "}
							<a
								href="#"
								onClick={() => setAuthMode("login")}
								className="text-indigo-600 hover:text-indigo-500"
							>
								Login here
							</a>
						</>
					)}
				</p>
			</div>
		</div>
	);
};

export default AuthPage;
