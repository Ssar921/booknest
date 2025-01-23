import React from "react";

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
	const pages = [...Array(totalPages).keys()].map((x) => x + 1);

	return (
		<div className="pagination flex flex-wrap justify-center gap-2 mt-4 w-[90%]">
			{pages.map((page) => (
				<button
					key={page}
					onClick={() => onPageChange(page)}
					className={`px-4 py-2 rounded-md border ${
						page === currentPage
							? "bg-blue-600 text-white"
							: "bg-white text-blue-600"
					}`}
				>
					{page}
				</button>
			))}
		</div>
	);
};

export default Pagination;
