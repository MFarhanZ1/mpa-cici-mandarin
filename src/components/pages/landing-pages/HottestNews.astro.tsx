import React from "react";

const Background = "/pages/landing-pages/hottest-news/BG.webp";
const card8 = "/pages/landing-pages/hottest-news/8.png";
const card9 = "/pages/landing-pages/hottest-news/9.png";
const card10 = "/pages/landing-pages/hottest-news/10.png";

export default function HottestNews() {
  return (

    <>
    
    
    <section
      className="bg-cover px-7 bg-left py-12 -mt-44 md:hidden block -mb-[2%]"
      style={{
        backgroundImage: `url(${Background})`,
      }}
    >
      <div className="flex flex-col justify-center items-center pt-32 gap-5">
        <h1 className="text-white text-2xl font-mochiy-pop-one text-center">
          CHINA'S HOTTEST NEWS
        </h1>
        <div className="w-full overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 pb-4 min-w-max px-4 justify-center items-center">
            <div className="shrink-0 w-[280px] md:w-[320px]">
              <img
                src={card9}
                alt="card9"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="shrink-0 w-[280px] md:w-[320px]">
              <img
                src={card8}
                alt="card8"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="shrink-0 w-[280px] md:w-[320px]">
              <img
                src={card10}
                alt="card10"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      className="bg-cover px-7 bg-left py-12 -mt-44 md:block hidden -mb-[2%]"
      style={{
        backgroundImage: `url(${Background})`,
      }}
    >
      <div className="flex flex-col justify-center items-center pt-32 gap-5">
        <h1 className="text-white text-2xl font-mochiy-pop-one text-center">
          CHINA'S HOTTEST NEWS
        </h1>
        <div className="w-full overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 pb-4 min-w-max px-4 justify-center items-center">
            <div className="shrink-0 w-[280px] md:w-[320px]">
              <img
                src={card9}
                alt="card9"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="shrink-0 w-[280px] md:w-[320px]">
              <img
                src={card8}
                alt="card8"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="shrink-0 w-[280px] md:w-[320px]">
              <img
                src={card10}
                alt="card10"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
