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
				themeColor: "#46745d", // Muted forest green
				background: {
					light: "#F3F5F1", // Soft olive tint
					dark: "#2E3B44", // Soft dark gray
				},
				text: {
					light: "#000000", // Light text color
					dark: "#f5f5f5", // Dark text color
				},
				primary: {
					light: "#F6F8F7", // Light Fog
					dark: "#3C4F59", // Muted Midnight blue
				},
				secondary: {
					light: "#F0F4F8", // Secondary color for light mode
					dark: "#2E3B44", // Secondary color for dark mode
				},
			},
		},
	},
	plugins: [],
};
