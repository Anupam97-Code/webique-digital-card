import React, { useEffect, useMemo, useState, memo } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import FuterIcnOne from "../../public/images/footer-whatsaap.svg";
import FuterIcnTwo from "../../public/images/footer-share.svg";
import FuterIcnThr from "../../public/images/footer-adduser.svg";
import "swiper/css";
import "swiper/css/pagination";
import { Tabs, Tab, Container, Carousel, Row, Col } from "react-bootstrap";
import {
  IndianRupee,
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
  ArrowDownToLine,
  ScanQrCode,
  Download,
  Send,
  Smartphone,
  Youtube


} from "lucide-react";
import * as Icons from "lucide-react";
import { link, span } from 'framer-motion/client';
import ContactSection from './components/ContactSection';
import StickyFooter from './components/StickyFooter';
import GallerySlider from "./components/GallerySlider";



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
  arrowRight: <ArrowUpRight size={20} />,
  send: <Send size={20} />,
  mobile: <Smartphone size={20} />,
  Youtube
};

const Premium1 = ({ data, openQR, saveContact, openUPI }) => {
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


  const [isMobile, setIsMobile] = useState(window.innerWidth <= 417);
  useEffect(() => {

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 417);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };

  }, []);

  // console.log("is mobile:", isMobile);


  const safeData = data || {};

  const profile = useMemo(
    () => ({
      name: safeData.name || "Marcus Whitlow",
      whatsapp: safeData.whatsapp,
      title: safeData.title,
      designation: safeData.designation,
      company: safeData.company,
      gallerySlider: safeData.gallerySlider,
      contactData: safeData.contactData || [],
      openingHours: safeData.openingHours,
      headerBgImage: safeData.headerBgImage,
      profileImg: safeData.profileImg || "",
      servicesData: safeData.servicesData || [],
      link: safeData.link || [],
      AboutMe: safeData.AboutMe || "",
      reviewLink: safeData.reviewLink || "",
      colors: safeData.colors,
      AboutContent: safeData.AboutContent || "",
      package: safeData.package,
      profileImage:
        safeData.profileImage ||
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
      tabs: safeData.tabs || [],
      testimonials: safeData.testimonials || {
        heading: "",
        viewAll: "#",
        items: []
      },

      map: safeData.map || {
        type: "map",
        label: "Location Map",
        value: "",
        className: "w-100"
      },
    }),
    [safeData]
  );

  // const servisecJsonArr = profile.tabs
  // console.log("servisecJsonArr:", servisecJsonArr.slice(0, 1));

  // create for checking the packages and assing the styles
  const checkUserPackage = (requiredUserPackage) => {
    // console.log("requiredUserPackage:", requiredUserPackage);

    const packageLevels = {
      basic: 1,
      regular: 2,
      premium: 3
    };

    // console.log("packageLevels:",packageLevels[profile.package]);

    const checkPackage = (requiredPackage) => {

      const userPackage = profile.package;
      // console.log("userPackage:", packageLevels[userPackage]);
      // console.log("requiredPackage:", packageLevels[requiredPackage]);
      // console.log("check package conditions:", packageLevels[userPackage] >= packageLevels[requiredPackage]);

      return packageLevels[userPackage] >= packageLevels[requiredPackage];
    };

    return checkPackage(requiredUserPackage);
  };

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

  return (
    <div style={{}}>
      <div className="min-vh-100 d-flex align-items-center justify-content-center "
        style={{ background: darkMode ? profile.colors.dark : profile.colors.whiteFields }}
      >

        {/* Theme Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="btn d-flex align-items-center justify-content-center position-fixed top-0 end-0 z-3 rounded-circle shadow"
          style={{
            background: darkMode ? profile.colors.white : profile.colors.darkFields,
            color: darkMode ? profile.colors.darkFields : profile.colors.white,
            padding: "13px 13px",
            marginRight: "5px",
            marginTop: "5px",
          }}
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        <div
          className='d-flex flex-column'
          style={{
            width: "100%",
            maxWidth: "402px",
            gap: "16px",
            background: darkMode ? profile.colors.bdyColor : profile.colors.white,
            paddingTop: "0px",
            paddingBottom: "0px",
            color: darkMode ? profile.colors.white : profile.colors.primary,
          }}
        >
          <div className='position-relative w-100 h-auto'>
            <img src={profile.headerBgImage} alt='background' style={{ width: "100%", height: "auto" }} />


            <div className="d-flex gap-1 position-absolute" style={{ right: "17px", bottom: "9px", position: 'absolute', zIndex: "999" }}>
              {/* location button */}
              <a
                href={profile.contactData.location.link}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded d-flex align-items-center justify-content-center"
                style={{
                  padding: "6px",
                  background: profile.colors.Primery,
                  color: profile.colors.white,
                }}
              >
                <MapPin size={20} />
              </a>
              {/* QR button */}
              <button
                className="rounded d-flex align-items-center justify-content-center border-0"
                style={{
                  padding: "6px",
                  background: profile.colors.Primery,
                  color: profile.colors.white,
                }}
                onClick={openUPI}
              >
                <IndianRupee size={20} />
              </button>
              {/* brosher button */}
              {checkUserPackage("premium") && (
                <button
                  className="rounded d-flex align-items-center justify-content-center border-0"
                  style={{
                    padding: "6px",
                    background: profile.colors.Primery,
                    color: profile.colors.white,
                  }}
                  onClick={""}
                >
                  <Download size={20} />
                </button>
              )}
            </div>


          </div>
          <div
            style={{
              padding: "0 16px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div
              className="w-100 d-flex"
              style={{
                marginTop: "-55px",
                position: "relative",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <div style={{
                width: "clamp(90px, 30vw, 120px)",
                height: "clamp(90px, 30vw, 120px)",
                borderRadius: "50%",
                overflow: "hidden",
                border: `3px solid ${profile.colors.Primery}`,
                flexShrink: 0
              }}>
                <img
                  src={profile.profileImage}
                  alt={profile.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
              </div>
              <div>
                <h4
                  className="fw-bold"
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    marginTop: "40px",
                    color: darkMode ? profile.colors.white : profile.colors.black,
                  }}
                >
                  {profile.name}
                </h4>

                <p style={{ color: darkMode ? profile.colors.white : profile.colors.black }}>
                  {profile.title}

                  {profile.title !== "" && profile.designation && (
                    <span> / </span>
                  )}

                  {profile.designation}
                </p>
              </div>
            </div>
          </div>

          {/* social media icons */}
          <div className='d-flex flex-column' style={{ padding: "0 16px", gap: "15px", }}>
            <ul style={{ gap: "17px", }} className='d-flex flex-wrap'>
              {profile.link.map((item, index) => {
                const Icon = iconMap[item.name];
                return (
                  <li className='d-flex align-items-center justify-content-center' style={{ width: "37px", height: "37px" }}>
                    <a key={index} href={item.url} target="_blank" rel="noopener noreferrer"
                      className='d-flex align-items-center justify-content-center'
                      style={{
                        background: darkMode ? profile.colors.black : profile.colors.Secondery,
                        color: darkMode ? profile.colors.white : profile.colors.primary,
                        // border: `solid 1px ${darkMode ? profile.colors.white : profile.colors.whiteBorder}`,
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
            <div className='d-flex flex-column gap-2'>
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
                  fontSize: "16px",
                  lineHeight: "27px",
                  opacity: "0.7",
                  fontWeight: 400,
                  margin: 0,
                  color: darkMode ? profile.colors.white : profile.colors.black,
                }}
              >
                {profile.AboutContent}
              </p>
            </div>

            {/* tabs */}
            <style>
              {`
.nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active{background:transparent;}
.nav-tabs{gap:10px; margin: 0 0 13px !important; border-radius:6px;}
.nav-item{
  button {padding:0; border:none !important; background:transparent;
  .tab-block{padding: 7px 12px !important;
            background: profile.colors.tabBackground;

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
            
            <div>
              {/* to show premium cardc data and grid services */}
              {checkUserPackage("premium") && (
                <div>
                  {profile.tabs?.length > 0 && (
                    <Container style={{ padding: 0 }}>
                      <Tabs
                        activeKey={activeTab}
                        onSelect={(k) => setActiveTab(k)}
                        style={{
                          border: "none",
                        }}
                        className="border-0 m-0 p-0"
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
                                      ? (darkMode ? profile.colors.tabBackground : profile.colors.tabBackground)
                                      : (darkMode ? profile.colors.deactiveTabs : profile.colors.decativeWhite),

                                  color:
                                    activeTab === tab.tabName
                                      ? (darkMode ? profile.colors.white : profile.colors.Primery)
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
                              {tab.tabName === "Service" && (
                                <div className="d-flex flex-column gap-3">
                                  {tab.items?.map((item, itemIndex) => (
                                    <div
                                      key={itemIndex}
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 15,
                                        padding: "10px 9px",
                                        border: `solid 1px ${darkMode ? profile.colors.white : profile.colors.whiteBorder}`,
                                        borderRadius: "6px",
                                        background: darkMode ? profile.colors.darkFields : profile.colors.whiteFields
                                      }}
                                    >
                                      <div style={{ width: "100%", maxWidth: "101px", maxHeight: "100%", flexShrink: "0", borderRadius: "6px", overflow: "hidden" }}>
                                        <img className='img-fluid'
                                          src={item.image || "https://picsum.photos/300/200"}
                                          alt={item.title}
                                          style={{
                                            // width: "100%",
                                            // height: "100%",
                                            // objectFit: "cover",
                                            // flexShrink: 0,
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
                              )}
                              {(tab.tabName === "Gallery" || tab.tabName === "Portfolio") && (
                                <div
                                  style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(2, 1fr)",
                                    gap: "10px",

                                  }}
                                >
                                  {tab.items?.map((item, index) => (
                                    <div
                                      key={index}
                                      style={{
                                        borderRadius: "6px",
                                        overflow: "hidden",
                                        position: "relative",
                                        border: `1px solid ${darkMode ? profile.colors.darkBorder : profile.colors.whiteBorder}`
                                      }}
                                    >

                                      <img
                                        src={item.image}
                                        alt={item.altTab}
                                        style={{
                                          width: "100%",
                                          height: "150px",
                                          objectFit: "cover"
                                        }}
                                      />

                                      {/* Gradient overlay */}
                                      {tab.tabName === "Portfolio" && (
                                        <div
                                          style={{
                                            position: "absolute",
                                            bottom: 0,
                                            left: 0,
                                            width: "100%",
                                            height: "100%",
                                            background: profile.colors.GredientOne,
                                            pointerEvents: "none"
                                          }}
                                        />
                                      )}

                                      <p
                                        style={
                                          tab.tabName === "Portfolio"
                                            ? {
                                              margin: 0,
                                              padding: 0,
                                              fontSize: "13px",
                                              textAlign: "center",
                                              position: "absolute",
                                              color: profile.colors.white,
                                              lineHeight: "100%",
                                              left: "11px",
                                              bottom: "20px",
                                              fontWeight: 500
                                            }
                                            : tab.tabName === "Gallery"
                                              ? {
                                                position: "absolute",
                                                bottom: "10px",
                                                left: 0,
                                                width: "100%",
                                                color: profile.colors.white,
                                                fontSize: "12px",
                                                textAlign: "center",
                                                margin: 0,
                                                opacity: 0,
                                                transition: "opacity 0.3s"
                                              }
                                              : {}
                                        }
                                        className={tab.tabName === "Gallery" ? "gallery-hover-text" : ""}
                                      >
                                        {item.altTab}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </Tab>
                        ))}
                      </Tabs>
                    </Container>
                  )}
                </div>
              )}

              {/* to show regular & basic services */}
              {(profile.package === "regular" || profile.package === "basic") && (
                <div className='d-flex flex-column gap-2'>
                  <h4
                    style={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: darkMode ? profile.colors.white : profile.colors.dark,
                      lineHeight: "27px"
                    }}
                  >
                    Services
                  </h4>

                  {/* check if package is premium & regular to render this */}
                  {/* {checkUserPackage("regular") && ( */}
                  <div
                    className="d-flex flex-wrap"
                    style={{
                      gap: "15px",
                      justifyContent: "start"
                    }}
                  >
                    {profile.servicesData.map((service, i) => {
                      const IconComponent = Icons[service.icon];
                      const total = profile.servicesData.length;

                      // Determine the width based on the total items
                      let cardWidth = "calc(33.333% - 10px)"; // Default to 3 items per row

                      if (total === 2) {
                        cardWidth = "calc(50% - 7.5px)";
                      } else if (total === 4) {
                        cardWidth = "calc(50% - 7.5px)";
                      } else if (total === 5) {
                        if (i < 3) cardWidth = "calc(33.333% - 10px)"; // First 3 items
                        else cardWidth = "calc(33.333% - 10px)"; // Last 2 items
                      }

                      return (
                        <div key={i} style={{ width: cardWidth }}>
                          <div
                            className="p-3 h-100 text-center rounded d-flex gap-2 flex-column align-items-center justify-content-center"
                            style={{ background: profile.colors.trinery }}
                          >
                            <div
                              style={{
                                color: profile.colors.Primery,
                              }}
                            >
                              {IconComponent && <IconComponent size={44} />}
                            </div>
                            <h6
                              style={{
                                fontSize: "14px",
                                opacity: "0.7",
                                color: darkMode ? profile.colors.white : profile.colors.black
                              }}
                            >{service.title}</h6>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  {/* )} */}
                </div>
              )}
            </div>

            {/* Gallery */}
            {(profile.package === "basic" || profile.package === "regular") && (
              <div
                className="d-flex flex-column gap-2"
                style={{
                  overflow: "hidden",
                  width: "100%"
                }}
              >
                <h4
                  style={{
                    fontSize: "18px",
                    fontWeight: 600,
                    color: darkMode ? profile.colors.white : profile.colors.dark,
                    lineHeight: "27px"
                  }}
                >
                  Gallery
                </h4>
                <GallerySlider slideData={profile.gallerySlider} />
              </div>
            )}

            {/* testimonial carousal */}
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

            {checkUserPackage("regular") && (
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
                  <a
                    href={profile.reviewLink}
                    target='_blank'
                    style={{
                      color: darkMode ? profile.colors.white : profile.colors.primary
                    }}
                  >View All</a>
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
                                <h5 style={{ fontSize: "13px", margin: "0", color: profile.colors.white, color: darkMode ? profile.colors.white : profile.colors.black, opacity: darkMode ? "0.7" : "1" }}>
                                  {item.name}
                                </h5>

                                <p style={{ fontSize: "12px", margin: 0, fontWeight: "400", lineHeight: "16px", color: profile.colors.darkFields, color: darkMode ? profile.colors.white : profile.colors.black, opacity: darkMode ? "0.7" : "1" }}>
                                  {item.designation}
                                </p>
                              </div>
                            </div>
                            <p
                              style={{
                                fontSize: "12px",
                                color: profile.colors.black,
                                marginTop: "20px",
                                fontWeight: "400",
                                lineHeight: "18px",
                                opacity: darkMode ? "0.7" : "1",
                                color: darkMode ? profile.colors.white : profile.colors.black,
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
                        backgroundColor:
                          index === i
                            ? (darkMode ? profile.colors.white : profile.colors.black)
                            : (darkMode ? profile.colors.black : profile.colors.servBack),
                        cursor: "pointer"
                      }}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Inquiry div (form) */}
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
            {checkUserPackage("regular") && (
              <div className='d-flex flex-column gap-2'>
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
                        className={`form-control ${darkMode ? "dark-placeholder" : profile.colors.black}`}
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
                        className={`form-control ${darkMode ? "dark-placeholder" : profile.colors.black}`}
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
                        className={`form-control ${darkMode ? "dark-placeholder" : profile.colors.dark}`}
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
                          color: profile.colors.white,
                          background: darkMode ? profile.colors.darkFields : profile.colors.Primery,
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

              </div>


            )}

            {/* Contact me */}
            <ContactSection
              profile={profile}
              darkMode={darkMode}
            />

            {/* map div */}
            <div>
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
            </div>
          </div>

          {/* bottom sticky buttons group */}
          <StickyFooter
            profile={profile}
            isMobile={isMobile}
            darkMode={darkMode}
            whatsappNumber={whatsappNumber}
            saveContact={saveContact}
            openQR={openQR}
          />
        </div>
      </div>
    </div>
  )
}

export default Premium1;
