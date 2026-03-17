import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../styles/HeroSection.scss";
import "../styles/TextType.scss";
import HImg from "../assets/images/header_img.png";
import imgOne from "../assets/images/hero-barcode.svg";
import imgTwo from "../assets/images/hero-employee.png";
import imgThr from "../assets/images/social-media.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import MobileIcon from "../assets/images/smartphone.svg";

import arrowOne from "../assets/images/search-samll.svg";
import StatCard from "./StartCard";
import ShinyText from "./ShinyText";
import ButtonCall from "./ButtonCall";
import TextType from "./TextType";
const HeroSection = () => {
  return (
    <section id="home" className="hero-section">
      <Container>
        <Row className="align-items-center my-6 home-text-wrap">

          {/* HERO TEXT */}
          <Col md={6}>
            <div className="hero-1-txt d-flex flex-column gap-3 align-items-start">

              {/* Title */}
              <h1 className="fw-bold display-5">
                <span className="small-text">Turn Your Visiting Card Into</span><br /> <ShinyText
                  text="Smart Digital Identity"
                  speed={2}
                  delay={0}
                  color="#022B5B"
                  shineColor="#2386f4"
                  spread={100}
                  direction="left"
                  yoyo={false}
                  pauseOnHover={false}
                  disabled={false}
                />
                {" "}
                {/* <img
                  src={MobileIcon}
                  alt="Mobile icon"
                  className="title-icon"
                /> */}
              </h1>

              {/* Description */}
              <p className="lead text-black">
                Share your contact, WhatsApp, website & location with just one link
              </p>

              {/* Button */}
              {/* <Button
                href="#demo"
                variant="primary"
                className="mb-3 btn--theme butt-hero"
              >
                View Demo
              </Button> */}

              <div className='type-txt'>
                <img src={arrowOne} alt="search" className="d-none d-sm-block"/>
                <div className="typing-wrapper">
                  {/* Faded Background Text */}
                  <span className="fade-text">
                    www.webiquecard.in/businessname
                  </span>

                  {/* Typing Text Over It */}
                  <TextType
                    text={["www.webiquecard.in/businessname"]}
                    typingSpeed={75}
                    pauseDuration={2500}
                    showCursor
                    cursorCharacter=""
                    deletingSpeed={50}
                    variableSpeedEnabled={false}
                  />
                </div>
              </div>

              {/* <ButtonCall
                className='hero-btn'
                disabled="#demo"
                // label="www.webiquecard.in/businessname"
                label={
                  <>
                    <TextType
                      text={["www.webiquecard.in/businessname"]}
                      typingSpeed={75}
                      pauseDuration={1500}
                      showCursor
                      cursorCharacter="_"
                      texts={["www.webiquecard.in/businessname"]}
                      deletingSpeed={50}
                      variableSpeedEnabled={false}
                      variableSpeedMin={60}
                      variableSpeedMax={120}
                      cursorBlinkDuration={0.5}
                    />

                  </>
                }
                icon={arrowOne}
              /> */}

              {/* Trial Text */}
              {/* <p className="small text-white">
                ✓ No credit card needed, free 14-day trial
              </p> */}

            </div>
          </Col>

          {/* HERO IMAGE */}
          <Col md={6} className="mt-4 mt-lg-0">
            <div className="hero-1-img text-center position-relative">
              <img src={imgOne} alt="img" className="img-one" />
              <img src={imgTwo} alt="img" className="img-two" />
              <img src={imgThr} alt="img" className="img-thr" />
              <StatCard />
              <img
                src={HImg}
                alt="hero"
                className="img-fluid"
              />
            </div>
          </Col>

        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;