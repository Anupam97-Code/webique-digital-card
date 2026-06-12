import React from 'react'
import {
  ScanQrCode,
  Download,
} from "lucide-react";

const StickyFooter = ({ profile, isMobile, whatsappNumber, openQR, saveContact }) => {
    return (
        <div
            className="position-sticky w-100"
            style={{ bottom: "-1px",zIndex:"1000" }}
        >
            <div className="w-100 p-0 gap-0 d-flex align-items-center justify-content-center">
                {/* whatsapp button */}
                <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="d-flex gap-1 p-2 align-items-center flex-column justify-content-center text-decoration-none"
                    style={{
                        background: profile.colors.stickyLink1,
                        color: profile.colors.white,
                        width: isMobile ? "33.33%" : "134px",
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
                        <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                    </svg>
                    <p style={{ color: profile.colors.white, fontSize: "12px", lineHeight: "1" }} className="m-0">Whatsapp</p>
                </a>
                {/* QR button */}
                <button
                    onClick={openQR}
                    className="d-flex gap-1 p-2 align-items-center flex-column justify-content-center border-0"
                    style={{
                        background: profile.colors.stickyLink2,
                        color: profile.colors.white,
                        width: isMobile ? "33.33%" : "134px",
                    }}
                >
                    <ScanQrCode size={24} />
                    <p style={{ color: profile.colors.white, fontSize: "12px", lineHeight: "1" }} className="m-0">Scan QR</p>
                </button>
                {/* save contact button */}
                <button
                    onClick={saveContact}
                    className="d-flex gap-1 p-2 align-items-center flex-column justify-content-center shadow border-0"
                    style={{
                        background: profile.colors.stickyLink3,
                        color: profile.colors.white,
                        width: isMobile ? "33.33%" : "134px",
                    }}
                >
                    <Download size={24} />
                    <p style={{ color: profile.colors.white, fontSize: "12px", lineHeight: "1" }} className="m-0">Save contact</p>
                </button>
            </div>
        </div>
    )
}

export default StickyFooter