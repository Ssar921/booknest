import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useSupabase } from "../../context/SupabaseContext";
import { useNavigate } from "react-router-dom";

interface Props {
	onEmailSent: () => void;
}

const COOLDOWN_SECONDS = 30;
const STORAGE_KEY = "booknest_reset_cooldown";

export default function ForgotPassword({ onEmailSent }: Props) {
	const { user } = useSupabase();
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");
	const [cooldown, setCooldown] = useState(0);
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate("/");
		}
	}, [user, navigate]);

	// Check cooldown from localStorage
	useEffect(() => {
		const lastSent = localStorage.getItem(STORAGE_KEY);
		if (lastSent) {
			const secondsAgo = Math.floor(
				(Date.now() - parseInt(lastSent)) / 1000
			);
			const remaining = COOLDOWN_SECONDS - secondsAgo;
			if (remaining > 0) setCooldown(remaining);
		}
	}, []);

	// Decrease cooldown every second
	useEffect(() => {
		if (cooldown <= 0) return;
		const interval = setInterval(() => {
			setCooldown((prev) => {
				if (prev <= 1) {
					clearInterval(interval);
					return 0;
				}
				return prev - 1;
			});
		}, 1000);
		return () => clearInterval(interval);
	}, [cooldown]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setMessage("");

		// Check if email exists in 'profiles' table
		const { data, error } = await supabase
			.from("profiles")
			.select("username")
			.eq("username", email)
			.single();

		if (error || !data) {
			setMessage("No user found with that email.");
			setLoading(false);
			return;
		}

		// Send reset email
		const { error: resetError } = await supabase.auth.resetPasswordForEmail(
			email,
			{
				redirectTo: `${window.location.origin}/forgot-password`,
			}
		);

		if (resetError) {
			setMessage("Error sending reset email.");
			if (resetError.message.includes("over_email_send_rate_limit")) {
				setMessage(
					"You're doing that too often. Please wait before trying again."
				);
			} else {
				setMessage("Error sending reset link. Try again.");
			}
		} else {
			setMessage("Password reset link sent. Check your inbox.");
			setCooldown(COOLDOWN_SECONDS);
			localStorage.setItem(STORAGE_KEY, Date.now().toString());
			onEmailSent();
		}

		setLoading(false);
	};
	const inputClass = `mt-1 block w-full px-3 py-2 backdrop-blur-lg bg-white/60 border rounded-[10px] shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor sm:text-sm`;

	// if (sent) {
	// 	return (
	// 		<div className="space-y-4 text-center">
	// 			<p className="text-sm text-themeColor">
	// 				A password reset link has been sent. Check your inbox.
	// 			</p>
	// 			<p className="text-sm text-gray-600">
	// 				Didn’t get the email?{" "}
	// 				<button
	// 					onClick={() => {
	// 						setSent(false);
	// 						setEmail("");
	// 						setMessage("");
	// 					}}
	// 					className="text-themeColor underline hover:text-secondary-dark"
	// 				>
	// 					Try again
	// 				</button>
	// 			</p>
	// 		</div>
	// 	);
	// }

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<input
				type="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder="Enter your email"
				className={inputClass}
				required
			/>
			<button
				type="submit"
				disabled={loading || cooldown > 0}
				className="w-full py-2 px-4 bg-themeColor text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-themeColor focus:ring-opacity-50 disabled:opacity-50 hover:bg-secondary-dark transition-colors duration-300"
			>
				{loading ? "Sending..." : "Send Reset Link"}
			</button>
			{message && (
				<p
					className={`text-sm mt-2 ${
						message.includes("sent")
							? "text-themeColor"
							: "text-red-600"
					}`}
				>
					{message}
				</p>
			)}
		</form>
	);
}
