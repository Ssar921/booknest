import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import placeholder from "../assets/images/book-placeholder.png";
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

const BookDetails: React.FC = () => {
	const { id } = useParams();
	const [book, setBook] = useState<BookData | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [showFullDescription, setShowFullDescription] =
		useState<boolean>(false);

	const tagStyle =
		"inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold mr-2 mb-2 cursor-pointer hover:bg-blue-200 transition ease-in-out duration-300";

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

	// Remove HTML tags from description
	const cleanDescription = description
		? description.replace(/<\/?[^>]+(>|$)/g, "").replace(/\n/g, "<br />")
		: "";

	const truncatedDescription =
		cleanDescription.length > 50
			? cleanDescription.substring(0, 50) + "..."
			: cleanDescription;

	return (
		<div className="w-full bg-gradient-to-r from-blue-50 to-blue-100 py-16">
			<div className="max-w-5xl mx-auto px-6 sm:px-8">
				{/* Back to Home Link */}
				<div className="mb-4">
					<Link
						to="/"
						className="text-blue-600 hover:text-blue-800 text-lg font-semibold"
					>
						&larr; Back to Home
					</Link>
				</div>

				<div className="bg-white rounded-xl shadow-xl overflow-hidden">
					<div className="flex flex-col sm:flex-row gap-6 sm:gap-12 p-8 sm:p-10">
						{/* Image */}
						<div className="flex-shrink-0 sm:w-48 w-full mx-auto sm:mx-0 h-full">
							<img
								src={imageLinks?.thumbnail || placeholder}
								alt={title}
								className="w-full h-full object-cover rounded-lg shadow-md"
							/>
						</div>

						{/* Book Details */}
						<div className="flex-1 space-y-4">
							<h1 className="text-5xl font-md text-gray-800 mb-2">
								{title}
							</h1>

							{/* Author */}
							<p className="text-lg text-gray-700 mb-2">
								{authors?.join(", ")}
							</p>

							{/* Description */}
							<div>
								<strong className="block text-lg text-gray-800">
									Description:
								</strong>
								<p className="text-sm text-gray-800">
									{showFullDescription
										? cleanDescription
										: truncatedDescription}
								</p>
								{cleanDescription.length > 50 && (
									<button
										onClick={() =>
											setShowFullDescription(
												!showFullDescription
											)
										}
										className="text-blue-500 mt-2 text-sm font-semibold"
									>
										{showFullDescription
											? "Show Less"
											: "Show More"}
									</button>
								)}
							</div>

							{/* Info Table */}
							<div className="mt-4">
								<table className="w-full text-sm text-gray-700">
									<tbody>
										<tr>
											<td className="py-2 font-semibold">
												Publisher:
											</td>
											<td>{publisher}</td>
										</tr>
										<tr>
											<td className="py-2 font-semibold">
												Published:
											</td>
											<td>{publishedDate}</td>
										</tr>
										<tr>
											<td className="py-2 font-semibold">
												Page Count:
											</td>
											<td>{pageCount}</td>
										</tr>
									</tbody>
								</table>
							</div>

							{/* Category Tags */}
							{categories && (
								<div className="flex flex-wrap gap-2 mt-4">
									{categories.map((category, index) => (
										<span key={index} className={tagStyle}>
											{category}
										</span>
									))}
								</div>
							)}

							{/* Preview Button */}
							{previewLink && (
								<a
									href={previewLink}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-block mt-4 py-2 px-6 rounded-full text-lg shadow-md border border-black font-semibold text-center hover:bg-gray-200 transition duration-300"
								>
									Preview this Book
								</a>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BookDetails;
