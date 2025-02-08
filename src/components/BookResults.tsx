import { Book } from "../types";
import SearchBar from "./SearchBar";
import CarouselBook from "./CarouselBook";
import Skeleton from "react-loading-skeleton";
import { useToggleContext } from "../context/ToggleContext";

interface BookResultsProps {
	booksPerPage: number;
	title: string;
	loading: boolean;
	error: string | null;
	books: Book[];
}

const BookResults: React.FC<BookResultsProps> = ({
	booksPerPage,
	title,
	loading,
	error,
	books,
}) => {
	const { isToggled } = useToggleContext();

	const renderSkeletons = () => {
		return Array(booksPerPage)
			.fill(null)
			.map((_, index) => (
				<div className="p-4 flex items-center" key={index}>
					<Skeleton width="22vw" height="20vh" key={index} />
				</div>
			));
	};

	return (
		<div
			className={`w-full mx-auto ${
				isToggled
					? "bg-background-dark text-text-dark"
					: "bg-background-light text-text-light"
			}`}
		>
			<div className="bg-themeColor flex flex-col justify-center pb-4 px-6 text-white">
				<h1 className="text-3xl font-bold font-serif text-center mx-auto w-1/3 text-secondary-dark">
					{title}
				</h1>
				<SearchBar />
			</div>

			{loading ? (
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
					{renderSkeletons()}
				</div>
			) : error ? (
				// Show error if any
				<div
					className={`text-red-500 text-center font-serif pt-[20vh] min-h-[90vh] ${
						isToggled ? "bg-background-dark" : "bg-background-light"
					}`}
				>
					{error}
				</div>
			) : (
				<div className="flex justify-center flex-wrap">
					{books.map((book) => (
						<CarouselBook book={book} key={book.id} />
					))}
				</div>
			)}
		</div>
	);
};
export default BookResults;
