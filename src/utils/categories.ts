export interface Category {
	title: string;
	query: string;
}
export const categoryConfig: Category[] = [
	{ title: "Popular", query: "book" },
	{ title: "Award-Winning", query: "award+winning" },
	{ title: "Top Rated", query: "top+rated" },
	{ title: "Must Read", query: "must+read" },
	{ title: "Fiction", query: "fiction" },
	{ title: "Fantasy", query: "fantasy" },
	{ title: "Mystery", query: "mystery" },
	{ title: "Romance", query: "romance" },
	{ title: "Science Fiction", query: "science+fiction" },
	{ title: "Historical Fiction", query: "historical+fiction" },
	{ title: "Biography", query: "biography" },
	{ title: "Self Help", query: "self+help" },
	{ title: "Children's", query: "children" },
	{ title: "Young Adult", query: "young+adult" },
	{ title: "Horror", query: "horror" },
	{ title: "Non Fiction", query: "non+fiction" },
	{ title: "Poetry", query: "poetry" },
	{ title: "Adventure", query: "adventure" },
];
