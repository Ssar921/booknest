import { toast } from "react-toastify";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const RegisterForm: React.FC = () => {
	const { signup } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		if (!email || !password || !username || !firstname || !lastname) {
			setError("Please fill in all fields.");
			setLoading(false);
			return;
		}

		try {
			await signup(email, password, username, firstname, lastname);
			toast.success("Registration successful!");
		} catch (err: any) {
			toast.error(`Error: ${err.message}`);
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const inputClass = `mt-1 block w-full px-3 py-2 backdrop-blur-lg bg-white/60 border rounded-[10px] shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor sm:text-sm`;
	const labelClass = "block text-md font-medium text-themeColor";
	return (
		<form className="space-y-4" onSubmit={handleSubmit}>
			{/* Email Input */}
			<div>
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
			</div>

			{/* Conditional fields for Register */}
			<div>
				<label htmlFor="username" className={labelClass}>
					Username
				</label>
				<input
					id="username"
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
					className={inputClass}
				/>
			</div>

			<div>
				<label htmlFor="firstname" className={labelClass}>
					First Name
				</label>
				<input
					id="firstname"
					type="text"
					value={firstname}
					onChange={(e) => setFirstname(e.target.value)}
					required
					className={inputClass}
				/>
			</div>

			<div>
				<label htmlFor="lastname" className={labelClass}>
					Last Name
				</label>
				<input
					id="lastname"
					type="text"
					value={lastname}
					onChange={(e) => setLastname(e.target.value)}
					required
					className={inputClass}
				/>
			</div>

			{/* Password Input */}
			<div>
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
			</div>

			{/* Error Message */}
			{error && <p className="text-sm text-red-500 mt-2">{error}</p>}

			{/* Submit Button */}
			<button
				type="submit"
				disabled={loading}
				className="w-full py-2 px-4 bg-themeColor text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-themeColor focus:ring-opacity-50 disabled:opacity-50 hover:bg-secondary-dark transition-colors duration-300"
			>
				{loading ? "Registering..." : "Register"}
			</button>
		</form>
	);
};

export default RegisterForm;
