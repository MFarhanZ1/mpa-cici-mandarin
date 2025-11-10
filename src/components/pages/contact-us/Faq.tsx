import React, { useEffect, useRef, useState } from "react";
// mobile
const BackgroundMerahMobile = "/pages/contact-us/faq/mobile/bg-faq-merah.webp";
const BackgroundBiruMobile = "/pages/contact-us/faq/mobile/bg-faq-biru.webp";
const BackgroundHijauMobile = "/pages/contact-us/faq/mobile/bg-faq-hijau.webp";
const BackgroundOrenMobile = "/pages/contact-us/faq/mobile/bg-faq-orange.webp";
const merahButtonActiveMobile = "/pages/contact-us/faq/mobile/merah-active.png";
const merahButtonNonActiveMobile =
  "/pages/contact-us/faq/mobile/merah-non-active.png";
const biruButtonActiveMobile = "/pages/contact-us/faq/mobile/biru-active.png";
const biruButtonNonActiveMobile =
  "/pages/contact-us/faq/mobile/biru-non-active.png";
const hijauButtonActiveMobile = "/pages/contact-us/faq/mobile/hijau-active.png";
const hijauButtonNonActiveMobile =
  "/pages/contact-us/faq/mobile/hijau-non-active.png";
const orangeButtonActiveMobile =
  "/pages/contact-us/faq/mobile/orange-active.png";
const orangeButtonNonActiveMobile =
  "/pages/contact-us/faq/mobile/orange-non-active.png";

// web asset
const BackgroundMerah = "/pages/contact-us/faq/web/bg-faq-merah.webp";
const BackgroundBiru = "/pages/contact-us/faq/web/bg-faq-biru.webp";
const BackgroundHijau = "/pages/contact-us/faq/web/bg-faq-hijau.webp";
const BackgroundOren = "/pages/contact-us/faq/web/bg-faq-oren.webp";
const merahButtonActive = "/pages/contact-us/faq/web/merah-active.png";
const merahButtonNonActive = "/pages/contact-us/faq/web/merah-non-active.png";
const biruButtonActive = "/pages/contact-us/faq/web/biru-active.png";
const biruButtonNonActive = "/pages/contact-us/faq/web/biru-non-active.png";
const hijauButtonActive = "/pages/contact-us/faq/web/hijau-active.png";
const hijauButtonNonActive = "/pages/contact-us/faq/web/hijau-non-active.png";
const orangeButtonActive = "/pages/contact-us/faq/web/orange-active.png";
const orangeButtonNonActive = "/pages/contact-us/faq/web/orange-non-active.png";

type ColorType = "merah" | "biru" | "orange" | "hijau";
export default function Faq() {
  const [activeColor, setActiveColor] = useState<ColorType>("merah");

  // Object mapping untuk background dan button
  const colorConfig = {
    merah: {
      background: BackgroundMerah,
      active: merahButtonActive,
      nonActive: merahButtonNonActive,
    },
    biru: {
      background: BackgroundBiru,
      active: biruButtonActive,
      nonActive: biruButtonNonActive,
    },
    orange: {
      background: BackgroundOren,
      active: orangeButtonActive,
      nonActive: orangeButtonNonActive,
    },
    hijau: {
      background: BackgroundHijau,
      active: hijauButtonActive,
      nonActive: hijauButtonNonActive,
    },
  };
  // Object mapping untuk background dan button (mobile)
  const colorConfigMobile = {
    merah: {
      background: BackgroundMerahMobile,
      active: merahButtonActiveMobile,
      nonActive: merahButtonNonActiveMobile,
    },
    biru: {
      background: BackgroundBiruMobile,
      active: biruButtonActiveMobile,
      nonActive: biruButtonNonActiveMobile,
    },
    orange: {
      background: BackgroundOrenMobile,
      active: orangeButtonActiveMobile,
      nonActive: orangeButtonNonActiveMobile,
    },
    hijau: {
      background: BackgroundHijauMobile,
      active: hijauButtonActiveMobile,
      nonActive: hijauButtonNonActiveMobile,
    },
  };
  // Handler untuk click button
  const handleColorChange = (color: ColorType) => {
    setActiveColor(color);
  };

  return (
    <>
      <section className="block md:hidden relative">
        <img
          src={colorConfigMobile[activeColor].background}
          alt="Contact Us Background"
          className="w-full h-auto object-cover object-center"
        />

        {/* Container untuk overflow */}
        <div className="absolute top-[13%] px-10">
          {/* Wrapper flex */}
          <div className="grid grid-cols-2">
            <div
              onClick={() => handleColorChange("merah")}
              className="cursor-pointer"
            >
              <img
                src={
                  activeColor === "merah"
                    ? colorConfigMobile.merah.active
                    : colorConfigMobile.merah.nonActive
                }
                alt=""
                className=""
              />
            </div>
            <div
              onClick={() => handleColorChange("biru")}
              className="cursor-pointer"
            >
              <img
                src={
                  activeColor === "biru"
                    ? colorConfigMobile.biru.active
                    : colorConfigMobile.biru.nonActive
                }
                alt=""
                className=""
              />
            </div>
            <div
              onClick={() => handleColorChange("orange")}
              className="cursor-pointer"
            >
              <img
                src={
                  activeColor === "orange"
                    ? colorConfigMobile.orange.active
                    : colorConfigMobile.orange.nonActive
                }
                alt=""
                className=""
              />
            </div>
            <div
              onClick={() => handleColorChange("hijau")}
              className="cursor-pointer"
            >
              <img
                src={
                  activeColor === "hijau"
                    ? colorConfigMobile.hijau.active
                    : colorConfigMobile.hijau.nonActive
                }
                alt=""
                className=""
              />
            </div>
          </div>
        </div>
      </section>

      <section className="hidden md:block relative">
        <img
          src={colorConfig[activeColor].background}
          alt="Contact Us Background"
          className="w-full h-auto object-cover object-center"
        />

        <div className="flex justify-center items-center absolute top-[15%] left-1/2 -translate-x-[51%] gap-1.5">
          <div
            onClick={() => setActiveColor("merah")}
            className="cursor-pointer"
          >
            <img
              src={
                activeColor === "merah"
                  ? colorConfig.merah.active
                  : colorConfig.merah.nonActive
              }
              alt="Merah Button"
            />
          </div>

          <div
            onClick={() => setActiveColor("biru")}
            className="cursor-pointer"
          >
            <img
              src={
                activeColor === "biru"
                  ? colorConfig.biru.active
                  : colorConfig.biru.nonActive
              }
              alt="Biru Button"
            />
          </div>

          <div
            onClick={() => setActiveColor("orange")}
            className="cursor-pointer"
          >
            <img
              src={
                activeColor === "orange"
                  ? colorConfig.orange.active
                  : colorConfig.orange.nonActive
              }
              alt="Orange Button"
            />
          </div>

          <div
            onClick={() => setActiveColor("hijau")}
            className="cursor-pointer"
          >
            <img
              src={
                activeColor === "hijau"
                  ? colorConfig.hijau.active
                  : colorConfig.hijau.nonActive
              }
              alt="Hijau Button"
            />
          </div>
        </div>
      </section>
    </>
  );
}
