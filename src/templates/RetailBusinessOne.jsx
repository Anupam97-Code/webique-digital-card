import React, { useMemo, useState, useEffect, useRef, useLayoutEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/digitalCard.scss"
import {
    Phone,
    Mail,
    MapPin,
    Facebook,
    Linkedin,
    Instagram,
    Youtube,
    Twitter,
    Ghost,
    ArrowUpRight,
    MessageCircle,
    Share2,
    Sun,
    Moon,
    ScanQrCode,
    Soup,
    UserStar,
    ShoppingCart,
    BadgePercent,
    PartyPopper,
    CookingPot,
    Clock,
    Download
} from "lucide-react";
import { li } from "framer-motion/client";
import { Col, Row } from "react-bootstrap";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

/* ======================================================
   FACEBOOK STYLE DIGITAL BUSINESS CARD
   Light/Dark • WhatsApp • Share • Instagram
   Fully Functional • Error Free
====================================================== */

const socialIcons = [
    <Ghost />,
    <Facebook />,
    <Instagram />,
    <Twitter />,
    <Linkedin />,
    <Youtube />
];

const serviceIcon = [
    <Soup size={44} />,
    <UserStar size={44} />,
    <ShoppingCart size={44} />,
    <BadgePercent size={44} />,
    <PartyPopper size={44} />,
    <CookingPot size={44} />
]

function Premium2({ data, saveContact, openQR }) {
    const [darkMode, setDarkMode] = useState(false);
    const [activeMenuTab, setActiveMenuTab] = useState(0);
    const safeData = data || {};

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 417);

    useEffect(() => {

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 400);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };

    }, []);

    // console.log("is mobile:", isMobile);


    const profile = useMemo(() => ({
        headerBgImage: safeData.headerBgImage || "",
        profileImage: safeData.profileImage || "/images/default-profile.png",

        name: safeData.name || "John Doe",
        title: safeData.title || "Business Owner",

        description: safeData.description || "",
        aboutDescription: safeData.aboutDescription || "",

        company: safeData.company || "",
        email: safeData.email || "",
        whatsapp: safeData.whatsapp || "",

        socialLinks: safeData.socialLinks || [],

        servicesData: safeData.servicesData || [],

        menuTabData: safeData.menuTabData || [],

        gallerySlider: safeData.gallerySlider || [],

        tesimonialSliderData: safeData.tesimonialSliderData || [],

        contactData: safeData.contactData || {
            phone_Number: "",
            mail: "",
            restaurant_Number: "",
            location: {
                address: "",
                link: ""
            }
        },

        openingHours: safeData.openingHours || [],
        iframe: safeData.iframe,
        colors: safeData.colors,

        ogImage: safeData.ogImage || "",
        darkModeImage: safeData.darkModeImage || "",

        package: safeData.package || "basic",
        template: safeData.template || "Basic1"

    }), [safeData]);

    // const contactArr = new Array(profile.contactData)
    // console.log(profile);

    const whatsappNumber = String(profile.whatsapp).replace(/[^0-9]/g, "");
    const currentUrl = typeof window !== "undefined" ? window.location.href : "";

    const shareCard = () => {
        if (navigator.share) {
            navigator
                .share({
                    title: profile.name,
                    text: `Connect with ${profile.name}`,
                    url: currentUrl,
                })
                .catch(() => { });
        } else {
            window.open(
                `https://wa.me/?text=${encodeURIComponent(
                    `Connect with ${profile.name} - ${currentUrl}`
                )}`,
                "_blank"
            );
        }
    };

    const ActionItem = ({ icon, title, subtitle, href }) => {
        const isExternal = href.startsWith("http");
        return (
            <a
                href={href}
                target={isExternal ? "_blank" : "_self"}
                rel={isExternal ? "noopener noreferrer" : ""}
                className="w-100 d-flex align-items-center justify-content-between text-decoration-none p-2 border"
                style={{
                    backgroundColor: darkMode ? "#1e293b" : profile.colors.trinery,
                    color: darkMode ? "#fff" : "#000",
                    borderRadius: "4px"
                }}
            >
                <div className="d-flex align-items-center gap-3">
                    <div
                        className="d-flex align-items-center justify-content-center rounded-3"
                        style={{
                            width: "42px",
                            height: "42px",
                            background: darkMode ? "#0f172a" : "#ffffff",
                            color: darkMode ? profile.colors.Primery : profile.colors.Primery,
                            flexShrink: "0",
                        }}
                    >
                        {icon}
                    </div>
                    <div>
                        <div className="fw-semibold">{title}</div>
                        <small style={{ opacity: 0.7 }}>{subtitle}</small>
                    </div>
                </div>
                <div className="flex-shrink-0">
                    <ArrowUpRight size={18} style={{ opacity: 0.5 }} />
                </div>
            </a>
        )
    }

    // Gallery slider component
    const GallerySlider = ({ slideData }) => {
        const [sliderRef, setSliderRef] = useState();
        // console.log(sliderRef);

        // function to split array into chunks of 4
        const chunkArray = (arr, size) => {
            const result = [];
            for (let i = 0; i < arr.length; i += size) {
                result.push(arr.slice(i, i + size));
            }
            return result;
        };

        const slides = chunkArray(slideData, 4);

        return (
            <div
                className="slider-container d-flex"
                style={{
                    overflowX: "auto",
                    width: "100%",
                    gap: "24px",
                    scrollSnapType: "x mandatory"
                }}
            >
                {slides.map((slide, slideIndex) => (
                    <div
                        className="slide"
                        key={slideIndex}
                        style={{
                            maxWidth: "370px",
                            scrollSnapAlign: "start",
                            flexShrink: 0
                        }}
                    >
                        <Row>
                            {slide.map((value, index) => (
                                <Col xs={6} key={index} className="mb-3">
                                    <img
                                        src={value.galleryImage}
                                        alt={value.imageAlt}
                                        style={{
                                            width: "100%",
                                            borderRadius: "4px",
                                            objectFit: "cover"
                                        }}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </div>
                ))}
            </div>
        );
    };

    // testimonial slider component
    const TestimonialSlider = ({ data }) => {

        const containerRef = useRef(null);
        const wrapperRef = useRef(null);

        const [active, setActive] = useState(0);

        const slides = [...data, ...data.slice(0, 2)];

        const indexRef = useRef(0);
        const autoRef = useRef(null);
        const draggableRef = useRef(null);

        useLayoutEffect(() => {

            const container = containerRef.current;
            const wrapper = wrapperRef.current;

            if (!container || !wrapper) return;

            const slideWidth = container.offsetWidth / 2;
            const total = data.length;

            gsap.set(wrapper, { x: 0 });

            const moveSlide = (i) => {

                indexRef.current = i;

                gsap.to(wrapper, {
                    x: -(slideWidth * i),
                    duration: 0.6,
                    ease: "power2.out",
                    overwrite: true,
                    onComplete: () => {

                        if (i >= total) {
                            gsap.set(wrapper, { x: 0 });
                            indexRef.current = 0;
                        }

                        setActive(i % total);
                    }
                });
            };

            // autoplay
            autoRef.current = setInterval(() => {
                moveSlide(indexRef.current + 1);
            }, 3000);

            // draggable
            draggableRef.current = Draggable.create(wrapper, {
                type: "x",
                inertia: true,
                bounds: {
                    minX: -(slideWidth * total),
                    maxX: 0
                },

                onPress() {
                    clearInterval(autoRef.current);
                },

                onDragEnd() {

                    const newIndex = Math.round(Math.abs(this.x) / slideWidth);

                    moveSlide(newIndex);

                    autoRef.current = setInterval(() => {
                        moveSlide(indexRef.current + 1);
                    }, 3000);
                }

            })[0];

            return () => {

                clearInterval(autoRef.current);

                if (draggableRef.current) {
                    draggableRef.current.kill();
                }

                gsap.killTweensOf(wrapper);

            };

        }, [data]);

        return (
            <div className="testimonial-slider" ref={containerRef}>

                <div className="testimonial-wrapper" ref={wrapperRef}>

                    {slides.map((test, i) => (
                        <div
                            className="testimonial-card d-flex flex-column gap-2"
                            key={i}
                            style={{
                                border: `1px solid ${profile.colors.borderGray}`,
                                padding: "24px 13px 10px",
                                boxSizing: "border-box"
                            }}
                        >

                            <div className="test-header">

                                <img
                                    src={test.testSrc || "https://i.pravatar.cc/100"}
                                    alt={test.testName}
                                />

                                <div>
                                    <strong
                                        style={{
                                            color: darkMode ? profile.colors.white : profile.colors.black,
                                            fontSize: "14px"
                                        }}
                                    >
                                        {test.testName}
                                    </strong>

                                    <div className="test-post">
                                        {test.testPost}
                                    </div>
                                </div>

                            </div>

                            <p
                                style={{
                                    color: darkMode ? profile.colors.white : profile.colors.black,
                                    fontSize: "13px",
                                    lineHeight: "20px"
                                }}
                            >
                                {test.testReview}
                            </p>

                        </div>
                    ))}

                </div>

                <div className="test-dots">

                    {data.map((_, i) => (
                        <span
                            key={i}
                            className={active === i ? "dot active" : "dot"}
                            onClick={() => {

                                clearInterval(autoRef.current);

                                const slideWidth = containerRef.current.offsetWidth / 2;

                                gsap.to(wrapperRef.current, {
                                    x: -(slideWidth * i),
                                    duration: 0.6
                                });

                                indexRef.current = i;
                                setActive(i);

                            }}
                            style={{
                                cursor: "pointer",
                                background: active === i
                                    ? (darkMode ? profile.colors.white : profile.colors.black)
                                    : ""
                            }}
                        />
                    ))}

                </div>

            </div>
        );
    };

    return (
        <div
            className="min-vh-100 d-flex align-items-center justify-content-center p-0 p-md-3"
            style={{ background: darkMode ? "#0f172a" : "#F1F3F5" }}
        >
            {/* Theme Toggle */}
            <button
                onClick={() => setDarkMode(!darkMode)}
                className="btn position-fixed top-0 end-0 z-3 rounded-circle shadow"
                style={{
                    background: darkMode ? "rgb(255, 255, 255)" : "#1F2D3D",
                    color: darkMode ? "#1F2D3D" : "#ffffff",
                    padding: "12px 15px",
                    marginRight: "16px",
                    marginTop: "16px",
                }}
            >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <div
                className="position-relative "
                style={{
                    width: "100%",
                    maxWidth: isMobile ? "100%" : "402px",
                    background: darkMode ? profile.colors.grayblack : "#ffffff",
                    // paddingBottom: "20px",
                    color: darkMode ? "#fff" : "#000",
                }}
            >
                {/* to header Image */}
                <div
                    style={{
                        height: "170px",
                        backgroundImage: `url(${profile.headerBgImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        // borderRadius: "16px",
                    }}
                />
                {/* make this wrapper div to wrapp all the filds */}
                <div
                    className="position-relative d-flex flex-column align-items-start justify-content-between"
                    style={{ gap: "15px", padding: "12px 16px 16px 16px" }}
                >
                    {/* Profile Image / logo */}
                    <div className="w-100 d-flex justify-content-center gap-3" style={{ paddingLeft: "95px" }}>
                        <img
                            src={darkMode ? profile.darkModeImage : profile.profileImage}
                            alt={profile.name}
                            className="position-absolute"
                            style={{
                                width: "120px",
                                height: "120px",
                                borderRadius: "50%",
                                objectFit: "cover",
                                // border: "8px solid #f1f3f5",
                                left: "16px",
                                top: "-40px"
                            }}
                        />
                        <div className="">
                            <h4 className="fw-bold"
                                style={{
                                    color: darkMode ? "#fff" : "#000",
                                }}
                            >{profile.name}</h4>
                            <p
                                style={{
                                    opacity: 0.7,
                                    color: darkMode ? "#fff" : "#000",
                                }} className="mb-3">
                                {/* {profile.title} | <strong>{profile.company}</strong> */}
                                {profile.title}
                            </p>
                        </div>
                    </div>

                    {/* Social Links / with lucid react icons */}
                    <ul className="d-flex justify-content-center gap-3">
                        {profile.socialLinks.map((item, i) => (
                            <li key={i}>
                                <a
                                    href={item.socialURL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded"
                                    style={{
                                        background: profile.colors.Secondery,
                                        color: profile.colors.Primery,
                                    }}
                                >
                                    {socialIcons[i]}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* about */}
                    <div>
                        <h5 className="fw-bold"
                            style={{
                                opacity: "0.8",
                                color: darkMode ? profile.colors.white : profile.colors.black
                            }}
                        >About Us</h5>
                        <p style={{
                            opacity: 0.8,
                            opacity: "0.7",
                            color: darkMode ? profile.colors.white : profile.colors.black
                        }}>
                            {profile.aboutDescription}
                        </p>
                    </div>

                    {/* service crad grid */}
                    <div>
                        <h5 className="fw-bold"
                            style={{
                                opacity: "0.8",
                                color: darkMode ? profile.colors.white : profile.colors.black
                            }}
                        >My Services</h5>

                        <Row className="row g-3">
                            {profile.servicesData.map((service, i) => (
                                <Col xs={4} key={i} className="">
                                    <div
                                        className="p-3 h-100 text-center rounded d-flex gap-2 flex-column align-items-center justify-content-center"
                                        style={{ background: profile.colors.trinery }}
                                    >
                                        <div
                                            style={{
                                                color: profile.colors.Primery,
                                            }}
                                        >
                                            {serviceIcon[i]}
                                        </div>
                                        <h6
                                            style={{
                                                fontSize: "14px",
                                                opacity: "0.7",
                                                color: darkMode ? profile.colors.white : profile.colors.black
                                            }}
                                        >{service}</h6>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </div>

                    {/* menu tabs */}
                    <div className="w-100">
                        <h5 className="mt-4 fw-bold"
                            style={{
                                opacity: "0.8",
                                color: darkMode ? profile.colors.white : profile.colors.black
                            }}
                        >Our Menu</h5>
                        {/* tabs btns map */}
                        <ul className="nav nav-pills">
                            {profile.menuTabData.map((tab, i) => (
                                <li key={i} className="nav-item">
                                    <button
                                        className={`nav-link ${activeMenuTab === i ? "active" : ""}`}
                                        onClick={() => setActiveMenuTab(i)}
                                        style={{
                                            background: activeMenuTab === i ? profile.colors.Secondery : profile.colors.white,
                                            color: activeMenuTab === i ? profile.colors.Primery : "#000",
                                            borderRadius: "6px",
                                            marginRight: "8px",
                                            padding: "4px 13px",
                                            fontSize: "13px"
                                        }}
                                    >
                                        {tab.menuTabName}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        {/* tab container */}
                        <div>
                            {profile.menuTabData[activeMenuTab]?.menuTabList.map((dish, j) => (
                                <div
                                    key={j}
                                    className="d-flex justify-content-between align-items-center border-bottom py-3"
                                >
                                    <div className="d-flex align-items-center gap-3">
                                        {/* {dish.menuDishSrc && ( */}
                                        <img
                                            src={dish.menuDishSrc || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxyohPzhQzmROQXU-Zus26TJlV0RuGLEwebQ&s"}
                                            alt={dish.menuDishName}
                                            style={{
                                                width: "50px",
                                                height: "50px",
                                                borderRadius: "8px",
                                                objectFit: "cover",
                                            }}
                                        />
                                        {/* )} */}

                                        <span
                                            style={{
                                                opacity: "0.7",
                                                color: darkMode ? profile.colors.white : profile.colors.black
                                            }}
                                        >{dish.menuDishName}</span>
                                    </div>

                                    <div
                                        style={{
                                            color: profile.colors.Primery,
                                            fontWeight: "600",
                                        }}
                                    >
                                        ₹ {dish.menuDishPrice}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Gallery */}
                    <div
                        className=""
                        style={{
                            overflow: "hidden",
                            width: "100%"
                        }}
                    >
                        <h5 className="mt-4 fw-bold"
                            style={{
                                opacity: "0.8",
                                color: darkMode ? profile.colors.white : profile.colors.black
                            }}
                        >Gallery</h5>
                        <GallerySlider slideData={profile.gallerySlider} />
                    </div>

                    {/* testimonial */}
                    <div className="w-100">
                        <h5 className="mt-4 fw-bold"
                            style={{
                                opacity: "0.8",
                                color: darkMode ? profile.colors.white : profile.colors.black
                            }}
                        >Testimonials</h5>

                        <TestimonialSlider
                            data={profile.tesimonialSliderData}
                            darkMode={darkMode}
                            profile={profile}
                        />

                        {/* {profile.tesimonialSliderData.map((test, i) => (
                            <div key={i} className="border rounded p-3 mb-2">
                                <strong>{test.testName}</strong>
                                <div style={{ fontSize: "12px", opacity: 0.6 }}>
                                    {test.testPost}
                                </div>
                                <p>{test.testReview}</p>
                            </div>
                        ))} */}
                    </div>

                    {/* form */}
                    <div className="w-100">
                        <h5 className="mt-4 fw-bold"
                            style={{
                                opacity: "0.8",
                                color: darkMode ? profile.colors.white : profile.colors.black
                            }}
                        >Inquiries</h5>

                        <input className="form-control mb-2" placeholder="Your Name" />
                        <input className="form-control mb-2" placeholder="Phone Number" />
                        <input className="form-control mb-2" placeholder="Email Address" />
                        <textarea className="form-control mb-2" placeholder="Type a message..." />

                        <div className="d-flex align-items-center justify-content-center">
                            <button
                                className="btn"
                                style={{ background: profile.colors.Primery, color: profile.colors.white }}
                            >
                                Send Message
                            </button>
                        </div>
                    </div>

                    {/* contact section */}
                    <div>
                        <h5 className="mt-4 fw-bold"
                            style={{
                                opacity: "0.8",
                                color: darkMode ? profile.colors.white : profile.colors.black
                            }}
                        >Contact me</h5>
                        <div className="d-flex flex-column gap-3">
                            <ActionItem
                                icon={<Phone size={18} />}
                                title="Call Me"
                                subtitle={profile.contactData.phone_Number}
                                href={`tel:${profile.contactData.phone_Number}`}
                            />

                            <ActionItem
                                icon={<Mail size={18} />}
                                title="Email"
                                subtitle={profile.contactData.mail}
                                href={`mailto:${profile.contactData.mail}`}
                            />
                            <ActionItem
                                icon={<Phone size={18} />}
                                title="Restaurant Number"
                                subtitle={profile.contactData.phone_Number}
                                href={`tel:${profile.contactData.phone_Number}`}
                            />
                            <ActionItem
                                icon={<MapPin size={18} />}
                                title="Location"
                                subtitle={profile.contactData.location.address}
                                href={profile.contactData.location.link}
                            />

                            {/* opening hours */}
                            <div
                                className="w-100 d-flex align-items-start justify-content-between text-decoration-none p-2 border"
                                style={{
                                    backgroundColor: darkMode ? "#1e293b" : profile.colors.trinery,
                                    color: darkMode ? "#fff" : "#000",
                                    borderRadius: "4px"
                                }}
                            >
                                <div className="w-100 d-flex align-items-start gap-3">
                                    <div
                                        className="d-flex align-items-center justify-content-center rounded-3"
                                        style={{
                                            width: "42px",
                                            height: "42px",
                                            background: darkMode ? "#0f172a" : profile.colors.white,
                                            color: darkMode ? profile.colors.Primery : profile.colors.Primery,
                                            flexShrink: "0",
                                        }}
                                    >
                                        <Clock />
                                    </div>

                                    <div
                                        style={{ width: "224px" }}
                                    >
                                        <h6 className="fw-bold"
                                            style={{
                                                color: darkMode ? profile.colors.white : profile.colors.black
                                            }}
                                        >Opening Hours</h6>
                                        {profile.openingHours.map((day, i) => (
                                            <div key={i} className="d-flex justify-content-between"
                                                style={{
                                                    opacity: "0.7",
                                                    color: darkMode ? profile.colors.white : profile.colors.black
                                                }}
                                            >
                                                <span>{day.dayName}</span>
                                                <span>{day.ocTime}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* map */}
                    <div
                        className="map"
                        style={{
                            width: isMobile ? "100%" : "369px",
                            height: "226px",
                            borderRadius: "6px"
                        }}
                    >
                        <iframe src={profile.iframe}
                            width="100%"
                            height="100%"
                            style={{ border: "6px" }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>

                {/* Sticky Footer Buttons */}
                <div
                    className="position-sticky w-100"
                    style={{ bottom: "0" }}
                >
                    <div className="w-100 p-0 gap-0 d-flex align-items-center justify-content-center">
                        {/* whatsapp button */}
                        <div
                            // xs={4}
                            className="p-0 d-flex justify-content-center align-items-center p-2 flex-shrink-0"
                            style={{
                                background: profile.colors.stickyLink1,
                                width: isMobile ? "33.33%" : "33.33%",

                            }}>
                            <a
                                href={`https://wa.me/${whatsappNumber}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="d-flex gap-1  align-items-center flex-column justify-content-center text-decoration-none"
                                style={{
                                    color: profile.colors.white,
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
                                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                                </svg>
                                <p style={{ color: profile.colors.white, fontSize: "12px", lineHeight: "1" }} className="m-0">Whatsapp</p>
                            </a>
                        </div>
                        {/* QR button */}
                        <div
                            // xs={4}
                            className="p-0 d-flex justify-content-center align-items-center p-2 flex-shrink-0"
                            style={{
                                background: profile.colors.stickyLink2,
                                width: isMobile ? "33.33%" : "33.33%",

                            }}
                        >
                            <button
                                onClick={openQR}
                                className="d-flex gap-1 align-items-center flex-column justify-content-center border-0"
                                style={{
                                    background: profile.colors.stickyLink2,
                                    color: profile.colors.white,
                                }}
                            >
                                <ScanQrCode size={24} />
                                <p style={{ color: profile.colors.white, fontSize: "12px", lineHeight: "1" }} className="m-0">Scan QR</p>
                            </button>
                        </div>
                        {/* save contact button */}
                        <div
                            // xs={4}
                            className="p-0 d-flex justify-content-center align-items-center p-2 flex-shrink-0"
                            style={{
                                background: profile.colors.stickyLink3,
                                width: isMobile ? "33.33%" : "33.33%",

                            }}
                        >
                            <button
                                onClick={saveContact}
                                className="d-flex gap-1 align-items-center flex-column justify-content-center shadow border-0"
                                style={{
                                    background: profile.colors.stickyLink3,
                                    color: profile.colors.white,
                                }}
                            >
                                <Download size={24} />
                                <p style={{ color: profile.colors.white, fontSize: "12px", lineHeight: "1" }} className="m-0">Save contact</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Premium2;
