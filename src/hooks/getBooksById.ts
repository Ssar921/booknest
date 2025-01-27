// src/utils/getBooksById.ts
export const getBooksById = async (bookIds: string[]) => {
	const books = [];

	for (let bookId of bookIds) {
		try {
			// Using the Google Books API to fetch book details by bookId
			const response = await fetch(
				`https://www.googleapis.com/books/v1/volumes/${bookId}`
			);

			// Check if the response is successful (status code 200)
			if (!response.ok) {
				throw new Error("Failed to fetch book data");
			}

			const data = await response.json();

			// const bookData = data.volumeInfo;

			// Push the relevant book details to the array
			// books.push({
			// 	bookId,
			// 	title: bookData.title,
			// 	authors: bookData.authors || ["Unknown Author"],
			// 	imageUrl:
			// 		bookData.imageLinks?.thumbnail || "default-image-url.jpg",
			// 	description: bookData.description || "No description available",
			// });
			books.push(data);
		} catch (error) {
			console.error("Error fetching book details:", error);
		}
	}
	return books;
};
