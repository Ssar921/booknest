import { FaCheckCircle } from "react-icons/fa";

interface PasswordChecklistProps {
	password: string;
}

export default function PasswordChecklist({
	password,
}: PasswordChecklistProps) {
	const conditions = [
		{
			label: "At least 8 characters",
			isValid: password.length >= 8,
		},
		{
			label: "Contains a number",
			isValid: /\d/.test(password),
		},
		{
			label: "Contains a capital letter",
			isValid: /[A-Z]/.test(password),
		},
		{
			label: "Contains letters",
			isValid: /[a-zA-Z]/.test(password),
		},
	];

	return (
		<ul className="mt-2 space-y-1">
			{conditions.map(({ label, isValid }) => (
				<li
					key={label}
					className="flex items-center text-sm text-gray-700"
				>
					<FaCheckCircle
						className={`mr-2 ${
							isValid ? "text-green-500" : "text-gray-400"
						}`}
					/>
					<span>{label}</span>
				</li>
			))}
		</ul>
	);
}
