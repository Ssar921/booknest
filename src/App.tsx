import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToggleProvider } from "./context/ToggleContext";
import Register from "./components/Register";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import MainLayout from "./layouts/MainLayout";
import NotFoundPage from "./pages/NotFoundPage";
import BookDetails from "./components/BookDetails";

const App: React.FC = () => {
	return (
		<ToggleProvider>
			<Router>
				<AuthProvider>
					<Routes>
						<Route path="/" element={<MainLayout />}>
							<Route index element={<HomePage />} />
							<Route path="/book/:id" element={<BookDetails />} />
							<Route path="/register" element={<Register />} />
							<Route path="/login" element={<Login />} />
							<Route path="*" element={<NotFoundPage />} />
						</Route>
					</Routes>
				</AuthProvider>
			</Router>
		</ToggleProvider>
	);
};

export default App;
