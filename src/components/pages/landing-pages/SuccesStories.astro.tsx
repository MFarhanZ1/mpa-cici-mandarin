import React, {
	useState,
	useRef,
	useEffect,
	useMemo,
	useCallback,
} from "react";

// 2. KONFIGURASI DARI SCRIPT ASTRO ANDA
const videos = [
	"1.mp4",
	"2.mp4",
	"3.mp4",
	"4.mp4",
	"6.mp4",
	"7.mp4",
	"8.mp4",
	"9.mp4",
];

const textVideos = [
	"Fun Language Class Life",
	"Client Job Application Process",
	"Product Research & Purchase Journey",
	"Client Travel Experience",
	"One Day Beijing Tour",
	"Student University Life",
	"Prescholer Class",
	"Kids Class",
	"Adult Class",
];

const ciciMandarinLogo = "/cici-mandarin.svg";

// Background dan image paths - menggunakan path langsung karena file ada di public directory
const backgroundImage =
	"pages/landing-pages/succes-stories/v3-success-stories.png";
const backgroundImageMobile =
	"pages/landing-pages/succes-stories/v4-success-stories-mobile.png";

const stampPNG = "/pages/landing-pages/succes-stories/STAMP.png";

// ===================================================================
// 3. KOMPONEN VIDEO CARD (Internal)
// ===================================================================

interface VideoCardProps {
	videoSrc: string;
	logoSrc: string;
	isPlaying: boolean;
	onPlayToggle: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({
	videoSrc,
	logoSrc,
	isPlaying,
	onPlayToggle,
}) => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [isMuted, setIsMuted] = useState(false);

	// Efek untuk mengontrol play/pause dari komponen parent
	useEffect(() => {
		const videoEl = videoRef.current;
		if (!videoEl) return;

		if (isPlaying) {
			videoEl.muted = false;
			setIsMuted(false);
			videoEl.play().catch((err) => console.log("Play failed:", err));
		} else {
			videoEl.pause();
		}
	}, [isPlaying]);

	// Efek untuk sinkronisasi status mute dengan elemen video
	useEffect(() => {
		const videoEl = videoRef.current;
		if (videoEl) {
			videoEl.muted = isMuted;
		}
	}, [isMuted]);

	// Handler untuk mute button
	const handleMuteToggle = (e: React.MouseEvent) => {
		e.stopPropagation();
		setIsMuted((prev) => !prev);
	};

	// Handler untuk play button (di overlay)
	const handlePlayClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		e.preventDefault();
		onPlayToggle();
	};

	// Handler untuk card click
	const handleCardClick = () => {
		onPlayToggle();
	};

	// ==== SVG Icons ====
	const MuteIcon = () => (
		<svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
			<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
		</svg>
	);

	const UnmuteIcon = () => (
		<svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
			<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
		</svg>
	);

	return (
		<div className="shrink-0 w-full h-full flex items-center justify-center">
			{/* Card inner dengan video */}
			<div
				className="relative group cursor-pointer w-[74%] h-[60vh] rounded-2xl overflow-hidden bg-black shadow-lg"
				onClick={handleCardClick}
			>
				<video
					ref={videoRef}
					src={videoSrc}
					// FIX: Mengubah w-[600px] menjadi w-full agar responsif
					className="h-full w-full object-cover"
					loop
					playsInline
					preload="auto"
				/>

				{/* Play button overlay */}
				<div
					className="play-overlay absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300"
					style={{
						opacity: isPlaying ? 0 : 1,
						pointerEvents: isPlaying ? "none" : "auto",
					}}
				>
					<button
						type="button"
						className="play-button bg-[#CB0D0D] rounded-full hover:bg-[#a00a0a] transition-all transform hover:scale-110"
						style={{ padding: "14px 18px" }}
						aria-label="Play video"
						onClick={handlePlayClick}
					>
						<svg
							className="w-12 h-12 text-white"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path d="M8 5v14l11-7z" />
						</svg>
					</button>
				</div>

				{/* Mute/Unmute button */}
				<button
					type="button"
					className="mute-button absolute bottom-3 right-3 bg-black/70 hover:bg-black/90 rounded-full p-1.5 transition-all z-20"
					aria-label="Mute/Unmute video"
					onClick={handleMuteToggle}
				>
					{isMuted ? <MuteIcon /> : <UnmuteIcon />}
				</button>
			</div>
		</div>
	);
};

// ===================================================================
// 4. KOMPONEN UTAMA (SuccesStories)
// ===================================================================

const SuccesStories: React.FC = () => {
	// State untuk melacak indeks carousel - HANYA 1 VIDEO TERLIHAT
	const [currentIndex, setCurrentIndex] = useState(0);
	// State untuk melacak video mana yang sedang diputar
	const [playingIndex, setPlayingIndex] = useState<number | null>(null);

	// Max index adalah total video - 1 (karena hanya 1 video terlihat)
	const maxIndex = videos.length - 1;

	const handleNext = useCallback(() => {
		// Hentikan video yang sedang diputar saat navigasi
		setPlayingIndex(null);

		setCurrentIndex((prev) => {
			if (prev >= maxIndex) return prev;
			return prev + 1;
		});
	}, [maxIndex]);

	const handlePrev = useCallback(() => {
		// Hentikan video yang sedang diputar saat navigasi
		setPlayingIndex(null);

		setCurrentIndex((prev) => {
			if (prev <= 0) return prev;
			return prev - 1;
		});
	}, []);

	// Menangani play/pause
	const handlePlayToggle = useCallback((index: number) => {
		setPlayingIndex((prevPlayingIndex) =>
			prevPlayingIndex === index ? null : index
		);
	}, []);

	return (
		<>
			{/* =================================
        TAMPILAN DESKTOP (md dan ke atas)
        =================================
      */}
			<section className="overflow-hidden w-full h-full hidden md:block relative -mt-[5.5%]">
				<img src={backgroundImage} className="w-full h-full" alt="BG Image" />

				<div className="absolute top-[16vh] flex justify-center left-[50%] w-[35%]">
					<div className="font-normal inline border-[#FFBC2D] border bg-linear-to-r from-[#CB0D0D] to-[#E55B12] rounded-xl px-4 py-2 text-white font-mochiy-pop-one text-xl whitespace-nowrap">
						<span>{textVideos[currentIndex]}</span>
					</div>
				</div>
				
				<div className="absolute top-[22vh] right-[15%] w-[35%] h-auto z-50 flex flex-col xl:flex-row lg:flex-row gap-10 justify-center items-center">
					<div className="flex flex-col items-center justify-center py-6 sm:py-8 px-4 sm:px-6 rounded-3xl w-full">
						{/* Carousel Container - HANYA TAMPILKAN 1 VIDEO */}
						<div className="w-full overflow-hidden px-4 sm:px-8">
							<div
								className="flex transition-transform duration-500 ease-in-out"
								style={{
									transform: `translateX(-${currentIndex * 100}%)`,
								}}
							>
								{videos.map((video, index) => (
									<div key={video} className="w-full shrink-0">
										<VideoCard
											videoSrc={`pages/landing-pages/succes-stories/${video}`}
											logoSrc={ciciMandarinLogo}
											isPlaying={playingIndex === index}
											onPlayToggle={() => handlePlayToggle(index)}
										/>
									</div>
								))}
							</div>
						</div>

						{/* Navigation Buttons */}
						{currentIndex > 0 && (
							<button
								type="button"
								onClick={handlePrev}
								className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-[#FFBC2D] hover:bg-white text-[#BE1313] rounded-full p-2 sm:p-3 shadow-lg transition-all hover:scale-110 z-10"
								aria-label="Previous video"
							>
								<svg
									className="w-5 h-5 sm:w-6 sm:h-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={3}
										d="M15 19l-7-7 7-7"
									/>
								</svg>
							</button>
						)}

						{currentIndex < maxIndex && (
							<button
								type="button"
								onClick={handleNext}
								className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-[#FFBC2D] hover:bg-white text-[#BE1313] rounded-full p-2 sm:p-3 shadow-lg transition-all hover:scale-110 z-10"
								aria-label="Next video"
							>
								<svg
									className="w-5 h-5 sm:w-6 sm:h-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={3}
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</button>
						)}

						{/* Progress Dots */}
						<div className="flex gap-2 mt-6">
							{videos.map((_, index) => (
								<button
									key={index}
									type="button"
									onClick={() => {
										setCurrentIndex(index);
										setPlayingIndex(null);
									}}
									className={`h-2 rounded-full transition-all ${
										currentIndex === index
											? "w-8 bg-white"
											: "w-2 bg-white/50 hover:bg-white/75"
									}`}
									aria-label={`Go to slide ${index + 1}`}
								/>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* =================================
        TAMPILAN MOBILE (di bawah md) - INI YANG DIPERBAIKI
        =================================
      */}
			<section className="overflow-hidden w-full h-full md:hidden relative">
				<img
					src={backgroundImageMobile}
					className="w-full h-full object-fit"
					alt="BG Image"
				/>
				<img
					src={stampPNG}
					className="absolute top-[24vh] left-1 z-60 w-28 h-28"
					alt="Stamp"
				/>

				<div className="absolute z-70 top-[23vh] font-normal border-[#FFBC2D] border bg-linear-to-r from-[#CB0D0D] to-[#E55B12] rounded-xl px-4 py-2 text-white left-1/2 -translate-x-1/2 font-mochiy-pop-one text-xs whitespace-nowrap">
					<span>{textVideos[currentIndex]}</span>
				</div>

				{/* FIX: Mengganti layout absolut agar center dan lebarnya pas di mobile */}
				<div className="absolute top-[27vh] left-1/2 -translate-x-1/2 w-[90%] max-w-md h-auto z-50 flex flex-col justify-center items-center">
					{/* FIX: Membersihkan class 'sm:' dan 'lg:' yang tidak perlu di blok md:hidden */}
					<div className="flex flex-col items-center justify-center py-6 px-4 rounded-3xl w-full">
						{/* Carousel Container - HANYA TAMPILKAN 1 VIDEO */}
						{/* FIX: Menghapus padding 'px-4' karena sudah di-handle parent */}
						<div className="w-full overflow-hidden">
							<div
								className="flex transition-transform duration-500 ease-in-out"
								style={{
									transform: `translateX(-${currentIndex * 100}%)`,
								}}
							>
								{videos.map((video, index) => (
									<div key={video} className="w-full shrink-0">
										<VideoCard
											videoSrc={`pages/landing-pages/succes-stories/${video}`}
											logoSrc={ciciMandarinLogo}
											isPlaying={playingIndex === index}
											onPlayToggle={() => handlePlayToggle(index)}
										/>
									</div>
								))}
							</div>
						</div>

						{/* Navigation Buttons */}
						{currentIndex > 0 && (
							<button
								type="button"
								onClick={handlePrev}
								// FIX: Membersihkan class 'sm:'
								className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#FFBC2D] hover:bg-white text-[#BE1313] rounded-full p-2 shadow-lg transition-all hover:scale-110 z-10"
								aria-label="Previous video"
							>
								{/* FIX: Membersihkan class 'sm:' */}
								<svg
									className="w-5 h-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={3}
										d="M15 19l-7-7 7-7"
									/>
								</svg>
							</button>
						)}

						{currentIndex < maxIndex && (
							<button
								type="button"
								onClick={handleNext}
								// FIX: Membersihkan class 'sm:'
								className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#FFBC2D] hover:bg-white text-[#BE1313] rounded-full p-2 shadow-lg transition-all hover:scale-110 z-10"
								aria-label="Next video"
							>
								{/* FIX: Membersihkan class 'sm:' */}
								<svg
									className="w-5 h-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={3}
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</button>
						)}

						{/* Progress Dots */}
						<div className="flex gap-2 mt-6">
							{videos.map((_, index) => (
								<button
									key={index}
									type="button"
									onClick={() => {
										setCurrentIndex(index);
										setPlayingIndex(null);
									}}
									className={`h-2 rounded-full transition-all ${
										currentIndex === index
											? "w-8 bg-white"
											: "w-2 bg-white/50 hover:bg-white/75"
									}`}
									aria-label={`Go to slide ${index + 1}`}
								/>
							))}
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default SuccesStories;
