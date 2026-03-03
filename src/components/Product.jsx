import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { Container } from "react-bootstrap";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/Product.scss";

import imgOne from "../assets/images/reactrangle-one.png";
import imgTwo from "../assets/images/reactrangle-two.png";
import imgThr from "../assets/images/reactrangle-three.png";
import imgFvr from "../assets/images/reactrangle-four.png";
import imgFiv from "../assets/images/reactrangle-five.png";
import imgSix from "../assets/images/reactrangle-one.png";
import imgSvn from "../assets/images/reactrangle-two.png";
import imgEgt from "../assets/images/reactrangle-three.png";
import { BlurText } from "./shared/TextAnimation";

const slides = [
  imgOne, imgTwo, imgThr, imgFvr,
  imgFiv, imgSix, imgSvn, imgEgt
];

const PhoneSlider = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="phone-slider-wrapper" id="demo">
      <Container className="position-relative">

        {/* HEADING */}
        <div className="row justify-content-center text-center mb-4">
          <div className="col-md-8">


           <BlurText
                                    text="See Your Digital Card in Action"
                                    delay={100}
                                    animateBy="words"
                                    direction="bottom"
                                    className="section-heading"
                                  />


          </div>
        </div>

        {/* NAVIGATION */}
        {/* <button ref={prevRef} className="nav-btn nav-prev">
          <IoChevronBack />
        </button>

        <button ref={nextRef} className="nav-btn nav-next">
          <IoChevronForward />
        </button> */}

        {/* SIMPLE SWIPER */}
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          loop
          speed={700}
          // autoplay={{
          //   delay: 3000,
          //   disableOnInteraction: false,
          // }}
          slidesPerView={5}
          spaceBetween={30}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          pagination={{
            clickable: true,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          breakpoints={{
            0: { slidesPerView: 1.2 },
            576: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1200: { slidesPerView: 5 },
          }}
          className="simple-swiper"
        >
          {slides.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="slide-box">
                <img src={img} alt={`slide-${i}`} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
};

export default PhoneSlider;