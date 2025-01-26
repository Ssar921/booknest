/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Poppins", "sans-serif"],
				serif: ["Bodoni Moda", "serif"],
			},
			colors: {
				// Define the colors for both light and dark modes
				background: {
					light: "#f0f8ff", // Light background color
					dark: "#181818", // Dark background color
				},
				text: {
					light: "#000000", // Light text color
					dark: "#f5f5f5", // Dark text color
				},
				themeColor: "#4C8C8A", // Dusty blue
				primary: {
					light: "#FFDD57", // Primary color for light mode
					dark: "#FF5722", // Primary color for dark mode
				},
				secondary: {
					light: "#F0F4F8", // Secondary color for light mode
					dark: "#2C3E50", // Secondary color for dark mode
				},
				button: {
					signupLight: "#0061f2", // Signup button color for light mode
					signupDark: "#0050c5", // Signup button color for dark mode
					logoutLight: "#ff4e00", // Logout button color for light mode
					logoutDark: "#e03e00", // Logout button color for dark mode
				},
			},
		},
	},
	plugins: [
		function ({ addComponents, theme }) {
			addComponents({
				".dark-mode-basic": {
					backgroundColor: theme("colors.background.dark"),
					color: theme("colors.text.dark"),
				},
				".light-mode-basic": {
					backgroundColor: theme("colors.background.light"),
					color: theme("colors.text.light"),
				},
			});
		},
	],
};
