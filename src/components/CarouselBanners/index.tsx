"use client";
import { Button } from "@/components/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


export function CarouselBanners({banners} : {banners: any[]}) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000 }}
      className="w-[calc(100vw-1rem)] lg:w-full rounded-2xl overflow-hidden"
    >
      {banners.map((banner) => (
        <SwiperSlide key={banner.id}>
          <div
            className="bg-cover bg-center hidden lg:flex h-[206px] lg:h-[490px] flex-col justify-center gap-2 lg:gap-14 items-start p-4 lg:p-8"
            style={{ backgroundImage: `url(${banner.image})` }}
          ></div>
          <div
            className="bg-cover bg-center h-[206px] lg:h-[490px] lg:hidden flex flex-col justify-center gap-2 lg:gap-14 items-start p-4 lg:p-8"
            style={{ backgroundImage: `url(${banner.mobile})` }}
          ></div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
