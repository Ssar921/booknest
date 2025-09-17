import { useEffect, useState } from "react";
import { useSupabase } from "../context/SupabaseContext";
import { supabase } from "../lib/supabaseClient";
import ProfileHeader from "../components/profile/ProfileHeader";
import { FadeLoader, MoonLoader } from "react-spinners";
import { getBooksById } from "../hooks/getBooksById";
import CarouselBook from "../components/CarouselBook";

const Profile = () => {
	const { user } = useSupabase();
	const [profileData, setProfileData] = useState<any>(null);
	const [favorites, setFavorites] = useState<any[]>([]);
	const [loadingProfile, setLoadingProfile] = useState<boolean>(true);
	const [loadingFavorites, setLoadingFavorites] = useState<boolean>(true);
	const [books, setBooks] = useState<any[]>([]); // State to store the book details
	const [loadingBooks, setLoadingBooks] = useState<boolean>(false); // State to track loading books
	const [errorLoadingBooks, setErrorLoadingBooks] = useState<string | null>(
		null
	); // Error state for loading books

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
					setFavorites(data);
				} else {
					console.error(error);
				}
				setLoadingFavorites(false);
			};

			fetchProfileData();
			fetchFavorites();
		}
	}, []);

	useEffect(() => {
		if (favorites.length > 0) {
			// Extracting book IDs from the favorites
			const bookIds = favorites.map((favorite) => favorite.book_id);
			const fetchBooks = async () => {
				setLoadingBooks(true);
				setErrorLoadingBooks(null); // Reset the error state
				try {
					const booksData = await getBooksById(bookIds);
					setBooks(booksData);
				} catch (error) {
					setErrorLoadingBooks(
						"Failed to load books. Please try again later."
					);
				} finally {
					setLoadingBooks(false);
				}
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
		<div className="mb-15 grid pb-15">
			{/* Loading Profile */}
			{loadingProfile ? (
				<div className="w-full min-h-[50vh] flex justify-center items-center">
					<FadeLoader />
				</div>
			) : (
				<div className="w-full">
					<ProfileHeader
						logoUrl={profileData?.full_url || "defaultImg"}
						fullname={fullName}
						joined_at={user.created_at}
					/>
				</div>
			)}

			{/* Loading Favorites */}
			{loadingFavorites ? (
				<div className="flex justify-center items-center h-full">
					<MoonLoader size={50} color="#4A90E2" />
				</div>
			) : (
				<div className="flex flex-wrap gap-4 justify-center mx-10 my-5">
					<h1 className="font-serif text-themeColor text-center text-2xl w-full font-bold">
						Your Favorites
					</h1>

					{/* Loading Books */}
					{loadingBooks ? (
						<div className="flex justify-center items-center h-full w-full">
							<MoonLoader size={50} color="#4A90E2" />
						</div>
					) : errorLoadingBooks ? (
						<div className="text-center text-red-500">
							<p>{errorLoadingBooks}</p>
						</div>
					) : books.length > 0 ? (
						books.map((book) => (
							<CarouselBook key={book.id} book={book} />
						))
					) : (
						<div className="flex justify-center items-center h-full">
							<p>No favorite books found.</p>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default Profile;
