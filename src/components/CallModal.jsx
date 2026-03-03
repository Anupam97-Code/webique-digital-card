import React, { useEffect } from "react";

const CallModal = ({ isOpen, onClose, phone }) => {
  if (!isOpen) return null;

  // Close on ESC
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  return (
    <div className="call-modal-backdrop" onClick={onClose}>
      <div
        className="call-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>×</button>

        <h3>Book a Call</h3>
        <p className="phone-number">{phone}</p>

        <div className="call-actions">
          <a href={`tel:${phone}`} className="call-action-btn">
            📞 Call Now
          </a>

          <a
            href={`https://wa.me/${phone.replace("+", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="call-action-btn whatsapp"
          >
            💬 WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default CallModal;