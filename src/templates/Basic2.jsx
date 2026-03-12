import React, { useMemo, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/digitalCard.scss"
import {
    Phone,
    Mail,
    MapPin,
    Facebook,
    Linkedin,
    Instagram,
    ArrowUpRight,
    MessageCircle,
    Share2,
    Sun,
    Moon,
    ScanQrCode,
} from "lucide-react";
import ContactSection from "./components/ContactSection";
import StickyFooter from "./components/StickyFooter";

/* ======================================================
   FACEBOOK STYLE DIGITAL BUSINESS CARD
   Light/Dark • WhatsApp • Share • Instagram
   Fully Functional • Error Free
====================================================== */

function Basic2({ data, saveContact, openQR }) {
    const [darkMode, setDarkMode] = useState(false);

    const safeData = data || {};

    const profile = useMemo(
        () => ({
            name: safeData.name || "Marcus Whitlow",
            title: safeData.title || "CEO & Founder",
            description: safeData.description || "",
            ogImage: safeData.ogImage || "",
            company: safeData.company || "Quantix",
            phone: safeData.phone || "+1-212-456-7890",
            email: safeData.email || "marcus.whitlow@gmail.com",
            address: safeData.address || "2093 Philadelphia Pike",
            addressLink: safeData.addressLink || "",
            contactData: safeData.contactData,
            colors: safeData.colors,
            profileImage:
                safeData.profileImage ||
                "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
            darkModeImage: safeData.darkModeImage || "",
            facebook: safeData.facebook || "#",
            facebookName: safeData.facebookName || "",
            linkedin: safeData.linkedin || "#",
            linkedinName: safeData.linkedinName || "",
            instagram: safeData.instagram || "#",
            instagramId: safeData.instagramId || "",
            whatsapp: safeData.whatsapp || "+12124567890",
        }),
        [safeData]
    );

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

    return (
        <div
            className="min-vh-100 d-flex align-items-center justify-content-center p-2 p-md-3"
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
                    maxWidth: "402px",
                    // borderRadius: "40px",
                    // border: "3px solid #000",
                    background: darkMode ? "#111827" : "#ffffff",
                    paddingTop: "20px",
                    paddingBottom: "20px",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                    color: darkMode ? "#fff" : "#000",
                }}
            >
                {/* Profile Image */}
                {/* <div className="position-absolute start-50 translate-middle" style={{ top: "28px" }}> */}
                <div className="text-center">
                    <img
                        src={darkMode ? profile.darkModeImage : profile.profileImage}
                        alt={profile.name}
                        style={{
                            width: "120px",
                            height: "120px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            // border: "8px solid #f1f3f5",
                        }}
                    />
                </div>

                {/* Contact me */}
                <ContactSection
                    profile={profile}
                    darkMode={darkMode}
                />


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

export default Basic2;
