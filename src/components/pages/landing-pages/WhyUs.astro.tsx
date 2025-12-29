import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";

const videos = [
  "https://www.youtube.com/embed/yQopkiha9c0",
  "https://www.youtube.com/embed/_Sgl9LblZ9E",
  "https://www.youtube.com/embed/8_26jkEAIig",
  "https://www.youtube.com/embed/oHFV_ytg7Ho",
  "https://www.youtube.com/embed/_3LCW2Q7oVE",
  "https://www.youtube.com/embed/_3LCW2Q7oVE",
];
const cardWidth = 280; // increased base card width
const cardGap = 40; // increased gap for better spacing
const visibleCardsCount = 3; // always show exactly 3 cards
const ciciMandarinLogo = "/cici-mandarin.svg"; // Pastikan ini ada di folder /public
const backgroundImage = "pages/landing-pages/why-us/BG.png";
const backgroundImageWeb = "pages/landing-pages/why-us/BG-Web.webp";

// === 1. TENTUKAN LEBAR ASLI DESKTOP ===
// (920px viewport) + (16px gap) + (16px gap) + (48px tombol) + (48px tombol)
// Ukuran tombol: p-3 (12px) * 2 + w-6 (24px) = 48px
// (Lebar 920px) + (gap 16px) + (Tombol 48px) + (gap 16px) + (Tombol 48px) = 1048px
const DESKTOP_LAYOUT_WIDTH = 1048;
const DESKTOP_LAYOUT_HEIGHT = 600; // (minHeight 540px + padding 60px)
// ... (sisa kode)

interface VideoCardProps {
  videoSrc: string;
  logoSrc: string;
  isOdd: boolean;
  isPlaying: boolean;
  isCenter?: boolean;
  onPlayToggle: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ videoSrc, logoSrc, isOdd, isPlaying, isCenter, onPlayToggle }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  // YouTube iframe akan di-control melalui URL parameters
  useEffect(() => {
    // Iframe YouTube akan otomatis handle play/pause melalui autoplay parameter di URL
  }, [isPlaying, isMuted]);
  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted((prev) => !prev);
  };
  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onPlayToggle();
  };
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
        width: `${cardWidth}px`,
        minWidth: `${cardWidth}px`,
        height: isCenter ? "480px" : "400px",
        padding: "10px",
        background: "linear-gradient(to bottom, #CB0D0D, #a00a0a)",
        borderRadius: "16px",
        position: "relative",
        boxShadow: isCenter ? "0 12px 36px rgba(203, 13, 13, 0.6)" : "0 4px 12px rgba(203, 13, 13, 0.4)",
        transform: isCenter ? "scale(1.12)" : "scale(1)",
        transition: "all 400ms ease",
        zIndex: isCenter ? 2 : 1,
      }}
    >
      {/* ... (sisa konten VideoCard) ... */}
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
          backgroundSize: "30px 25px, 30px 25px, 35px 30px, 35px 30px, 20px 20px, 20px 20px",
          backgroundPosition: "0% 0%, 100% 100%, 50% 0%, 50% 100%, 25% 50%, 75% 50%",
          borderRadius: "10px",
          opacity: "0.7",
        }}
      />

      {/* Card inner dengan video */}
      <div className="video-card relative group cursor-pointer w-full h-full" style={{ borderRadius: "6px", overflow: "hidden", background: "#000" }} onClick={onPlayToggle}>
        <iframe
          src={`${videoSrc}?autoplay=${isPlaying ? 1 : 0}&mute=${isMuted ? 1 : 0}&loop=1&playlist=${videoSrc.split("/").pop()}&controls=1&modestbranding=1&playsinline=1&rel=0`}
          className={`w-full h-full ${isOdd ? "scale-105" : ""}`}
          style={{ border: "none" }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />

        {/* Logo Cici Mandarin */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center z-10">
          <img src={logoSrc} className="h-4 w-auto opacity-95" style={{ filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.7))" }} alt="Cici Mandarin Logo" />
        </div>

        {/* Play button overlay */}
        <div
          className="play-overlay absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300"
          style={{
            opacity: isPlaying ? 0 : 1,
            pointerEvents: isPlaying ? "none" : "auto",
          }}
        >
          <button type="button" className="play-button bg-[#CB0D0D] rounded-full hover:bg-[#a00a0a] transition-all transform hover:scale-110" style={{ padding: "12px 16px" }} aria-label="Play video" onClick={handlePlayClick}>
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>

        {/* Mute/Unmute button */}
        <button type="button" className="mute-button absolute bottom-3 right-3 bg-black/60 hover:bg-black/80 rounded-full p-1.5 transition-all z-20" aria-label="Mute/Unmute video" onClick={handleMuteToggle}>
          {isMuted ? <MuteIcon /> : <UnmuteIcon />}
        </button>
      </div>
    </div>
  );
};

// ===================================================================
// KOMPONEN WHY US (Dengan Perbaikan Total)
// ===================================================================
const WhyUs: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const getVisibleCards = useCallback(() => visibleCardsCount, []);
  const [visibleCards, setVisibleCards] = useState(visibleCardsCount);
  const visibleCardsRef = useRef(visibleCards);

  useEffect(() => {
    setVisibleCards(visibleCardsCount);
    visibleCardsRef.current = visibleCardsCount;
  }, []);
  useEffect(() => {
    visibleCardsRef.current = visibleCards;
  }, [visibleCards]);

  const viewportRefMobile = useRef<HTMLDivElement | null>(null);
  const viewportRefDesktop = useRef<HTMLDivElement | null>(null);
  // Hapus state mobile/desktopWidth
  const [gapPx, setGapPx] = useState<number>(16);

  // === 2. TAMBAHKAN STATE & REF BARU UNTUK SCALING ===
  const [mobileScale, setMobileScale] = useState(1);
  const mobileWrapperRef = useRef<HTMLDivElement>(null);
  // ===================================================

  useEffect(() => {
    const updateMeasurements = () => {
      const screen = typeof window !== "undefined" ? window.innerWidth : 0;
      setGapPx(screen >= 768 ? 28 : 16);
    };
    updateMeasurements();
    window.addEventListener("resize", updateMeasurements);
    return () => window.removeEventListener("resize", updateMeasurements);
  }, []);

  // === 3. TAMBAHKAN useEffect BARU UNTUK MENGHITUNG SCALE ===
  useEffect(() => {
    const wrapper = mobileWrapperRef.current;
    if (!wrapper) return;

    const updateScale = () => {
      const screenWidth = wrapper.clientWidth;
      if (screenWidth > 0) {
        // Beri sedikit padding (misal 95% dari lebar layar)
        setMobileScale((screenWidth * 0.95) / DESKTOP_LAYOUT_WIDTH);
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);
  // ========================================================

  const centerOffset = Math.floor(visibleCards / 2);
  const centerIndex = Math.min(videos.length - 1, currentIndex + centerOffset);

  const viewportContentWidth = cardWidth * visibleCards + cardGap * (visibleCards - 1); // 920px

  const maxIndex = useMemo(() => {
    return Math.max(0, videos.length - visibleCards);
  }, [visibleCards]);

  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setPlayingIndex(null);
    const currentMaxIndex = Math.max(0, videos.length - visibleCardsRef.current);
    setCurrentIndex((prev) => {
      if (prev >= currentMaxIndex) {
        return prev;
      }
      return prev + 1;
    });
  }, []);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setPlayingIndex(null);
    setCurrentIndex((prev) => {
      return Math.max(prev - 1, 0);
    });
  }, []);

  const handlePlayToggle = useCallback((index: number) => {
    setPlayingIndex((prevPlayingIndex) => {
      return prevPlayingIndex === index ? null : index;
    });
  }, []);

  return (
    <>
      {/* =========================
        SECTION MOBILE (PERBAIKAN SCALING)
        =========================
      */}
      <section className="bg-cover pt-6 bg-bottom px-6 py-4 xl:py-14 -mb-2 block md:hidden" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="flex flex-col gap-3 justify-center items-center">
          {/* ... Teks "WHY US ?" ... */}
          <span className="flex justify-center items-center font-normal font-mochiy-pop-one text-[#CB0D0D] text-2xl">WHY US ?</span>

          {/* ... Paragraf Teks ... */}
          <div className="flex flex-col gap-2 text-xs">
            <span className="font-normal text-[#CB0D0D] text-center">
              At Cici Mandarin, we don't just help you study, travel, or work in China—
              <span className="font-bold">we empower you to thrive. </span>
            </span>
            <span className="font-normal text-[#CB0D0D] text-center">
              With personalized services, expert guidance, and a deep understanding of both Indonesian and Chinese cultures, <span className="font-bold">we've helped hundreds of clients achieve their dreams.</span>
            </span>
            <span className="font-normal text-[#CB0D0D] text-center">Whether it's mastering Mandarin, securing a scholarship, or exploring China's wonders, we're here to make your journey seamless and successful.</span>
            <span className="font-normal text-[#CB0D0D] text-center">Let us be your trusted partner in unlocking the opportunities China has to offer!</span>
          </div>

          {/* video card carousel */}
          {/* PERBAIKAN: 
            Container 1: 'w-full' untuk mengukur layar (mobileWrapperRef)
          */}
          <div
            ref={mobileWrapperRef}
            className="relative w-full h-auto flex items-center justify-center"
            style={{
              // PAKSA TINGGINYA JADI TINGGI YANG SUDAH DI-SCALE
              height: `${DESKTOP_LAYOUT_HEIGHT * mobileScale}px`,
              // Tambahkan ini untuk jaga-jaga
              overflow: "hidden",
            }}
          >
            {/* PERBAIKAN: 
              Container 2: Terapkan 'scale' dan 'width' desktop
            */}
            <div
              className="relative flex items-center justify-center gap-4"
              style={{
                width: `${DESKTOP_LAYOUT_WIDTH}px`,
                transform: `scale(${mobileScale})`,
                transformOrigin: "center",
                // Beri padding vertikal ekstra untuk kompensasi scale
                paddingTop: "30px",
                paddingBottom: "30px",
              }}
            >
              {/* Left Arrow */}
              <button
                type="button"
                onClick={handlePrev}
                className="z-20 bg-[#CB0D0D] rounded-full p-3 hover:bg-[#a00a0a] transition-colors shadow-lg shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous video"
                disabled={currentIndex === 0}
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Video Container Wrapper (Viewport) */}
              <div
                ref={viewportRefMobile}
                className="overflow-hidden relative"
                style={{
                  width: `${viewportContentWidth}px`, // 920px
                  zIndex: 1,
                }}
              >
                <div
                  className="flex items-center transition-transform duration-500 ease-in-out"
                  style={{
                    gap: `${cardGap}px`,
                    transform: `translateX(-${currentIndex * (cardWidth + cardGap)}px)`,
                    minHeight: "540px",
                  }}
                >
                  {videos.map((video, index) => (
                    <VideoCard isOdd={index % 2 === 1} isCenter={index === centerIndex} key={video} videoSrc={video} logoSrc={ciciMandarinLogo} isPlaying={playingIndex === index} onPlayToggle={() => handlePlayToggle(index)} />
                  ))}
                </div>
              </div>

              {/* Right Arrow */}
              <button
                type="button"
                onClick={handleNext}
                className="z-20 bg-[#CB0D0D] rounded-full p-3 hover:bg-[#a00a0a] transition-colors shadow-lg shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next video"
                disabled={currentIndex >= maxIndex}
                title={`currentIndex: ${currentIndex}, maxIndex: ${maxIndex}, visibleCards: ${visibleCards}`}
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
        SECTION DESKTOP (Ini sudah benar)
        =========================
      */}
      <section className="relative bg-cover bg-top xl:bg-center px-6 py-4 xl:py-14 hidden md:block" style={{ backgroundImage: `url(${backgroundImageWeb})` }}>
        <div className="flex flex-col gap-3 justify-center items-center ">
          {/* ... Teks "WHY US ?" ... */}
          <span className="flex justify-center items-center font-normal font-mochiy-pop-one text-[#CB0D0D] text-3xl">WHY US ?</span>

          {/* ... Paragraf Teks ... */}
          <div className="flex flex-col gap-2 text-md">
            <span className="font-normal text-[#CB0D0D] text-center">
              At Cici Mandarin, we don't just help you study, travel, or work in China—
              <span className="font-bold">we empower you to thrive. </span>
            </span>
            <span className="font-normal text-[#CB0D0D] text-center">
              With personalized services, expert guidance, and a deep understanding of both Indonesian and Chinese cultures, <span className="font-bold">we've helped hundreds of clients achieve their dreams.</span>
            </span>
            <span className="font-normal text-[#CB0D0D] text-center">Whether it's mastering Mandarin, securing a scholarship, or exploring China's wonders, we're here to make your journey seamless and successful.</span>
            <span className="font-normal text-[#CB0D0D] text-center">Let us be your trusted partner in unlocking the opportunities China has to offer!</span>
          </div>

          {/* video card carousel */}
          {/* Container dengan maxWidth, beri ruang sedikit ekstra */}
          <div className="relative w-full mt-6 flex items-center justify-center" style={{ maxWidth: `${DESKTOP_LAYOUT_WIDTH}px` }}>
            {/* Tombol dan Viewport dalam satu Flex Container */}
            <div className="relative flex items-center justify-center gap-4 w-full">
              {/* Tombol Kiri */}
              <button
                type="button"
                onClick={handlePrev}
                className="z-20 bg-[#CB0D0D] rounded-full p-3 hover:bg-[#a00a0a] transition-colors shadow-lg shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous video"
                disabled={currentIndex === 0}
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Video Container Wrapper (Viewport) */}
              <div
                ref={viewportRefDesktop}
                className="overflow-hidden relative"
                style={{
                  width: `${viewportContentWidth}px`, // 920px
                  zIndex: 1,
                }}
              >
                <div
                  className="flex items-center transition-transform duration-500 ease-in-out"
                  style={{
                    gap: `${cardGap}px`,
                    transform: `translateX(-${currentIndex * (cardWidth + cardGap)}px)`,
                    minHeight: "540px",
                  }}
                >
                  {videos.map((video, index) => (
                    <VideoCard isOdd={index % 2 === 1} isCenter={index === centerIndex} key={video} videoSrc={video} logoSrc={ciciMandarinLogo} isPlaying={playingIndex === index} onPlayToggle={() => handlePlayToggle(index)} />
                  ))}
                </div>
              </div>

              {/* Style tag (tidak berubah) */}
              <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                  display: none;
                }
                .scrollbar-hide {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
              `}</style>

              {/* Tombol Kanan */}
              <button
                type="button"
                onClick={handleNext}
                className="z-20 bg-[#CB0D0D] rounded-full p-3 hover:bg-[#a00a0a] transition-colors shadow-lg shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next video"
                disabled={currentIndex >= maxIndex}
                title={`currentIndex: ${currentIndex}, maxIndex: ${maxIndex}, visibleCards: ${visibleCards}`}
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyUs;
