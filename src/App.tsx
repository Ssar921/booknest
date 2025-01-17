import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Register from "./components/Register";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import MainLayout from "./layouts/MainLayout";
const App: React.FC = () => {
	return (
		<Router>
			<AuthProvider>
				<Routes>
					<Route path="/" element={<MainLayout />}>
						<Route index element={<HomePage />} />
						<Route path="/register" element={<Register />} />
						<Route path="/login" element={<Login />} />
					</Route>
				</Routes>
			</AuthProvider>
		</Router>
	);
};

export default App;
