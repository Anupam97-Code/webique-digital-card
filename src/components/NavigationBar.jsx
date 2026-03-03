import React, { useState, useEffect, useRef } from "react";
import "../styles/navbar.scss";
import logo from "../assets/images/webique-card-logo.svg";
import logoSb from "../assets/images/dgw.svg";
import { Container } from "react-bootstrap";
import ButtonCall from "./ButtonLink";
import arrowOne from "../assets/images/phone-footer.svg";
import phone from "../assets/images/call.svg";
import mail from "../assets/images/mail.svg";
import locationImg from "../assets/images/location.svg";

const sections = [
  { id: "home", label: "Home" },
  { id: "process", label: "Our Process" },
  { id: "demo", label: "Demo" },
  { id: "pricing", label: "Pricing" },
  { id: "features", label: "Features" },
  
];

const NavigationBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled500, setScrolled500] = useState(false);
  const [hasStartedScrolling, setHasStartedScrolling] = useState(false);
  const sidebarRef = useRef(null);

  /* ================= SCROLL SPY ================= */
useEffect(() => {
  const handleScroll = () => {
    const scrollY = window.scrollY;

    setScrolled500(scrollY > 500);
    setHasStartedScrolling(scrollY > 0);

    const scrollPos = scrollY + 200;
    let current = sections[0].id;

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el && scrollPos >= el.offsetTop) {
        current = sec.id;
      }
    });

    setActiveSection(current);
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  /* ================= SCROLL TO SECTION ================= */
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
    setSidebarOpen(false);
  };

  /* ================= OUTSIDE CLICK ================= */
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () =>
      document.removeEventListener("mousedown", handleOutsideClick);
  }, [sidebarOpen]);

  return (
    <>
      {/* NAVBAR */}
<header
  className={`navbar
    ${!hasStartedScrolling ? "navbar-initial" : ""}
    ${hasStartedScrolling && !scrolled500 ? "navbar-hidden" : ""}
    ${scrolled500 ? "navbar-fixed show" : ""}
  `}
>
        <Container className="nav-container">
          <div className="nav-logo">
            <img src={logo} alt="Company Logo" />
          </div>

          <nav className="nav-links">
            {sections.map((sec) => (
              <button
                key={sec.id}
                className={activeSection === sec.id ? "active" : ""}
                onClick={() => scrollToSection(sec.id)}
              >
                {sec.label}
              </button>
            ))}
          </nav>

          <div className="button-wrap">
            <ButtonCall
              className='nav-btn-new'
              phone="+919876543210"
              label="Call Us"
              icon={arrowOne}
            />
          </div>

          <div className="hamburger" onClick={() => setSidebarOpen(true)}>
            ☰
          </div>
        </Container>
      </header>

      {/* SIDEBAR */}
      <div className={`sidebar-overlay ${sidebarOpen ? "show" : ""}`}>
        <aside
          className={`sidebar ${sidebarOpen ? "open" : ""}`}
          ref={sidebarRef}
        >

          <div className="d-flex align-items-center justify-content-between py-3 lgo-sidebar">
            <img src={logoSb} alt="Company Logo" className="sidebar-logo" />
            <button className="close-btn" onClick={() => setSidebarOpen(false)}>
              ✕
            </button>
          </div>
          <div className="sidebar-links">
            {sections.map((sec) => (
              <button
                key={sec.id}
                className={activeSection === sec.id ? "active" : ""}
                onClick={() => scrollToSection(sec.id)}
              >
                {sec.label}
              </button>
            ))}
          </div>
          <div class="d-flex flex-column gap-3 dashed-border pb-5 col-12">
            <div class="contact-box d-flex align-items-center gap-4">
              <img src={phone} alt="phone"/>
              <div>
                <p>Phone</p>
                <a href="tel:+919860188007">9860188007</a>
              </div>
            </div>
            <div class="contact-box d-flex align-items-center gap-4">
              <img src={mail} alt="phone"/>
              <div>
                <p>Address</p>
                <a href="https://maps.app.goo.gl/iNPJVhtMfUWuNWHz8" target="_blank" rel="noopener noreferrer">G-110, Atlanta Shoppers, Pathardi road, Nashik-422010</a>
              </div>
            </div>
            <div class="contact-box d-flex align-items-center gap-4">
              <img src={locationImg} alt="phone"/>
              <div>
                <p>Email</p>
                <a href="mailto:contact@webique.in">contact@webique.in</a>
              </div>
            </div>
          </div>
        </aside>


      </div>
    </>
  );
};

export default NavigationBar;