import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Img09 from "../assets/images/img-09.png"; // adjust path if needed
import "../styles/ContentSection.scss"

const ContentSection = () => {

  // ✅ JSON Data inside component
  const sectionData = {
    image: Img09,
    steps: [
      {
        id: 1,
        title: "What Is Digital Visiting Card?",
        description:
          "A Digital Visiting Card is an online version of a business card that replaces traditional paper cards with a single link or QR code. When someone opens it, they can instantly call you, message you on WhatsApp, save your contact number, visit your website, or get your location—all in one convenient place",
        // list: [
        //   "Call you",
        //   "WhatsApp you",
        //   "Save your number",
        //   "Visit your website",
        //   "Get your location"
        // ],
        // afterListText: "All in one place"
      },
      {
        id: 2,
        title: "Why Switch to Digital Card?",
        list: [
          "Always saved in phone",
          "Share anytime on WhatsApp",
          "Add unlimited details "
        ]
      }
    ]
  };

  return (
    <section className=" content-section">
      <Container>
        <Row className="align-items-center">

          {/* IMAGE BLOCK */}
          <Col md={6}>
            <div className="img-block left-column text-center">
              <img
                src={sectionData.image}
                alt="content"
                className="img-fluid"
              />
            </div>
          </Col>

          {/* TEXT BLOCK */}
          <Col md={6}>
            <div className="txt-block right-column">

              {sectionData.steps.map((step, index) => (
                <div className="cbox-2 process-step" key={step.id}>

                  {/* Number + Line */}
                  <div className="ico-wrap">
                    <div
                      className="rounded-circle  text-white d-flex align-items-center justify-content-center"

                    >
                      {step.id}
                    </div>

                    {/* Line (hide on last item) */}
                    {/* {index !== sectionData.steps.length - 1 && (
                      <div className="cbox-2-line" />
                    )} */}
                    <div className="cbox-2-line" />
                  </div>

                  {/* Text */}
                  <div className="cbox-2-txt">
                    <h5 className="fw-bold mb-4">{step.title}</h5>
                    <p className={index === 2 ? "mb-0" : ""}>
                      {step.description}
                    </p>

                    {step.list && (
                      <ul className="content-lst">
                        {step.list.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    )}
                    {step.afterListText && (
                      <p className="mt-3">{step.afterListText}</p>
                    )}
                  </div>

                </div>
              ))}

            </div>
          </Col>

        </Row>
      </Container>
    </section>
  );
};

export default ContentSection;