"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { lora } from "../font";
import { Icon } from "@iconify/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import { EffectCards, Navigation, Scrollbar } from "swiper/modules";
import Link from "next/link";
import "../swiper-carousel.css";

function Memory({
  assets,
  title,
  date,
}: {
  assets: { bg: string; url: string }[];
  title: string;
  date: string;
}) {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [explore360, setExplore360] = useState("hidden");
  const openingTouch = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setTimeout(() => {
      openingTouch.current!.style.display = "none";
      setExplore360("flex");
    }, 2500);

    return () => {
      clearTimeout(id);
    };
  }, []);

  return (
    <section id="preview" className="relative">
      <div className={`text-center mb-0 ${lora.className}`}>
        <h1 className="text-[#F66F6F] text-3xl font-bold mb-2">#{title}</h1>
        <p className="font-medium text-lg">{date}</p>
      </div>
      <div className="px-8 py-16 relative">
        <Swiper
          effect={"cards"}
          grabCursor={true}
          scrollbar={{
            draggable: true,
          }}
          modules={[EffectCards, Scrollbar, Navigation]}
          className="mySwiper"
          onSlideChange={(swiper: any) => {
            setCurrentSlide(swiper.activeIndex + 1);
          }}
          navigation={true}
        >
          {assets.map((slide, index) => (
            <SwiperSlide
              key={index}
              className={`${slide.bg} bg-cover rounded-md relative`}
            >
              <Link
                href={slide.url}
                className="absolute inset-0 items-center justify-center flex"
              >
                <div
                  className={`${explore360} flex-col items-center gap-4 z-10 text-white`}
                >
                  <Image
                    src="/ic-360.svg"
                    alt="360 asset"
                    width={56}
                    height={56}
                  />
                  <span>Explore 360</span>
                </div>
                <div className="absolute inset-0 bg-black/50 rounded-md"></div>
              </Link>
            </SwiperSlide>
          ))}
          <h1
            className={`text-2xl font-semibold ${lora.className} absolute -bottom-[4.75rem] right-0`}
          >
            {currentSlide}/{assets.length}
          </h1>
          <div
            ref={openingTouch}
            className="pointer-events-none absolute w-full h-full z-40"
            style={{
              maxWidth: "400px",
              maxHeight: "300px",
              minWidth: "200px",
              minHeight: "250px",
              WebkitOverflowScrolling: "touch",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="relative overflow-auto w-full h-full grid text-center justify-items-center content-center">
              <Icon
                icon="carbon:touch-1-filled"
                color="white"
                fontSize={128}
                className="animate-pulse animate-wiper"
              />
              <h4 className="text-white lg:text-2xl">
                Geser untuk menggunakan
                <br />
                resepsi virtual
              </h4>
            </div>
          </div>
        </Swiper>
      </div>
    </section>
  );
}

export default Memory;
