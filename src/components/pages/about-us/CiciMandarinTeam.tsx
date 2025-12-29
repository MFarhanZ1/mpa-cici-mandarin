import React, { useState } from "react"; // 1. Jangan lupa import useState
import { ChevronLeft, ChevronRight, StepBack, StepForward } from "lucide-react"; // Opsional: Icon panah biar cantik

const BackgroundMobile = "/pages/about-us/cici-mandarin-team/OLD-PAPER-MOBILE.webp";
const Background = "/pages/about-us/cici-mandarin-team/OLD-PAPER-WEB.webp";
const ImageMobile = "/pages/about-us/cici-mandarin-team/image-mobile.webp";
const Imageweb = "/pages/about-us/cici-mandarin-team/image-web1.png";

// 2. Masukkan semua video ke dalam Array (List)
const videoList = ["https://www.youtube.com/embed/-lCwXNHeeEM", "https://www.youtube.com/embed/tNLEbZx7Tr0", "https://www.youtube.com/embed/muebYkTNso4", "https://www.youtube.com/embed/fYVrk5GVyo4"];

export default function CiciMandarinTeam() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fungsi Next
  const handleNext = () => {
    console.log("Tombol Next Ditekan! Index sekarang:", currentIndex);
    if (currentIndex < videoList.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Fungsi Prev
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  return (
    <>
      <section className="bg-cover bg-center pt-14 pb-10 px-7 block md:hidden" style={{ backgroundImage: `url(${BackgroundMobile})` }}>
        <div className="flex flex-col gap-3 justify-center items-center">
          <div className="flex flex-col justify-center items-center gap-4 pt-5">
            <div className="text-center font-mochiy-pop-one font-bold text-xl text-[#CB0D0D]">CICI MANDARIN TEAM</div>
            <span className="text-center text-[#CB0D0D]">
              At Cici Mandarin, our strength is a team of professionals from Indonesia and China with firsthand experience <span className="font-bold ]">living, studying, and working in China.</span> We combine local insight with deep
              knowledge of China's culture, education, job market, and travel scene.
            </span>
            <span className="text-center text-[#CB0D0D]">
              What sets us apart is how we bridge both worlds—offering Mandarin lessons and personalized guidance <span className="font-bold ]">for study, work, and travel in China.</span>
              Wherever you are, we're your trusted partner on the journey.
            </span>
          </div>

          <div className="px-5 relative flex flex-col items-center gap-3">
            {/* CONTAINER SCROLL (CAROUSEL) 
      - flex: Agar video berjejer ke samping
      - overflow-x-auto: Agar bisa discroll ke samping
      - snap-x snap-mandatory: Agar saat berhenti scroll, video pas di tengah (tidak nanggung)
      - no-scrollbar: (Opsional) untuk menyembunyikan batang scroll
  */}
            <div className="w-[15rem] h-[250px] flex overflow-x-auto snap-x snap-mandatory gap-4 rounded-xl shadow-lg z-20 pb-2 scroll-smooth">
              {videoList.map((videoSrc, index) => (
                <iframe
                  key={index}
                  src={`${videoSrc}?autoplay=0&mute=1&controls=1&modestbranding=1&playsinline=1&rel=0&showinfo=0&iv_load_policy=3&fs=1`}
                  className="min-w-full w-full h-full snap-center rounded-xl bg-black border-2 border-white"
                  style={{ border: "none" }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ))}
            </div>

            {/* INDIKATOR DOTS (Opsional tapi Penting untuk UX)
      Memberi tahu user bahwa ini bisa digeser
  */}
            <div className="flex gap-2">
              {videoList.map((_, index) => (
                <div key={index} className="w-2 h-2 rounded-full bg-red-600 opacity-50"></div>
              ))}
              <span className="text-xs text-[#CB0D0D] ml-2 font-bold animate-pulse">&lt;&lt; Swipe &gt;&gt;</span>
            </div>
          </div>
        </div>
      </section>

      <section className="hidden md:block bg-cover bg-center pt-14 pb-10 px-7" style={{ backgroundImage: `url(${Background})` }}>
        <div className="flex flex-col gap-3 justify-center items-center">
          <div className="flex flex-col justify-center items-center gap-8 pt-10">
            <div className="text-center font-mochiy-pop-one font-bold text-3xl text-[#CB0D0D] pt-12">CICI MANDARIN TEAM</div>

            {/* Container Utama Gambar TV/Monitor */}
            <div className="px-20 relative">
              <img src={Imageweb} alt="Frame TV" className="relative z-10" />

              {/* === CONTAINER VIDEO PLAYER === 
                  Kita bungkus video dan tombol dalam satu div absolute
                  agar posisinya nempel barengan.
              */}
              <div className="absolute top-[18%] right-[16%] w-[19rem] h-[74%] z-20 flex flex-col items-center">
                {/* VIDEO */}
                {/* Tips Styling:
                    - aspect-video: Memaksa rasio 16:9 (YouTube standard).
                    - key={currentIndex}: PENTING! Agar React tau videonya ganti dan mereload playernya.
                */}
                <iframe
                  key={currentIndex}
                  src={`${videoList[currentIndex]}?autoplay=1&mute=1&controls=1&modestbranding=1&playsinline=1&rel=0&showinfo=0&iv_load_policy=3&fs=1&loop=1&playlist=${videoList[currentIndex].split("/").pop()}`}
                  className="w-full h-full aspect-video rounded-xl shadow-lg bg-black border-2 border-white border-rounded-lg"
                  style={{ border: "none" }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />

                {/* TOMBOL NAVIGASI */}
                <div className="flex gap-4 mt-2">
                  {/* Tombol Prev */}
                  <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className={`p-1 rounded-full text-white transition-all ${
                      currentIndex === 0
                        ? "bg-gray-400 cursor-not-allowed opacity-50" // Style Disabled
                        : "bg-red-600 hover:bg-red-700 shadow-md" // Style Active
                    }`}
                  >
                    {/* Ganti tulisan "Prev" dengan Icon jika mau */}
                    <StepBack />
                  </button>

                  {/* Tombol Next */}
                  <button
                    onClick={handleNext}
                    disabled={currentIndex === videoList.length - 1}
                    className={`p-1 rounded-full text-white transition-all ${currentIndex === videoList.length - 1 ? "bg-gray-400 cursor-not-allowed opacity-50" : "bg-red-600 hover:bg-red-700 shadow-md"}`}
                  >
                    <StepForward />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
