import { GiBookCover } from "react-icons/gi";

interface BookHeaderProps {
	title: string | null;
	thumbnail: string | null;
	author: string[];
	pages: number | null;
	publisher: string | null;
	year: string | null;
}

const BookHeader: React.FC<BookHeaderProps> = ({
	title,
	thumbnail,
	author,
	pages,
	publisher,
	year,
}) => {
	const tagStyle = "pr-2 text-sm w-max";
	return (
		<>
			<div className="bg-themeColor h-40 relative flex justify-start px-10">
				{/* Thumbnail */}
				<div
					className="mx-auto w-32 h-48 shadow-lg rounded-lg overflow-hidden b
                order"
				>
					{thumbnail ? (
						<img
							src={thumbnail}
							alt={title || "image"}
							className="object-cover w-full h-full"
						/>
					) : (
						<GiBookCover />
					)}
				</div>
				{/* Title */}
				<div className="flex flex-wrap items-end w-[90%] p-4">
					<h1 className="text-2xl w-full font-extrabold font-serif">
						{title}
					</h1>
					{/* Misc */}
					<div className="flex">
						<div className={tagStyle}>
							{pages && (
								<p>
									<strong className="text-white font-medium">
										Pages:
									</strong>{" "}
									{pages}
								</p>
							)}
						</div>

						<div className={tagStyle}>
							{publisher && (
								<p>
									<strong className="text-white font-medium">
										Published By:
									</strong>{" "}
									{publisher}
								</p>
							)}
						</div>

						<div className={tagStyle}>
							{year && (
								<p>
									<strong className="text-white font-medium">
										Published In:
									</strong>{" "}
									{year}
								</p>
							)}
						</div>
					</div>
					{/* Author */}
					<p className="w-full text-sm">{author?.join(", ")}</p>
				</div>
			</div>
		</>
	);
};

export default BookHeader;
