import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import ForgotPassword from "../auth/ForgotPassword";
import ResetPassword from "../auth/ResetPassword";
import { useToggleContext } from "../../context/ToggleContext";

export default function ForgotPasswordPage() {
	const [mode, setMode] = useState<"forgot" | "reset">("forgot");
	const [success, setSuccess] = useState(false);
	const navigate = useNavigate();
	const { isToggled } = useToggleContext();

	useEffect(() => {
		(async () => {
			const { data } = await supabase.auth.getSession();
			if (data.session) {
				setMode("reset");
			}
		})();
	}, []);

	const handleResetSuccess = () => {
		setSuccess(true);
		setTimeout(() => navigate("/login"), 2000);
	};

	const handleEmailSent = () => {
		// Optional: track email sent state
	};

	if (success) {
		return (
			<div
				className={`flex items-center justify-center sm:min-h-screen ${
					isToggled ? "bg-background-dark" : "bg-background-light"
				}`}
			>
				<div
					className={`w-full max-w-md p-8 space-y-6 rounded-lg shadow-md ${
						isToggled ? "bg-primary-dark" : "bg-primary-light"
					}`}
				>
					<h2
						className={`text-3xl font-bold text-center font-serif ${
							isToggled
								? "text-secondary-light"
								: "text-secondary-dark"
						}`}
					>
						Success
					</h2>
					<p className="text-center mt-10">
						Your password was reset successfully. Redirecting...
					</p>
				</div>
			</div>
		);
	}

	return (
		<div
			className={`flex items-center justify-center sm:min-h-screen ${
				isToggled ? "bg-background-dark" : "bg-background-light"
			}`}
		>
			<div
				className={`w-full max-w-md p-8 space-y-6 rounded-lg shadow-md ${
					isToggled ? "bg-primary-dark" : "bg-primary-light"
				}`}
			>
				<h2
					className={`text-3xl font-bold text-center font-serif ${
						isToggled
							? "text-secondary-light"
							: "text-secondary-dark"
					}`}
				>
					{mode === "reset" ? "Reset Password" : "Forgot Password"}
				</h2>
				{mode === "reset" ? (
					<ResetPassword onSuccess={handleResetSuccess} />
				) : (
					<ForgotPassword onEmailSent={handleEmailSent} />
				)}
			</div>
		</div>
	);
}
