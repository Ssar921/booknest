import Carousel from "./Carousel";
import useFetchBooks from "../hooks/useFetchBooks";
import BookGrid from "./BookGrid";

interface CategoryCarouselProps {
	categoryTitle: string;
	query: string;
	categoryLink: string;
}

const CategoryCarousel: React.FC<CategoryCarouselProps> = ({
	categoryTitle,
	query,
	categoryLink,
}) => {
	const { books, loading, error, retryFetch } = useFetchBooks(query);

	if (error) {
		return (
			<div className="error-message text-center p-4 flex-col">
				<h2 className="text-xl font-semibold text-red-600">
					{categoryTitle}
				</h2>
				<p className="text-gray-600 mt-2">{error}</p>
				<button
					onClick={retryFetch}
					className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-all"
				>
					Retry
				</button>
			</div>
		);
	}

	return (
		// <Carousel
		// 	title={categoryTitle}
		// 	books={books}
		// 	categoryLink={categoryLink}
		// 	isLoading={loading}
		// />
		<BookGrid
			title={categoryTitle}
			books={books}
			categoryLink={categoryLink}
			isLoading={loading}
		/>
	);
};

export default CategoryCarousel;
