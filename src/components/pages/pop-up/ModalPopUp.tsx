import { X } from "lucide-react";
import { useState } from "react";

const PopupImage = "/pages/pop-up/popup.png";

export default function ModalPopUp() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative rounded-xl shadow-2xl p-8 max-w-xl w-full mx-4 z-10 pt-[6%]">
            <button
              onClick={() => setIsOpen(false)}
              className="cursor-pointer absolute top-[18%] right-0 text-gray-400 hover:text-gray-600 transition-colors "
              aria-label="Tutup"
            >
              <X size={24} />
            </button>

            <img src={PopupImage} alt="" />
          </div>
        </div>
      )}
    </>
  );
}
