import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToggleProvider } from "./context/ToggleContext";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import NotFoundPage from "./pages/NotFoundPage";
import BookPage from "./pages/BookPage";
import AuthPage from "./pages/AuthPage";
const App: React.FC = () => {
	return (
		<ToggleProvider>
			<Router>
				<AuthProvider>
					<Routes>
						<Route path="/" element={<MainLayout />}>
							<Route index element={<HomePage />} />
							<Route path="/book/:id" element={<BookPage />} />
							<Route path="/register" element={<AuthPage />} />
							<Route path="/login" element={<AuthPage />} />
							<Route path="*" element={<NotFoundPage />} />
						</Route>
					</Routes>
				</AuthProvider>
			</Router>
		</ToggleProvider>
	);
};

export default App;
