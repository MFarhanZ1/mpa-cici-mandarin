import React, { useEffect } from "react";

const BackgroundImage =
  "/pages/contact-us/what-they-said/bg-mobile-they-said.webp";
const TheySaidImage = "/pages/contact-us/what-they-said/what-they-said.webp";
const CardImage5 = "/pages/contact-us/what-they-said/5.png";
const CardImage6 = "/pages/contact-us/what-they-said/6.png";
const CardImage7 = "/pages/contact-us/what-they-said/7.png";
const CardImage1 = "/pages/contact-us/what-they-said/1.png";
const CardImage2 = "/pages/contact-us/what-they-said/2.png";
const CardImage3 = "/pages/contact-us/what-they-said/3.png";

const CardIndexOne = "/pages/contact-us/what-they-said/index-card-1.png";
const CardIndexTwo = "/pages/contact-us/what-they-said/index-card-2.png";
const CardIndexThree = "/pages/contact-us/what-they-said/index-card-3.png";
const CardIndexFour = "/pages/contact-us/what-they-said/index-card-4.png";
const CardIndexFive = "/pages/contact-us/what-they-said/index-card-5.png";
const CardIndexSix = "/pages/contact-us/what-they-said/index-card-6.png";
const MaskotChina = "/pages/contact-us/what-they-said/maskot-china.webp";
const WhiteTiger = "/pages/contact-us/what-they-said/white-Tiger.webp";
type CardConfig = {
  [key: number]: string;
};

export default function WhatTheySaid() {
  const [activeCardMobile, setActiveCardMobile] = React.useState(0);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const mobileCards = [
    CardImage5,
    CardImage6,
    CardImage7,
    CardImage1,
    CardImage2,
    CardImage3,
  ];

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = 280 + 16; // width + gap
    const centerPosition = scrollLeft + container.offsetWidth / 2;
    const activeIndex = Math.round((centerPosition - 140) / cardWidth);
    setActiveCardMobile(
      Math.max(0, Math.min(activeIndex, mobileCards.length - 1))
    );
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      handleScroll();

      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);
  const [cardIndex, setCardIndex] = React.useState(1);
  const cardConfig: CardConfig = {
    1: CardIndexOne,
    2: CardIndexTwo,
    3: CardIndexThree,
    4: CardIndexFour,
    5: CardIndexFive,
    6: CardIndexSix,
  };


  const handleNext = () => {
    setCardIndex((prev) => (prev >= 6 ? 1 : prev + 1));
  };

  const handlePrev = () => {
    setCardIndex((prev) => (prev <= 1 ? 6 : prev - 1));
  };
  return (
    <>
      <section
        className="bg-cover bg-top block md:hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${BackgroundImage})`,
        }}
      >
        <div className="flex flex-col gap-9">
          <div className="flex justify-center">
            <img src={TheySaidImage} alt="" className="w-2/3" />
          </div>

          <div
            ref={scrollContainerRef}
            className="w-full overflow-x-auto scrollbar-hide snap-x snap-mandatory"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <div
              className={`flex gap-4 pb-9 px-4`}
              style={{
                paddingLeft: "max(1rem, calc(50vw - 140px))",
                paddingRight: "max(1rem, calc(50vw - 140px))",
              }}
            >
              {mobileCards.map((card, index) => (
                <div
                  key={index}
                  className={`shrink-0 w-[280px] snap-center transition-transform duration-300 ease-out`}
                  style={{
                    transform:
                      activeCardMobile === index ? "scale(1)" : "scale(0.85)",
                    opacity: activeCardMobile === index ? 1 : 0.6,
                  }}
                >
                  <img
                    src={card}
                    alt={`card${index + 1}`}
                    className="w-full  h-auto"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="bg-cover bg-top h-auto min-h-screen hidden md:block relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${BackgroundImage})`,
        }}
      >
        <div className="-bottom-[32%] absolute">
          <img src={MaskotChina} alt="" className="w-1/4" />
        </div>
        <div className="">
          <img
            src={WhiteTiger}
            alt=""
            className="w-1/6 right-[1%] -bottom-[9%] absolute"
          />
        </div>
        <div className="flex flex-col gap-9">
          <div className="flex justify-center">
            <img src={TheySaidImage} alt="" className="w-1/4" />
          </div>

          <div className="relative">
            <button
              id="prevBtn"
              disabled={cardIndex === 1}
              onClick={handlePrev}
              className={`${
                cardIndex === 1 ? "opacity-55" : ""
              } absolute cursor-pointer left-[15%] top-1/2 -translate-y-1/2 z-10 bg-[#FFBC2D] hover:bg-[#FFBC2D] rounded-full w-8 h-8 flex items-center justify-center shadow-lg transition-all`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
            </button>

            <div className="overflow-hidden">
              <div id="carousel" className="flex justify-center items-center">
                <div className="flex justify-center items-center">
                  <img
                    src={cardConfig[cardIndex]}
                    alt={`Card ${cardIndex}`}
                    className="w-[64%]"
                  />
                </div>
              </div>
            </div>
            <button
              id="nextBtn"
              onClick={handleNext}
              disabled={cardIndex === 6}
              className={`${
                cardIndex === 6 ? "opacity-55" : ""
              } absolute right-[15%] cursor-pointer top-1/2 -translate-y-1/2 z-10 bg-[#FFBC2D] hover:bg-[#FFBC2D] rounded-full w-8 h-8 flex items-center justify-center shadow-lg transition-all`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
