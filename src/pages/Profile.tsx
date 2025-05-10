// src/pages/Profile.tsx
import { useEffect, useState } from "react";
import { useSupabase } from "../context/SupabaseContext";
import { supabase } from "../lib/supabaseClient";

const Profile = () => {
	const { user, signOut } = useSupabase();
	const [profileData, setProfileData] = useState<any>(null);
	const [favorites, setFavorites] = useState<any[]>([]);
	const [loadingProfile, setLoadingProfile] = useState<boolean>(true);
	const [loadingFavorites, setLoadingFavorites] = useState<boolean>(true);
	useEffect(() => {
		if (user) {
			// Fetch profile data
			const fetchProfileData = async () => {
				const { data, error } = await supabase
					.from("profiles")
					.select("*")
					.eq("id", user.id)
					.single(); // Assuming user has one profile
				if (data) {
					setProfileData(data);
				} else {
					console.error(error);
				}
				setLoadingProfile(false);
			};

			// Fetch favorites data
			const fetchFavorites = async () => {
				const { data, error } = await supabase
					.from("favorites")
					.select("*")
					.eq("user_id", user.id);
				if (data) {
					console.log(data);
					setFavorites(data);
				} else {
					console.error(error);
				}
				setLoadingFavorites(false);
			};

			fetchProfileData();
			fetchFavorites();
		}
	}, [user]);

	if (!user) {
		return (
			<div className="flex justify-center items-center h-screen">
				<p className="text-gray-600 text-lg">You are not logged in.</p>
			</div>
		);
	}

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
			<div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
				<h2 className="text-2xl font-bold mb-4 text-center">
					User Profile
				</h2>

				<div className="space-y-4 text-gray-800">
					<div>
						<span className="font-semibold">Email:</span>
						<p>{user.email}</p>
					</div>

					<div>
						<span className="font-semibold">User ID:</span>
						<p className="break-words">{user.id}</p>
					</div>

					<div>
						<span className="font-semibold">Created At:</span>
						<p>
							{new Date(user.created_at || "").toLocaleString()}
						</p>
					</div>

					{loadingProfile ? (
						<p>Loading profile data...</p>
					) : (
						<div>
							<h3 className="mt-6 text-xl font-semibold">
								Profile Info
							</h3>
							{profileData ? (
								<>
									<div>
										<span className="font-semibold">
											First Name:
										</span>
										<p>{profileData.first_name}</p>
									</div>
									<div>
										<span className="font-semibold">
											Last Name:
										</span>
										<p>{profileData.last_name}</p>
									</div>
								</>
							) : (
								<p>No profile data available</p>
							)}
						</div>
					)}

					{loadingFavorites ? (
						<p>Loading favorites...</p>
					) : (
						<div>
							<h3 className="mt-6 text-xl font-semibold">
								Your Favorites
							</h3>
							{favorites.length > 0 ? (
								<ul className="list-disc pl-6">
									{favorites.map((favorite) => (
										<li key={favorite.id}>
											<p>Book ID: {favorite.book_id}</p>
										</li>
									))}
								</ul>
							) : (
								<p>No favorites found.</p>
							)}
						</div>
					)}
				</div>

				<button
					onClick={signOut}
					className="mt-6 w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
				>
					Sign Out
				</button>
			</div>
		</div>
	);
};

export default Profile;
