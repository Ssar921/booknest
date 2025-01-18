import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the shape of the context value
interface ToggleContextType {
	isToggled: boolean;
	setIsToggled: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context with a default value
const ToggleContext = createContext<ToggleContextType | undefined>(undefined);

// Custom hook to use the ToggleContext
export const useToggleContext = (): ToggleContextType => {
	const context = useContext(ToggleContext);
	if (!context) {
		throw new Error(
			"useToggleContext must be used within a ToggleProvider"
		);
	}
	return context;
};

// Define props for the provider component
interface ToggleProviderProps {
	children: ReactNode;
}

// ToggleProvider component
export const ToggleProvider: React.FC<ToggleProviderProps> = ({ children }) => {
	const [isToggled, setIsToggled] = useState<boolean>(false);

	return (
		<ToggleContext.Provider value={{ isToggled, setIsToggled }}>
			{children}
		</ToggleContext.Provider>
	);
};
