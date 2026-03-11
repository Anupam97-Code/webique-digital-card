import React, { useMemo, useState, useEffect, memo, useRef, useLayoutEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/digitalCard.scss"
import {
    Phone,
    Mail,
    MapPin,
    ArrowUpRight,
    Sun,
    Moon,
    ScanQrCode,
    Clock,
    Download,
} from "lucide-react";
import * as Icons from "lucide-react";
import { li } from "framer-motion/client";
import { Carousel, Col, Row } from "react-bootstrap";
import ContactSection from "./components/ContactSection";
import StickyFooter from "./components/StickyFooter";


/* ======================================================
   FACEBOOK STYLE DIGITAL BUSINESS CARD
   Light/Dark • WhatsApp • Share • Instagram
   Fully Functional • Error Free
====================================================== */

// make this component for Form
const InquiryForm = memo(({ profile, darkMode }) => {

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const sendMessage = (e) => {
        e.preventDefault();

        const text = `Hello,
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Message: ${formData.message}`;

        const whatsappURL = `https://wa.me/${profile.contactData.phone_Number}?text=${encodeURIComponent(text)}`;

        window.open(whatsappURL, "_blank");

        setFormData({
            name: "",
            phone: "",
            email: "",
            message: ""
        });
    };

    const inputStyle = {
        backgroundColor: profile.colors.inputBg,
        opacity: darkMode ? "0.8" : "0.7",
        color: darkMode ? profile.colors.white : profile.colors.black,
        border: `1px solid ${profile.colors.borderGray}`,
        borderRadius: "6px",
        padding: "10px 12px",
        fontSize: "14px",
        "--placeholder-color": darkMode ? profile.colors.white : profile.colors.black
    };
    return (
        <div className="w-100">
            {/* this atyle tag added for to color placeholder change in dark mode */}
            <style>
                {`
.form-control::placeholder {
  color: #9CA3AF;
}
`}
            </style>
            {/* Form */}
            <form onSubmit={sendMessage}>

                <input
                    className="form-control mb-2 shadow-none"
                    placeholder="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    style={inputStyle}
                />

                <input
                    className="form-control mb-2"
                    placeholder="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    style={inputStyle}
                />

                <input
                    className="form-control mb-2"
                    placeholder="Email Address"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    style={inputStyle}
                />

                <textarea
                    className="form-control mb-2"
                    placeholder="Type a message..."
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    style={inputStyle}
                />

                <div className="d-flex align-items-center justify-content-center">
                    <button
                        type="submit"
                        className="btn"
                        style={{
                            background: profile.colors.Primery,
                            color: profile.colors.white
                        }}
                    >
                        Send Message
                    </button>
                </div>
            </form>
        </div>
    );
});
// make this component for Tesimonial Carousal
const TestimonialCarousal = memo(({ profile, darkMode }) => {
    const [index, setIndex] = useState(0);

    // make for testimonial carousal
    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };
    const groupedTestimonials = (profile?.tesimonialSliderData || []).reduce((rows, item, i) => {
        if (i % 2 === 0) rows.push([item]);
        else rows[rows.length - 1].push(item);
        return rows;
    }, []);
    return (
        <>
            <Carousel
                activeIndex={index}
                onSelect={handleSelect}
                indicators={false}
                controls={false}
                interval={3000}
                touch={true}
                pause={false}

            >

                {groupedTestimonials.map((group, i) => (
                    <Carousel.Item key={i}>

                        <div className='d-flex' style={{ gap: "15px" }}>

                            {group.map((item, idx) => (

                                <div
                                    key={idx}
                                    style={{
                                        flex: "1",
                                        padding: "15px",
                                        borderRadius: "10px",
                                        border: `solid 1px ${profile.colors.borderGray}`,
                                        background: darkMode ? profile.colors.darkFields : profile.colors.white,
                                        color: darkMode ? profile.colors.white : profile.colors.dark,
                                    }}
                                >

                                    <div style={{ display: "flex", gap: "10px", alignItems: "center", }}>

                                        <img
                                            src={item.testSrc}
                                            alt={item.testName}
                                            style={{
                                                width: "40px",
                                                height: "40px",
                                                borderRadius: "50%",

                                            }}
                                        />

                                        <div>
                                            <h5 style={{ fontSize: "13px", margin: "0", color: profile.colors.black, color: darkMode ? profile.colors.white : profile.colors.black, opacity: darkMode ? "0.7" : "1" }}>
                                                {item.testName}
                                            </h5>

                                            <p style={{ fontSize: "12px", margin: 0, fontWeight: "400", lineHeight: "16px", color: darkMode ? profile.colors.white : profile.colors.black, opacity: darkMode ? "0.7" : "1" }}>
                                                {item.testPost}
                                            </p>
                                        </div>

                                    </div>

                                    <p
                                        style={{
                                            fontSize: "12px",
                                            color: profile.colors.black,
                                            marginTop: "20px",
                                            fontWeight: "400",
                                            lineHeight: "18px",
                                            opacity: darkMode ? "0.7" : "1",
                                            color: darkMode ? profile.colors.white : profile.colors.black,
                                        }}
                                    >
                                        {item.testReview?.slice(0, 100)}
                                    </p>

                                </div>

                            ))}

                        </div>

                    </Carousel.Item>
                ))}
            </Carousel>
            {/* Custom Pagination */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "8px",
                    marginTop: "15px"
                }}
            >
                {groupedTestimonials.map((_, i) => (
                    <div
                        key={i}
                        onClick={() => setIndex(i)}
                        style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            backgroundColor: index === i ? profile.colors.black : profile.colors.black,
                            opacity: index === i ? "1" : "0.4",
                            cursor: "pointer"
                        }}
                    />

                ))}

            </div>
        </>
    )
});

const RestraurentCard = ({ data, saveContact, openQR }) => {
    const [darkMode, setDarkMode] = useState(false);
    const [activeMenuTab, setActiveMenuTab] = useState(0);
    const safeData = data || {};

    // make for handle responsive
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 417);
    useEffect(() => {

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 417);
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

    // create for checking the packages and assing the styles
    const checkUserPackage = (requiredUserPackage) => {
        // console.log("requiredUserPackage:", requiredUserPackage);

        const packageLevels = {
            basic: 1,
            regular: 2,
            premium: 3
        };

        // console.log("packageLevels:",packageLevels[profile.package]);

        const checkPackage = (requiredPackage) => {

            const userPackage = profile.package;
            // console.log("userPackage:", packageLevels[userPackage]);
            // console.log("requiredPackage:", packageLevels[requiredPackage]);
            // console.log("check package conditions:", packageLevels[userPackage] >= packageLevels[requiredPackage]);

            return packageLevels[userPackage] >= packageLevels[requiredPackage];
        };

        return checkPackage(requiredUserPackage);
    };
    //==== create for checking the packages and assing the styles

    // console.log("groupedTestimonials", groupedTestimonials);
    //================ make for testimonial carousal

    const whatsappNumber = String(profile.whatsapp).replace(/[^0-9]/g, "");
    // const currentUrl = typeof window !== "undefined" ? window.location.href : "";

    // make for contact data 
    const ActionItem = ({ icon, title, subtitle, href }) => {
         const isExternal = href?.startsWith("http");
    const Wrapper = href ? "a" : "div";
        return (
            <Wrapper
                    href={href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="w-100 d-flex align-items-center justify-content-between text-decoration-none p-2 border"
                    style={{
                      backgroundColor: darkMode ? profile.colors.darkCardBg : profile.colors.trinery,
                      color: darkMode ? profile.colors.white : profile.colors.black,
                      borderRadius: "4px"
                    }}
                  >
                    <div className="d-flex gap-3">
                      <div
                        className="d-flex align-items-center justify-content-center rounded-3"
                        style={{
                          width: "42px",
                          height: "42px",
                          color: profile.colors.Primery,
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
                  </Wrapper>
        )
    }
    //================= make for contact data 

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
                    gap: "16px",
                    scrollSnapType: "x mandatory"
                }}
            >
                {slides.map((slide, slideIndex) => (
                    <div
                        className="slide"
                        key={slideIndex}
                        style={{
                            maxWidth: "100%",
                            scrollSnapAlign: "start",
                            flexShrink: 0
                        }}
                    >
                        <Row>
                            {slide.map((value, index) => (
                                <Col xs={6} key={index} className="mb-3 px-2">
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

    return (
        <div
            className="min-vh-100 d-flex align-items-center justify-content-center p-0 p-md-3"
            style={{ background: darkMode ? profile.colors.dark : profile.colors.lightBg }}
        >
            {/* Theme Toggle */}
            <button
                onClick={() => setDarkMode(!darkMode)}
                className="btn position-fixed top-0 end-0 z-3 rounded-circle shadow d-flex align-items-center justify-content-center"
                style={{
                    background: darkMode ? profile.colors.white : profile.colors.dark,
                    color: darkMode ? profile.colors.dark : profile.colors.white,
                    padding: "13px 13px",
                    marginRight: "15px",
                    marginTop: "15px",
                }}
            >
                {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <div
                className="position-relative "
                style={{
                    width: "100%",
                    maxWidth: isMobile ? "100%" : "402px",
                    background: darkMode ? profile.colors.grayblack : profile.colors.white,
                    // paddingBottom: "20px",
                    color: darkMode ? profile.colors.white : profile.colors.black,
                }}
            >
                {/* to header Image */}
                <div
                    style={{
                        height: "170px",
                        backgroundImage: `url(${profile.headerBgImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: profile.headerBgImagePosition,
                        // borderRadius: "16px",
                        padding: "10px"
                    }}
                    className="d-flex align-items-end justify-content-end"
                >
                    <div className="d-flex gap-1">
                        {/* location button */}
                        <a
                            href={profile.contactData.location.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded d-flex align-items-center justify-content-center"
                            style={{
                                padding: "6px",
                                background: profile.colors.Primery,
                                color: profile.colors.white,
                            }}
                        >
                            <MapPin size={20} />
                        </a>
                        {/* QR button */}
                        <button
                            className="rounded d-flex align-items-center justify-content-center border-0"
                            style={{
                                padding: "6px",
                                background: profile.colors.Primery,
                                color: profile.colors.white,
                            }}
                            onClick={openQR}
                        >
                            <ScanQrCode size={20} />
                        </button>
                        {/* brosher button */}
                        {checkUserPackage("premium") && (
                            <button
                                className="rounded d-flex align-items-center justify-content-center border-0"
                                style={{
                                    padding: "6px",
                                    background: profile.colors.Primery,
                                    color: profile.colors.white,
                                }}
                                onClick={""}
                            >
                                <Download size={20} />
                            </button>
                        )}
                    </div>
                </div>
                {/* make this wrapper div to wrapp all the filds */}
                <div
                    className="position-relative d-flex flex-column align-items-start justify-content-between"
                    style={{ gap: "15px", padding: "12px 16px 16px 16px" }}
                >
                    {/* Profile Image / logo */}
                    <div className="w-100 d-flex justify-content-center mb-4 gap-3" style={{ paddingLeft: "125px" }}>
                        <img
                            src={darkMode ? profile.darkModeImage : profile.profileImage}
                            alt={profile.name}
                            className="position-absolute"
                            style={{
                                width: "120px",
                                height: "120px",
                                borderRadius: "50%",
                                objectFit: "cover",
                                border: `5px solid ${profile.colors.Primery}`,
                                background: profile.colors.Primery,
                                left: "16px",
                                top: "-40px"
                            }}
                        />

                        <div className="">
                            <h4 className="fw-bold"
                                style={{
                                    color: darkMode ? profile.colors.white : profile.colors.black,
                                }}
                            >{profile.name}</h4>
                            <p
                                style={{
                                    opacity: 0.7,
                                    color: darkMode ? profile.colors.white : profile.colors.black,
                                }} className="mb-0">
                                {/* {profile.title} | <strong>{profile.company}</strong> */}
                                {profile.title}
                            </p>
                        </div>
                    </div>

                    {/* Social Links / with lucid react icons */}
                    <ul
                        className="d-flex justify-content-start flex-wrap mb-2 gap-3"
                    // style={{
                    //     justifyContent: isMobile ? "flex-start" : "center",
                    // }}
                    >
                        {profile.socialLinks.map((item, i) => {
                            const IconComponent = Icons[item.icon];
                            return (
                                <li key={i}>
                                    <a
                                        href={item.socialURL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 rounded d-flex align-items-center justify-content-center"
                                        style={{
                                            background: profile.colors.Secondery,
                                            color: profile.colors.Primery,
                                        }}
                                    >
                                        {IconComponent && <IconComponent size={20} />}
                                    </a>
                                </li>
                            )
                        })}
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

                    {/* besic premuim & regular service card grid */}
                    <div>
                        <h5 className="fw-bold"
                            style={{
                                opacity: "0.8",
                                color: darkMode ? profile.colors.white : profile.colors.black
                            }}
                        >My Services</h5>
                        {/* check if package is premium & regular to render this */}
                        {checkUserPackage("regular") && (
                            <Row className="row g-3">
                                {profile.servicesData.map((service, i) => {
                                    const IconComponent = Icons[service.icon];
                                    return (
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
                                                    {IconComponent && <IconComponent size={44} />}
                                                </div>
                                                <h6
                                                    style={{
                                                        fontSize: "14px",
                                                        opacity: "0.7",
                                                        color: darkMode ? profile.colors.white : profile.colors.black
                                                    }}
                                                >{service.title}</h6>
                                            </div>
                                        </Col>
                                    )
                                })}
                            </Row>
                        )}

                        {/* check if package is basic to render this */}
                        {profile.package === "basic" && (
                            <div>
                                <ul className="d-flex align-items-start flex-wrap gap-2">
                                    {profile.servicesData.map((value, i) => {
                                        return (
                                            <li
                                                key={i}
                                                className="h-100 text-center d-flex gap-2 flex-column align-items-center justify-content-center"
                                                style={{
                                                    background: profile.colors.trinery,
                                                    borderRadius: "55px",
                                                    padding: "8px 15px 8px",
                                                    border: `1px solid ${profile.colors.borderGray}`

                                                }}
                                            >
                                                <h6
                                                    style={{
                                                        fontSize: "14px",
                                                        opacity: "0.7",
                                                        color: darkMode ? profile.colors.white : profile.colors.black
                                                    }}
                                                >{value.title}</h6>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* menu tabs */}
                    {checkUserPackage("premium") && (

                        <div className="w-100">
                            <h5 className="mt-4 fw-bold"
                                style={{
                                    opacity: "0.8",
                                    color: darkMode ? profile.colors.white : profile.colors.black
                                }}
                            >Our Menu</h5>
                            {/* tabs btns map */}
                            <ul className="nav nav-pills">
                                {profile.menuTabData.map((tab, i) => {
                                    const isActive = activeMenuTab === i;

                                    const tabStyle = {
                                        background: isActive
                                            ? profile.colors.Secondery
                                            : darkMode
                                                ? profile.colors.trinery
                                                : profile.colors.white,

                                        color: isActive
                                            ? profile.colors.Primery
                                            : darkMode
                                                ? profile.colors.white
                                                : profile.colors.black
                                    };

                                    return (
                                        <li key={i} className="nav-item">
                                            <button
                                                className={`nav-link ${activeMenuTab === i ? "active" : ""}`}
                                                onClick={() => setActiveMenuTab(i)}
                                                style={{
                                                    ...tabStyle,
                                                    borderRadius: "6px",
                                                    marginRight: "8px",
                                                    padding: "4px 13px",
                                                    fontSize: "13px"
                                                }}
                                            >
                                                {tab.menuTabName}
                                            </button>
                                        </li>
                                    )
                                })}
                            </ul>
                            {/* tab container */}
                            <div>
                                {profile.menuTabData[activeMenuTab]?.menuTabList.map((dish, j) => (
                                    <div
                                        key={j}
                                        className="d-flex justify-content-between gap-2 align-items-center border-bottom py-3"
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
                                                flexShrink: "0"
                                            }}
                                        >
                                            ₹ {dish.menuDishPrice}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Gallery */}
                    {checkUserPackage("premium") && (
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
                    )}

                    {/* testimonial */}
                    {checkUserPackage("premium") && (
                        <div className="w-100">

                            <h5 className="mt-4 fw-bold"
                                style={{
                                    opacity: "0.8",
                                    color: darkMode ? profile.colors.white : profile.colors.black
                                }}
                            >Testimonials</h5>
                            <TestimonialCarousal profile={profile} darkMode={darkMode} />
                        </div>
                    )}

                    {/* form */}
                    {checkUserPackage("premium") && (
                        <div className="w-100">
                            <h5
                                className="mt-4 fw-bold"
                                style={{
                                    opacity: "0.8",
                                    color: darkMode ? profile.colors.white : profile.colors.black
                                }}
                            >
                                Inquiries
                            </h5>
                            <InquiryForm profile={profile} darkMode={darkMode} />
                        </div>
                    )}

                    {/* contact section */}
                                {/* Contact me */}
            <ContactSection
  profile={profile}
  darkMode={darkMode}
  ActionItem={ActionItem}
/>


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
                 <StickyFooter
            profile={profile}
            isMobile={isMobile}
            darkMode={darkMode}
            whatsappNumber={whatsappNumber}
            saveContact={saveContact}
            openQR={openQR}
          />
            </div>
        </div >
    );
}

export default RestraurentCard;
