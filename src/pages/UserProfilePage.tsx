// src/components/UserProfilePage.tsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"; // Assuming you have a context to fetch user data
import { db } from "../firebase"; // Your firebase config
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { getBooksById } from "../hooks/getBooksById";

const UserProfilePage: React.FC = () => {
	const { user } = useAuth(); // Get the current user from auth context
	const [profile, setProfile] = useState<any>(null); // User profile data
	const [loading, setLoading] = useState(true);
	const [favoriteBooks, setFavoriteBooks] = useState<any[]>([]);

	useEffect(() => {
		const fetchUserProfile = async () => {
			if (user) {
				try {
					const userDoc = doc(db, "users", user.uid); // Assuming 'users' is your collection
					const userSnapshot = await getDoc(userDoc);

					if (userSnapshot.exists()) {
						setProfile(userSnapshot.data());
					} else {
						toast.error("No profile data found.");
					}
				} catch (error) {
					toast.error("Error fetching profile data.");
				} finally {
					setLoading(false);
				}
			} else {
				toast.error("User not authenticated.");
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
				<div className="text-xl text-gray-600">
					Loading your profile...
				</div>
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
		<div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-100 to-purple-200">
			<div className="max-w-xl w-full p-8 bg-white rounded-xl shadow-lg space-y-6">
				{/* Profile Picture */}
				<div className="flex justify-center">
					<div className="w-24 h-24 rounded-full bg-indigo-500 text-white flex items-center justify-center text-2xl font-semibold">
						{profile.username?.charAt(0)?.toUpperCase()}
					</div>
				</div>

				{/* User Info */}
				<div className="text-center space-y-2">
					<h1 className="text-3xl font-bold text-gray-800">
						{profile.username}
					</h1>
					<p className="text-gray-600 text-lg">
						{profile.firstname} {profile.lastname}
					</p>
					<p className="text-indigo-600 text-sm">{user.email}</p>
				</div>

				{/* Bio/Description */}
				<div className="text-center">
					<p className="text-gray-700">
						{profile.bio || "This user hasn't set up a bio yet."}
					</p>
				</div>

				{/* Liked Categories */}
				<div className="space-y-1">
					<p className="text-center text-gray-600 text-sm">
						Liked Categories
					</p>
					<div className="flex justify-center gap-2 flex-wrap">
						{profile.likedcategories?.length > 0 ? (
							profile.likedcategories.map(
								(category: string, index: number) => (
									<span
										key={index}
										className="text-xs px-4 py-1 bg-indigo-600 text-white rounded-full"
									>
										{category}
									</span>
								)
							)
						) : (
							<span className="italic text-gray-500">
								No liked categories
							</span>
						)}
					</div>
				</div>

				{/* Favorite Books */}
				<div className="space-y-4">
					<p className="text-center text-gray-600 text-lg">
						Favorite Books
					</p>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
						{favoriteBooks.length > 0 ? (
							favoriteBooks.map((book, index) => (
								<p key={index}>{book?.title}</p>
							))
						) : (
							<span className="italic text-gray-500 text-center">
								No favorite books
							</span>
						)}
					</div>
				</div>

				{/* Joined Date */}
				<div className="text-center text-sm text-gray-500">
					<p>
						Joined on{" "}
						{profile.joined?.toDate().toLocaleDateString() ?? "N/A"}
					</p>
				</div>

				{/* Edit Profile Button */}
				<div className="mt-6 text-center">
					<button
						onClick={() => console.log("Navigate to edit profile")}
						className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md focus:outline-none hover:bg-indigo-700 transition-colors duration-300"
					>
						Edit Profile
					</button>
				</div>
			</div>
		</div>
	);
};

export default UserProfilePage;
