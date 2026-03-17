import React from "react";
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from "lucide-react";

const ContactSection = ({ profile, darkMode }) => {

  // make for contact data 
  const ActionItem = ({ icon, title, subtitle, href }) => {

    const values = Array.isArray(subtitle) ? subtitle : [subtitle];
    const isSingle = values.length === 1;
    const isExternal = href?.startsWith("http");

    const Wrapper = isSingle ? "a" : "div";

    const wrapperProps = isSingle
      ? {
        href: href,
        target: isExternal ? "_blank" : "_self",
        rel: isExternal ? "noopener noreferrer" : ""
      }
      : {};

    return (
      <Wrapper
        {...wrapperProps}
        className="w-100 d-flex align-items-center justify-content-between text-decoration-none p-2 border"
        style={{
          backgroundColor: darkMode ? profile.colors.darkCardBg : profile.colors.trinery,
          color: darkMode ? profile.colors.white : profile.colors.black,
          borderRadius: "4px"
        }}
      >
        <div className="d-flex gap-3">

          {/* Icon */}
          <div
            className="d-flex align-items-center justify-content-center rounded-3"
            style={{
              width: "42px",
              height: "42px",
              background: darkMode ? profile.colors.dark : profile.colors.white,
              color: profile.colors.Primery,
              flexShrink: "0",
            }}
          >
            {icon}
          </div>

          {/* Text */}
          <div
            className="d-flex align-items-start flex-column"
          >

            {/* show title only when single value */}
            {isSingle && (
              <div className="fw-semibold">{title}</div>
            )}

            {/* Single value */}
            {isSingle && (
              <small className="text-start" style={{
                opacity: 0.7,
                wordBreak: title === "Email" ? "break-all" : ""
              }}>
                {values[0]}
              </small>
            )}

            {/* Multiple values */}
            {!isSingle &&
              values.map((val, i) => (
                <a
                  key={i}
                  href={
                    href?.startsWith("mailto")
                      ? `mailto:${val}`
                      : href?.startsWith("tel")
                        ? `tel:${val}`
                        : href
                  }
                  style={{
                    display: "block",
                    opacity: 0.7,
                    textDecoration: "none",
                    color: "inherit",
                    wordBreak: title === "Email" ? "break-all" : ""
                  }}
                >
                  {val}
                </a>
              ))
            }

          </div>

        </div>

        <div className="flex-shrink-0">
          <ArrowUpRight size={18} style={{ opacity: 0.5 }} />
        </div>

      </Wrapper>
    );
  };

  return (
    <div className="d-flex flex-column gap-2">
      <h4
        style={{
          fontSize: "18px",
          fontWeight: 600,
          color: darkMode ? profile.colors.white : profile.colors.black,
          lineHeight: "27px",
        }}
      >
        Contact Me
      </h4>

      <div className="d-flex flex-column gap-3 align-items-center justify-content-center">

        {/* Call */}
        <ActionItem
          icon={
            <div
              className="d-flex align-items-center justify-content-center rounded-3"
              style={{
                width: "42px",
                height: "42px",
                background: darkMode ? profile.colors.dark : profile.colors.white,
                color: profile.colors.Primery,
              }}
            >
              <Phone size={18} />
            </div>
          }
          title="Call Me"
          subtitle={profile.contactData?.phone_Number}
          href={`tel:${profile.contactData?.phone_Number?.[0]}`}
        />

        {/* Email */}
        <ActionItem
          icon={
            <div
              className="d-flex align-items-center justify-content-center rounded-3"
              style={{
                width: "42px",
                height: "42px",
                background: darkMode ? profile.colors.dark : profile.colors.white,
                color: profile.colors.Primery,
              }}
            >
              <Mail size={18} />
            </div>
          }
          title="Email"
          subtitle={profile.contactData.mail}
          href={`mailto:${profile.contactData.mail}`}
        />

        {/* Location */}
        <ActionItem
          icon={
            <div
              className="d-flex align-items-center justify-content-center rounded-3"
              style={{
                width: "42px",
                height: "42px",
                background: darkMode ? profile.colors.dark : profile.colors.white,
                color: profile.colors.Primery,
              }}
            >
              <MapPin size={18} />
            </div>
          }
          title="Location"
          subtitle={profile.contactData.location.address}
          href={profile.contactData.location.link}
        />

        {/* Opening Hours */}
        <div
          className="w-100 d-flex align-items-start justify-content-between p-2 border"
          style={{
            backgroundColor: darkMode
              ? profile.colors.darkCardBg
              : profile.colors.trinery,
            color: darkMode ? profile.colors.white : profile.colors.black,
            borderRadius: "4px",
          }}
        >
          <div className="w-100 d-flex align-items-start gap-3">
            <div
              className="d-flex align-items-center justify-content-center rounded-3"
              style={{
                width: "42px",
                height: "42px",
                background: darkMode ? profile.colors.dark : profile.colors.white,
                color: profile.colors.Primery,
                flexShrink: "0"
              }}
            >
              <Clock size={18} />
            </div>

            <div className="w-100">
              <h6
                className="fw-bold"
                style={{
                  margin: "0 0 5px",
                  color: darkMode ? profile.colors.white : profile.colors.black,
                }}
              >
                Opening Hours
              </h6>

              <div className="d-flex flex-column gap-1">
                {profile.openingHours?.map((day, i) => (
                  <div
                    key={i}
                    className="d-flex justify-content-between"
                    style={{
                      fontSize: "14px",
                      opacity: 0.7,
                    }}
                  >
                    <span >{day.dayName}</span>
                    <span>{day.ocTime}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;