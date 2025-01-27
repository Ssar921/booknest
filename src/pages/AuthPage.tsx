// src/components/AuthPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useToggleContext } from "../context/ToggleContext";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

interface AuthPageProps {
	mode: "login" | "register";
}

const AuthPage: React.FC<AuthPageProps> = ({ mode }) => {
	const { isToggled } = useToggleContext();
	const navigate = useNavigate();

	const handleSuccess = () => {
		navigate("/"); // Redirect after successful login/registration
	};

	return (
		<div
			className={`flex items-center justify-center min-h-screen ${
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
					{mode === "login" ? "Login" : "Register"}
				</h2>
				{mode === "login" ? (
					<LoginForm onSuccess={handleSuccess} />
				) : (
					<RegisterForm onSuccess={handleSuccess} />
				)}
			</div>
		</div>
	);
};

export default AuthPage;
