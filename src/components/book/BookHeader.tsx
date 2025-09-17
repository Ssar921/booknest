import { GiBookCover } from "react-icons/gi";
import { useToggleContext } from "../../context/ToggleContext";

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
	const tagStyle = "pr-2 text-sm w-max border m-2 p-2 rounded-full shadow-lg";
	const strongStyle = "font-medium";
	const { isToggled } = useToggleContext();

	return (
		<>
			<div
				className={`${
					isToggled
						? "bg-[linear-gradient(to_bottom,_#46745d_60%,_#2e3b44_60%)]" // Dark Mode Gradient
						: "bg-[linear-gradient(to_bottom,_#46745d_60%,_#f3f5f1_60%)]"
				} 
    relative flex lg:flex-nowrap flex-wrap justify-start lg:p-10`}
			>
				{/* Thumbnail */}
				<div
					className="mx-auto min-w-32 min-h-48 shadow-lg rounded-lg overflow-hidden b
                order"
				>
					{thumbnail ? (
						<img
							src={thumbnail}
							alt={title || "image"}
							className="object-cover w-full h-full"
						/>
					) : (
						<div className="w-32 h-48 bg-white">
							<GiBookCover className="w-32 h-48 text-themeColor" />
						</div>
					)}
				</div>
				{/* Title */}
				<div className="flex flex-wrap lg:items-end lg:w-[90%] sm:w-full lg:p-4">
					<h1 className="text-3xl text-white w-screen font-extrabold font-serif text-center lg:text-left">
						{title}
					</h1>
					{/* Author */}
					<p className="w-full text-md font-bold text-center lg:text-left">
						{author?.join(", ")}
					</p>
					{/* Misc */}
					<div className="flex flex-wrap">
						<div className={tagStyle}>
							{pages && (
								<p>
									<strong className={strongStyle}>
										Pages:
									</strong>{" "}
									{pages}
								</p>
							)}
						</div>

						<div className={tagStyle}>
							{publisher && (
								<p>
									<strong className={strongStyle}>
										Published By:
									</strong>{" "}
									{publisher}
								</p>
							)}
						</div>

						<div className={tagStyle}>
							{year && (
								<p>
									<strong className={strongStyle}>
										Published:
									</strong>{" "}
									{year}
								</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default BookHeader;
