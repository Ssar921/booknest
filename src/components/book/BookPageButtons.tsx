import { VscOpenPreview } from "react-icons/vsc";
import FavoriteButton from "../AddFavorites";

interface BookPageButtonsProps {
	previewLink: string | undefined;
	bookId: string;
}

const BookPageButtons: React.FC<BookPageButtonsProps> = ({
	previewLink,
	bookId,
}) => {
	return (
		<div className="flex justify-start ml-44 mt-4 w-[90%] sm:w-[40%]">
			<FavoriteButton bookId={bookId} />

			{previewLink && (
				<a
					href={previewLink}
					target="_blank"
					rel="noopener noreferrer"
					className="px-5 py-2 border border-gray-300 rounded-lg text-gray-800 bg-transparent hover:bg-gray-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-themeColor focus:ring-opacity-50"
				>
					<VscOpenPreview size={20} />
				</a>
			)}
		</div>
	);
};

export default BookPageButtons;
