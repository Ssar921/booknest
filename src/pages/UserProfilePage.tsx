import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"; // Assuming you have a context to fetch user data
import { db } from "../firebase"; // Your firebase config
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { getBooksById } from "../hooks/getBooksById";
import { useNavigate, Link } from "react-router-dom";
import { ClipLoader } from "react-spinners"; // Added for the loader
import CarouselBook from "../components/CarouselBook";
import { useToggleContext } from "../context/ToggleContext";

const UserProfilePage: React.FC = () => {
	const { isToggled } = useToggleContext();
	const { user } = useAuth(); // Get the current user from auth context
	const [profile, setProfile] = useState<any>(null); // User profile data
	const [loading, setLoading] = useState(true);
	const [favoriteBooks, setFavoriteBooks] = useState<any[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUserProfile = async () => {
			if (user) {
				try {
					const userDoc = doc(db, "users", user.uid); // Assuming 'users' is your collection
					const userSnapshot = await getDoc(userDoc);

					if (userSnapshot.exists()) {
						setProfile(userSnapshot.data());
					} else {
						navigate("/login");
						toast.error(
							"You must be logged in to view this profile."
						);
					}
				} catch (error) {
					toast.error("Error fetching profile data.");
				} finally {
					setLoading(false);
				}
			} else {
				navigate("/login");
				toast.error("You must be logged in to view this profile.");
				setLoading(false);
			}
		};

		const fetchFavoriteBooks = async () => {
			if (user && profile) {
				try {
					const favorites = profile?.favorites || []; // Get the favorites array from the profile

					if (favorites.length > 0) {
						// Fetch book details for each bookId in favorites
						const booksData = await getBooksById(favorites);
						setFavoriteBooks(booksData);
					}
				} catch (error) {
					toast.error("Error fetching favorite books.");
				}
			}
		};

		fetchFavoriteBooks();
		fetchUserProfile();
	}, [user, profile]);

	if (loading) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<ClipLoader color="#3498db" loading={loading} size={50} />
			</div>
		);
	}

	if (!user) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<div className="text-xl text-gray-600">
					Please log in to view your profile.
				</div>
			</div>
		);
	}

	if (!profile) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<div className="text-xl text-gray-600">Profile not found.</div>
			</div>
		);
	}

	return (
		<div
			className={`min-h-screen pb-5 ${
				user ? "bg-background-light" : "bg-background-dark"
			}`}
		>
			{/* Green Cover Banner */}
			<div className="bg-themeColor h-40 relative">
				{/* Profile Picture */}
				<div className="absolute inset-x-0 bottom-[-35%] mx-auto overflow-hidden">
					<div className="mx-auto inset-x-0 w-32 h-32 rounded-full bg-themeColor border-2 text-white flex items-center justify-center text-4xl font-semibold">
						{profile.username?.charAt(0)?.toUpperCase()}
					</div>
				</div>
			</div>

			{/* Profile Card */}
			<div className="max-w-xl w-full p-8 space-y-6 mx-auto mt-10">
				{/* Profile Info */}
				<div className="text-center space-y-2">
					<h1 className="text-3xl font-extrabold text-gray-800 font-serif">
						{profile.username}
					</h1>
					<p className="text-gray-600 text-lg">
						{profile.firstname} {profile.lastname}
					</p>
					<p className="text-themeColor text-sm">{user.email}</p>
				</div>

				<div
					className={`flex-col justify-center space-x-4 my-2 mx-auto w-[90%] sm:w-[40%] h-24 ${
						isToggled
							? " bg-primary-dark text-text-dark shadow-md shadow-black"
							: " bg-primary-light text-text-light shadow-md shadow-gray-400"
					}  p-1 rounded-lg shadow-lg`}
				>
					<p className="text-themeColor text-sm font-semibold border-b border-gray-400 flex items-center justify-center h-1/2">
						Joined On
					</p>
					<p className="text-secondary-dark text-lg font-semibold flex items-center justify-center h-1/2">
						{profile.joined?.toDate().toLocaleDateString() ?? "N/A"}
					</p>
				</div>

				{/* Favorite Books */}
				<div className="space-y-4">
					<p className="text-center text-gray-600 text-lg">
						Favorite Books
					</p>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
						{favoriteBooks.length > 0 ? (
							favoriteBooks.map((book, index) => (
								<CarouselBook book={book} />
							))
						) : (
							<span className="italic text-gray-500 text-center">
								No favorite books
							</span>
						)}
					</div>
				</div>

				{/* Bio/Description */}
				<div className="text-center mt-6">
					<p className="text-gray-700">
						{profile.bio || "This user hasn't set up a bio yet."}
					</p>
				</div>

				{/* Edit Profile Button */}
				<div className="mt-6 text-center">
					<button
						onClick={() => console.log("Navigate to edit profile")}
						className="w-full py-2 px-4 bg-themeColor text-white font-semibold rounded-md shadow-md focus:outline-none hover:bg-secondary-dark transition-colors duration-300"
					>
						Edit Profile
					</button>
				</div>
			</div>
		</div>
	);
};

export default UserProfilePage;
