"use client";
import React, { useState, useEffect } from 'react';
import "../styles/loginPage.scss";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Palette } from 'lucide-react';
import sliderImg1 from "../assets/images/header_img.png"
import sliderImg2 from "../assets/images/headder_mobile.webp"
import sliderImg3 from "../assets/images/mobile-group.png"

import cashBill from "../assets/images/cash-bill.svg"
import paint from "../assets/images/paint.svg"
import rocket from "../assets/images/rocket.svg"

export default function LoginPage() {

    const [screenData, setScreenData] = useState({
        width: typeof window !== "undefined" ? window.innerWidth : 1200,
        isLandscape: false,
        isMobile: false
    });

    useEffect(() => {
        // Function to update all screen-related data at once
        const handleResize = () => {
            setScreenData({
                width: window.innerWidth,
                isLandscape: window.matchMedia("(orientation: landscape)").matches,
                isMobile: window.innerWidth < 768
            });
        };

        // Set initial data on mount
        handleResize();

        window.addEventListener('resize', handleResize);
        // Listen specifically for orientation changes for better mobile support
        const orientationQuery = window.matchMedia("(orientation: landscape)");
        orientationQuery.addEventListener("change", handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            orientationQuery.removeEventListener("change", handleResize);
        };
    }, []);

    // return isLandscape ? 'landscape' : 'portrait';
    const stepData = [
        {
            icon: cashBill,
            title: "Choose Plan"
        },
        {
            icon: paint,
            title: "Choose Plan"
        },
        {
            icon: rocket,
            title: "Share & Grow"
        },
    ]
    return (
        <>

            <div
                className="container-fluid login-wrapper p-0"
                style={{
                    height: screenData.width > 576
                        ? "100vh"                                // Desktop & Tablet
                        : screenData.isLandscape
                            ? "auto"                             // Mobile Landscape (Small height)
                            : "90vh"                            // Mobile Vertical
                }}
            >
                <div className="row g-0 h-100">

                    {/* Left Column (Branding & Info) */}
                    <div className="col-md-6 d-none d-md-flex flex-column justify-content-between p-md-3 p-lg-4 p-xl-5 left-side-wrap">

                        {/* Top Section (Stepper) */}
                        <div className="d-flex justify-content-between gap-2 align-items-center position-relative mt-md-4 mt-lg-2">
                            {/* Dashed line connecting steps */}
                            {/* <div className="position-absolute dashed-line d-none d-md-block"></div> */}
                            {stepData.map((step, i) => (
                                <div key={i} className="steps-count d-flex flex-row gap-2 align-items-center justify-content-center position-relative">
                                    <div className='step-icon d-flex align-items-center justify-content-center'>
                                        <img src={step.icon} alt="" />
                                    </div>
                                    <div className='position-relative'>
                                        <p className='m-0'>{`Step ${i + 1}`}</p>
                                        <small>{step.title}</small>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Middle Section */}
                        <div className="text-center d-flex flex-column align-items-center flex-grow-1 justify-content-center mt-5">
                            <h1 className="fw-bolder mb-2 mb-xxl-5">
                                Welcome to Webique’s Smart Digital Card
                            </h1>

                            {/* Swiper */}
                            <div className="position-relative w-100 d-flex justify-content-center mt-4">
                                <Swiper
                                    modules={[Autoplay, Pagination]}
                                    // loop={true}
                                    spaceBetween={30}
                                    slidesPerView={1}
                                    slidesPerGroup={1}
                                    centeredSlides={true}
                                    speed={800}
                                    autoplay={{
                                        delay: 2500,
                                        // disableOnInteraction: false,
                                    }}
                                    pagination={{ clickable: true }}
                                    className="login-swiper"
                                >
                                    <SwiperSlide>
                                        <div className='w-100 h-100'>
                                            <img src={sliderImg1} className='img-fluid' alt="Slide-1" />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className='w-100 h-100'>
                                            <img src={sliderImg2} className='img-fluid' alt="Slide-2" />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className='w-100 h-100'>
                                            <img src={sliderImg3} className='img-fluid' alt="Slide-3" />
                                        </div>
                                    </SwiperSlide>
                                </Swiper>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Login Form) */}
                    <div className="col-12 col-md-6 login-form-column bg-white d-flex flex-column justify-content-center align-items-center p-4 p-md-3">
                        <div className="py-4 form-all-wrap">

                            {/* Logo */}
                            <div className="text-center mb-4 pb-2 logo-image">
                                <img
                                    src="https://webiquecard.in/assets/webique-card-logo-C0eKQMae.svg"
                                    alt="Webique Logo"
                                    className='img-fluid'
                                />
                            </div>

                            {/* Heading */}
                            <h2 className="fw-bolder mb-4 mb-md-5" >
                                Log in to your Account
                            </h2>

                            {/* Mobile Input */}
                            <div className="form-group mb-4 pb-1">
                                <label className="mb-2 ">Enter Your Mobile Number</label>
                                <div className="input-group phone-input-group d-flex align-items-center bg-white" style={{ border: '1.5px solid #dee2e6', borderRadius: '10px', transition: 'border-color 0.2s, box-shadow 0.2s' }}>
                                    <span className="input-group-text bg-transparent border-0 text-secondary fw-bold px-3">+91</span>
                                    {/* Vertical divider */}
                                    <div className='vertical-divider'></div>
                                    <input
                                        type="tel"
                                        className="form-control form-num-input border-0 shadow-none py-3 phone-input fw-semibold"
                                        placeholder=""
                                        maxLength="10"
                                        required
                                    />
                                </div>
                            </div>

                            {/* OTP Section */}
                            <div className="form-group mb-3">
                                <label className="mb-2">Enter OTP</label>
                                <div className="d-flex justify-content-between justify-content-sm-start gap-0 gap-sm-2">
                                    {[...Array(6)].map((_, i) => (
                                        <input
                                            key={i}
                                            type="text"
                                            inputMode="numeric"
                                            maxLength="1"
                                            className="form-control form-otp-num text-center shadow-none otp-input"
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Resend Link */}
                            <div className="d-flex justify-content-start mb-4 mb-md-5">
                                <a className='resend-otp-btn' href="#">
                                    Resend Code
                                </a>
                            </div>

                            {/* Login Button */}
                            <button className="btn w-100 py-3 mb-4 mb-md-5 fw-bold shadow-sm login-btn">
                                Login
                            </button>

                            {/* Footer Socials */}
                            <div className="d-flex justify-content-center gap-4 mt-4">
                                <a href="#" style={{ color: '#1877F2' }} className="social-link">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                                    </svg>
                                </a>
                                <a href="#" style={{ color: '#E4405F' }} className="social-link">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.036 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                                    </svg>
                                </a>
                                <a href="#" style={{ color: '#0A66C2' }} className="social-link">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                                    </svg>
                                </a>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
