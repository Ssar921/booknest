// src/components/Register.tsx
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";

const Register: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			await createUserWithEmailAndPassword(auth, email, password);
			toast.success("Registered successful!");
			// Redirect or do something else on success
		} catch (err: any) {
			toast.error(`Error: ${err.message}`); // Error toast
			setError(err.message);
		}

		setLoading(false);
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

					{/* Error Message */}
					{error && (
						<p className="text-sm text-red-500 mt-2">{error}</p>
					)}

					{/* Submit Button */}
					<button
						type="submit"
						disabled={loading}
						className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 disabled:opacity-50"
					>
						{loading ? "Registering..." : "Register"}
					</button>
				</form>

				<p className="mt-4 text-center text-sm text-gray-600">
					Already have an account?{" "}
					<a
						href="/login"
						className="text-indigo-600 hover:text-indigo-500"
					>
						Log in
					</a>
				</p>
			</div>
		</div>
	);
};

export default Register;
