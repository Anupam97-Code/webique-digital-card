import React, { useMemo, useState, useEffect, memo, useRef, useLayoutEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaRegFilePdf } from "react-icons/fa";
import "../styles/digitalCard.scss"
import {
    MapPin,
    Sun,
    Moon,
    ScanQrCode,
    X,
    PenTool,
    MonitorSmartphone,
    LaptopMinimalCheck,
    Laptop,
    CodeXml,
    Settings,
    ChevronLeft,
    ChevronRight,
    IndianRupee,
    Phone,
    Send,
    Globe
} from "lucide-react";
import * as Icons from "lucide-react";
import { li } from "framer-motion/client";
import { Carousel, Col, Row } from "react-bootstrap";
import ContactSection from "./components/ContactSection";
import StickyFooter from "./components/StickyFooter";
import GallerySlider from "./components/GallerySlider";
import AboutCardSec from "./components/AboutCardSec";


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

        const phone = profile?.contactData?.phone_Number?.[0] || "";

        const whatsappURL = `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;

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
  color:${profile?.colors?.placeholderCol};


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
                                            <h4 style={{ fontSize: "13px", margin: "0", color: profile.colors.black, color: darkMode ? profile.colors.white : profile.colors.black, opacity: darkMode ? "0.7" : "1" }}>
                                                {item.testName}
                                            </h4>

                                            <p style={{ fontSize: "12px", margin: 0, fontWeight: "400", lineHeight: "16px", color: darkMode ? profile.colors.textColor : profile.colors.black, opacity: darkMode ? "0.7" : "1" }}>
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

const Builder = ({ data, saveContact, openQR, openUPI }) => {
    const [darkMode, setDarkMode] = useState(true);
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

    // mkae this for services icon & text responsive
    const [isSmallMobile, setIsSmallMobile] = useState(window.innerWidth <= 375);
    useEffect(() => {

        const handleResize = () => {
            setIsSmallMobile(window.innerWidth <= 375);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };

    }, []);


    const profile = useMemo(() => ({
        headerBgImage: safeData.headerBgImage || "",
        profileImage: safeData.profileImage || "/images/default-profile.png",
        texture: safeData.texture,
        map: safeData.map,
        name: safeData.name || "John Doe",
        title: safeData.title || "Business Owner",
        srno: safeData.srno,

        description: safeData.description || "",
        aboutDescription: safeData.aboutDescription || "",

        company: safeData.company || "",
        email: safeData.email || "",
        whatsapp: safeData.whatsapp || "",
        headerOverlayLogoImg: safeData.headerOverlayLogoImg,
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
        contactDataTop: safeData.contactDataTop || [],
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

    return (
        <div
            className="min-vh-100 d-flex align-items-center justify-content-center p-0"
            style={{ background: darkMode ? profile.colors.lightBg : profile.colors.dark }}
        >
            {/* Theme Toggle */}


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

                <style>
                    {`
    .for-background{position:relative; overflow:hidden;}

    .for-building{
    width: 100%;
    height: auto;
    background: ${darkMode ? profile?.colors?.logoBack : profile?.colors?.lightBg}
    url(${profile?.map});
    background-size:cover;
    }
   
    .for-underline{position:relative; position: relative;
    padding: 0 0 20px;
    margin: 0 0 30px;}
    .for-underline::after{position:absolute; content:''; width:100px; height:1px; bottom: 0; left: 0; 
    background:${darkMode ? profile.colors.Primery : profile.colors.black}}
  
    .profile-frame {
    width: 12rem;   /* w-48 */
    height: 12rem;  /* h-48 */

    /* bg-gradient-to-tr from-primary to-primary-container */
    background: linear-gradient(
        to top right,
        var(--bs-primary),
        rgba(var(--bs-primary-rgb), 0.3)
    );
}

@media (min-width: 768px) {
    .profile-frame {
        width: 16rem;   /* md:w-64 */
        height: 16rem;  /* md:h-64 */
    }
}

@media (min-width: 768px) {
    .profile-frame {
        width: 16rem;
        height: 16rem;
    }
}

.profile-frame {
    position: relative;
    width: 160px;
    height: 160px;
    padding: 6px;
    background: linear-gradient(135deg, #f4d03f, #b8860b);
    
    /* Cut top-left and bottom-right corners */
    clip-path: polygon(
        20px 0,
        100% 0,
        100% calc(100% - 20px),
        calc(100% - 20px) 100%,
        0 100%,
        0 20px
    );
}

.profile-image {
    width: 100%;
    height: 100%;
    object-fit: cover;

    clip-path: polygon(
        18px 0,
        100% 0,
        100% calc(100% - 18px),
        calc(100% - 18px) 100%,
        0 100%,
        0 18px
    );
}
    
      
  `}
                </style>


                {/* Profile Image / logo */}
                <div className="w-100 for-background positon-relative overflow-hidden" style={{ zIndex: "22" }}>
                    <div className="w-100"
                        style={{
                            background: darkMode ? profile.colors.logoBack : profile.colors.lightBg,
                            paddingBottom: "0px",
                            zIndex: "22",

                        }}>
                        {/* Logo */}

                        <div className="d-flex align-items-center justify-content-between position-relative"
                            style={{
                                borderBottom: "1px solid #4d4635", zIndex: "99", padding: "0 20px",
                                background: darkMode ? profile.colors.logoBack : profile.colors.logoBack,
                            }}>
                            {profile.headerOverlayLogoImg && (
                                <img
                                    src={profile.headerOverlayLogoImg}
                                    alt={profile.name}
                                    style={{
                                        right: "30px",
                                        width: "60px",
                                        height: "auto",
                                        objectFit: "cover",
                                        zIndex: "22",

                                    }}
                                />
                            )}

                            <div className="d-flex gap-2 align-items-center">
                                <div style={{ color: profile.colors.white, fontSize: "26px" }}><FaRegFilePdf /></div>
                                <button
                                    onClick={() => setDarkMode(!darkMode)}
                                    className="btn position-static  rounded-circle shadow d-flex align-items-center justify-content-center"
                                    style={{
                                        background: darkMode ? profile.colors.white : profile.colors.dark,
                                        color: darkMode ? profile.colors.dark : profile.colors.white,
                                        padding: "8px 8px",
                                        zIndex: "110",
                                        top: "60px",
                                        right: "15px"
                                    }}
                                >
                                    {darkMode ? <Sun size={14} /> : <Moon size={14} />}
                                </button>

                            </div>
                        </div>
                        <div className="d-flex flex-column position-relative for-building" style={{ gap: "34px", zIndex: "21", padding: "190px 16px 30px 16px" }}>
                            <div className="d-flex flex-column align-items-start position-relative" style={{ gap: "15px", zIndex: "99" }}>
                                <div className="profile-frame">
                                    <img
                                        src={darkMode ? profile.profileImage : profile.profileImage}
                                        alt="Profile"
                                        className="img-fluid profile-image"
                                    />
                                </div>
                            </div>




                            <div className="position-absolute"
                                style={{
                                    width: "100%", height: "100%", top: "0", left: "0", zIndex: 98,
                                    background: darkMode ? profile.colors.headerGredient : profile.colors.headerGredientLight,
                                }}

                            ></div>
                        </div>
                    </div>
                </div>

                <div className="text-left  pb-4 pt-2"
                    style={{
                        backgroundColor: "#121414",
                        padding: "12px 16px 16px",
                        background: darkMode ? profile.colors.grayblack : profile.colors.lightBg,
                    }}>
                    <div className="for-underline">
                        <h4 className="fw-bold"
                            style={{
                                fontSize: "48px",
                                lineHeight: "56px",
                                letterSpacing: "-0.02em",
                                position: "relative",
                                fontWeight: 700,
                                color: darkMode ? profile.colors.Primery : profile.colors.Primery
                            }}
                        >{profile.name}</h4>

                        <p
                            style={{
                                fontWeight: "600",
                                textTransform: "uppercase",
                                fontSize: "14px",
                                lineHeight: "16px",
                                letterSpacing: "0.3em",
                                margin: "15px 0 0",

                                marginBottom: "16px",
                                color: darkMode ? profile.colors.textColor : profile.colors.black
                            }}>

                            {profile.title}
                        </p>
                    </div>
                    <p className="mb-4"
                        style={{ color: profile.colors.white, color: darkMode ? profile.colors.textColor : profile.colors.black }}>{profile.aboutDescription}</p>


                    <div
                        className="for-resp d-flex justify-content-center align-items-center w-100 mt-4"
                        style={{ gap: "15px" }}
                    >
                        {profile.contactDataTop.map((item, index) => {
                            const IconComponentTop = Icons[item.icon];

                            // 🔥 Decide link dynamically
                            let href = "#";

                            if (item.pn) {
                                href = `tel:${item.pn}`;
                            } else if (item.mail) {
                                href = `mailto:${item.mail}`;
                            } else if (item.link) {
                                href = item.link;
                            } else if (item.website) {
                                href = item.website;
                            }

                            return (
                                <a
                                    key={index}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ textDecoration: "none", width: "100%" }}
                                >
                                    <div
                                        className="f-flex flex-column gap-3 text-center w-100"
                                        style={{
                                            padding: "11px 0px",
                                            borderRadius: "6px",
                                            background: darkMode ? profile.colors.logoBack : profile.colors.white,
                                        }}
                                    >
                                        <div
                                            style={{
                                                color: darkMode ? profile.colors.Primery : profile.colors.Primery,
                                            }}
                                        >
                                            {IconComponentTop && <IconComponentTop size={24} />}
                                        </div>

                                        <p
                                            className="mb-0"
                                            style={{
                                                fontSize: "12px",
                                                color: darkMode ? profile.colors.textColor : profile.colors.logoBack,
                                            }}
                                        >
                                            {item.title}
                                        </p>
                                    </div>
                                </a>
                            );
                        })}
                    </div>



                </div>

                {/* make this wrapper div to wrapp all the filds */}
                <div
                    className="position-relative d-flex flex-column align-items-start gap-4 justify-content-between"
                    style={{
                        padding: "12px 16px 16px 16px",
                        background: darkMode ? profile.colors.grayblack : profile.colors.lightBg,
                    }}
                >






                    {/* about */}

                    <h5 className="mb-0"

                        style={{
                            fontWeight: "600",
                            textTransform: "uppercase",
                            fontSize: "14px",
                            lineHeight: "16px",
                            letterSpacing: "0.3em",
                            margin: "15px 0 0",

                            marginBottom: "16px",
                            color: darkMode ? profile.colors.Primery : profile.colors.Primery,
                        }}

                    >
                        Group of Companies
                    </h5>

                    {/* besic premuim & regular service card grid */}
                    <div className="d-flex flex-column gap-4">


                        {/* <h5 className="my-0"
                            style={{
                                fontWeight: 600, lineHeight: "100%", fontSize: "18px",
                                color: darkMode ? profile.colors.white : profile.colors.black,
                            }}
                        >
                            Our Group of Companies
                        </h5> */}

                        {/* check if package is premium & regular to render this */}
                        {checkUserPackage("regular") && (
                            <div
                                className="d-flex flex-wrap flex-column"
                                style={{
                                    gap: "20px",
                                    justifyContent: "start"
                                }}
                            >
                                {profile.servicesData.map((service, i) => {
                                    const IconComponent = Icons[service.icon];
                                    const total = profile.servicesData.length;

                                    // Determine the width based on the total items
                                    let cardWidth = "calc(33.333% - 10px)"; // Default to 3 items per row

                                    if (isSmallMobile) {
                                        cardWidth = "calc(100%)";
                                    } else {
                                        if (total === 2) {
                                            cardWidth = "calc(100%)";
                                        } else if (total === 4) {
                                            cardWidth = "calc(100%)";
                                        } else if (total === 5) {
                                            if (i < 3) cardWidth = "calc(100%)"; // First 3 items
                                            else cardWidth = "calc(100% - 10px)"; // Last 2 items
                                        }
                                    }

                                    return (
                                        <div key={i} style={{ width: cardWidth }}>
                                            <div
                                                className="p-3 h-100 text-left rounded d-flex gap-3 flex-column"
                                                style={{ background: darkMode ? profile.colors.trinery : profile.colors.fade }}
                                            >
                                                {/* <div
                                                    style={{
                                                        color: darkMode ? profile.colors.Primery : profile.colors.Primery
                                                    }}
                                                >
                                                    {service.image ? (
                                                        <img
                                                            src={service.image}
                                                            alt={service.title}
                                                            width="44"
                                                            height="44"
                                                        />
                                                    ) : (
                                                        IconComponent && <IconComponent size={44} />
                                                    )}
                                                </div> */}
                                                <div className="d-flex align-items-center justify-content-center" style={{ width: "40px", margin: "0 0 10px", height: "40px", border: `1px solid ${profile.colors.Primery}` }}>
                                                    <h2 style={{
                                                        fontSize: "20px",
                                                        color: darkMode ? profile.colors.Primery : profile.colors.black
                                                    }}>{service.srno}</h2>
                                                </div>
                                                <h6
                                                    style={{
                                                        fontSize: "22px",
                                                        textTransform: "uppercase",
                                                        fontWeight: 500,
                                                        color: darkMode ? profile.colors.Primery : profile.colors.black
                                                    }}
                                                >{service.title}</h6>
                                                <p style={{ color: profile.colors.textColor, color: darkMode ? profile.colors.textColor : profile.colors.black }}>{service.text}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
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

                        <div className="w-100 d-flex flex-column gap-4">
                            <h4 className="m-0"
                                style={{
                                    opacity: "0.8",
                                    color: darkMode ? profile.colors.white : profile.colors.black
                                }}
                            >Our Menu</h4>
                            {/* tabs btns map */}
                            <ul className="nav nav-pills" style={{ gap: "10px" }}>
                                {profile.menuTabData.map((tab, i) => {
                                    const isActive = activeMenuTab === i;

                                    const tabStyle = {
                                        background: isActive
                                            ? profile.colors.Secondery
                                            : darkMode
                                                ? profile.colors.trinery
                                                : profile.colors.trinery,

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
                                                    marginRight: "0px",
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









                    {/* social media icons */}
                    {/* Social Links / with lucid react icons */}
                    <div className="d-flex flex-column gap-4">


                        <h5 className="my-0"
                            style={{
                                fontWeight: "600",
                                textTransform: "uppercase",
                                fontSize: "14px",
                                lineHeight: "16px",
                                letterSpacing: "0.3em",
                                margin: "15px 0 0",

                                marginBottom: "16px",
                                color: darkMode ? profile.colors.Primery : profile.colors.Primery,
                            }}
                        >
                            Follow Us
                        </h5>
                        <ul
                            className="d-flex justify-content-start flex-wrap m-0 gap-3"
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

                                                background: darkMode ? profile.colors.logoBack : profile.colors.fade,
                                                color: darkMode ? profile.colors.Primery : profile.colors.Secondery
                                            }}
                                        >
                                            {IconComponent && <IconComponent size={20} />}
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    {/* testimonial */}
                    {checkUserPackage("premium") && (
                        <div className="w-100 d-flex flex-column gap-4">

                            <h4 className="m-0 fw-bold"
                                style={{
                                    opacity: "0.8",
                                    color: darkMode ? profile.colors.white : profile.colors.black
                                }}
                            >Testimonials</h4>
                            <TestimonialCarousal profile={profile} darkMode={darkMode} />
                        </div>
                    )}

                    {/* form */}
                    {checkUserPackage("premium") && (
                        <div className="w-100 d-flex flex-column gap-4">
                            <h4
                                className="m-0 fw-bold"
                                style={{
                                    opacity: "0.8",
                                    color: darkMode ? profile.colors.white : profile.colors.black
                                }}
                            >
                                Inquiries
                            </h4>
                            <InquiryForm profile={profile} darkMode={darkMode} />
                        </div>
                    )}


                    <style>
                        {`
   
    .contact-style h5{
    font-weight: 600 !important;
    text-transform: uppercase !important;
    font-size: 14px !important;
    line-height: 16px !important;
    letter-spacing: 0.3em !important;
    margin: 15px 0px 0px !important;
    color: rgb(233, 191, 91) !important;



    .contact-style a{background: ${darkMode ? profile.colors.logoBack : profile.colors.white}}

    .contact-style .fw-semibold{color: ${darkMode ? profile.colors.Primery : profile.colors.black}}
    
    .contact-style .for-style{
    background: ${darkMode ? profile.colors.logoBack : profile.colors.fade} !important;
}
    }
}
    `}
                    </style>

                    {/* contact section */}
                    <div className="contact-style">
                        <ContactSection
                            profile={profile}
                            darkMode={darkMode}
                        />
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

export default Builder;
