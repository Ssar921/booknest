import BookGrid from "./BookGrid";
import useFetchBooks from "../hooks/useFetchBooks";

interface CategoryCarouselProps {
	query: string;
	categoryLink: string;
	categoryTitle: string;
}

const CategoryCarousel: React.FC<CategoryCarouselProps> = ({
	query,
	categoryLink,
	categoryTitle,
}) => {
	const { books, loading, error, retryFetch } = useFetchBooks(query);

	if (error) {
		return (
			<div className="error-message text-center p-4 flex-col">
				<h2 className="text-xl font-semibold text-red-600 font-serif">
					Error
				</h2>
				<p className="text-gray-600 mt-2">{error}</p>
				<button
					onClick={retryFetch}
					className="mt-4 px-6 py-1 bg-themeColor text-white rounded-md hover:bg-secondary-dark"
				>
					Retry
				</button>
			</div>
		);
	}

	return (
		<BookGrid
			title={categoryTitle}
			books={books}
			categoryLink={categoryLink}
			isLoading={loading}
		/>
	);
};

export default CategoryCarousel;
