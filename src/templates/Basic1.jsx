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

function Basic1({ data }) {
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
            image:
                safeData.image ||
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
                    background: darkMode ? "#ffffff" : "#ffffff",
                    color: darkMode ? "#fff" : "#ffffff",
                }}
            >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <div
                className="position-relative shadow-lg"
                style={{
                    width: "100%",
                    maxWidth: "390px",
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
                        src={profile.image}
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

                <div className="text-center px-4 pb-3">
                    <h4 className="mt-4 fw-bold">{profile.name}</h4>
                    <p style={{ opacity: 0.7 }} className="mb-3">
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
                            subtitle="Facebook Profile"
                            href={profile.facebook}
                        />

                        <ActionItem
                            icon={<Instagram size={18} className="text-danger" />}
                            title="Follow on Instagram"
                            subtitle="Instagram Profile"
                            href={profile.instagram}
                        />

                        <ActionItem
                            icon={<MapPin size={18} className="text-danger" />}
                            title="Visit my office"
                            subtitle={profile.address}
                            href={`https://maps.google.com/?q=${encodeURIComponent(
                                profile.address
                            )}`}
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
                            subtitle="LinkedIn Profile"
                            href={profile.linkedin}
                        />
                    </div>
                </div>

                {/* Sticky Footer Buttons */}
                <div
                    className="position-sticky w-100 d-flex justify-content-between px-4"
                    style={{ bottom: "0px" }}
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
                        <MessageCircle size={24} />
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

export default Basic1;
