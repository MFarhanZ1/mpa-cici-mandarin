import { X } from "lucide-react";
import { useState } from "react";

// Pastikan path ini benar dan gambar sudah ada di public folder atau diimport dengan benar jika menggunakan Vite/Astro assets
const PopupImage = "/pages/pop-up/popup.png";
const Popup2Image = "/pages/pop-up/popup2.png";

type ConfigPopupType = {
  [key: string]: {
    image: string;
  };
};

export default function ModalPopUp() {
  const [isOpen, setIsOpen] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState("default");

  const configPopup: ConfigPopupType = {
    default: {
      image: PopupImage,
    },
    next: {
      image: Popup2Image,
    },
  };

  // Fungsi handler yang lebih bersih
  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    // Cek state SAAT INI, bukan setelah di-set
    if (isPopupOpen === "default") {
      setIsPopupOpen("next");
    } else {
      // Jika sudah 'next', maka tutup modal
      setIsOpen(false);
    }
  };

  return (
    <>
      {isOpen && (
        <>
          <div className="hidden md:block">
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 ">
              {/* Overlay Background */}
              <div
                className="absolute inset-0 bg-black/50" // Gunakan tailwind modern untuk opacity
                onClick={() => setIsOpen(false)}
              />

              {/* Modal Container */}
              <div className="relative z-10 max-w-xl w-full">
                {/* Tombol Close - Pastikan event onCick terpasang */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-[5%] -right-[18%] z-20 bg-white text-black rounded-full p-1 hover:bg-gray-200 transition-colors shadow-lg cursor-pointer"
                  aria-label="Tutup"
                >
                  <X size={20} />
                </button>

                {/* Image */}
                <img
                  onClick={handleImageClick}
                  src={configPopup[isPopupOpen].image}
                  alt="Popup"
                  draggable="false" // PENTING: Mencegah gambar di-drag agar klik lebih responsif
                  className="cursor-pointer relative w-full h-auto rounded-xl shadow-2xl select-none" // select-none juga membantu
                />
              </div>
            </div>
          </div>

          <div className="md:hidden block">
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
              {/* Overlay Background */}
              <div
                className="absolute inset-0 bg-black/50" // Gunakan tailwind modern untuk opacity
                onClick={() => setIsOpen(false)}
              />

              {/* Modal Container */}
              <div className="relative z-10 max-w-xl w-full">
                {/* Tombol Close - Pastikan event onCick terpasang */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-0 -right-[2%] z-20 bg-white text-black rounded-full p-1 hover:bg-gray-200 transition-colors shadow-lg cursor-pointer"
                  aria-label="Tutup"
                >
                  <X size={20} />
                </button>

                {/* Image */}
                <img
                  onClick={handleImageClick}
                  src={configPopup[isPopupOpen].image}
                  alt="Popup"
                  draggable="false" // PENTING: Mencegah gambar di-drag agar klik lebih responsif
                  className="cursor-pointer relative w-full h-auto rounded-xl shadow-2xl select-none" // select-none juga membantu
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
