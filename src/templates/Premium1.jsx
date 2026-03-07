import React, { useEffect, useMemo, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import backgrondImg from "../assets/images/profile-backgrd.png";
import profileImg from "../assets/images/profie-photo.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { Tabs, Tab, Container } from "react-bootstrap";
import {
  Phone,
  Mail,
  MapPin,
  Dribbble,
  Facebook,
  Linkedin,
  Instagram,
  ArrowUpRight,
  MessageCircle,
  Share2,
  Sun,
  Moon,
  Building,
  Clock,
  Twitter,


} from "lucide-react";
import { link } from 'framer-motion/client';


const iconMap = {
  Dribbble: Dribbble,
  Facebook: Facebook,
  Twitter: Twitter,
  Instagram: Instagram,
  Linkedin: Linkedin,
  phone: <Phone size={20} />,
  email: <Mail size={20} />,
  officeNumber: <Building size={20} />,
  officeAddress: <MapPin size={20} />,
  officeHours: <Clock size={20} />,
  arrowRight: <ArrowUpRight size={20} />
};

const Premium1 = ({ data }) => {
  const [darkMode, setDarkMode] = useState(false);

  const [activeTab, setActiveTab] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const sendMessage = (e) => {
    e.preventDefault();

    const text = `Hello,
Name: ${formData.name}
Email: ${formData.email}
Message: ${formData.message}`;

    const whatsappURL = `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(
      text
    )}`;
    console.log(profile.whatsapp)
    window.open(whatsappURL, "_blank");
  };


  const safeData = data || {};



  const profile = useMemo(
    () => ({
      name: safeData.name || "Marcus Whitlow",
      whatsapp: safeData.whatsapp || "+91 919860188007",
      title: safeData.title || "CEO & Founder",
      company: safeData.company || "Quantix",
      phone: safeData.phone || "+1-212-456-7890",
      email: safeData.email || "marcus.whitlow@gmail.com",
      address: safeData.address || "2093 Philadelphia Pike",
      link: safeData.link || [],
      AboutMe: safeData.AboutMe || "",
      AboutContent: safeData.AboutContent || "",
      image:
        safeData.image ||
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
      facebook: safeData.facebook || "#",
      linkedin: safeData.linkedin || "#",
      instagram: safeData.instagram || "#",
      whatsapp: safeData.whatsapp || "+12124567890",

      tabs: safeData.tabs || [],

      testimonials: safeData.testimonials || {
        heading: "",
        viewAll: "#",
        items: []
      },

      // ✅ CONTACT SECTION
      contactInfo: safeData.contactInfo || [
        {
          type: "phone",
          label: "Call me",
          value: "+919860188007",
          className: "align-items-center"
        },
        {
          type: "email",
          label: "Email",
          value: "Jordan.smith@mail.com",
          className: "align-items-center"
        },
        {
          type: "officeNumber",
          label: "Office Number",
          value: "(0253) 555-1234",
          className: "align-items-center"
        },
        {
          type: "officeAddress",
          label: "Office Address",
          value: "Mumbai, Maharashtra, India",
          className: "align-items-center"
        },
        {
          type: "officeHours",
          label: "Office Hours",
          value: [
            "Monday - 09:00 - 22:00",
            "Tuesday - 09:00 - 22:00",
            "Wednesday - 09:00 - 22:00",
            "Thursday - 09:00 - 22:00",
            "Friday - 09:00 - 22:00",
            "Saturday - 09:00 - 22:00",
            "Sunday - Closed"
          ],
          className: "align-items-start"
        },

      ]
    }),
    [safeData]
  );

  useEffect(() => {
    if (profile.tabs?.length > 0) {
      setActiveTab(profile.tabs[0].tabName);
    }
  }, [profile.tabs]);

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
    <div style={{}}>
      <div className="min-vh-100 d-flex align-items-center justify-content-center p-3"
        style={{ background: darkMode ? "#0f172a" : "#ffffff" }}
      >

        {/* Theme Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="btn position-fixed top-0 end-0 m-4 rounded-circle shadow"
          style={{
            background: darkMode ? "#ffffff" : "#000",
            color: darkMode ? "#000" : "#ffffff",
          }}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div
          className="shadow-lg"
          style={{
            width: "100%",
            maxWidth: "402px",
            // borderRadius: "0px",
            // border: "3px solid #000",
            background: darkMode ? "#111827" : "#ffffff",
            paddingTop: "0px",
            paddingBottom: "20px",
            color: darkMode ? "#fff" : "#000",
          }}
        >
          <div className='position-relative w-100 h-auto'>
            <img src={backgrondImg} alt='background' style={{ width: "100%", height: "auto" }} />


          </div>

          <div style={{ padding: "0 16px" }}>
            <div className='w-100 d-flex justify-item-between' style={{ marginTop: "-40px", position: "relative", alignItems: "center", gap: "20px" }}>
              <div >
                <img
                  src={profileImg}
                  alt={profile.name}
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "0px solid #f1f3f5",
                  }}
                />
              </div>
              <div>
                <h4 className="fw-bold" style={{ fontSize: "20px", fontWeight: "600", marginTop: "40px" }}>{profile.name}</h4>
                <p>{profile.title}</p>
              </div>
            </div>
            {/* Profile Image */}
            <ul style={{ display: "flex", gap: "17px", margin: "20px 0 42px 0" }}>
              {profile.link.map((item, index) => {
                const Icon = iconMap[item.name];
                return (
                  <li className='d-flex align-items-center justify-content-center' style={{ width: "37px", height: "37px" }}>
                    <a key={index} href={item.url} target="_blank" rel="noopener noreferrer"
                      className='d-flex align-items-center justify-content-center' style={{ backgroundColor: "#DCECFE", width: "37px", height: "37px", borderRadius: "6px" }}>
                      <Icon size={20} />
                    </a>
                  </li>
                );
              })}
            </ul>


            {/* Profile Image */}
            <h4 style={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#000000",
              margin: "0 0 10px"
            }}
            >
              {profile.AboutMe}
            </h4>
            <p
              style={{
                fontSize: "14px",
                lineHeight: "120%",
                fontWeight: 400
              }}
            >
              {profile.AboutContent}
            </p>


            <>
              <style>
                {`
.nav-tabs{gap:10px; margin: 0 0 13px !important;}
.nav-item{
  button {padding:0; border:none !important; 
  .tab-block{padding: 7px 12px !important;
            background: #1680FB26;
            border-radius: 6px;
            border: none !important;}
  }
}

.custom-tab.active {
  background: #0d6efd;
  color: 1680FB !important;

}
`}
              </style>


            </>



            {profile.tabs?.length > 0 && (
              <Container style={{ padding: 0 }}>
                <Tabs
                  activeKey={activeTab}
                  onSelect={(k) => setActiveTab(k)}
                  style={{
                    border: "none",
                    margin: 0,
                    padding: 0,

                  }}
                  className="border-0"
                >
                  {profile.tabs.slice(0, 3).map((tab, tabIndex) => (
                    <Tab
                      key={`tab-${tabIndex}`}
                      eventKey={tab.tabName}

                      title={
                        <div className='tab-block'
                          style={{
                            backgroundColor:
                              activeTab === tab.tabName ? "#1680FB26" : "#f2f2f2",
                            color:
                              activeTab === tab.tabName ? "#1680FB" : "#333333",

                            margin: 0,
                            width: "100%",     // 3 equal buttons
                            textAlign: "center",
                            border: "none",
                            fontWeight: 500,

                          }}
                        >
                          {tab.tabName}
                        </div>
                      }
                    >
                      <div>
                        {tab.items?.map((item, itemIndex) => (
                          <div
                            key={`item-${tabIndex}-${itemIndex}`}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 20,
                              marginBottom: 13,
                              padding: 14,
                              border: "solid 1px #B4B4B4",
                              borderRadius: "6px"
                            }}
                          >
                            <img
                              src={item.image || "https://picsum.photos/300/200"}
                              alt={item.title}
                              style={{
                                width: 120,
                                height: 120,
                                objectFit: "cover",
                                borderRadius: 8,
                                flexShrink: 0,
                              }}
                            />

                            <div>
                              <h5
                                style={{
                                  fontSize: 14,
                                  fontWeight: 600,
                                  marginBottom: 8,
                                }}
                              >
                                {item.title}
                              </h5>

                              <p
                                style={{
                                  fontSize: 13,
                                  fontWeight: 400,
                                  lineHeight: "1.6",
                                  margin: 0,
                                  color: "#555",
                                }}
                              >
                                {item.content}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Tab>
                  ))}
                </Tabs>
              </Container>
            )}



            <style>
              {`
.testimonial-card {
    padding: 12px;
    border: 1px solid #B4B4B4;
    border-radius: 6px;

    .testimonial-top {
    width: 54px;
    height: 54px;

    img{width:100%; height:auto}

    
}
    
}
.swiper-pagination{position:relative; margin-top:10px;}
`}
            </style>

            <section className="testimonial-section mt-5">

              <div className="d-flex justify-content-between align-items-center">
                <h4 style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#000000",
                  margin: "0 0 5px"
                }}>{profile.testimonials.heading}</h4>

                <a href={profile.testimonials.viewAll}>
                  View All
                </a>
              </div>

              <Swiper
                modules={[Pagination]}
                spaceBetween={20}
                slidesPerView={2}
                slidesPerGroup={1}
                pagination={{ clickable: true }}
                breakpoints={{
                  0: { slidesPerView: 1 },
                  768: { slidesPerView: 2 }
                }}
              >

                {profile.testimonials.items.map((item, index) => (

                  <SwiperSlide key={index}>

                    <div className="testimonial-card">

                      <div className='d-flex align-items-center justify-content-between gap-2'>
                        <div className="testimonial-top">

                          <img
                            src={item.photo}
                            alt={item.name}
                            className="testimonial-photo"
                          />
                        </div>
                        <div className='d-flex flex-column gap-1'>
                          <h5 style={{ fontSize: "13px", marginBottom: "0px" }}>{item.name}</h5>
                          <p style={{ fontSize: "12px", lineHeight: "100%", marginBottom: "0px" }}>{item.designation}</p>
                        </div>

                      </div>

                      <p className="testimonial-desc" style={{ fontSize: "12px", fontWeight: "400", lineHeight: "100%", color: "#000", marginTop: "28px" }}>
                        {item.description
                          ? item.description.slice(0, 100) + (item.description.length > 100 ? "..." : "")
                          : ""}
                      </p>

                    </div>

                  </SwiperSlide>

                ))}

              </Swiper>

            </section>



            <section>
              <h4 style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#000000",
                margin: "0 0 10px"
              }}>Inquiries</h4>
            </section>

            <div >
              <form
                onSubmit={sendMessage}
                style={{
                  padding: "0px",
                  background: "#fff",
                }}
              >


                <div className="mb-3">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{ border: "1px solid #DEE2E6", backgroundColor: "#F1F3F5", padding: "11px 12px", fontSize: "12px" }}
                  />
                </div>

                {/* <div className="mb-3">
                  <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    style={{ border: "1px solid #DEE2E6", backgroundColor: "#F1F3F5", padding: "11px 12px", fontSize: "12px" }}
                  />
                </div> */}

                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{ border: "1px solid #DEE2E6", backgroundColor: "#F1F3F5", padding: "11px 12px", fontSize: "12px" }}
                  />
                </div>

                <div className="mb-3">
                  <textarea
                    className="form-control"
                    name="message"
                    rows="4"
                    placeholder="Write your message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    style={{ border: "1px solid #DEE2E6", backgroundColor: "#F1F3F5", padding: "11px 12px", fontSize: "12px" }}
                  />
                </div>
                <div style={{ textAlign: "center" }}>
                  <button
                    type="submit"
                    className="btn  w-50"
                    style={{
                      fontWeight: "600",
                      padding: "10px",
                      color: "#fff",
                      backgroundColor: "#1680FB",
                      margin: "0 auto",
                      fontSize: "13px"
                    }}
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>



            <div style={{ marginTop: "20px" }}>







              <div className="container" style={{ marginTop: "40px" }}>

                <h4 style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#000000",
                  margin: "0 0 15px"
                }}>Contact Me</h4>

                <div className="row" style={{ gap: "15px" }}>

                  {profile.contactInfo?.map((item, index) => (

                    <div key={index} className="col-md-12 p-0">

                      <div
                        className="d-flex justify-content-between"
                        style={{
                          border: "1px solid #DEE2E6",
                          borderRadius: "12px",
                          padding: "13px",
                          background: "#F1F3F5",
                          height: "100%"
                        }}
                      >

                        {/* LEFT SECTION */}
                        <div className={`d-flex gap-3 ${item.className}`}>

                          {/* ICON */}
                          <div
                            style={{
                              width: "35px",
                              height: "35px",
                              borderRadius: "6px",
                              background: "#ffffff",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#1680FB"
                            }}
                          >
                            {iconMap[item.type]}
                          </div>

                          {/* TEXT */}
                          <div style={{ textAlign: "left" }}>
                            <h6 style={{ fontWeight: "600", marginBottom: "0px", fontSize: "15px" }}>
                              {item.label}
                            </h6>

                            {Array.isArray(item.value) ? (
                              item.value.map((v, i) => (
                                <p key={i} style={{ margin: "0", fontSize: "15px", fontWeight: "500" }}>
                                  {v}
                                </p>
                              ))
                            ) : (
                              <p style={{ margin: "0", fontSize: "14px" }}>
                                {item.value}
                              </p>
                            )}

                          </div>

                        </div>

                        {/* ARROW (hidden for office hours) */}
                        {item.type !== "officeHours" && (
                          <div
                            style={{
                              width: "35px",
                              height: "35px",
                              borderRadius: "6px",
                              background: "transparent",
                              color: "#000000",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center"
                            }}
                          >
                            <ArrowUpRight size={20} style={{ opacity: 0.6 }} />
                          </div>
                        )}

                      </div>

                    </div>

                  ))}

                </div>
              </div>




















              {/* 
              <h4 style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#000000",
                margin: "0 0 10px"
              }}>Inquiries</h4> */}


              {/* <div className="d-grid gap-3 text-start">
                <ActionItem
                  icon={<Phone size={18} className="text-success" />}
                  title="Call me"
                  subtitle={profile.phone}
                  href={`tel:${profile.phone}`}
                />

                <ActionItem
                  icon={<Dribbble size={18} className="text-primary" />}
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
              </div> */}
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


      </div>
    </div>
  )
}

export default Premium1;
