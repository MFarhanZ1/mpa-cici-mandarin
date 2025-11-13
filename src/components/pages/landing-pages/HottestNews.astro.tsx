import React, { useEffect } from "react";

const Background = "/pages/landing-pages/hottest-news/BG.webp";
const cardnews1 = "/pages/landing-pages/hottest-news/card-cici-news-1.webp";
const cardnews2 = "/pages/landing-pages/hottest-news/card-cici-news-2.webp";
const cardnews3 = "/pages/landing-pages/hottest-news/card-cici-news-3.webp";
const cardnews4 = "/pages/landing-pages/hottest-news/card-cici-news-4.webp";

const newsCards = [
  {
    image: cardnews1,
    alt: "card1",
    link: "/article/80-tahun-kemenangan-perang-dunia-II",
  },
  {
    image: cardnews2,
    alt: "card2",
    link: "/article/di-balik-tembok-kampus-tiongkok",
  },
  {
    image: cardnews3,
    alt: "card3",
    link: "/article/bukan-cuma-tren",
  },
  {
    image: cardnews4,
    alt: "card4",
    link: "/article/jalan-jalan-ke-masa-depan",
  },
];

export default function HottestNews() {
  const [activeCardMobile, setActiveCardMobile] = React.useState(0);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = 280 + 16; // width + gap
    const centerPosition = scrollLeft + container.offsetWidth / 2;
    const activeIndex = Math.round((centerPosition - 140) / cardWidth);
    setActiveCardMobile(
      Math.max(0, Math.min(activeIndex, newsCards.length - 1)),
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

  return (
    <>
      {/*mobile version*/}
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
          <div
            ref={scrollContainerRef}
            className="w-full overflow-x-auto scrollbar-hide snap-x snap-mandatory"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <div
              className={`flex gap-4 pb-9`}
              style={{
                paddingLeft: "max(1rem, calc(50vw - 140px))",
                paddingRight: "max(1rem, calc(50vw - 140px))",
              }}
            >
              {newsCards.map((card, index) => (
                <div
                  key={index}
                  className={`shrink-0 w-[280px] snap-center transition-all duration-300 ease-out cursor-pointer`}
                  style={{
                    transform:
                      activeCardMobile === index ? "scale(1)" : "scale(0.85)",
                    opacity: activeCardMobile === index ? 1 : 0.6,
                    borderWidth: activeCardMobile === index ? "4px" : "0px",
                    borderColor:
                      activeCardMobile === index ? "#FFBC2D" : "transparent",
                    borderRadius: "1rem",
                  }}
                  onClick={() => {
                    window.location.href= card.link;
                  }}
                >
                  <img
                    src={card.image}
                    alt={card.alt}
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/*web version*/}
      <section
        className="bg-cover px-7 py-12 -mt-[14%] 2xl:-mt-[10%] md:block hidden -mb-[2%] relative"
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
              {newsCards.map((card, index) => (
                <div key={index} className="shrink-0 w-[275px]">
                  <img
                    src={card.image}
                    alt={card.alt}
                    className="w-full h-auto rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                    onClick={() => {
                      window.location.href = card.link;
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
