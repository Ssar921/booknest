import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import { useSupabase } from "../../context/SupabaseContext";

interface Props {
	email: string;
}

export default function VerifyEmailPrompt({ email }: Props) {
	const { user } = useSupabase();
	const [cooldown, setCooldown] = useState(30);
	const [disabled, setDisabled] = useState(true);
	const cooldownRef = useRef<NodeJS.Timeout | null>(null);
	const profileCreated = useRef(false);
	const navigate = useNavigate();

	useEffect(() => {
		const createProfileIfNotExists = async () => {
			if (!user || profileCreated.current) return;

			const { data } = await supabase
				.from("profiles")
				.select("id")
				.eq("id", user.id)
				.single();

			if (!data) {
				const placeholderDOB = "1900-01-01";
				const { error: upsertError } = await supabase
					.from("profiles")
					.upsert({
						id: user.id,
						username: user.email ?? email,
						dob: placeholderDOB,
					});
				if (upsertError) {
					console.error(
						"Error creating profile:",
						upsertError.message
					);
					// optionally show error or retry logic here
					return;
				}
			}

			profileCreated.current = true;
			navigate("/");
		};

		createProfileIfNotExists();
	}, [user, email, navigate]);

	const handleResend = async () => {
		setDisabled(true);
		setCooldown(30);

		await supabase.auth.resend({
			type: "signup",
			email,
		});
	};

	// Cooldown timer
	useEffect(() => {
		if (disabled) {
			cooldownRef.current = setInterval(() => {
				setCooldown((c) => {
					if (c <= 1) {
						clearInterval(cooldownRef.current!);
						setDisabled(false);
						return 0;
					}
					return c - 1;
				});
			}, 1000);
		}

		return () => {
			if (cooldownRef.current) clearInterval(cooldownRef.current);
		};
	}, [disabled]);

	return (
		<div className="text-center space-y-4">
			{/* <h2 className="text-lg font-semibold">Verify Your Email</h2> */}
			<p className="text-secondary-dark">
				A verification link has been sent to{" "}
				<strong className="text-black font-medium">{email}</strong>.
				<br />
			</p>
			<p className="text-sm text-secondary-dark">
				Please check your inbox.
			</p>
			<button
				onClick={handleResend}
				disabled={disabled}
				className={`w-full py-2 px-4 bg-themeColor text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-themeColor focus:ring-opacity-50 disabled:opacity-50 hover:bg-secondary-dark transition-colors duration-300`}
			>
				{disabled ? `Resend in ${cooldown}s` : "Resend Email"}
			</button>
		</div>
	);
}
