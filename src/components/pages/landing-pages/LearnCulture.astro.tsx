import * as React from "react";
const phoneImage = "/pages/landing-pages/learn-culture/phone.png";
const catImage = "/pages/landing-pages/learn-culture/logo-kucing.png";
const vectorImage1 = "/pages/landing-pages/learn-culture/vector-1.png";
const vectorImage2 = "/pages/landing-pages/learn-culture/vector-2.png";
const vectorImage3 = "/pages/landing-pages/learn-culture/vector-3.png";
const textImage = "/pages/landing-pages/learn-culture/TEXT.png";
const phoneCatTalk = "/pages/landing-pages/learn-culture/phone-cat-talk.webp";

export default function LearnCulture() {
  return (
    <>
      <section className="bg-[#FBEDDE] -mt-4 py-6 overflow-hidden md:hidden block">
        <div className="relative">
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
              <span className="text-xl text-center font-mochiy-pop-one text-[#CB0D0D] xl:hidden lg:hidden">
                LEARN CHINESE CULTURE WITH CICI MANDARIN!
              </span>
              <div className="xl:hidden lg:hidden">
                <button
                  onClick={() => {
                    window.open(
                      "https://www.instagram.com/cicimandarin.idn?igsh=aDg5eWU2a25wNzJt",
                      "_blank"
                    );
                  }}
                  className="bg-[#FFBC2D] py-1 px-3 rounded-lg"
                >
                  <span className="text-[#F03C0B] font-bold">
                    {" "}
                    VISIT OUR INSTAGRAM{" "}
                  </span>
                </button>
              </div>
            </div>

            <div className="relative flex justify-center xl:justify-end items-center gap-2.5 w-full">
              <div className="">
                <div className="">
                  <img
                    src={catImage}
                    alt="catImage"
                    className="w-32 absolute left-0 top-6 xl:w-64 xl:left-[11%] 2xl:left-[28%]"
                  />
                </div>

                <div className="relative z-20">
                  <img src={phoneImage} alt="phoneImage" className="" />
                </div>
              </div>

              <div className="self-start">
                <img
                  src={textImage}
                  alt="textImage"
                  className="w-[50%] hidden sm:block"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="-mt-[2%] overflow-hidden hidden md:block">
        <div className="relative bg-[#FBEDDE]">
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

          <div className="py-12 z-10 relative left-[10%] 2xl:left-[20%]">
            <img
              src={phoneCatTalk}
              alt="phoneCatTalk"
              className="2xl:w-[58%] w-[70%] cursor-pointer"
              onClick={() => {
                window.open(
                  "https://www.instagram.com/cicimandarin.idn?igsh=aDg5eWU2a25wNzJt",
                  "_blank"
                );
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
