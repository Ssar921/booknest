import { useState } from "react";
import { MdError } from "react-icons/md";
import { ClipLoader } from "react-spinners";
import { useSupabase } from "../../context/SupabaseContext";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function LoginForm() {
	const navigate = useNavigate();
	const location = useLocation();
	const { signIn } = useSupabase();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		if (!email || !password) {
			setError("Please fill in both fields.");
			setLoading(false);
			return;
		}

		try {
			await signIn(email, password);
			const redirectTo = location.state?.from || "/";
			navigate(redirectTo);
		} catch (err: any) {
			console.log(err.message);
			if (err.message.includes("Invalid login credentials")) {
				setError("Invalid credentials, please try again.");
			} else {
				setError("An unexpected error occurred. Please try again.");
			}
		} finally {
			setLoading(false);
		}
	};

	const inputClass = `mt-1 block w-full px-3 py-2 bg-transparent border-b text-sm border-b-gray-300 focus:outline-none focus:ring-themeColor focus:border-themeColor sm:text-sm text-secondary-dark`;

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="relative">
				<input
					id="email"
					type="email"
					required
					value={email}
					placeholder="Email"
					onChange={(e) => setEmail(e.target.value)}
					className={inputClass}
				/>
				{error && !email && (
					<div className="absolute right-3 top-2 text-red-500">
						<MdError />
					</div>
				)}
			</div>

			<div className="relative">
				<input
					id="password"
					type="password"
					required
					value={password}
					placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}
					className={inputClass}
				/>
				{error && !password && (
					<div className="absolute right-3 top-2 text-red-500">
						<MdError />
					</div>
				)}
			</div>

			{error && (
				<p
					className="text-xs text-red-500 mt-1 text-center"
					aria-live="assertive"
				>
					{error}
				</p>
			)}

			<button
				type="submit"
				disabled={loading}
				className="w-full py-2 px-4 bg-themeColor text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-themeColor focus:ring-opacity-50 disabled:opacity-50 hover:bg-secondary-dark transition-colors duration-300"
			>
				{loading ? <ClipLoader size={24} color="#fff" /> : "Login"}
			</button>
			<small className="w-full flex items-center justify-center py-1">
				<Link
					to="/forgot-password"
					className="px-1 pb-1 transition-all font-serif text-themeColor underline font-semibold"
				>
					Forgot Password?
				</Link>
			</small>
			<small className="w-full flex items-center justify-center py-1">
				Don't have an account?
				<Link
					to="/register"
					className="px-1 transition-all font-serif text-themeColor font-semibold"
				>
					Sign Up
				</Link>
			</small>
		</form>
	);
}
