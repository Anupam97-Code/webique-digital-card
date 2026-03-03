import React, { useMemo, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
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
} from "lucide-react";

/* ======================================================
   FACEBOOK STYLE DIGITAL BUSINESS CARD
   Light/Dark • WhatsApp • Share • Instagram
   Fully Functional • Error Free
====================================================== */

function Basic2({ data }) {
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
            addressLink: safeData.addressLink || "",
            image:
                safeData.image ||
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
        const isExternal = href.startsWith("http");
        return (
            <a
                href={href}
                target={isExternal ? "_blank" : "_self"}
                rel={isExternal ? "noopener noreferrer" : ""}
                className="d-flex align-items-center justify-content-between text-decoration-none p-2 rounded-4 border"
                style={{
                    backgroundColor: darkMode ? "#1e293b" : "#f1f3f5",
                    color: darkMode ? "#fff" : "#000",
                }}
            >
                <div className="d-flex align-items-center gap-3">
                    <div
                        className="d-flex align-items-center justify-content-center rounded-3"
                        style={{
                            width: "42px",
                            height: "42px",
                            background: darkMode ? "#0f172a" : "#ffffff",
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
                <ArrowUpRight size={18} style={{ opacity: 0.5 }} />
            </a>
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
                className="btn position-fixed top-0 end-0 m-4 rounded-circle shadow"
                style={{
                    background: darkMode ? "rgb(255, 255, 255)" : "#1F2D3D",
                    color: darkMode ? "#1F2D3D" : "#ffffff",
                }}
            >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <div
                className="position-relative "
                style={{
                    width: "100%",
                    maxWidth: "390px",
                    // borderRadius: "40px",
                    // border: "3px solid #000",
                    background: darkMode ? "#111827" : "#ffffff",
                    paddingTop: "0px",
                    paddingBottom: "20px",
                    color: darkMode ? "#fff" : "#000",
                }}
            >
                {/* Profile Image */}
                {/* <div className="position-absolute start-50 translate-middle" style={{ top: "28px" }}> */}
                <div className="text-center">
                    <img
                        src={darkMode ? profile.darkModeImage : profile.image}
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

                <div className="text-center">
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
                        onClick={() =>
                            (window.location.href = `tel:${profile.phone}`)
                        }
                    >
                        Save Contact
                    </button>

                    <div className="d-grid gap-3 text-start">
                        <ActionItem
                            icon={<Phone size={18} className="text-success" />}
                            title="Call me"
                            subtitle={profile.phone}
                            href={`tel:${profile.phone}`}
                        />

                        <ActionItem
                            icon={<Facebook size={18} className="text-primary" />}
                            title="Follow me"
                            subtitle={profile.facebookName}
                            href={profile.facebook}
                        />

                        <ActionItem
                            icon={<Instagram size={18} className="text-danger" />}
                            title="Follow on Instagram"
                            subtitle={profile.instagramId}
                            href={profile.instagram}
                        />

                        <ActionItem
                            icon={<MapPin size={18} className="text-danger" />}
                            title="Visit my office"
                            subtitle={profile.address}
                            href={profile.addressLink}
                        // href={`https://maps.google.com/?q=${encodeURIComponent(
                        //     profile.address
                        // )}`}
                        />

                        <ActionItem
                            icon={<Mail size={18} className="text-info" />}
                            title="Email me"
                            subtitle={profile.email}
                            href={`mailto:${profile.email}`}
                        />

                        <ActionItem
                            icon={<Linkedin size={18} className="text-primary" />}
                            title="Follow my Linkedin"
                            subtitle={profile.linkedinName}
                            href={profile.linkedin}
                        />
                    </div>
                </div>

                {/* Sticky Footer Buttons */}
                <div
                    className="position-sticky w-100 d-flex justify-content-between"
                    style={{ bottom: "5px" }}
                >
                    <a
                        href={`https://wa.me/${whatsappNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="d-flex align-items-center justify-content-center rounded-circle shadow"
                        style={{
                            width: "55px",
                            height: "55px",
                            background: "#25D366",
                            color: "#fff",
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
                            <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                        </svg>
                    </a>

                    <button
                        onClick={shareCard}
                        className="d-flex align-items-center justify-content-center rounded-circle shadow border-0"
                        style={{
                            width: "55px",
                            height: "55px",
                            background: "#1f2d3d",
                            color: "#fff",
                        }}
                    >
                        <Share2 size={22} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Basic2;
