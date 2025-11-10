import { X } from "lucide-react";
import { useState } from "react";

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
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setIsOpen(false)}
          />

          <div
            onClick={() => setIsOpen(false)}
            className="relative rounded-xl p-8 max-w-xl w-full mx-4 z-10 pt-[6%]"
          >
            <button
              className="cursor-pointer absolute top-[18%] right-0 text-white hover:text-red-200 transition-colors "
              aria-label="Tutup"
            >
              <X size={24} />
            </button>
            <img
              onClick={(e) => {
                e.stopPropagation(); // Mencegah klik tembus ke div pembungkus
                setIsPopupOpen("next");

                if (isPopupOpen === "next") {
                  setIsOpen(false);
                };
              }}
              src={configPopup[isPopupOpen].image}
              alt=""
              // Tambahkan cursor-pointer agar user tahu gambar bisa diklik
              className="cursor-pointer"
            />{" "}
          </div>
        </div>
      )}
    </>
  );
}
