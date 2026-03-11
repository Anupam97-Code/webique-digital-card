import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/FeaturesSection.scss"; // optional if using custom styles
import icnOne from "../assets/images/step-1.svg";
import icnTwo from "../assets/images/step-2.svg"
import icnThr from "../assets/images/step-3.svg"
import icnFvr from "../assets/images/step-4.svg"
import featureImg from "../assets/images/cards.gif"
import { BlurText } from "./shared/TextAnimation";
const FeaturesSection = () => {
  // ✅ JSON inside component
  const featuresData = {
    image: featureImg,
    features: [
      {
        id: 1,
        nmb: "01",
        icon: icnOne,
        title: "Share Your Details",
        text: "Send us your contact information and business details.",
      },
      {
        id: 2,
        nmb: "02",
        icon: icnTwo,
        title: "We Design Your Card",
        text: "Our team creates a professional digital card for you.",
      },
      {
        id: 3,
        nmb: "03",
        icon: icnThr,
        title: "Get Your Link & QR Code",
        text: "Receive your personal link and scannable QR.",
      },
      {
        id: 4,
        nmb: "04",
        icon: icnFvr,
        title: "Start Sharing",
        text: "Share it instantly with clients anytime, anywhere.",
      },
    ],
  };

  return (
    <section id="process" className="bg-white features-section-top section-padding">
      <Container className="position-relative z-2">
        <Row className="align-items-center">
          {/* LEFT IMAGE */}
          <Col md={12} lg={6} >
            <div className="mb-0 mb-md-4">
              <p>Product by Webique Technology</p>
              <h2 class="section-heading">
                <BlurText
                  text="4 Simple Steps to Get Your Digital Card"
                  delay={100}
                  animateBy="words"
                  direction="bottom"
                />
              </h2>

            </div>

            <div className="features-img wow perch-fadeInLeft fadeInLeft d-none d-lg-block">
              <img
                src={featuresData.image}
                alt="feature"
                className="img-fluid"
                style={{
                  width: "90%"
                }}
              />
            </div>
          </Col>


          {/* RIGHT FEATURES */}
          <Col md={12} lg={6} >
            <Row>
              {featuresData.features.map((feature) => {
                const IconComponent = feature.icon;
                return (
                  <Col md={6} xl={6} xxl={6} key={feature.id} className="mb-md-4 mt-4  mt-md-0 mt-lg-0">
                    <div className="wow perch-fadeInUp fadeInUp fbox-4">
                      <div className="fbox grey-color-box position-relative">

                        {/* Icon */}
                        <div className="grey-color-icon b-icon box-icon-md">
                          <img src={feature.icon} className="feature-icons" alt="icn" />
                        </div>

                        <div className="position-absolute abs-number">
                          {feature.nmb}
                        </div>

                        {/* Text */}
                        <div className="fbox-4-txt">
                          <h5>{feature.title}</h5>
                          <p className="grey-color">{feature.text}</p>
                        </div>

                      </div>
                    </div>
                  </Col>
                )
              })}

            </Row>
          </Col>

        </Row>
      </Container>
    </section>
  );
};

export default FeaturesSection;