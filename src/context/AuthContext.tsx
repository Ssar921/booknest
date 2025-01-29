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
	db,
} from "../firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

// Context type defined
interface AuthContextType {
	user: User | null;
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

// Custom hook to access the AuthContext
export const useAuth = () => {
	const context = useContext(AuthContext);
	// Error message if context is accessed outside of auth
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

interface AuthProviderProps {
	children: ReactNode;
}

// Create the provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		// Firebase listener for auth state changes
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user); // Set the user object or null if logged out
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
			await signOut(auth); // Sign user out
			navigate("/"); // Redirect after logout
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	return (
		<AuthContext.Provider value={{ user, login, logout, signup }}>
			{children}
		</AuthContext.Provider>
	);
};
