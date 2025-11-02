import * as React from "react";
const phoneImage = "/pages/landing-pages/learn-culture/phone.png";
const catImage = "/pages/landing-pages/learn-culture/logo-kucing.png";
const vectorImage1 = "/pages/landing-pages/learn-culture/vector-1.png";
const vectorImage2 = "/pages/landing-pages/learn-culture/vector-2.png";
const vectorImage3 = "/pages/landing-pages/learn-culture/vector-3.png";

export default function LearnCulture() {
  return (
    <section className="bg-[#FBEDDE] -mt-4 py-6 relative overflow-hidden">
      <img
        src={vectorImage1}
        alt="vectorImage1"
        className="absolute top-1/6 -left-14 w-24"
      />

      <img
        src={vectorImage2}
        alt="vectorImage2"
        className="absolute top-1/3 -right-10 w-38"
      />

      <img
        src={vectorImage3}
        alt="vectorImage3"
        className="absolute bottom-1/3 -left-14 w-40 z-20"
      />
      <div className="flex flex-col justify-center items-center gap-5">
        {/* judul dan vist ig */}
        <div className="flex flex-col px-6 justify-center items-center gap-4">
          <span className="text-xl text-center font-mochiy-pop-one text-[#CB0D0D]">
            LEARN CHINESE CULTURE WITH CICI MANDARIN!
          </span>
          <div>
            <button className="bg-[#FFBC2D] py-1 px-3 rounded-lg">
              <span className="text-[#F03C0B] font-bold">
                {" "}
                VISIT OUR INSTAGRAM{" "}
              </span>
            </button>
          </div>
        </div>

        <div className="relative flex justify-center items-center">
          <img
            src={catImage}
            alt="catImage"
            className="w-32 absolute -left-1/4 top-6"
          />
          <img src={phoneImage} alt="phoneImage" className="z-10" />
        </div>
      </div>
    </section>
  );
}
