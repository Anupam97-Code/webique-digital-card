import React, { useEffect, useMemo, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
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
  ArrowDownToLine,
  ScanQrCode,
  Download


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
      whatsapp: safeData.whatsapp || "+91 919860188007",
      title: safeData.title || "CEO & Founder",
      company: safeData.company || "Quantix",
      headerBgImage: safeData.headerBgImage,
      phone: safeData.phone || "+1-212-456-7890",
      profileImg: safeData.profileImg || "",
      email: safeData.email || "marcus.whitlow@gmail.com",
      address: safeData.address || "2093 Philadelphia Pike",
      servicesData: safeData.servicesData || "",
      link: safeData.link || [],
      AboutMe: safeData.AboutMe || "",
      reviewLink: safeData.reviewLink || "",
      colors: safeData.colors,
      AboutContent: safeData.AboutContent || "",
      package: safeData.package,
      profileImage:
        safeData.profileImage ||
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
      console.log("userPackage:", packageLevels[userPackage]);
      console.log("requiredPackage:", packageLevels[requiredPackage]);
      console.log("check package conditions:", packageLevels[userPackage] >= packageLevels[requiredPackage]);

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
          className="btn position-fixed top-0 end-0 z-3 rounded-circle shadow"
          style={{
            background: darkMode ? "rgb(255, 255, 255)" : "#1F2D3D",
            color: darkMode ? "#1F2D3D" : "#ffffff",
            padding: "5px 11px",
            marginRight: "5px",
            marginTop: "5px",
          }}
        >
          {darkMode ? <Sun size={13} /> : <Moon size={13} />}
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
            <img src={profile.headerBgImage} alt='background' style={{ width: "100%", height: "auto" }} />


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
              <div>
                <img
                  src={profile.profileImage}
                  alt={profile.name}
                  style={{
                    maxWidth: "120px",
                    maxHeight: "100%",
                    width: "100%",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "0px solid #f1f3f5",
                    transition: "0.3s",
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
                    color: darkMode ? "#fff" : "#000",
                  }}
                >
                  {profile.name}
                </h4>

                <p style={{ color: darkMode ? "#fff" : "#000" }}>
                  {profile.title}
                </p>
              </div>
            </div>
          </div>

          <div className='d-flex flex-column' style={{ padding: "0 16px", gap: "20px", }}>

            {/* social media icons */}




            <ul style={{ display: "flex", flexWrap: "wrap", gap: "17px", }}>
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
                                            background:
                                              "linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0) 92.11%)",
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
                                              color: "#fff",
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
                                                color: "#fff",
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
                // <div className='d-flex flex-column gap-2'>
                //   <h4
                //     style={{
                //       fontSize: "18px",
                //       fontWeight: 600,
                //       color: darkMode ? profile.colors.white : profile.colors.dark,

                //       lineHeight: "27px"

                //     }}
                //   >
                //     Services
                //   </h4>
                //   {profile.tabs.slice(0, 1).map((value, i) => {
                //     return (
                //       <ul className='d-flex flex-wrap align-items-center gap-2 justify-content-start' key={index}>
                //         {value.items.map((item, index) => (
                //           <li
                //             style={{
                //               background: profile.colors.whiteBorder,
                //               padding: "7px 11px 7px",
                //               borderRadius: "55px"
                //             }}
                //           >
                //             {item.title}
                //           </li>
                //         ))}
                //       </ul>
                //     )
                //   })}
                // </div>

                <div className='d-flex flex-column gap-2'>
                  <h4
                    style={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: darkMode ? profile.colors.white : profile.colors.dark,

                      lineHeight: "27px"

                    }}
                  >
                    Servicess
                  </h4>



                  <ul className="d-flex flex-wrap align-items-center gap-2 justify-content-start">
                    {profile.servicesData.map((service, index) => (
                      <li
                        key={index}
                        style={{
                          background: profile.colors.whiteBorder,
                          padding: "7px 11px",
                          borderRadius: "55px"
                        }}
                      >
                        {service}
                      </li>
                    ))}
                  </ul>



                </div>

              )}
            </div>

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
            {(profile.package === "regular" || profile.package === "premium") && (
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

                  <a href={profile.reviewLink} target='_blank'
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

            )}
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


            {(profile.package === "regular" || profile.package === "premium") && (

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


            )}





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
                                  wordBreak: "break-all",
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
                              wordBreak: "break-all",
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
            {profile.package === "premium" && (
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
            )}

          </div>

          <div className='position-sticky bottom-0 left-0 w-100%' style={{ height: "auto" }}>

            {/* Sticky Footer Buttons */}
            <div
              className="position-sticky w-100"
              style={{ bottom: "0" }}
            >
              <div className="w-100 p-0 gap-0 d-flex align-items-center justify-content-center">
                {/* whatsapp button */}
                <div
                  // xs={4}
                  className="p-0 d-flex justify-content-center align-items-center p-2 flex-shrink-0"
                  style={{
                    background: profile.colors.stickyLink1,
                    width: isMobile ? "33.33%" : "33.33%",

                  }}>
                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="d-flex gap-1  align-items-center flex-column justify-content-center text-decoration-none"
                    style={{
                      color: profile.colors.white,
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
                      <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                    </svg>
                    <p style={{ color: profile.colors.white, fontSize: "12px", lineHeight: "1" }} className="m-0">Whatsapp</p>
                  </a>
                </div>
                {/* QR button */}
                <div
                  // xs={4}
                  className="p-0 d-flex justify-content-center align-items-center p-2 flex-shrink-0"
                  style={{
                    background: profile.colors.stickyLink2,
                    width: isMobile ? "33.33%" : "33.33%",

                  }}
                >
                  <button
                    onClick={openQR}
                    className="d-flex gap-1 align-items-center flex-column justify-content-center border-0"
                    style={{
                      background: profile.colors.stickyLink2,
                      color: profile.colors.white,
                    }}
                  >
                    <ScanQrCode size={24} />
                    <p style={{ color: profile.colors.white, fontSize: "12px", lineHeight: "1" }} className="m-0">Scan QR</p>
                  </button>
                </div>
                {/* save contact button */}
                <div
                  // xs={4}
                  className="p-0 d-flex justify-content-center align-items-center p-2 flex-shrink-0"
                  style={{
                    background: profile.colors.stickyLink3,
                    width: isMobile ? "33.33%" : "33.33%",

                  }}
                >
                  <button
                    onClick={saveContact}
                    className="d-flex gap-1 align-items-center flex-column justify-content-center shadow border-0"
                    style={{
                      background: profile.colors.stickyLink3,
                      color: profile.colors.white,
                    }}
                  >
                    <Download size={24} />
                    <p style={{ color: profile.colors.white, fontSize: "12px", lineHeight: "1" }} className="m-0">Save contact</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Premium1;
