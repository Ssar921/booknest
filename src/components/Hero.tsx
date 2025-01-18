const Hero: React.FC = () => {
	return (
		<>
			{/* Hero Section */}
			<section
				className="relative h-96 bg-cover bg-center"
				style={{
					backgroundImage:
						"url(https://picsum.photos/800/600?random=${idx})",
				}}
			>
				<div className="absolute inset-0 bg-black opacity-50"></div>
				<div className="relative z-10 text-center text-white py-36">
					<h1 className="text-4xl sm:text-5xl font-bold">
						Discover Your Next Favorite Book
					</h1>
					<p className="mt-4 text-lg sm:text-xl">
						Browse, search, and filter through thousands of books.
					</p>
				</div>
			</section>
		</>
	);
};
export default Hero;
