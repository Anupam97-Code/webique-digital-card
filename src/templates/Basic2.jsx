import React, { useMemo, useState } from "react";
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
                    ActionItem={ActionItem}
                />


                {/* Sticky Footer Buttons */}
                <div
                    className="position-fixed w-100 d-flex flex-column gap-2 justify-content-between align-items-end"
                    style={{ bottom: "16px", right: "16px" }}
                >
                    <button
                        onClick={openQR}
                        className="d-flex align-items-center justify-content-center rounded-circle shadow border-0"
                        style={{
                            width: "50px",
                            height: "50px",
                            background: "#1f2d3d",
                            color: "#fff",
                        }}
                    >
                        <ScanQrCode size={22} />
                    </button>
                    <a
                        href={`https://wa.me/${whatsappNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="d-flex align-items-center justify-content-center rounded-circle shadow"
                        style={{
                            width: "50px",
                            height: "50px",
                            background: "#25D366",
                            color: "#fff",
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
                            <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                        </svg>
                    </a>
                </div>
            </div>
        </div >
    );
}

export default Basic2;
