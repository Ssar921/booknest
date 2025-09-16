interface BookMiscProps {
	pages: number | null;
	publisher: string | null;
	year: string | null;
}

const BookMisc: React.FC<BookMiscProps> = ({ pages, publisher, year }) => {
	return (
		<div className="flex mx-5 pl-40 border">
			<div className="p-2 m-2 text-sm rounded-md shadow-md w-max">
				{pages && <p>{pages} Pages</p>}
			</div>

			<div className="p-2 m-2 text-sm rounded-md shadow-md w-max">
				{publisher && <p>Published By: {publisher}</p>}
			</div>

			<div className="p-2 m-2 text-sm rounded-md shadow-md w-max">
				{year && <p>Published In: {year}</p>}
			</div>
		</div>
	);
};

export default BookMisc;
