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
    Send
} from "lucide-react";
import * as Icons from "lucide-react";
import { Carousel, Col, Row } from "react-bootstrap";
import StickyFooter from "./components/StickyFooter";


const DigitalIDcard = ({ data, openQR, saveContact }) => {
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

    const whatsappNumber = String(profile.whatsapp).replace(/[^0-9]/g, "");
    // const currentUrl = typeof window !== "undefined" ? window.location.href

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

    const ActionItemTop = ({ icon, title, subtitle, subtitle2, href, className }) => {
        const isExternal = href.startsWith("http");
        return (
            <a
                href={href}
                target={isExternal ? "_blank" : "_self"}
                rel={isExternal ? "noopener noreferrer" : ""}
                className={`w-100 d-flex align-items-center justify-content-between text-decoration-none ${className}`}
                style={{
                    color: darkMode ? profile.colors.white : profile.colors.black,
                    // borderRadius: "4px",
                    padding: "14px 16px",
                    borderBottom: `1px solid ${profile.colors.borderGray}`
                }}
            >
                <div className="d-flex gap-3">
                    <div
                        className="d-flex align-items-center justify-content-center"
                        style={{
                            width: "52px",
                            height: "52px",
                            background: profile.colors.Primery,
                            color: profile.colors.white,
                            flexShrink: "0",
                            borderRadius: "24px 0 24px 0"
                        }}
                    >
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                backgroundColor: "#022B5B"
                            }}
                        >
                            {icon}
                        </div>
                    </div>
                    <div className="d-flex flex-column align-items-start justify-content-center">

                        {/* Show title only if subtitle2 does not exist */}
                        {!subtitle2 && (
                            <div className="fw-semibold">{title}</div>
                        )}

                        {/* first value */}
                        {subtitle && (
                            <small style={{ opacity: 0.9 }}>{subtitle}</small>
                        )}

                        {/* second value if exists */}
                        {subtitle2 && (
                            <small style={{ opacity: 0.9 }}>{subtitle2}</small>
                        )}

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
            </a>
        )
    }

    // make for contact data 
    const ActionItem = ({ icon, title, subtitle, href }) => {
        const isExternal = href.startsWith("http");
        return (
            <a
                href={href}
                target={isExternal ? "_blank" : "_self"}
                rel={isExternal ? "noopener noreferrer" : ""}
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
                            background: darkMode ? profile.colors.dark : profile.colors.white,
                            color: darkMode ? profile.colors.Primery : profile.colors.Primery,
                            flexShrink: "0",
                        }}
                    >
                        {icon}
                    </div>
                    <div
                    // style={{ width: isMobile ? "190px" : "276px" }}
                    >
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
    //================= make for contact data 

    return (
        <>
            <div
                className="min-vh-100 d-flex align-items-center justify-content-center p-0 p-md-3"
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
                    <div
                        style={{
                            height: "207px",
                            backgroundImage: `url(${profile.headerBgImage})`,
                            backgroundColor: profile.headerBgImage === "" ? profile.colors.headerBg : "",
                            backgroundSize: "cover",
                            backgroundPosition: profile.headerBgImagePosition,
                            // borderRadius: "16px",
                            padding: "40px 10px 10px"
                        }}
                        className="d-flex align-items-start justify-content-center position-relative"
                    >
                        {/* header Image logo show only when the user want bg color and image if have bg image the its not display */}
                        {profile.headerBgImage === "" && (
                            <img
                                src={profile.headerOverlayLogoImg}
                                alt={profile.name}
                            />
                        )}

                        {/* svg for stynamic color changing */}
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="402" height="206" viewBox="0 0 402 206" fill="none">
                            <path d="M402 205.345C392.566 190.132 375.717 180 356.5 180C339.385 180 324.146 188.036 314.354 200.542C300.076 151.132 254.509 115 200.5 115C146.491 115 100.923 151.132 86.6455 200.542C76.8525 188.037 61.6149 180 44.5 180C25.9445 180 9.59611 189.447 0 203.793V0H402V205.345Z" fill={profile.colors.svgPathBg} />
                        </svg> */}
                    </div>

                    {/* dynamic image calling */}
                    <div
                        className="overflow-hidden flex-column d-flex align-items-center justify-content-center"
                        style={{
                            backgroundColor: darkMode ? profile.colors.dark : profile.colors.light
                        }}
                    >
                        <style>
                            {`
.id-card-profile-bg::before {
  content: "";
  position: absolute;
  height: 107px;
  width: 107px;
  border-radius: 50%;
  background: ${darkMode ? profile.colors.dark : profile.colors.light};
  bottom: 60px;
  left: -90px;
  z-index: 2;
}
  .id-card-profile-bg::after {
  content: "";
  position: absolute;
  height: 107px;
  width: 107px;
  border-radius: 50%;
  background: ${darkMode ? profile.colors.dark : profile.colors.light};
  bottom: 60px;
  right: -90px;
  z-index: 2;
}
`}
                        </style>
                        {/* top profile image */}
                        <div className="overflow-hidden w-100 d-flex align-items-center justify-content-center"
                            style={{
                                position: "absolute",
                                top: "110px"
                            }}
                        >
                            <div
                                className="id-card-profile-bg position-relative d-flex align-items-center justify-content-center"
                                style={{
                                    width: "237px",
                                    height: "237px",
                                    backgroundColor: darkMode ? profile.colors.dark : profile.colors.light,
                                    borderRadius: "50%"
                                }}
                            >
                                <img
                                    style={{
                                        width: "177px",
                                        height: "177px",
                                        borderRadius: "50%",
                                        border: `6px solid ${profile.colors.Primery}`
                                    }}
                                    src={profile.profileImage}
                                    alt={profile.name - profile.title}
                                />
                            </div>
                        </div>
                        {/* top profile content */}
                        <div className="profile-content w-100"
                            style={{ padding: "120px 0px 0px" }}
                        >
                            <div
                                className="position-relative z-3 d-flex flex-column align-items-center justify-content-center"
                                style={{
                                    paddingBottom: "29px"
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
                            </div>

                            <div className="d-flex flex-column align-items-center justify-content-center gap-2">
                                <ActionItemTop
                                    icon={<Phone size={18} />}
                                    title="Call Me"
                                    subtitle={profile.contactData.phone_Number}
                                    subtitle2={profile.contactData.phone_Number2}
                                    href={`tel:${profile.contactData.phone_Number}`}
                                    className={""}
                                />
                                <ActionItemTop
                                    icon={<Send size={18} />}
                                    title="Mail"
                                    subtitle={profile.contactData.mail}
                                    subtitle2={profile.contactData.mail2}
                                    href={`mailto:${profile.contactData.mail}`}
                                    className={""}
                                />
                                <ActionItemTop
                                    icon={<MapPin size={18} />}
                                    title="Location"
                                    subtitle={profile.contactData.location.address}
                                    href={profile.contactData.location.link}
                                    className={"border-0"}
                                />
                            </div>
                            {/* visiting link div */}
                            <div
                                className="text-center"
                                style={{
                                    padding: "10px",
                                    background: profile.colors.Primery
                                }}
                            >
                                <a
                                    href={profile.visitingLink}
                                    target="_blank"
                                    className="text-decoration-none"
                                    style={{
                                        color: profile.colors.white
                                    }}
                                >
                                    {profile.visitingLink}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* body data */}
                    <div
                        className="d-flex flex-column gap-3"
                        style={{ padding: " 20px 16px" }}
                    >
                        {/* about */}
                        <div>
                            <h5 className="fw-bold my-2"
                                style={{
                                    opacity: "0.8",
                                    color: darkMode ? profile.colors.white : profile.colors.black
                                }}
                            >About Us</h5>
                            <p className="mb-1" style={{
                                opacity: 0.8,
                                opacity: "0.7",
                                color: darkMode ? profile.colors.white : profile.colors.black
                            }}>
                                {profile.aboutDescription}
                            </p>
                        </div>

                        {/* services */}
                        <div>
                            <h5 className="fw-bold my-2"
                                style={{
                                    opacity: "0.8",
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
                        <div className="w-100">
                            <h5 className="my-2 fw-bold"
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
                                    subtitle2={profile.contactData.phone_Number2}
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
                                        backgroundColor: darkMode ? profile.colors.darkCardBg : profile.colors.trinery,
                                        color: darkMode ? profile.colors.white : profile.colors.black,
                                        borderRadius: "4px"
                                    }}
                                >
                                    <div className="w-100 d-flex align-items-start gap-3">
                                        <div
                                            className="d-flex align-items-center justify-content-center rounded-3"
                                            style={{
                                                width: "42px",
                                                height: "42px",
                                                background: darkMode ? profile.colors.dark : profile.colors.white,
                                                color: darkMode ? profile.colors.Primery : profile.colors.Primery,
                                                flexShrink: "0",
                                            }}
                                        >
                                            <Clock />
                                        </div>

                                        <div
                                            style={{ width: "224px" }}
                                        >
                                            <h6 className="fw-bold mb-2"
                                                style={{
                                                    color: darkMode ? profile.colors.white : profile.colors.black
                                                }}
                                            >Opening Hours</h6>
                                            {profile.openingHours.map((day, i) => (
                                                <div key={i} className="d-flex justify-content-between"
                                                    style={{
                                                        opacity: "0.7",
                                                        fontSize: "14px",
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

export default DigitalIDcard
