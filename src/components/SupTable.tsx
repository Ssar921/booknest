import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Instrument {
	id: string;
	first_name: string;
	last_name: string;
	// Add other properties here if needed
}
const SupTable: React.FC = () => {
	const [instruments, setInstruments] = useState<Instrument[]>([]);
	useEffect(() => {
		getInstruments();
	}, []);

	async function getInstruments() {
		const { data } = await supabase
			.from("profiles")
			.select("*, favorites(book_id)");
		console.log(data);
		if (data) {
			setInstruments(data);
		}
	}
	return (
		<ul>
			{instruments.map((profiles) => (
				<li key={profiles.id}>
					{profiles.first_name} {profiles.last_name}
				</li>
			))}
		</ul>
	);
};
export default SupTable;
