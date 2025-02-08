import { useToggleContext } from "../context/ToggleContext";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
}) => {
	const { isToggled } = useToggleContext();
	const pages = [...Array(totalPages).keys()].map((x) => x + 1);

	//

	return (
		<div
			className={`w-full mx-auto pb-10 ${
				isToggled
					? "bg-background-dark text-text-dark"
					: "bg-background-light text-text-light"
			}`}
		>
			<div
				className={`pagination flex flex-wrap justify-center gap-2 py-4 mx-auto w-[90%]
		`}
			>
				{pages.map((page) => (
					<button
						key={page}
						onClick={() => onPageChange(page)}
						className={`px-4 py-2 rounded-full border ${
							page === currentPage
								? "bg-themeColor text-white"
								: "bg-white text-themeColor"
						}`}
					>
						{page}
					</button>
				))}
			</div>
		</div>
	);
};

export default Pagination;
