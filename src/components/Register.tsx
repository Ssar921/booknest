// src/components/Register.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext"; // Using the context's signup function

const Register: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { signup } = useAuth(); // Use the signup function from context

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		// Validate the required fields for registration
		if (!email || !password || !username || !firstname || !lastname) {
			setError("Please fill in all fields.");
			setLoading(false);
			return;
		}

		try {
			await signup(email, password, username, firstname, lastname); // Call the signup function from context
			toast.success("Registration successful!");
			navigate("/"); // Redirect after successful registration
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
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					/>
				</div>

				{/* Fields for Register */}
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
						onChange={(e) => setFirstname(e.target.value)}
						required
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
						onChange={(e) => setLastname(e.target.value)}
						required
						className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					/>
				</div>

				{/* Error Message */}
				{error && <p className="text-sm text-red-500 mt-2">{error}</p>}

				{/* Submit Button */}
				<button
					type="submit"
					disabled={loading}
					className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 disabled:opacity-50 hover:bg-indigo-700 transition-colors duration-300"
				>
					{loading ? "Registering..." : "Register"}
				</button>
			</form>
		</div>
	);
};

export default Register;
