import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

interface ProfileHeaderProps {
	logoUrl: string;
	fullname: string;
	joined_at: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
	logoUrl,
	fullname,
	joined_at,
}) => {
	const [imgError, setImgError] = useState(false);

	return (
		<div className="flex items-center space-x-6 p-4 lg:px-20 bg-themeColor">
			{/* Logo */}
			{!logoUrl || imgError ? (
				<div className="w-30 h-30 rounded-full flex items-center justify-center text-secondary-light text-6xl">
					<FaUserCircle />
				</div>
			) : (
				<img
					src={logoUrl}
					alt={`${fullname} logo`}
					className="w-30 h-30  rounded-full object-cover"
					onError={() => setImgError(true)}
				/>
			)}
			<div className="flex flex-col font-serif space-y-1 text-white capitalize">
				{fullname ? (
					<span className="text-2xl font-semibold">{fullname}</span>
				) : (
					<span className="text-2xl font-semibold">No Name</span>
				)}

				<p className="text-md text-secondary-dark font-bold">
					{new Date(joined_at || "").toLocaleString()}
				</p>
			</div>
		</div>
	);
};

export default ProfileHeader;
