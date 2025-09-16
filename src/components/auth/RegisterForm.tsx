import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import VerifyEmailPrompt from "./VerifyEmailPrompt";
import { ClipLoader } from "react-spinners";

const inputClass = `mt-1 block w-full px-3 py-2 bg-transparent border-b text-sm border-b-gray-300 focus:outline-none focus:ring-themeColor focus:border-themeColor sm:text-sm text-secondary-dark`;

export default function RegisterForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [step, setStep] = useState<"form" | "verify">("form");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		if (!email || !password) {
			setError("Please fill in all required fields.");
			setLoading(false);
			return;
		}

		const { error } = await supabase.auth.signUp({ email, password });

		if (error) {
			setError(error.message);
			setLoading(false);
		} else {
			setStep("verify");
			setLoading(false);
		}
	};

	if (step === "verify") {
		return <VerifyEmailPrompt email={email} />;
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-4 ">
			<div>
				<input
					id="email"
					type="email"
					required
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className={inputClass}
				/>
			</div>

			<div>
				<input
					id="password"
					type="password"
					required
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className={inputClass}
				/>
			</div>

			{error && <p className="text-sm text-red-500">{error}</p>}

			<button
				type="submit"
				disabled={loading}
				className="w-full py-2 px-4 bg-themeColor text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-themeColor focus:ring-opacity-50 disabled:opacity-50 hover:bg-secondary-dark transition-colors duration-300"
			>
				{loading ? <ClipLoader size={24} color="#fff" /> : "Register"}
			</button>
			<small className="w-full flex items-center justify-center py-1">
				Already have an account?
				<Link
					to="/login"
					className="px-1 transition-all font-serif text-themeColor"
				>
					Log in
				</Link>
			</small>
		</form>
	);
}
