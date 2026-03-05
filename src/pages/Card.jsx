import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Download, Share2 } from 'lucide-react';
import "../styles/digitalCard.scss"
import Basic1 from "../templates/Basic1";
import Basic2 from "../templates/Basic2";

const Card = () => {
    const { username } = useParams();
    const [data, setData] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [showQR, setShowQR] = useState(false);
    const modalRef = useRef(null);

    const currentUrl = window.location.href;

    // make this function to closte the QR popup box when click coutside the popup box
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setShowQR(false);
            }
        };

        if (showQR) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showQR]);

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

            const borderSize = 10;

            // Create new canvas
            const newCanvas = document.createElement("canvas");
            const ctx = newCanvas.getContext("2d");

            // Increase canvas size (add border space)
            newCanvas.width = originalCanvas.width + borderSize * 2;
            newCanvas.height = originalCanvas.height + borderSize * 2;

            // Fill white background
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, newCanvas.width, newCanvas.height);

            // Draw original QR in center with border space
            ctx.drawImage(originalCanvas, borderSize, borderSize);

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

            // Share if supported
            if (
                navigator.canShare &&
                navigator.canShare({ files: [file] })
            ) {
                await navigator.share({
                    files: [file],
                    title: `${data.name} Digital Card`,
                });
            } else {
                alert("Your device does not support QR image sharing.");
            }

        } catch (error) {
            console.error("Error sharing QR:", error);
        }
    };
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

    // if found card the show loading
    if (loading) {
        return (
            <div className="card-loading">
                <div className="loader"></div>
                <p>Loading Digital Card...</p>
            </div>
        );
    }
    // if not the show msg
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

        const vCardData = `
BEGIN:VCARD
VERSION:3.0
FN:${data.name}
ORG:${data.company || ""}
TITLE:${data.designation || ""}
TEL;TYPE=CELL:${data.phone || ""}
EMAIL:${data.email || ""}
ADR;TYPE=WORK:;;${data.address || ""}
URL:${window.location.href}
END:VCARD
  `;

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
            />
            {showQR && (
                <div className="qr-overlay">
                    <div className="qr-modal" ref={modalRef}>
                        <h5>{data.name}</h5>

                        <QRCodeCanvas
                            id="cardQR"
                            value={currentUrl}
                            size={200}
                            level="H"
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