import React from "react";
import { NavLink } from "react-router-dom";

const ButtonCall = ({
  email,
  phone,
  to,        // hash scroll (#demo)
  route,     // 👈 NEW: react-router page change
  label,
  icon,
  className = "",
  disabled = false,
}) => {

  // 👉 Non-clickable (show only)
  if (disabled) {
    return (
      <button className={`${className} is-disabled`} disabled>
        {icon && <img src={icon} alt="" className="btn-icon" />}
        <span className="btn-text">{label}</span>
        
      </button>
    );
  }

  // 👉 Page change (React Router)
  if (route) {
    return (
      <NavLink to={route} className={className} aria-label={label}>
        <span className="btn-text">{label}</span>
        {icon && <img src={icon} alt="" className="btn-icon" />}
      </NavLink>
    );
  }

  // 👉 Smooth scroll for hash links
  if (to?.startsWith("#")) {
    return (
      <button
        className={className}
        onClick={() => {
          const el = document.getElementById(to.replace("#", ""));
          el?.scrollIntoView({ behavior: "smooth" });
        }}
        aria-label={label}
      >
        <span className="btn-text">{label}</span>
        {icon && <img src={icon} alt="" className="btn-icon" />}
      </button>
    );
  }

  // 👉 Email
  if (email) {
    return (
      <a href={`mailto:${email}`} className={className}>
        <span className="btn-text">{label}</span>
        {icon && <img src={icon} alt="" className="btn-icon" />}
      </a>
    );
  }

  // 👉 Phone
  if (phone) {
    return (
      <a href={`tel:${phone}`} className={className}>
        <span className="btn-text">{label}</span>
        {icon && <img src={icon} alt="" className="btn-icon" />}
      </a>
    );
  }

  return null;
};

export default ButtonCall;