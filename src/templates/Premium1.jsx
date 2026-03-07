import React, { useEffect, useMemo, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import backgrondImg from "../assets/images/profile-backgrd.png";
import profileImg from "../assets/images/profie-photo.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import FuterIcnOne from "../../public/images/footer-whatsaap.svg";
import FuterIcnTwo from "../../public/images/footer-share.svg";
import FuterIcnThr from "../../public/images/footer-adduser.svg";
import "swiper/css";
import "swiper/css/pagination";
import { Tabs, Tab, Container, Carousel } from "react-bootstrap";
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
  QrCode,
  ArrowDownToLine


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

const Premium1 = ({ data, openQR, saveContact }) => {
  const [darkMode, setDarkMode] = useState(false);

  const [activeTab, setActiveTab] = useState("");
  const [index, setIndex] = useState(0);



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

    // clear form
    setFormData({
      name: "",
      email: "",
      message: ""
    });
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
      colors: safeData.colors,
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

      // ✅ MAP OBJECT FROM JSON
      map: safeData.map || {
        type: "map",
        label: "Location Map",
        value: "",
        className: "w-100"
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




  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const groupedTestimonials = profile.testimonials.items.reduce((rows, item, i) => {
    if (i % 2 === 0) rows.push([item]);
    else rows[rows.length - 1].push(item);
    return rows;
  }, []);


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
          color: darkMode ? "#ffffff" : "#000",
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
      <div className="min-vh-100 d-flex align-items-center justify-content-center "
        style={{ background: darkMode ? "#0f172a" : "#F1F3F5" }}
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

          style={{
            width: "100%",
            maxWidth: "402px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            // borderRadius: "0px",
            // border: "3px solid #000",
            background: darkMode ? profile.colors.bdyColor : profile.colors.white,
            paddingTop: "0px",
            paddingBottom: "0px",
            color: darkMode ? profile.colors.white : profile.colors.primary,
          }}
        >
          <div className='position-relative w-100 h-auto'>
            <img src={backgrondImg} alt='background' style={{ width: "100%", height: "auto" }} />


          </div>



          <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: "20px" }}>
            <div className='w-100 d-flex justify-item-between' style={{ marginTop: "-55px", position: "relative", alignItems: "center", gap: "20px" }}>
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
                <h4 className="fw-bold" style={{ fontSize: "20px", fontWeight: "600", marginTop: "40px", color: darkMode ? "#fff" : "#000", }}>{profile.name}</h4>
                <p

                  style={{ color: darkMode ? "#fff" : "#000", }}
                >{profile.title}</p>
              </div>
            </div>
          </div>

          <div className='d-flex flex-column' style={{ padding: "0 16px", gap: "20px", }}>

            {/* social media icons */}




            <ul style={{ display: "flex", gap: "17px", }}>
              {profile.link.map((item, index) => {
                const Icon = iconMap[item.name];
                return (
                  <li className='d-flex align-items-center justify-content-center' style={{ width: "37px", height: "37px" }}>
                    <a key={index} href={item.url} target="_blank" rel="noopener noreferrer"
                      className='d-flex align-items-center justify-content-center'
                      style={{
                        background: darkMode ? profile.colors.black : profile.colors.iconBakcgroundWhite,
                        color: darkMode ? profile.colors.white : profile.colors.primary,
                        border: `solid 1px ${darkMode ? profile.colors.white : profile.colors.whiteBorder}`,
                        width: "37px",
                        height: "37px",
                        borderRadius: "6px"
                      }}>
                      <Icon size={20} />
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* About Me */}
            <section className='d-flex flex-column gap-2'>

              <h4 style={{
                fontSize: "18px",
                fontWeight: 600, lineHeight: "27px",
                color: darkMode ? profile.colors.white : profile.colors.dark,

              }}
              >
                {profile.AboutMe}
              </h4>
              <p
                style={{
                  fontSize: "14px",
                  lineHeight: "24px",
                  opacity: "0.7",
                  fontWeight: 400,
                  margin: 0,
                  color: darkMode ? profile.colors.white : profile.colors.dark,
                }}
              >
                {profile.AboutContent}
              </p>
            </section>

            <>
              <style>
                {`
.nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active{background:transparent;}
.nav-tabs{gap:10px; margin: 0 0 13px !important;}
.nav-item{
  button {padding:0; border:none !important; background:transparent;
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

            {/* tabs */}

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
                            // backgroundColor:
                            //   activeTab === tab.tabName ? "#1f2d3c" : "#1f2d3c",
                            // color:
                            //   activeTab === tab.tabName ? "#1680FB" : "#ffffff",

                            backgroundColor:
                              activeTab === tab.tabName
                                ? (darkMode ? profile.colors.darkFields : profile.colors.trinery)
                                : (darkMode ? profile.colors.dark : profile.colors.white),

                            color:
                              activeTab === tab.tabName
                                ? (darkMode ? profile.colors.white : profile.colors.primary)
                                : (darkMode ? profile.colors.white : profile.colors.black),

                            opacity: activeTab === tab.tabName ? 1 : (darkMode ? 0.7 : 1),


                            margin: 0,
                            width: "100%",     // 3 equal buttons
                            textAlign: "center",
                            border: "none",
                            fontWeight: 500,
                            fontSize: 13

                          }}
                        >
                          {tab.tabName}
                        </div>
                      }
                    >
                      <div className='d-flex flex-column gap-3'>
                        {tab.items?.map((item, itemIndex) => (
                          <div
                            key={`item-${tabIndex}-${itemIndex}`}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 15,

                              padding: "10px 9px",
                              border: `solid 1px ${darkMode ? profile.colors.white : profile.colors.whiteBorder}`,
                              borderRadius: "6px",
                              background: darkMode ? profile.colors.darkFields : profile.colors.whiteFields,



                              color: darkMode ? "#fff" : "#F1F3F5",
                            }}
                          >
                            <div style={{ width: "101px", height: "92px", flexShrink: "0", borderRadius: "6px", overflow: "hidden" }}>
                              <img
                                src={item.image || "https://picsum.photos/300/200"}
                                alt={item.title}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  flexShrink: 0,

                                }}
                              />
                            </div>
                            <div className='d-flex flex-column' style={{ gap: "3px" }}>
                              <h5 className='mb-0'
                                style={{
                                  fontSize: 14,
                                  fontWeight: 500,
                                  color: darkMode ? profile.colors.white : profile.colors.dark,

                                }}
                              >
                                {item.title}
                              </h5>

                              <p
                                style={{
                                  fontSize: "12px",
                                  fontWeight: 400,
                                  lineHeight: "18px",
                                  margin: 0,
                                  color: darkMode ? profile.colors.white : profile.colors.dark,
                                  opacity: darkMode ? "0.7" : "1"
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


            {/* testimonials Carousel */}

            {/* <section className="testimonial-section mt-5">

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

            </section> */}

            <section className='d-flex flex-column gap-2'>

              <div className="d-flex justify-content-between align-items-center">
                <h4
                  style={{
                    fontSize: "18px",
                    fontWeight: 600,
                    color: darkMode ? profile.colors.white : profile.colors.dark,

                    lineHeight: "27px"

                  }}
                >
                  {profile.testimonials.heading}
                </h4>

                <a href={profile.testimonials.viewAll}>View All</a>
              </div>

              <Carousel
                activeIndex={index}
                onSelect={handleSelect}
                indicators={false}
                controls={false}
                interval={3000}
                touch={true}
                pause={false}

              >

                {groupedTestimonials.map((group, i) => (
                  <Carousel.Item key={i}>

                    <div className='d-flex' style={{ gap: "15px" }}>

                      {group.map((item, idx) => (

                        <div
                          key={idx}
                          style={{
                            flex: "1",
                            padding: "15px",
                            borderRadius: "10px",
                            border: `solid 1px ${darkMode ? profile.colors.white : profile.colors.whiteBorder}`,
                            background: darkMode ? profile.colors.darkFields : profile.colors.white,
                            color: darkMode ? profile.colors.white : profile.colors.dark,
                          }}
                        >

                          <div style={{ display: "flex", gap: "10px", alignItems: "center", }}>

                            <img
                              src={item.photo}
                              alt={item.name}
                              style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",

                              }}
                            />

                            <div>
                              <h5 style={{ fontSize: "13px", margin: "0", color: "#000000", color: darkMode ? "#fff" : "#000", opacity: darkMode ? "0.7" : "1" }}>
                                {item.name}
                              </h5>

                              <p style={{ fontSize: "12px", margin: 0, fontWeight: "400", lineHeight: "16px", color: "#A09899", color: darkMode ? "#fff" : "#000", opacity: darkMode ? "0.7" : "1" }}>
                                {item.designation}
                              </p>
                            </div>

                          </div>

                          <p
                            style={{
                              fontSize: "12px",
                              color: "#000000",
                              marginTop: "20px",
                              fontWeight: "400",
                              lineHeight: "18px",
                              opacity: darkMode ? "0.7" : "1",
                              color: darkMode ? "#fff" : "#000",
                            }}
                          >
                            {item.description?.slice(0, 100)}
                          </p>

                        </div>

                      ))}

                    </div>

                  </Carousel.Item>
                ))}

              </Carousel>

              {/* Custom Pagination */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "8px",
                  marginTop: "15px"
                }}
              >

                {groupedTestimonials.map((_, i) => (

                  <div
                    key={i}
                    onClick={() => setIndex(i)}
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: index === i ? "#000" : "#ccc",
                      cursor: "pointer"
                    }}
                  />

                ))}

              </div>

            </section>


            <style>

              {`


textarea::placeholder {
  color: #6c757d;
}

.dark-placeholder::placeholder {
  color: #9CA3AF;
}
`}
            </style>





            {/* Inquiry Section (form) */}

            <section className='d-flex flex-column gap-2'>
              <h4 style={{
                fontSize: "18px",
                fontWeight: 600,
                lineHeight: "27px",
                color: darkMode ? profile.colors.white : profile.colors.black,


              }}>Inquiries</h4>


              <div>
                <form
                  onSubmit={sendMessage}
                  style={{
                    padding: "0px",

                  }}
                >

                  <div style={{ margin: "0 0 13px" }}>
                    <input
                      type="text"
                      name="name"
                      className={`form-control ${darkMode ? "dark-placeholder" : "#000"}`}
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      style={{
                        border: `solid 1px ${darkMode ? profile.colors.white : profile.colors.whiteBorder}`,
                        background: darkMode ? profile.colors.darkFields : profile.colors.whiteFields,
                        color: darkMode ? profile.colors.white : profile.colors.black,
                        padding: "11px 12px", fontSize: "12px"
                      }}
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

                  <div style={{ margin: "0 0 13px" }}>
                    <input

                      type="email"
                      name="email"
                      className={`form-control ${darkMode ? "dark-placeholder" : "#000"}`}
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{
                        border: `solid 1px ${darkMode ? profile.colors.white : profile.colors.whiteBorder}`,
                        background: darkMode ? profile.colors.darkFields : profile.colors.whiteFields,
                        color: darkMode ? profile.colors.white : profile.colors.black,
                        padding: "11px 12px", fontSize: "12px"
                      }}
                    />
                  </div>

                  <div style={{ margin: "0 0 13px" }}>
                    <textarea
                      className={`form-control ${darkMode ? "dark-placeholder" : "#000"}`}
                      name="message"
                      rows="4"
                      placeholder="Write your message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      style={{
                        border: `solid 1px ${darkMode ? profile.colors.white : profile.colors.whiteBorder}`,
                        padding: "11px 12px",
                        fontSize: "12px",
                        background: darkMode ? profile.colors.darkFields : profile.colors.whiteFields,
                        color: darkMode ? profile.colors.white : profile.colors.black,
                      }}
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
                        background: darkMode ? profile.colors.darkFields : profile.colors.primary,
                        border: `solid 1px ${darkMode ? profile.colors.white : profile.colors.whiteBorder}`,
                        margin: "0 auto",
                        fontSize: "13px"
                      }}
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>

            </section>








            {/* Contact me */}
            <section className='d-flex flex-column gap-2'>

              <h4 style={{
                fontSize: "18px",
                fontWeight: 600,
                color: darkMode ? "#fff" : "#000",
                lineHeight: "27px"
              }}>Contact Me</h4>

              <div className='gap-3 d-flex flex-column'>

                {profile.contactInfo?.map((item, index) => (

                  <div key={index} className="col-md-12 p-0">

                    <div
                      className="d-flex justify-content-between"
                      style={{
                        border: `solid 1px ${darkMode ? profile.colors.white : profile.colors.whiteBorder}`,
                        borderRadius: "12px",
                        padding: "13px",
                        background: darkMode ? profile.colors.darkFields : profile.colors.whiteFields,

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
                            background: darkMode ? profile.colors.black : profile.colors.whiteFields,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: darkMode ? profile.colors.white : profile.colors.black,
                          }}
                        >
                          {iconMap[item.type]}
                        </div>

                        {/* TEXT */}
                        <div style={{ textAlign: "left" }}>
                          <h6 style={{
                            fontWeight: "600",
                            marginBottom: "0px",
                            fontSize: "15px",

                            color: darkMode ? profile.colors.white : profile.colors.black,
                          }}>
                            {item.label}
                          </h6>

                          {Array.isArray(item.value) ? (
                            item.value.map((v, i) => (
                              <p key={i}
                                style={{
                                  margin: "0",
                                  fontSize: "14px",
                                  fontWeight: "500",
                                  color: darkMode ? profile.colors.white : profile.colors.black,
                                  opacity: darkMode ? "0.7" : "1"
                                }}>
                                {v}
                              </p>
                            ))
                          ) : (
                            <p style={{
                              margin: "0",
                              fontSize: "14px",
                              color: darkMode ? profile.colors.white : profile.colors.black,
                              opacity: darkMode ? "0.7" : "1"
                            }}>
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
                            color: darkMode ? profile.colors.white : profile.colors.black,
                            opacity: darkMode ? "0.7" : "1",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"

                          }}
                        >
                          <ArrowUpRight
                            size={20}
                            style={{
                              opacity: 0.6,
                              color: darkMode ? profile.colors.white : profile.colors.black
                            }}
                          />
                        </div>
                      )}

                    </div>

                  </div>

                ))}

              </div>
            </section>










            {/* map section */}
            <section>

              {profile.map?.value && (
                <div className="container p-0 " style={{ borderRadius: "6px", overflow: "hidden" }}>


                  <div className="ratio ratio-16x9">
                    <iframe
                      src={profile.map.value}
                      style={{ border: "0" }}
                      loading="lazy"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}
            </section>









            {/* Sticky Footer Buttons */}
            {/* <div
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
            </div> */}
          </div>

          <div className='position-sticky bottom-0 left-0 w-100%' style={{ height: "auto" }}>

            <ul style={{ display: "flex", alignItems: "center", justifyContent: "space-between", textAlign: "center" }}>
              <li style={{ width: "100%" }}>
                <a href={`https://wa.me/${whatsappNumber}`} target='_blank' style={{ display: "flex", textDecoration: "none", flexDirection: "column", padding: "6.5px 0", alignItems: "center", justifyContent: "center", gap: "4px", backgroundColor: "#00BF63", width: "100%", border: "none" }}>
                  <img src={FuterIcnOne} alt='icon1' style={{ width: "23px", height: "auto" }} />
                  <p style={{ fontSize: "10px", margin: "0", color: "#ffffff", lineHeight: "15px", fontWeight: "500" }}>Whatsapp</p>
                </a>
              </li>
              <li style={{ width: "100%" }}>
                <button style={{ display: "flex", flexDirection: "column", padding: "6.5px 0", alignItems: "center", justifyContent: "center", gap: "4px", backgroundColor: "#1680FB", width: "100%", border: "none" }} onClick={openQR}>
                  <img src={FuterIcnTwo} alt='icon2' style={{ width: "23px", height: "auto" }} />
                  <p style={{ fontSize: "10px", margin: "0", color: "#ffffff", lineHeight: "15px", fontWeight: "500" }}>Share QR</p>
                </button>
              </li>
              <li style={{ width: "100%" }}>
                <button style={{ display: "flex", flexDirection: "column", padding: "6.5px 0", alignItems: "center", justifyContent: "center", gap: "4px", backgroundColor: "#022B5B", width: "100%", border: "none" }} onClick={saveContact}>
                  <img src={FuterIcnThr} alt='icon3' style={{ width: "23px", height: "auto" }} />
                  <p style={{ fontSize: "10px", margin: "0", color: "#ffffff", lineHeight: "15px", fontWeight: "500" }}>Save Contact</p>
                </button>
              </li>
            </ul>
          </div>
        </div>


      </div>
    </div>
  )
}

export default Premium1;
