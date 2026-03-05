import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/CTAsection.scss"

// Import your images
import Tool1 from "../assets/images/png_icons/feature-1.svg";
import Tool2 from "../assets/images/png_icons/feature-2.svg";
import Tool3 from "../assets/images/png_icons/feature-3.svg";
import Tool4 from "../assets/images/png_icons/feature-4.svg";
import Tool5 from "../assets/images/png_icons/feature-5.svg";
import Tool6 from "../assets/images/png_icons/feature-6.svg";
import Tool7 from "../assets/images/png_icons/feature-7.svg";
import Tool8 from "../assets/images/png_icons/feature-8.svg";
import Tool9 from "../assets/images/png_icons/feature-9.svg";
import { BlurText } from "./shared/TextAnimation";

const AnutomateSection = () => {

  // ✅ JSON Data inside component
  const integrationsData = {
    title: "Smart Features for Smart Business Owners",
    // subtitle: "",
    buttonLink: "/integrations",
    tools: [
      { id: 1, name: "Instant Call Access", desc: "Connect with clients in just one tap.", img: Tool1 },
      { id: 2, name: "Quick WhatsApp Chat", desc: "No need to save numbers first.", img: Tool2 },
      { id: 3, name: "Seamless Email Contact", desc: "Send emails instantly.", img: Tool3 },
      { id: 4, name: "Easy Navigation", desc: "Share your location easily.", img: Tool4 },
      { id: 5, name: "Website, Social  Links", desc: "Display all your social links in one place.", img: Tool5 },
      { id: 6, name: "Unlimited Sharing", desc: "Share your profile anywhere.", img: Tool6 },
      { id: 7, name: "Real-Time Updates", desc: "Update your details anytime.", img: Tool7 },
      { id: 8, name: "Products and Services", desc: "Show your services clearly.", img: Tool8 },
      { id: 9, name: "Enquiry Form", desc: "Simple and quick contact form.", img: Tool9 },
    ]
  };


  return (
    <section id="features" className="automate-section section-padding">
      <Container>

        {/* SECTION TITLE */}
        <Row className="justify-content-center text-center mb-3 mb-lg-5">
          <Col md={8}>



            <BlurText
              text={integrationsData.title}
              delay={100}
              animateBy="words"
              direction="bottom"
              className="justify-content-center  section-heading"
            />


            {/* <p className="s-21 color--grey mt-3">
                            {integrationsData.subtitle}
                        </p> */}
          </Col>
        </Row>

        {/* INTEGRATIONS GRID */}
        <Row xs={1} md={2} lg={3} className="g-3 g-md-4 integrations-1-wrapper">
          {integrationsData.tools.map((tool) => (
            <Col key={tool.id}>
              <div

                className="in_tool it-1 r-12 mb-30 wow fadeInUp rounded-3"
              >
                {/* Icon */}
                <div class="in_tool-logo-wrap">
                  <div class="in_tool-logo ico-60">
                    <img
                      src={tool.img}
                      alt={tool.name}
                      className="img-fluid"
                      style={{ maxHeight: "60px" }}
                    />
                  </div>
                </div>
                {/* Text */}
                <div className="in_tool-txt">
                  <h6 className="s-20 w-700 mb-2">{tool.name}</h6>
                  <p className="p-sm">
                    {tool.desc}
                  </p>
                </div>

              </div>
            </Col>
          ))}
        </Row>

        {/* MORE BUTTON */}


      </Container>
















      {/* <section id="integrations-1" className="py-100 integrations-section">
      <Container>
        

        <Row className="justify-content-center">
          <Col md={8}>
            <div className="section-title mb-70">
              <h2 className="s-50 w-700">{integrationsData.title}</h2>
              <p className="s-21 color--grey">{integrationsData.subtitle}</p>
            </div>
          </Col>
        </Row>

 
        <div className="integrations-1-wrapper">
          <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3 rows-2">
            {integrationsData.tools.map((tool) => (
              <Col key={tool.id}>
                <a
                  href="#"
                  className={`in_tool ${tool.class} r-12 mb-30`}
                >

                  <div className="in_tool-logo-wrap">
                    <div className="in_tool-logo ico-60">
                      <img
                        className="img-fluid"
                        src={tool.img}
                        alt={tool.name}
                      />
                    </div>
                  </div>

 
                  <div className="in_tool-txt">
                    <h6 className="s-20 w-700">{tool.name}</h6>
                    <p className="p-sm">{tool.desc}</p>
                  </div>
                </a>
              </Col>
            ))}
          </Row>
        </div>


        <Row>
          <Col>
            <div className="more-btn text-center mt-60">
              <a
                href={integrationsData.buttonLink}
                className="btn btn--tra-black hover--theme"
              >
                {integrationsData.buttonText}
              </a>
            </div>
          </Col>
        </Row>

      </Container>
    </section> */}

    </section>


  );
};

export default AnutomateSection;