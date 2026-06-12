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
import imgOne from "../assets/images/mockup-11.png";
import imgTwo from "../assets/images/mockup-12.png";
import imgFour from "../assets/images/mockup-14.png";
import imgFive from "../assets/images/mockup-15.png";

import imgSix from "../assets/images/mockup-16.png";
// 1
import imgSeven from "../assets/images/digital-card-2.png";

import imgEight from "../assets/images/mockup-18.png";

import imgNine from "../assets/images/mockup-19.png";
// 2
import imgTen from "../assets/images/business-card-2.png";

import { BlurText } from "./shared/TextAnimation";

const webImages = [
  {
    src: imgFive,
    alt: "Digital branding concept",
    link: "https://webiquecard.in/clientid"
  },
  {
    src: imgTwo,
    alt: "Creative UI UX design",
    link: "https://webiquecard.in/panchakrushna"
  },
  {
    src: imgOne,
    alt: "Modern website design",
    link: "https://webiquecard.in/restraurent"
  },
  {
    src: imgFour,
    alt: "Mobile app interface",
    link: "https://webiquecard.in/buzzcafe"
  },
  {
    src: imgFive,
    alt: "Digital branding concept",
    link: "https://webiquecard.in/clientid"
  },
  {
    src: imgTen,
    alt: "Web development dashboard",
    link: "https://webiquecard.in/businesscard"
  },
  {
    src: imgSix,
    alt: "Modern website design",
    link: "https://webiquecard.in/anupam"
  },
  {
    src: imgSeven,
    alt: "Creative UI UX design",
    link: "https://webiquecard.in/digitalcardtwo"
  },
  {
    src: imgEight,
    alt: "Web development dashboard",
    link: ""
  },
  {
    src: imgNine,
    alt: "Mobile app interface",
    link: "https://webiquecard.in/hospital"
  },
  {
    src: imgTen,
    alt: "Digital branding concept",
    link: "https://webiquecard.in/businesscard"
  },
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
    <section className="product-wrap" id="demo">
      {/* <div className="w-lgo-wrap d-none d-xl-block">
        <img src={wLgo} alt="Header Logo" />
      </div> */}
      {/* content */}


      {/* card stag slider */}
      <div className="header-portfolio section-padding pb-0">

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
          loopAdditionalSlides={0}
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
              spaceBetween: 10,
            },
            576: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1200: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
            1440: {
              slidesPerView: 6,
              spaceBetween: 20,
            },
          }}
          onSlideChange={animateSlides}
          className="mySwiper"

        >
          {webImages.map((value, index) => (
            <SwiperSlide key={index}>
              <a
                href={value.link}
                className="portfolio-slide"
                target="_blank"
              >
                <img
                  className=""
                  src={value.src}
                  alt={`slide-${value.alt}${index}`}
                />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Header;
