// src/context/AuthContext.tsx
import {
	createContext,
	useState,
	useEffect,
	ReactNode,
	useContext,
} from "react";
import {
	auth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "../firebase"; // <-- Add signOut import here
import { onAuthStateChanged, User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase"; // Firestore instance

// Define the type for the context
interface AuthContextType {
	user: User | null;
	isLoading: boolean;
	login: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	signup: (
		email: string,
		password: string,
		username: string,
		firstname: string,
		lastname: string
	) => Promise<void>;
}

// Create the context
export const AuthContext = createContext<AuthContextType | undefined>(
	undefined
);

// Create the provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		// Firebase listener for auth state changes
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user); // Set the user object or null if logged out
			setIsLoading(false);
		});

		return () => unsubscribe(); // Clean up the listener on unmount
	}, []);

	// Handle login
	const login = async (email: string, password: string) => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
			navigate("/"); // Redirect after successful login
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	// Handle signup with additional fields
	const signup = async (
		email: string,
		password: string,
		username: string,
		firstname: string,
		lastname: string
	) => {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;

			// Add additional user information to Firestore
			await setDoc(doc(db, "users", user.uid), {
				email: user.email,
				username,
				firstname,
				lastname,
				likedcategories: [],
				joined: Timestamp.now(), // Automatically add the timestamp for when the user joined
			});

			navigate("/"); // Redirect after successful signup
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	// Handle logout
	const logout = async () => {
		try {
			await signOut(auth); // This is where the signOut function is used
			navigate("/"); // Redirect after logout
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	return (
		<AuthContext.Provider
			value={{ user, isLoading, login, logout, signup }}
		>
			{children}
		</AuthContext.Provider>
	);
};

// Custom hook to access the AuthContext
export const useAuth = () => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	return context;
};
