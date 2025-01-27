import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { ClipLoader } from "react-spinners";
import { MdError } from "react-icons/md";

const LoginForm: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const { login } = useAuth(); // Using auth context

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		// Simple validation before attempting login
		if (!email || !password) {
			setError("Please fill in both fields.");
			setLoading(false);
			return;
		}

		try {
			await login(email, password); // Proceed with login
		} catch (err: any) {
			// Granular error handling
			if (err.message.includes("auth/invalid-credential")) {
				setError("Invalid credentials, please try again.");
			} else {
				setError("An unexpected error occurred. Please try again.");
			}
		} finally {
			setLoading(false);
		}
	};

	// Common classes
	const inputClass = `mt-1 block w-full px-3 py-2 backdrop-blur-lg bg-white/60 border rounded-[10px] shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor sm:text-sm`;
	const labelClass = "block text-md font-medium text-themeColor";

	return (
		<form className="space-y-4" onSubmit={handleSubmit}>
			{/* Email Input */}
			<div className="relative">
				<label htmlFor="email" className={labelClass}>
					Email
				</label>
				<input
					id="email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					className={inputClass}
				/>
				{error && !email && (
					<div className="absolute right-3 top-2 text-red-500">
						<MdError />
					</div>
				)}
			</div>

			{/* Password Input */}
			<div className="relative">
				<label htmlFor="password" className={labelClass}>
					Password
				</label>
				<input
					id="password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					className={inputClass}
				/>
				{error && !password && (
					<div className="absolute right-3 top-2 text-red-500">
						<MdError />
					</div>
				)}
			</div>

			{/* Error Message */}
			{error && (
				<p className="text-sm text-red-500 mt-2" aria-live="assertive">
					{error}
				</p>
			)}

			{/* Submit Button */}
			<button
				type="submit"
				disabled={loading}
				className="w-full py-2 px-4 bg-themeColor text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-themeColor focus:ring-opacity-50 disabled:opacity-50 hover:bg-secondary-dark transition-colors duration-300"
			>
				{loading ? <ClipLoader size={24} color="#ffffff" /> : "Login"}
			</button>
		</form>
	);
};

export default LoginForm;
