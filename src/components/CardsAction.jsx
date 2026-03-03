import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "../styles/CardsAction.scss";

/* Images */
import imgOne from "../assets/images/reactrangle-one.png";
import imgTwo from "../assets/images/reactrangle-two.png";
import imgThr from "../assets/images/reactrangle-three.png";
import imgFvr from "../assets/images/reactrangle-four.png";
import imgFiv from "../assets/images/reactrangle-five.png";
import imgSix from "../assets/images/reactrangle-one.png";
import imgSvn from "../assets/images/reactrangle-two.png";
import imgEgt from "../assets/images/reactrangle-three.png";

import phoneFrame from "../assets/images/phone-frame.png";

const CardsAction = () => {
  const images = [
    { id: 1, image: imgOne },
    { id: 2, image: imgTwo },
    { id: 3, image: imgThr },
    { id: 4, image: imgFvr },
    { id: 5, image: imgFiv },
    { id: 6, image: imgSix },
    { id: 7, image: imgSvn },
    { id: 8, image: imgEgt },
  ];

  return (
    <section className="cards-action">
      {/* STATIC PHONE FRAME */}
      <div className="phone-frame">
        <img src={phoneFrame} alt="phone frame" />
      </div>

      <Swiper
        modules={[Autoplay]}
        centeredSlides
        loop
        slidesPerView={5}
        spaceBetween={8}
        speed={600}
        // autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        // }}
        breakpoints={{
          0: { slidesPerView: 1.3 },
          576: { slidesPerView: 2.3 },
          768: { slidesPerView: 3.2 },
          992: { slidesPerView: 5 },
        }}
        className="cards-swiper"
      >
        {images.map((item) => (
          <SwiperSlide key={item.id}>
            {({ isActive }) => (
              <div className={`slide-wrap ${isActive ? "active" : ""}`}>
                <div className="screen">
                  <img src={item.image} alt="" />
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CardsAction;
