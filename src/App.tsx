import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToggleProvider } from "./context/ToggleContext";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import NotFoundPage from "./pages/NotFoundPage";
import AuthPage from "./pages/AuthPage";
import CategoryPage from "./pages/CategoryPage";
import UserProfilePage from "./pages/UserProfilePage";
import BookDetailsPage from "./pages/BookDetailsPage";
import SearchResultsPage from "./pages/SearchResultsPage";

import { SupabaseProvider } from "./context/SupabaseContext";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

const App: React.FC = () => {
	return (
		<ToggleProvider>
			<Router>
				<AuthProvider>
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
									path="/profile"
									element={<UserProfilePage />}
								/>
								<Route
									path="/login"
									element={<AuthPage mode={"login"} />}
								/>
								<Route
									path="/category/:categoryId"
									element={<CategoryPage />}
								/>
								<Route
									path="/search/:query"
									element={<SearchResultsPage />}
								/>
								<Route path="*" element={<NotFoundPage />} />

								<Route path="/login2" element={<Login />} />
								<Route path="/profile2" element={<Profile />} />
							</Route>
						</Routes>
					</SupabaseProvider>
				</AuthProvider>
			</Router>
		</ToggleProvider>
	);
};

export default App;
