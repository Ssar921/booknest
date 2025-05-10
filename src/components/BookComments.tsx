// src/pages/Profile.tsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

interface CommentProps {
	bookId: string;
}
const BookComments: React.FC<CommentProps> = ({ bookId }) => {
	const [comments, setComments] = useState<any>(null);
	useEffect(() => {
		// Fetch profile data
		const fetchComments = async () => {
			const { data, error } = await supabase
				.from("book_comments")
				.select("*")
				.eq("book_id", bookId);
			if (data) {
				setComments(data);
				console.log(data);
			} else {
				console.error(error);
			}
		};

		fetchComments();
	}, []);

	if (!comments) {
		return (
			<div className="flex justify-center items-center h-screen">
				<p className="text-gray-600 text-lg">No comments yet</p>
			</div>
		);
	}

	return <h1>Comms</h1>;
};

export default BookComments;
