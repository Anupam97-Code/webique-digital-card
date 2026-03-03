import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/CTAsection.scss"; // optional if using custom styles

const CTAsection = () => {

  // ✅ JSON Data inside component
  const bannerData = {
    title: "Starting with Martex is easy, fast and free",
    subtitle: "It only takes a few clicks to get started",
    buttonText: "Get started - it's free",
    buttonLink: "/signup",
    trialText: "Free for 14 days, no credit card required."
  };

  return (
    <section id="banner-3" className="banner-section">
      <Container>

        <div className="c-to-a  text-white rounded-4 text-center">
          <div className="banner-overlay">

            <Row className="justify-content-center">
              <Col>

                <div className="banner-3-txt">

                  {/* Title */}
                  <h2 className="fw-bold display-5">
                    {bannerData.title}
                  </h2>

                  {/* Subtitle */}
                  <p className="lead">
                    {bannerData.subtitle}
                  </p>

                  {/* Button */}
                  <Button
                    href={bannerData.buttonLink}
                    variant="light"
                    className="mb-3 ctoa-button"
                  >
                    {bannerData.buttonText}
                  </Button>

                  {/* Trial Text */}
                  <p className="small">
                    ✓ {bannerData.trialText}
                  </p>

                </div>

              </Col>
            </Row>

          </div>
        </div>

      </Container>
    </section>
  );
};

export default CTAsection;