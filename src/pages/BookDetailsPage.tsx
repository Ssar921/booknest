import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import placeholder from "../assets/images/book-placeholder.jpg";
import { useToggleContext } from "../context/ToggleContext";
import FavoriteButton from "../components/FavoriteButton";
import { FaEye } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";

// Interface to type the book data.
interface BookData {
	id: string;
	volumeInfo: {
		title: string;
		authors: string[];
		publisher: string;
		publishedDate: string;
		description: string;
		pageCount: number;
		categories?: string[];
		imageLinks?: {
			thumbnail: string;
		};
		previewLink?: string;
	};
}

const BookDetailsPage: React.FC = () => {
	const { isToggled } = useToggleContext();
	const { id } = useParams();
	const [book, setBook] = useState<BookData | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [showFullDescription, setShowFullDescription] =
		useState<boolean>(false);

	useEffect(() => {
		const fetchBookDetails = async () => {
			try {
				if (id) {
					const response = await fetch(
						`https://www.googleapis.com/books/v1/volumes/${id}`
					);
					const data = await response.json();

					if (data.error || !data.volumeInfo) {
						throw new Error(
							"Invalid Book ID or missing book information"
						);
					}

					setBook(data); // Set the book state only if data is valid
				}
			} catch (err) {
				console.error("Failed to fetch book details", err);
				// Handle the error properly (e.g., show "Book not found" message)
				setBook(null);
			} finally {
				setLoading(false);
			}
		};

		if (id) {
			fetchBookDetails();
		}
	}, [id]);
	// Loader if data is still being fetched.
	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<ClipLoader color="#3498db" loading={loading} size={50} />
			</div>
		);
	}

	// If no book found.
	if (!book) {
		return (
			<div className="text-center text-xl text-red-500">
				Book not found!
			</div>
		);
	}

	const {
		title,
		authors,
		description,
		publishedDate,
		publisher,
		pageCount,
		imageLinks,
		categories,
		previewLink,
	} = book.volumeInfo;

	return (
		<div
			className={`min-h-screen pb-5 ${
				isToggled
					? "text-gray-300 bg-background-dark"
					: "text-black bg-background-light"
			}`}
		>
			{/* Blue Header */}
			<div className="bg-themeColor h-40 relative">
				<div className="absolute inset-x-0 -bottom-16 mx-auto w-32 h-48 shadow-lg rounded-lg overflow-hidden">
					<img
						src={imageLinks?.thumbnail || placeholder}
						alt={title}
						className="object-cover w-full h-full"
					/>
				</div>
			</div>

			{/* Book Details */}
			<div className={`mt-20 px-6 md:px-20 mx-auto `}>
				{/* Title and Author */}
				<h1 className="text-2xl font-extrabold text-center font-serif">
					{title || <Skeleton />}
				</h1>
				<p className="text-gray-600 text-center mt-2">
					{authors?.join(", ")}
				</p>

				{/* Book Info */}
				<div className="flex justify-between space-x-4 mt-6 mx-auto w-[90%] sm:w-[40%]">
					{[
						{ label: "Pages", value: pageCount },
						{ label: "Publisher", value: publisher.split(" ")[0] },
						{ label: "Year", value: publishedDate.split("-")[0] },
					].map((item, index) => (
						<div
							key={index}
							className={`flex flex-col justify-between text-center ${
								isToggled ? "bg-gray-800" : "bg-gray-100"
							} p-2 rounded-lg shadow-lg w-1/3 sm:w-1/4 h-24`}
						>
							<p className="text-gray-600 text-sm border-b border-gray-400 flex items-center justify-center h-1/2">
								{item.label}
							</p>
							<p className="text-black text-lg font-semibold flex items-center justify-center h-1/2">
								{item.value}
							</p>
						</div>
					))}
				</div>
				<FavoriteButton bookId={book?.id} />

				{/* Description */}
				<p className=" mt-6 leading-relaxed text-center">
					{description ? description : "No description to show"}
				</p>

				{/* CTA Buttons */}
				<div className="flex justify-center mt-8 space-x-4">
					<a
						href={previewLink}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
					>
						<FaEye className="mr-2" />
						Preview
					</a>
				</div>
			</div>
		</div>
	);
};

export default BookDetailsPage;
