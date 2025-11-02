import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";

const videos = ["1.mp4", "2.mp4", "3.mp4", "5.mp4", "6.mp4", "7.mp4"];
const cardWidth = 232;
const ciciMandarinLogo = "/cici-mandarin.svg"; // Pastikan ini ada di folder /public
const backgroundImage = "pages/landing-pages/why-us/BG.png";


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

  // Efek untuk mengontrol play/pause dari komponen parent (WhyUs)
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    if (isPlaying) {
      // Pastikan tidak muted saat user klik play
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
    e.stopPropagation(); // Mencegah card di-klik (play/pause)
    console.log("handleMuteToggle called");
    setIsMuted((prev) => !prev);
  };

  // Handler untuk play button (di overlay)
  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Mencegah card di-klik lagi
    e.preventDefault();
    console.log("handlePlayClick called");
    onPlayToggle();
  };

  // ==== SVG Icons (internal) ====
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
    <div
      className="video-card-wrapper shrink-0 relative"
      style={{
        width: "220px",
        minWidth: "220px",
        height: "380px",
        padding: "10px",
        background: "linear-gradient(to bottom, #CB0D0D, #a00a0a)",
        borderRadius: "10px",
        position: "relative",
        boxShadow: "0 4px 12px rgba(203, 13, 13, 0.4)",
      }}
    >
      {/* Pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 15% 25%, rgba(255,255,255,0.15) 3px, transparent 3px),
            radial-gradient(ellipse at 85% 75%, rgba(255,255,255,0.15) 3px, transparent 3px),
            radial-gradient(ellipse at 50% 10%, rgba(255,255,255,0.12) 4px, transparent 4px),
            radial-gradient(ellipse at 50% 90%, rgba(255,255,255,0.12) 4px, transparent 4px),
            radial-gradient(circle at 25% 50%, rgba(255,255,255,0.1) 2px, transparent 2px),
            radial-gradient(circle at 75% 50%, rgba(255,255,255,0.1) 2px, transparent 2px)
          `,
          backgroundSize:
            "30px 25px, 30px 25px, 35px 30px, 35px 30px, 20px 20px, 20px 20px",
          backgroundPosition:
            "0% 0%, 100% 100%, 50% 0%, 50% 100%, 25% 50%, 75% 50%",
          borderRadius: "10px",
          opacity: "0.7",
        }}
      />

      {/* Card inner dengan video */}
      <div
        className="video-card relative group cursor-pointer w-full h-full"
        style={{ borderRadius: "6px", overflow: "hidden", background: "#000" }}
        onClick={(e) => {
          console.log("Video card clicked");
          onPlayToggle();
        }} // Klik di mana saja pada card akan memicu play/pause
      >
        <video
          ref={videoRef}
          src={videoSrc}
          className="w-full h-full object-cover"
          loop
          playsInline
          preload="auto"
          onPlay={() => {
            // Logika ini dipindahkan ke useEffect [isPlaying]
          }}
          onPause={() => {
            // Logika ini ditangani oleh state isPlaying
          }}
        />

        {/* Text overlay "GIGI'S JOURNEY IN CHINA" (sesuai script asli) */}
        <div
          className="absolute top-2 left-0 right-0 z-10"
          style={{ textAlign: "center" }}
        >
          {/* <span className="font-semibold text-white ...">GIGI'S JOURNEY</span> */}
        </div>

        {/* Logo Cici Mandarin */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center z-10">
          <img
            src={logoSrc}
            className="h-4 w-auto opacity-95"
            style={{ filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.7))" }}
            alt="Cici Mandarin Logo"
          />
        </div>

        {/* Play button overlay */}
        <div
          className="play-overlay absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300"
          style={{
            opacity: isPlaying ? 0 : 1, // Tampil saat tidak playing
            pointerEvents: isPlaying ? "none" : "auto", // Tidak bisa diklik saat playing
          }}
        >
          <button
            type="button"
            className="play-button bg-[#CB0D0D] rounded-full hover:bg-[#a00a0a] transition-all transform hover:scale-110"
            style={{ padding: "12px 16px" }}
            aria-label="Play video"
            onClick={handlePlayClick} // Handler khusus untuk play
          >
            <svg
              className="w-10 h-10 text-white"
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
          className="mute-button absolute bottom-3 right-3 bg-black/60 hover:bg-black/80 rounded-full p-1.5 transition-all z-20"
          aria-label="Mute/Unmute video"
          onClick={handleMuteToggle} // Handler khusus untuk mute
        >
          {isMuted ? <MuteIcon /> : <UnmuteIcon />}
        </button>
      </div>
    </div>
  );
};

// ===================================================================
// 4. KOMPONEN WHY US (Utama)
// ===================================================================

const WhyUs: React.FC = () => {
  // State untuk melacak indeks carousel
  const [currentIndex, setCurrentIndex] = useState(0);
  // State untuk melacak video mana yang sedang diputar
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  // Fungsi untuk menghitung kartu yang terlihat berdasarkan lebar layar
  const getVisibleCards = useCallback(() => {
    // Pengecekan 'window' hanya jika di sisi klien
    if (typeof window === "undefined") return 2;

    const screenWidth = window.innerWidth;
    if (screenWidth >= 1800) return 6;
    if (screenWidth >= 1400) return 5;
    if (screenWidth >= 1200) return 4;
    if (screenWidth >= 768) return 3;
    return 2;
  }, []);

  // State untuk melacak jumlah kartu yang terlihat (responsive)
  // Inisialisasi dengan fungsi untuk lazy initialization
  const [visibleCards, setVisibleCards] = useState(() => {
    if (typeof window !== "undefined") {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1800) return 6;
      if (screenWidth >= 1400) return 5;
      if (screenWidth >= 1200) return 4;
      if (screenWidth >= 768) return 3;
    }
    return 2; // Default mobile
  });

  // Ref untuk menyimpan visibleCards terbaru untuk digunakan dalam handler
  const visibleCardsRef = useRef(visibleCards);

  // Efek untuk mengatur 'visibleCards' saat komponen dimuat dan di-resize
  useEffect(() => {
    const handleResize = () => {
      const newVisibleCards = getVisibleCards();
      setVisibleCards(newVisibleCards);
      visibleCardsRef.current = newVisibleCards; // Update ref juga
    };

    // Panggil sekali saat mount untuk memastikan nilai benar
    handleResize();

    // Tambahkan event listener
    window.addEventListener("resize", handleResize);

    // Cleanup listener saat komponen unmount
    return () => window.removeEventListener("resize", handleResize);
  }, [getVisibleCards]);

  // Update ref setiap kali visibleCards berubah (untuk memastikan sync)
  useEffect(() => {
    visibleCardsRef.current = visibleCards;
  }, [visibleCards]);

  // Nilai turunan (derived state) untuk index maksimum menggunakan useMemo
  const maxIndex = useMemo(() => {
    return Math.max(0, videos.length - visibleCards);
  }, [visibleCards]);

  // Efek untuk menyesuaikan currentIndex jika melebihi maxIndex setelah resize
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();

    console.log("handleNext called");

    // Hentikan video yang sedang diputar saat navigasi
    setPlayingIndex(null);

    // Hitung maxIndex berdasarkan visibleCards terbaru dari ref
    const currentMaxIndex = Math.max(
      0,
      videos.length - visibleCardsRef.current
    );

    console.log(
      "handleNext - currentMaxIndex:",
      currentMaxIndex,
      "visibleCards:",
      visibleCardsRef.current
    );

    // Gunakan functional update untuk mendapatkan currentIndex terbaru
    setCurrentIndex((prev) => {
      console.log(
        "handleNext - prev:",
        prev,
        "currentMaxIndex:",
        currentMaxIndex
      );
      // Jika sudah di akhir, jangan update
      if (prev >= currentMaxIndex) {
        console.log("handleNext - already at max");
        return prev;
      }
      // Update ke index berikutnya
      const nextIndex = prev + 1;
      console.log("handleNext - moving to:", nextIndex);
      return nextIndex;
    });
  }, []);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();

    console.log("handlePrev called");

    // Hentikan video yang sedang diputar saat navigasi
    setPlayingIndex(null);
    setCurrentIndex((prev) => {
      const newIndex = Math.max(prev - 1, 0);
      console.log("handlePrev - moving from", prev, "to", newIndex);
      return newIndex;
    });
  }, []);

  const handlePlayToggle = useCallback((index: number) => {
    console.log("handlePlayToggle called for index:", index);
    setPlayingIndex((prevPlayingIndex) => {
      const newPlayingIndex = prevPlayingIndex === index ? null : index;
      console.log(
        "handlePlayToggle - changing from",
        prevPlayingIndex,
        "to",
        newPlayingIndex
      );
      return newPlayingIndex;
    });
  }, []);

  return (
    <section
      className="bg-cover bg-top xl:bg-center px-6 py-4 xl:py-14"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      
      <div className="flex flex-col gap-3 justify-center items-center">
        {/* ... Teks "WHY US ?" ... */}
        <span className="flex justify-center items-center font-normal font-mochiy-pop-one text-[#CB0D0D] text-2xl">
          WHY US ?
        </span>

        {/* ... Paragraf Teks ... */}
        <div className="flex flex-col gap-2 text-xs">
          <span className="font-normal text-[#CB0D0D] text-center">
            At Cici Mandarin, we don't just help you study, travel, or work in
            China—<span className="font-bold">we empower you to thrive. </span>
          </span>
          <span className="font-normal text-[#CB0D0D] text-center">
            With personalized services, expert guidance, and a deep
            understanding of both Indonesian and Chinese cultures,{" "}
            <span className="font-bold">
              we've helped hundreds of clients achieve their dreams.
            </span>
          </span>
          <span className="font-normal text-[#CB0D0D] text-center">
            Whether it's mastering Mandarin, securing a scholarship, or
            exploring China's wonders, we're here to make your journey seamless
            and successful.
          </span>
          <span className="font-normal text-[#CB0D0D] text-center">
            Let us be your trusted partner in unlocking the opportunities China
            has to offer!
          </span>
        </div>

        {/* video card carousel */}
        <div className="relative w-full mt-6 flex items-center justify-center xl:max-w-[52rem] lg:max-w-[52rem]">
          <div className="relative flex items-center justify-center gap-4 w-full max-w-6xl">
            {/* Left Arrow */}
            <button
              type="button"
              onClick={handlePrev}
              className="z-20 bg-[#CB0D0D] rounded-full p-3 hover:bg-[#a00a0a] transition-colors shadow-lg shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous video"
              disabled={currentIndex === 0}
              style={{ position: "relative", zIndex: 20 }}
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Video Container Wrapper */}
            <div
              className="overflow-x-auto w-full min-w-[12rem] max-w-6xl scrollbar-hide "
              style={{ position: "relative", zIndex: 1 }}
            >
              <div
                className="flex items-center gap-4 transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * cardWidth}px)`,
                }}
              >
                {/* Render video cards secara dinamis */}
                {videos.map((video, index) => (
                  <VideoCard
                    key={video}
                    videoSrc={`pages/landing-pages/why-us/${video}`}
                    logoSrc={ciciMandarinLogo}
                    isPlaying={playingIndex === index}
                    onPlayToggle={() => handlePlayToggle(index)}
                  />
                ))}
              </div>
            </div>

            {/* Style tag untuk scrollbar-hide (bisa dipindah ke CSS global) */}
            <style>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
              .scrollbar-hide {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
            `}</style>

            {/* Right Arrow */}
            <button
              type="button"
              onClick={handleNext}
              className="z-20 bg-[#CB0D0D] rounded-full p-3 hover:bg-[#a00a0a] transition-colors shadow-lg shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next video"
              disabled={currentIndex >= maxIndex}
              style={{ position: "relative", zIndex: 20 }}
              title={`currentIndex: ${currentIndex}, maxIndex: ${maxIndex}, visibleCards: ${visibleCards}`}
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
