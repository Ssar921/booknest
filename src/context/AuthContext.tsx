// src/context/Auth0Context.tsx

import React, { createContext, useContext, ReactNode } from "react";
import { useAuth0 } from "@auth0/auth0-react";

// Define the shape of the context data
interface AuthContextType {
	loginWithRedirect: () => void;
	logout: () => void;
	isAuthenticated: boolean;
	user: any;
	isLoading: boolean;
	error: any;
}

const Auth0Context = createContext<AuthContextType | undefined>(undefined);

interface AuthContextProviderProps {
	children: ReactNode;
}

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
	children,
}) => {
	const {
		loginWithRedirect,
		logout,
		isAuthenticated,
		user,
		isLoading,
		error,
	} = useAuth0();

	const value = {
		loginWithRedirect,
		logout,
		isAuthenticated,
		user,
		isLoading,
		error,
	};

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};

// Custom hook to use the Auth0 context in other components
const useAuthContext = (): Auth0ContextType => {
	const context = useContext(Auth0Context);
	if (!context) {
		throw new Error(
			"useAuth0Context must be used within an Auth0ContextProvider"
		);
	}
	return context;
};

export { AuthContextProvider, useAuthContext };
