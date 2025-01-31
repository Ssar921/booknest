export interface Category {
	title: string;
	query: string;
}
export const categoryConfig: Category[] = [
	{ title: "Popular", query: "book" },
	{ title: "Health Related", query: "health" },
	{ title: "Contemporary", query: "contemporary" },
	{ title: "Top Rated", query: "high" },
	{ title: "Sports", query: "sports" },
	{ title: "Literature", query: "literature" },
	{ title: "Fiction", query: "fiction" },
	{ title: "Fantasy", query: "fantasy" },
	{ title: "Mystery", query: "mystery" },
	{ title: "Romance", query: "romance" },
	{ title: "Science Fiction", query: "science+fiction" },
	{ title: "Historical Fiction", query: "historical+fiction" },
	{ title: "Biography", query: "biography" },
	{ title: "Self Help", query: "self+help" },
	{ title: "Children's", query: "children" },
	{ title: "Juvenile Fiction", query: "juvenile+fiction" },
	{ title: "Horror", query: "horror" },
	{ title: "Non Fiction", query: "nonfiction" },
	{ title: "Poetry", query: "poetry" },
	{ title: "Adventure", query: "adventure" },
];
