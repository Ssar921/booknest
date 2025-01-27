import { useToggleContext } from "../context/ToggleContext";
import { useEffect } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface AuthPageProps {
	mode: "login" | "register";
}

const AuthPage: React.FC<AuthPageProps> = ({ mode }) => {
	const { isToggled } = useToggleContext();
	const { user } = useAuth(); // Accessing the current user from AuthContext
	const navigate = useNavigate();

	// Check if the user is already logged in and redirect them to their profile
	useEffect(() => {
		if (user) {
			navigate("/profile"); // Redirect to profile if logged in
		}
	}, [user, navigate]); // Dependency on user, so it runs when the user changes

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
				{mode === "login" ? <LoginForm /> : <RegisterForm />}
			</div>
		</div>
	);
};

export default AuthPage;
