import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import { getBooksById } from "../hooks/getBooksById";
import { useToggleContext } from "../context/ToggleContext";
import BookComments from "../components/book/BookComments";
import BookDescription from "../components/book/BookDescription";
import BookHeader from "../components/book/BookHeader";
import BookPageButtons from "../components/book/BookPageButtons";
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

	return (
		<div
			className={`min-h-screen pb-5 ${
				isToggled
					? "text-gray-300 bg-background-dark"
					: "text-black bg-background-light"
			}`}
		>
			{/* Header */}
			<BookHeader
				title={title}
				thumbnail={imageLinks?.thumbnail || null}
				author={authors || []}
				pages={pageCount}
				publisher={publisher}
				year={publishedDate}
			/>

			{/* CTA Buttons */}
			<BookPageButtons previewLink={previewLink} bookId={book.id} />

			{/* Description */}
			<div className="flex flex-wrap justify-around w-full mt-4 mb-10">
				<BookDescription description={description} />
				<BookComments bookId={book?.id} />
			</div>
		</div>
	);
};

export default BookDetailsPage;
