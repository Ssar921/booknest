import { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import Skeleton from "react-loading-skeleton";
import { getBooksById } from "../hooks/getBooksById";
// import AddFavorites from "../components/AddFavorites";
import { useToggleContext } from "../context/ToggleContext";
import placeholder from "../assets/images/book-placeholder.jpg";
import BookComments from "../components/BookComments";
import FavoriteButton from "../components/AddFavorites";
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
					const booksData = await getBooksById([id]);
					// const response = await fetch(
					// 	`https://www.googleapis.com/books/v1/volumes/${id}`
					// );
					// const data = await response.json();
					const data = booksData[0];
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
			<div className="flex flex-wrap justify-center items-start h-screen">
				<div className="bg-themeColor h-40 w-full"></div>
				<FadeLoader color="#46745d" loading={loading} />
			</div>
		);
	}

	// If no book found.
	if (!book) {
		return (
			<div className="text-center bg-themeColor pt-5 h-40 text-red-500">
				<h1 className="font-serif font-bold text-4xl">
					Book Not Found
				</h1>
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
		previewLink,
	} = book.volumeInfo;

	let truncatedDescription = "";
	if (description) {
		truncatedDescription = description.substring(0, 200);
	}
	return (
		<div
			className={`min-h-screen pb-5 ${
				isToggled
					? "text-gray-300 bg-background-dark"
					: "text-black bg-background-light"
			}`}
		>
			{/* Header */}
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
			<div className={`mt-20 px-6 md:px-20 mx-auto`}>
				{/* Title and Author */}
				<h1 className="text-2xl font-extrabold text-center font-serif">
					{title || <Skeleton />}
				</h1>
				<p className="text-gray-600 text-center mt-2 mx-auto w-[90%] sm:w-[40%]">
					{authors?.join(", ")}
				</p>

				{/* Book Info */}
				<div
					className={`flex justify-between space-x-4 my-2 mx-auto w-[90%] sm:w-[40%] ${
						isToggled
							? " bg-primary-dark text-text-dark shadow-md shadow-black"
							: " bg-primary-light text-text-light shadow-md shadow-gray-400"
					}  p-1 rounded-lg shadow-lg`}
				>
					{[
						{ label: "Pages", value: pageCount },
						{ label: "Publisher", value: publisher.split(" ")[0] },
						{ label: "Year", value: publishedDate.split("-")[0] },
					].map((item, index) => (
						<div
							key={index}
							className={`flex flex-col justify-between text-center w-1/3 sm:w-1/4 h-24`}
						>
							<p className="text-themeColor text-sm font-semibold border-b border-gray-400 flex items-center justify-center h-1/2">
								{item.label}
							</p>
							<p className="text-secondary-dark text-lg font-semibold flex items-center justify-center h-1/2">
								{item.value}
							</p>
						</div>
					))}
				</div>
				{/* CTA Buttons */}
				<div className="flex justify-center my-4 mx-auto w-[90%] sm:w-[40%]">
					<FavoriteButton bookId={book?.id} />

					<a
						href={previewLink}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center justify-center w-full max-w-xs px-5 py-2 border border-gray-300 rounded-lg text-gray-800 bg-transparent hover:bg-gray-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-themeColor focus:ring-opacity-50"
					>
						<FaEye className="mr-2" />
						<span className="font-medium">Preview</span>
					</a>
				</div>

				{/* <AddFavorites bookId={book?.id} /> */}
				<BookComments bookId={book?.id} />

				{/* Description */}
				<div className="mt-6 leading-relaxed text-center">
					{description && !showFullDescription ? (
						// Render the truncated HTML content and add ellipsis at the end
						<div
							dangerouslySetInnerHTML={{
								__html: `${truncatedDescription}...`,
							}}
						/>
					) : (
						// Render the full description as HTML
						<div
							dangerouslySetInnerHTML={{ __html: description }}
						/>
					)}
				</div>

				{/* Show/Hide Full Description Button */}
				{description && description.length > 200 && (
					<div className="text-center mt-4">
						<button
							onClick={() =>
								setShowFullDescription(!showFullDescription)
							}
							className="text-themeColor font-semibold hover:underline"
						>
							{showFullDescription ? "Show Less" : "Read More"}
						</button>
					</div>
				)}

				<div className="mt-6 leading-relaxed text-center">
					{!description && <p>No Description To Show</p>}
				</div>
			</div>
		</div>
	);
};

export default BookDetailsPage;
