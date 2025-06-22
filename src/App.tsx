import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToggleProvider } from "./context/ToggleContext";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import NotFoundPage from "./pages/NotFoundPage";
import AuthPage from "./pages/AuthPage";
import CategoryPage from "./pages/CategoryPage";
import BookDetailsPage from "./pages/BookDetailsPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import ForgotPasswordPage from "./components/auth/ForgotPasswordPage";
import { SupabaseProvider } from "./context/SupabaseContext";
import Profile from "./pages/Profile";

const App: React.FC = () => {
	return (
		<ToggleProvider>
			<Router>
				<SupabaseProvider>
					<Routes>
						<Route path="/" element={<MainLayout />}>
							<Route index element={<HomePage />} />
							<Route
								path="/book/:id"
								element={<BookDetailsPage />}
							/>
							<Route
								path="/register"
								element={<AuthPage mode={"register"} />}
							/>
							<Route
								path="/login"
								element={<AuthPage mode={"login"} />}
							/>
							{/* <Route
								path="/profile"
								element={<UserProfilePage />}
							/> */}
							<Route
								path="/category/:categoryId"
								element={<CategoryPage />}
							/>
							<Route
								path="/search/:query"
								element={<SearchResultsPage />}
							/>
							<Route path="*" element={<NotFoundPage />} />

							<Route path="/profile" element={<Profile />} />

							<Route
								path="/forgot-password"
								element={<ForgotPasswordPage />}
							/>
						</Route>
					</Routes>
				</SupabaseProvider>
			</Router>
		</ToggleProvider>
	);
};

export default App;
