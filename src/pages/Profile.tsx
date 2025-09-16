import { useEffect, useState } from "react";
import { useSupabase } from "../context/SupabaseContext";
import { supabase } from "../lib/supabaseClient";
import ProfileHeader from "../components/profile/ProfileHeader";
import { FadeLoader } from "react-spinners";
import { getBooksById } from "../hooks/getBooksById";
import ProfileCarousel from "../components/ProfileCarousel";

const Profile = () => {
	const { user } = useSupabase();
	const [profileData, setProfileData] = useState<any>(null);
	const [favorites, setFavorites] = useState<any[]>([]);
	const [loadingProfile, setLoadingProfile] = useState<boolean>(true);
	const [loadingFavorites, setLoadingFavorites] = useState<boolean>(true);
	const [books, setBooks] = useState<any[]>([]); // State to store the book details
	const [loadingBooks, setLoadingBooks] = useState<boolean>(false); // State to track loading books

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
					console.log(data);
				} else {
					console.error(error);
				}
				setLoadingProfile(false);
			};

			// Fetch favorites data
			const fetchFavorites = async () => {
				console.log(user.id);
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

	useEffect(() => {
		if (favorites.length > 0) {
			// Extracting book IDs from the favorites
			const bookIds = favorites.map((favorite) => favorite.book_id);
			const fetchBooks = async () => {
				setLoadingBooks(true);
				const booksData = await getBooksById(bookIds);
				setBooks(booksData);
				console.log(books);
				setLoadingBooks(false);
			};
			fetchBooks();
		}
	}, [favorites]);
	const fullName = `${profileData?.first_name ?? ""} ${
		profileData?.last_name ?? ""
	}`.trim();

	if (!user) {
		return (
			<div className="flex justify-center items-center h-screen">
				<p className="text-gray-600 text-lg">You are not logged in.</p>
			</div>
		);
	}

	return (
		<>
			{loadingProfile ? (
				<div className="w-full min-h-[50vh] flex justify-center items-center">
					<FadeLoader />
				</div>
			) : (
				<div className="w-full">
					<ProfileHeader
						logoUrl={
							"profile.full_url ? profile.full_url : defaultImg"
						}
						fullname={fullName}
						joined_at={user.created_at}
					/>
				</div>
			)}

			{loadingFavorites ? (
				<p>Loading favorites...</p>
			) : (
				<ProfileCarousel books={books} isLoading={loadingBooks} />
			)}
		</>
	);
};

export default Profile;
