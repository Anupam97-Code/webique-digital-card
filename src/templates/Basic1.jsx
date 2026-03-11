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
import StickyFooter from "./components/StickyFooter";

/* ======================================================
   FACEBOOK STYLE DIGITAL BUSINESS CARD
   Light/Dark • WhatsApp • Share • Instagram
   Fully Functional • Error Free
====================================================== */

function Basic1({ data, saveContact, openQR }) {
    const [darkMode, setDarkMode] = useState(false);

    const safeData = data || {};

    const profile = useMemo(
        () => ({
            name: safeData.name || "Marcus Whitlow",
            title: safeData.title || "CEO & Founder",
            company: safeData.company || "Quantix",
            phone: safeData.phone || "+1-212-456-7890",
            email: safeData.email || "marcus.whitlow@gmail.com",
            address: safeData.address || "2093 Philadelphia Pike",
            profileImage:
                safeData.profileImage ||
                "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
            facebook: safeData.facebook || "#",
            linkedin: safeData.linkedin || "#",
            instagram: safeData.instagram || "#",
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
            className="min-vh-100 d-flex align-items-center justify-content-center p-3"
            style={{ background: darkMode ? "#0f172a" : "#ffffff" }}
        >
            {/* Theme Toggle */}
            <button
                onClick={() => setDarkMode(!darkMode)}
                className="btn position-fixed top-0 end-0 m-2 m-md-4 z-3 rounded-circle shadow"
                style={{
                    background: darkMode ? "rgb(255, 255, 255)" : "#1F2D3D",
                    color: darkMode ? "#1F2D3D" : "#ffffff",
                    padding: "12px 15px"
                }}
            >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <div
                className="position-relative shadow-lg"
                style={{
                    width: "100%",
                    maxWidth: "402px",
                    borderRadius: "40px",
                    border: "3px solid #000",
                    background: darkMode ? "#111827" : "#ffffff",
                    paddingTop: "70px",
                    paddingBottom: "20px",
                    color: darkMode ? "#fff" : "#000",
                }}
            >
                {/* Profile Image */}
                <div className="position-absolute start-50 translate-middle" style={{ top: "28px" }}>
                    <img
                        src={profile.profileImage}
                        alt={profile.name}
                        style={{
                            width: "120px",
                            height: "120px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            border: "8px solid #f1f3f5",
                        }}
                    />
                </div>

                <div className="text-center pb-3"
                    style={{
                        padding: "0 16px"
                    }}
                >
                    <h4 className="mt-4 fw-bold"
                        style={{
                            color: darkMode ? "#fff" : "#000",
                        }}
                    >{profile.name}</h4>
                    <p
                        style={{
                            opacity: 0.7,
                            color: darkMode ? "#fff" : "#000",
                        }} className="mb-3">
                        {profile.title} | <strong>{profile.company}</strong>
                    </p>

                    {/* Save Contact Button */}
                    <button
                        className="btn w-100 mb-4"
                        style={{
                            background: "#1f2d3d",
                            color: "#fff",
                            padding: "12px",
                            borderRadius: "14px",
                            fontWeight: "500",
                        }}
                        onClick={saveContact}
                    >
                        Save Contact
                    </button>

                    <ContactSection
                        profile={profile}
                        darkMode={darkMode}
                        ActionItem={ActionItem}
                    />
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
        </div>
    );
}

export default Basic1;
