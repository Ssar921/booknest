interface BookDescriptionProps {
	description: string | null; // `description` could be null or empty
}

const BookDescription: React.FC<BookDescriptionProps> = ({ description }) => {
	return (
		<div className="p-2 mx-5 lg:w-[45%] w-full rounded-lg shadow-md shadow-gray-400  text-sm">
			<div className="w-full max-h-[50vh] overflow-y-scroll custom-scrollbar p-4">
				{/* If no description, display the fallback message */}
				{!description ? (
					<p>No Description To Show</p>
				) : (
					// Render the description with dangerouslySetInnerHTML if it exists
					<>
						<h1 className="font-serif text-xl mb-2 border-b">
							Description
						</h1>

						<div
							dangerouslySetInnerHTML={{ __html: description }}
						/>
					</>
				)}
			</div>
		</div>
	);
};

export default BookDescription;
