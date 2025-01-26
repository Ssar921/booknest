// src/components/AuthPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext"; // Your Auth context

interface AuthPageProps {
	mode: "login" | "register";
}

const AuthPage: React.FC<AuthPageProps> = ({ mode }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { login, signup } = useAuth(); // Using auth context

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		if (mode === "login" && (!email || !password)) {
			setError("Please fill in both fields.");
			setLoading(false);
			return;
		}

		if (
			mode === "register" &&
			(!email || !password || !username || !firstname || !lastname)
		) {
			setError("Please fill in all fields.");
			setLoading(false);
			return;
		}

		try {
			if (mode === "login") {
				await login(email, password);
				toast.success("Login successful!");
				navigate("/"); // Redirect after login
			} else {
				await signup(email, password, username, firstname, lastname);
				toast.success("Registration successful!");
				navigate("/"); // Redirect after registration
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
					{mode === "login" ? "Login" : "Register"}
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

					{/* Conditional fields for Register */}
					{mode === "register" && (
						<>
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
									onChange={(e) =>
										setUsername(e.target.value)
									}
									required
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor sm:text-sm"
								/>
							</div>

							<div>
								<label
									htmlFor="firstname"
									className="block text-sm font-medium text-gray-700"
								>
									First Name
								</label>
								<input
									id="firstname"
									type="text"
									value={firstname}
									onChange={(e) =>
										setFirstname(e.target.value)
									}
									required
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor sm:text-sm"
								/>
							</div>

							<div>
								<label
									htmlFor="lastname"
									className="block text-sm font-medium text-gray-700"
								>
									Last Name
								</label>
								<input
									id="lastname"
									type="text"
									value={lastname}
									onChange={(e) =>
										setLastname(e.target.value)
									}
									required
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor sm:text-sm"
								/>
							</div>
						</>
					)}

					{/* Error Message */}
					{error && (
						<p className="text-sm text-red-500 mt-2">{error}</p>
					)}

					{/* Submit Button */}
					<button
						type="submit"
						disabled={loading}
						className="w-full py-2 px-4 bg-themeColor text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-themeColor focus:ring-opacity-50 disabled:opacity-50 hover:bg-secondary-dark transition-colors duration-300"
					>
						{loading
							? mode === "login"
								? "Logging in..."
								: "Registering..."
							: mode === "login"
							? "Login"
							: "Register"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default AuthPage;
