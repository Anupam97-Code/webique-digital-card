import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Download, Share2 } from 'lucide-react';
import "../styles/digitalCard.scss"
import Basic1 from "../templates/Basic1";
import Basic2 from "../templates/Basic2";
import Premium1 from "../templates/Premium1";
import HospitalCard from "../templates/HospitalCard";
import RestraurentCard from "../templates/RestraurentCard";
import DigitalIDcard from "../templates/DigitalIDcard";
import { button } from "framer-motion/client";
import DigitalCardTwo from "../templates/DigitalCardTwo";
import BusinessCard from "../templates/BusinessCard";

const Card = () => {
    const { username } = useParams();
    const [data, setData] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [showQR, setShowQR] = useState(false);
    const modalRef = useRef(null);

    const [showUPI, setShowUPI] = useState(false);
    const currentUrl = window.location.href;

    // make this function to closte the QR popup box when click coutside the popup box
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setShowQR(false);
                setShowUPI(false);
            }
        };

        if (showQR || showUPI) {
            document.addEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = "hidden"; // Prevent background scrolling
        } else {
            document.body.style.overflow = "auto"; // Restore background scrolling
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = "auto"; // Cleanup on unmount
        };
    }, [showQR, showUPI]);

    // make this function to download the QR code
    const downloadQR = () => {
        const originalCanvas = document.getElementById("cardQR");

        /* make an Regex expression to fide Space and replace it with -  { .replace(pattern, replacement) }*/
        const fileName = data.name.replace(/\s+/g, "-").toLowerCase();
        console.log(fileName);
        // ==========================

        if (!originalCanvas) return;

        const borderSize = 5;

        const newCanvas = document.createElement("canvas");
        const ctx = newCanvas.getContext("2d");

        newCanvas.width = originalCanvas.width + borderSize * 2;
        newCanvas.height = originalCanvas.height + borderSize * 2;

        // White background
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, newCanvas.width, newCanvas.height);

        // Draw QR inside with 5px space
        ctx.drawImage(originalCanvas, borderSize, borderSize);

        const pngUrl = newCanvas.toDataURL("image/png");

        const link = document.createElement("a");
        link.href = pngUrl;
        link.download = `${fileName}-digital-card-qr.png`;
        link.click();
    };

    // make this function to share the Qr code 
    const shareQR = async () => {
        try {
            const originalCanvas = document.getElementById("cardQR");

            if (!originalCanvas) {
                alert("QR not found");
                return;
            }

            const qrWidth = originalCanvas.width;
            const qrHeight = originalCanvas.height;

            const textLines = [];
            if (data?.name) textLines.push(`Name: ${data.name}`);
            if (data?.title) textLines.push(`Title: ${data.title}`);
            if (data?.designation) textLines.push(`Designation: ${data.designation}`);
            textLines.push(`Link: ${window.location.href}`);

            const cardPadding = 30;
            const canvasPadding = 40;
            const lineHeight = 24;
            const textSectionHeight = textLines.length > 0 ? (textLines.length * lineHeight + 10) : 0;

            const cardWidth = Math.max(qrWidth + cardPadding * 2, 300);
            const cardHeight = qrHeight + textSectionHeight + cardPadding * 2;

            // Create new canvas
            const newCanvas = document.createElement("canvas");
            newCanvas.width = cardWidth + canvasPadding * 2;
            newCanvas.height = cardHeight + canvasPadding * 2;
            const ctx = newCanvas.getContext("2d");

            // Fill outer white background
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, newCanvas.width, newCanvas.height);

            // Shadow box
            ctx.shadowColor = "rgba(0, 0, 0, 0.15)";
            ctx.shadowBlur = 20;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 10;

            const boxX = canvasPadding;
            const boxY = canvasPadding;
            const radius = 20;

            // Box shape
            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.moveTo(boxX + radius, boxY);
            ctx.lineTo(boxX + cardWidth - radius, boxY);
            ctx.quadraticCurveTo(boxX + cardWidth, boxY, boxX + cardWidth, boxY + radius);
            ctx.lineTo(boxX + cardWidth, boxY + cardHeight - radius);
            ctx.quadraticCurveTo(boxX + cardWidth, boxY + cardHeight, boxX + cardWidth - radius, boxY + cardHeight);
            ctx.lineTo(boxX + radius, boxY + cardHeight);
            ctx.quadraticCurveTo(boxX, boxY + cardHeight, boxX, boxY + cardHeight - radius);
            ctx.lineTo(boxX, boxY + radius);
            ctx.quadraticCurveTo(boxX, boxY, boxX + radius, boxY);
            ctx.closePath();
            ctx.fill();

            // Reset shadow before drawing image and text
            ctx.shadowColor = "transparent";
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;

            // Draw QR code centered horizontally
            const qrX = boxX + (cardWidth - qrWidth) / 2;
            const qrY = boxY + cardPadding;
            ctx.drawImage(originalCanvas, qrX, qrY);

            // Draw text
            if (textLines.length > 0) {
                ctx.fillStyle = data?.colors?.black || "#000000";
                ctx.font = "bold 16px Arial";
                ctx.textAlign = "center";
                
                let textY = boxY + cardPadding + qrHeight + 25;
                textLines.forEach(line => {
                    ctx.fillText(line, boxX + (cardWidth / 2), textY, cardWidth - 40);
                    textY += lineHeight;
                });
            }

            // Convert NEW canvas to blob
            const blob = await new Promise((resolve) =>
                newCanvas.toBlob(resolve, "image/png")
            );

            if (!blob) {
                alert("Failed to generate QR image");
                return;
            }

            // Clean file name
            const cleanName = data.name
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9-]/g, "");

            const file = new File(
                [blob],
                `${cleanName}-digital-card-qr.png`,
                { type: "image/png" }
            );

            const shareTextArray = [];
            if (data?.name) shareTextArray.push(`Name: ${data.name}`);
            if (data?.title) shareTextArray.push(`Title: ${data.title}`);
            if (data?.designation) shareTextArray.push(`Designation: ${data.designation}`);
            shareTextArray.push(`Digital Card Link: ${window.location.href}`);
            const shareText = shareTextArray.join("\n");

            // Share if supported
            if (
                navigator.canShare &&
                navigator.canShare({ files: [file] })
            ) {
                await navigator.share({
                    files: [file],
                    title: `${data.name} Digital Card`,
                    text: shareText,
                });
            } else {
                alert("Your device does not support QR image sharing.");
            }

        } catch (error) {
            console.error("Error sharing QR:", error);
        }
    };

    // to show the upi QR
    const openUPI = () => {
        if (!data?.payment?.upi_id) return;
        setShowUPI(true);
    };

    // add this link for when user click the upi id it needs to open upi related app
    // const upiLink = data?.payment?.upi_id
    //     ? `upi://pay?pa=${data.payment.upi_id}&pn=${encodeURIComponent(data.name)}&cu=INR`
    //     : "#";

    const handleUPIPay = () => {
        const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

        const upiLink = "upi://pay?pa=restraurent@upi&pn=Buzz%20Cafe&cu=INR";

        if (isMobile) {
            window.location.href = upiLink;
        } else {
            alert("Please open this on your mobile to pay via UPI");
        }
    };
    // ===================================================================================================


    // modified for rendering 
    useEffect(() => {
        setLoading(true);
        setError(false);

        const start = Date.now();

        fetch(`/clientData/${username}.json`)
            .then((res) => {
                if (!res.ok) throw new Error("User not found");
                return res.json();
            })
            .then((json) => {
                const elapsed = Date.now() - start;
                const delay = Math.max(400 - elapsed, 0);

                setTimeout(() => {
                    setData(json);
                    setLoading(false);
                }, delay);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });

    }, [username]);

    // if found card then show loading
    if (loading) {
        return (
            <div className="card-loading">
                <div className="loader"></div>
                <p>Loading Digital Card...</p>
            </div>
        );
    }
    // if not then show err msg
    if (error || !data) {
        return (
            <h2 style={{ textAlign: "center", marginTop: "50px" }}>
                User Not Found
            </h2>
        );
    }

    // make this function for saveing the contact and making VCF file
    const handleSaveContact = () => {
        if (!data) return;

        const vCardData = [
            "BEGIN:VCARD",
            "VERSION:3.0",
            `FN:${data.name || ""}`,
            `ORG:${data.company || ""}`,
            `TITLE:${data.title || ""}`,
            `TEL;TYPE=CELL:${data?.contactData?.phone_Number?.[0] || data.phone || ""}`,
            `EMAIL:${data?.contactData?.mail?.[0] || data.email || ""}`,
            `ADR;TYPE=WORK:;;${data?.contactData?.location?.address || data.address || ""}`,
            `URL:${window.location.href}`,
            "END:VCARD"
        ].join("\r\n");

        const blob = new Blob([vCardData], { type: "text/vcard;charset=utf-8" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `${data.name}.vcf`;
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };
    //======= make this function for saveing the contact and making VCF file

    const templates = {
        Basic1: Basic1,
        Basic2: Basic2,
        Premium1: Premium1,
        RestraurentCard: RestraurentCard,
        DigitalIDcard: DigitalIDcard,
        HospitalCard: HospitalCard,
        DigitalCardTwo:DigitalCardTwo,
        BusinessCard:BusinessCard
    };

    const SelectedTemplate = templates[data.template];

    if (!SelectedTemplate)
        return <h2 style={{ textAlign: "center" }}>Template Not Found</h2>;

    return (
        <>
            <SelectedTemplate
                data={data}
                saveContact={handleSaveContact}
                openQR={() => setShowQR(true)}
                openUPI={openUPI}
            />

            {/* make for show the users UPI QR  */}
            {showUPI && (
                <div className="qr-overlay">
                    <div className="qr-modal d-flex flex-column align-items-center justify-content-center" ref={modalRef}
                        style={{ padding: "40px 20px" }}>
                        {/* show user name and profile image */}
                        <div className="d-flex gap-3 flex-row align-items-center mb-3">
                            {data?.profileImage ? (
                                <img
                                    src={data.profileImage}
                                    alt={data.name || "Profile"}
                                    style={{
                                        width: "45px",
                                        height: "45px",
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                        marginBottom: "10px"
                                    }}
                                />
                            ) : (
                                <div
                                    style={{
                                        width: "45px",
                                        height: "45px",
                                        borderRadius: "50%",
                                        backgroundColor: data.colors.Primery,
                                        color: data.colors.white,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "24px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {data?.name ? data.name.replace(/^(mr\.?|mrs\.?|ms\.?|dr\.?)\s+/i, "").charAt(0).toUpperCase() : "U"}
                                </div>
                            )}
                            <h5 className="mb-0 text-center" style={{ color: data?.colors?.black || "#000" }}>
                                {data?.name}
                            </h5>
                        </div>
                        {/* show QR image */}
                        {data?.payment?.qr_image && (
                            <img
                                src={data.payment.qr_image}
                                alt="UPI QR"
                                width="200"
                                height="200"
                                style={{ marginBottom: "10px" }}
                            />
                        )}
                        {/* show upi id */}
                        {data?.payment?.upi_id && (
                            <button
                                onClick={handleUPIPay}
                                className="border-0"
                                style={{
                                    marginTop: "10px",
                                    display: "block",
                                    fontWeight: "600",
                                    textDecoration: "none",
                                    color: data?.colors?.black || "#000",
                                    background: "none"
                                }}
                            >
                                {data.payment.upi_id}
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* make for show the users Dgital cards QR generated by user card link */}
            {showQR && (
                <div className="qr-overlay">
                    <div className="qr-modal" ref={modalRef}>
                        <h5>{data.name}</h5>
                        <QRCodeCanvas
                            id="cardQR"
                            value={currentUrl}
                            size={200}
                            level="H"
                            fgColor={data?.colors?.black || "#000000"}
                        />
                        <div className="qr-buttons">
                            <button onClick={downloadQR}><Download size={18} />  Download QR</button>
                            <button onClick={shareQR}><Share2 size={18} /> Share QR</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Card;