// components/Header.jsx
import React, { useRef, useEffect } from "react";
import "../styles/headers.scss";
// import "../styles/HeroSection.scss";
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

// GSAP
import { gsap } from "gsap";

// icons
import arrowOne from "../assets/images/arrow-one.svg";

// images
import imgOne from "../assets/images/reactrangle-one.png";
import imgTwo from "../assets/images/reactrangle-two.png";
import imgThree from "../assets/images/reactrangle-three.png";
import imgFour from "../assets/images/reactrangle-four.png";
import imgFive from "../assets/images/reactrangle-five.png";
import { BlurText } from "./shared/TextAnimation";



const webImages = [
  { src: imgOne, alt: "Modern website design" },
  { src: imgTwo, alt: "Creative UI UX design" },
  { src: imgThree, alt: "Web development dashboard" },
  { src: imgFour, alt: "Mobile app interface" },
  { src: imgFive, alt: "Digital branding concept" },
  { src: imgOne, alt: "Modern website design" },
  { src: imgTwo, alt: "Creative UI UX design" },
  { src: imgThree, alt: "Web development dashboard" },
  { src: imgFour, alt: "Mobile app interface" },
  { src: imgFive, alt: "Digital branding concept" },
  { src: imgOne, alt: "Modern website design" },
  { src: imgTwo, alt: "Creative UI UX design" },
  { src: imgThree, alt: "Web development dashboard" },
  { src: imgFour, alt: "Mobile app interface" },
  { src: imgFive, alt: "Digital branding concept" },
]

const Header = () => {
  const swiperRef = useRef(null);

  const animateSlides = (swiper) => {
    swiper.slides.forEach((slide, index) => {
      const img = slide.querySelectorAll("a");
      // console.log(img);

      if (!img) return;

      const position = index - swiper.activeIndex;

      let y = 90;
      // let scale = 0.9;

      if (position === 0) {
        // scale = 1;
        y = 0;
      } else if (Math.abs(position) === 1) {
        // scale = 0.9;
        y = 30;
      } else if (Math.abs(position) === 2) {
        // scale = 0.9;
        y = 60;
      }

      gsap.to(img, {
        y,
        // scale,
        duration: 0.6,
        ease: "power3.out",
      });
    });
  };

  return (
    <header className="product-wrap" id="demo">
      {/* <div className="w-lgo-wrap d-none d-xl-block">
        <img src={wLgo} alt="Header Logo" />
      </div> */}
      {/* content */}


      {/* card stag slider */}
      <div className="header-portfolio">

        <div class="justify-content-center text-center mb-3 mb-lg-5 row">
          <div class="col-md-8">
            {/* <h2 class="section-heading mb-3">See Your Digital Card in Action</h2> */}

            <BlurText
              text="See Your Digital Card in Action"
              delay={100}
              animateBy="words"
              direction="bottom"
              className="justify-content-center section-heading"
            />
          </div>
        </div>
        <Swiper
          slidesPerView={7}
          spaceBetween={20}
          centeredSlides
          loop
          loopAdditionalSlides={4}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          onInit={(swiper) => {
            swiperRef.current = swiper;
            animateSlides(swiper);
          }}
          breakpoints={{
            0: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            420: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 7,
              spaceBetween: 20,
            },
          }}
          onSlideChange={animateSlides}
          className="mySwiper"

        >
          {webImages.map((img, index) => (
            <SwiperSlide key={index}>
              <a href="#" className="portfolio-slide">
                <img className="" src={img.src} alt={`slide-${img.alt}${index}`} />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </header>
  );
};

export default Header;
