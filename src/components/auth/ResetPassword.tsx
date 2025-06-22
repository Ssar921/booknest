import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { supabase } from "../../lib/supabaseClient";

interface Props {
	onSuccess: () => void;
}

export default function ResetPassword({ onSuccess }: Props) {
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const handleReset = async (e: React.FormEvent) => {
		e.preventDefault();
		setMessage("");

		if (newPassword.length < 6) {
			setMessage("Password must be at least 6 characters long.");
			return;
		}

		if (newPassword !== confirmPassword) {
			setMessage("Passwords do not match.");
			return;
		}

		setLoading(true);
		const { error } = await supabase.auth.updateUser({
			password: newPassword,
		});

		if (error) {
			if (error.message.includes("new password should be different")) {
				setMessage("Use a password different from the old one.");
			} else if (error.message.toLowerCase().includes("token")) {
				setMessage(
					"The link has expired or is invalid. Try requesting a new reset link."
				);
			} else {
				setMessage(error.message || "Something went wrong.");
			}
		} else {
			setMessage("Password updated. Redirecting...");
			onSuccess();
		}

		setLoading(false);
	};

	const inputClass = `mt-1 block w-full px-3 py-2 backdrop-blur-lg bg-white/60 border rounded-[10px] shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor sm:text-sm`;

	const passwordField = (
		value: string,
		onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
		placeholder: string
	) => (
		<div className="relative">
			<input
				type={showPassword ? "text" : "password"}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				className={inputClass}
				required
			/>
			<button
				type="button"
				onClick={() => setShowPassword(!showPassword)}
				className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 focus:outline-none"
				tabIndex={-1}
			>
				{showPassword ? <FaEyeSlash /> : <FaEye />}
			</button>
		</div>
	);
	return (
		<form onSubmit={handleReset} className="space-y-4">
			{passwordField(
				newPassword,
				(e) => setNewPassword(e.target.value),
				"New Password"
			)}
			{passwordField(
				confirmPassword,
				(e) => setConfirmPassword(e.target.value),
				"Confirm Password"
			)}

			<button
				type="submit"
				disabled={loading}
				className="w-full py-2 px-4 bg-themeColor text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-themeColor focus:ring-opacity-50 disabled:opacity-50 hover:bg-secondary-dark transition-colors duration-300"
			>
				{loading ? "Resetting..." : "Reset Password"}
			</button>

			{message && <p className="text-sm mt-2 text-red-600">{message}</p>}
		</form>
	);
}
