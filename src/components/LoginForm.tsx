// src/components/LoginForm.tsx
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext"; // Your Auth context

interface LoginFormProps {
	onSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const { login } = useAuth(); // Using auth context

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
			await login(email, password);
			toast.success("Login successful!");
			onSuccess(); // Notify parent component to navigate
		} catch (err: any) {
			toast.error(`Error: ${err.message}`);
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form className="space-y-4" onSubmit={handleSubmit}>
			{/* Email Input */}
			<div>
				<label
					htmlFor="email"
					className="block text-md font-medium text-themeColor"
				>
					Email
				</label>
				<input
					id="email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					className="mt-1 block w-full px-3 py-2 backdrop-blur-lg bg-white/60 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor sm:text-sm"
				/>
			</div>

			{/* Password Input */}
			<div>
				<label
					htmlFor="password"
					className="block text-md font-medium text-themeColor"
				>
					Password
				</label>
				<input
					id="password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					className="mt-1 block w-full px-3 py-2 backdrop-blur-lg bg-white/60 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor sm:text-sm"
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
	);
};

export default LoginForm;
