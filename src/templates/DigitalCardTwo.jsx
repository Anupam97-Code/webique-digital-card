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
    ChevronRight,
    ScanQrCode,
    Clock,
    Download,
    Send
} from "lucide-react";
import * as Icons from "lucide-react";
import { Carousel, Col, Row } from "react-bootstrap";
import StickyFooter from "./components/StickyFooter";
import ContactSection from "./components/ContactSection";


const DigitalCardTwo = ({ data, openQR, saveContact, openUPI }) => {
    const [darkMode, setDarkMode] = useState(false);
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

    // extract data from json files
    const profile = useMemo(() => ({
        headerBgImage: safeData.headerBgImage || "",
        profileImage: safeData.profileImage || "/images/default-profile.png",
        headerOverlayLogoImg: safeData.headerOverlayLogoImg,
        name: safeData.name || "John Doe",
        title: safeData.title || "Business Owner",
        visitingLink: safeData.visitingLink,
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

    const whatsappNumber = String(profile.whatsapp).replace(/[^0-9]/g, "");
    // const currentUrl = typeof window !== "undefined" ? window.location.href

    const ActionItemTop = ({ icon, title, values = [], type, href, className }) => {

        const isSingle = values.length === 1;
        const isExternal = href?.startsWith("http");

        const Wrapper = isSingle ? "a" : "div";

        const wrapperProps = isSingle
            ? {
                href: type === "tel"
                    ? `tel:${values[0]}`
                    : type === "mailto"
                        ? `mailto:${values[0]}`
                        : href,
                target: isExternal ? "_blank" : "_self",
                rel: isExternal ? "noopener noreferrer" : ""
            }
            : {};

        return (
            <Wrapper
                {...wrapperProps}
                className={`w-100 d-flex align-items-center justify-content-between text-decoration-none ${className || ""}`}
                style={{
                    color: darkMode ? profile.colors.white : profile.colors.black,
                    padding: "14px 16px",
                    borderBottom: `1px solid ${profile.colors.borderGray}`
                }}
            >
                <div className="d-flex gap-3">

                    {/* Icon */}

                    <div
                        className="d-flex align-items-center justify-content-center"
                        style={{
                            width: "35px",
                            height: "35px",
                            borderRadius: "50%",
                            backgroundColor: `${profile.colors.Primery}`,
                            color: `${profile.colors.whte}`
                        }}
                    >
                        {icon}
                    </div>


                    {/* Text */}
                    <div className="d-flex flex-column align-items-start justify-content-start">

                        {/* Show title only when single value */}
                        {isSingle && (
                            <div className="fw-semibold">{title}</div>
                        )}

                        {/* Single value */}
                        {isSingle && (
                            <small style={{ opacity: 0.9 }}>
                                {values[0]}
                            </small>
                        )}

                        {/* Multiple values */}
                        {!isSingle &&
                            values.map((value, i) => (
                                <a
                                    key={i}
                                    href={
                                        type === "tel"
                                            ? `tel:${value}`
                                            : type === "mailto"
                                                ? `mailto:${value}`
                                                : href
                                    }
                                    style={{
                                        opacity: 0.9,
                                        textDecoration: "none",
                                        color: "inherit"
                                    }}
                                >
                                    {value}
                                </a>
                            ))
                        }

                    </div>
                </div>

                <div
                    className="flex-shrink-0"
                    style={{
                        color: profile.colors.Primery
                    }}
                >
                    <ArrowUpRight size={18} />
                </div>
            </Wrapper>
        );
    };



    const WaveShape = ({ profile, darkMode }) => {

        const bgColor = profile.colors.Primery;
        const fillColor = darkMode
            ? profile.colors.waveDark || `${profile.colors.black}`
            : profile.colors.waveLight || "#ffffff";

        return (
            <div
                className="d-flex flex-column gap-3"
                style={{
                    width: "100%",
                    maxWidth: "402px",
                    height: "170px",
                    background: bgColor,
                    position: "relative",
                    overflow: "visible",

                }}
            >
                {/* Wave */}
                <svg
                    viewBox="0 0 402 160"
                    preserveAspectRatio="none"
                    style={{
                        position: "absolute",
                        bottom: 0,
                        width: "100%",
                        height: "115px",
                        display: "block"
                    }}
                >
                    <path
                        d="
            M0,100
            C80,20 150,45 200,70
            C300,128 321,140 410,93
            L402,160
            L0,160
            Z
          "
                        fill={fillColor}
                    />
                </svg>

                {/* Logo */}
                {profile.headerOverlayLogoImg && (
                    <img
                        src={profile.headerOverlayLogoImg}
                        alt={profile.name}
                        style={{
                            position: "absolute",
                            top: "29px",
                            right: "30px",
                            width: "180px",
                            height: "auto",
                            objectFit: "cover"
                        }}
                    />
                )}
            </div>
        );
    };
    return (
        <>
            <div
                className="min-vh-100 d-flex align-items-center justify-content-center p-0"
                style={{
                    background: darkMode ? profile.colors.dark : profile.colors.lightBg
                }}
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
                    {/* top card section to header Image */}
                    <div style={{padding:"0 15px"}}>
                    <WaveShape
                        profile={profile}
                        darkMode={darkMode}
                    />
                    {/* dynamic image calling */}
                    <div
                        className="overflow-hidden flex-column d-flex align-items-center justify-content-center"
                        style={{
                            marginTop: "-50px", position: "relative", marginBottom: "64px",
                            backgroundColor: darkMode ? "transparent" : "transparent"
                        }}
                    >

                        {/* top profile image */}
                        <div className="d-flex align-items-end justifly-content-between" style={{ gap: "28px" }}>
                            <img
                                style={{
                                    width: "152px",
                                    height: "152px",
                                    borderRadius: "50%",
                                }}
                                src={profile.profileImage}
                                alt={profile.name + profile.title}
                            />

                            {/* top profile content */}
                            <div className="profile-content w-100"
                                style={{ padding: "20px 0px 0px" }}
                            >
                                <div
                                    className="position-relative z-3 d-flex flex-column align-items-left justify-content-center"
                                    style={{
                                        paddingBottom: "0px"
                                    }}
                                >
                                    <h5 className="m-0"
                                        style={{
                                            color: darkMode ? profile.colors.white : profile.colors.black,
                                        }}
                                    >
                                        {profile.name}
                                    </h5>
                                    <p className="m-0"
                                        style={{
                                            opacity: "0.7",
                                            color: darkMode ? profile.colors.white : profile.colors.black,
                                        }}
                                    >
                                        {profile.title}
                                    </p>

                                    <div className="d-flex" style={{ gap: "10px", marginTop: "18px" }}>

                                        <ActionItemTop
                                            icon={<Phone size={18} color={profile.colors.white}/>}
                                            values={profile.contactData.phone_Number}
                                            type="tel"
                                            className="topIconOnly"
                                        />

                                        <ActionItemTop
                                            icon={<Mail size={18} color={profile.colors.white}/>}
                                            values={profile.contactData.mail}
                                            type="mailto"
                                            className="topIconOnly"
                                        
                                        />

                                        <ActionItemTop
                                            icon={<MapPin size={18} color={profile.colors.white}/>}
                                            href={profile.contactData.location.link}
                                            className="topIconOnly"
                                        />

                                    </div>

                                </div>


                                {/* visiting link div */}

                            </div>


                            <style>
                                {`
.topIconOnly{
  width: auto !important;
    padding: 0 !important;
    border-bottom: none !important;
    justify-content: left !important;
}

.topIconOnly .flex-shrink-0{
  display:none !important;
}

.topIconOnly small,
.topIconOnly .fw-semibold{
  display:none !important;
}

.topIconOnly .d-flex.gap-3{
  gap:0 !important;
}
`}
                            </style>


                        </div>

                    </div>

                    {/* body data */}
                    <div className="d-flex flex-column" style={{ gap: "20px", marginBottom: "15px" }}>

                        <div className="d-flex flex-column" style={{ gap: "15px" }}>
                            {profile.socialLinks.map((item, index) => (
                                <a key={index} href={item.link} target="_blank" style={{ textDecoration: "none" }}>
                                    <div className="d-flex align-items-center justify-content-between"
                                        style={{

                                            boxShadow: `0px 0px 4px 0px ${profile.colors.shadowCol}`,
                                            borderRadius: "10px",
                                            backgroundColor: darkMode
                                                ? profile.colors.darkCardBg
                                                : profile.colors.white,
                                            color: darkMode ? profile.colors.white : profile.colors.black,
                                            border: darkMode ? `solid 1px ${profile.colors.white}` : `none`,
                                            padding: "8px 25px 8px 8px"

                                        }}>
                                        <img src={item.icon} alt="img" />
                                        <p
                                            className="mb-0"
                                            style={{ color: darkMode ? profile.colors.white : profile.colors.black }}
                                        >
                                            {item.text}
                                        </p>
                                        <ChevronRight
                                            size={16}
                                            color={darkMode ? profile.colors.white : profile.colors.black}
                                        />
                                    </div>
                                </a>
                            ))}
                        </div>
                        {/* about */}
                        <div className="d-flex flex-column gap-2">
                            <h5 className="fw-bold my-0"
                                style={{
                                    opacity: "0.8", lineHeight: "100%", fontSize: "18px",
                                    color: darkMode ? profile.colors.white : profile.colors.black
                                }}
                            >About Us</h5>
                            <p className="mb-1" style={{
                                fontSize: "16px",
                                opacity: "0.7", lineHeight: "27px",
                                color: darkMode ? profile.colors.white : profile.colors.black
                            }}>
                                {profile.aboutDescription}
                            </p>
                        </div>

                        {/* services */}
                        <div className="d-flex flex-column gap-2">
                            <h5 className="fw-bold my-0"
                                style={{
                                    opacity: "0.8", lineHeight: "100%", fontSize: "18px",
                                    color: darkMode ? profile.colors.white : profile.colors.black
                                }}
                            >Services</h5>
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

                        {/* contact section */}
                        <ContactSection
                            profile={profile}
                            darkMode={darkMode}
                        />
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
        </>
    )
}

export default DigitalCardTwo
