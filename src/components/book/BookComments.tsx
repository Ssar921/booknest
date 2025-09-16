// src/pages/Profile.tsx
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

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
			<div className="flex justify-center items-center h-screen border border-black">
				<p className="text-gray-600 text-lg">No comments yet</p>
			</div>
		);
	}

	return (
		<div className="p-2 mx-5 lg:w-[45%] w-full rounded-lg shadow-md shadow-gray-400  text-sm">
			<div className="w-full max-h-[50vh] overflow-y-scroll custom-scrollbar p-4">
				<h1 className="font-serif text-xl border-b mb-2">Comments</h1>
				{comments.length > 0 ? (
					comments.map((comment: any) => (
						<div key={comment.id} className="border-b py-2">
							<p className="font-semibold text-gray-800">
								{comment.user_name}
							</p>
							<p className="text-gray-600">{comment.comment}</p>
						</div>
					))
				) : (
					<p className="text-gray-600 text-sm">No comments yet</p>
				)}
			</div>
		</div>
	);
};

export default BookComments;
