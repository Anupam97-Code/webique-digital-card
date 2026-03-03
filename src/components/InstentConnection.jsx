import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/InstentConnection.scss"; // optional if using custom styles
import icnOne from "../assets/images/step-1.svg";
import icnTwo from "../assets/images/step-2.svg"
import icnThr from "../assets/images/step-3.svg"
import icnFvr from "../assets/images/step-4.svg"
import featureImg from "../assets/images/mobile-phones.png"
const InstentConnection = () => {
  // ✅ JSON inside component
  const featuresData = {
    image: featureImg,
    features: [
      {
        id: 1,
        title: "Doctors",
        list: [
          "Share clinic location instantly",
          "Add appointment WhatsApp button",
          "Display timings & services",
          "Add Google Reviews link",
        ],
      },
      {
        id: 2,
        title: "Real Estate Agents",
        list: [
          "Share clinic location instantly",
          "Add appointment WhatsApp button",
          "Display timings & services",
          "Add Google Reviews link",
        ],
      },
      {
        id: 3,
        title: "CA / Consultants",
        list: [
          "Share clinic location instantly",
          "Add appointment WhatsApp button",
          "Display timings & services",
          "Add Google Reviews link",
        ],
      },
      {
        id: 4,
        title: "Builders",
        list: [
          "Share clinic location instantly",
          "Add appointment WhatsApp button",
          "Display timings & services",
          "Add Google Reviews link",
        ],
      },
      {
        id: 5,
        title: "Doctors",
        list: [
          "Share clinic location instantly",
          "Add appointment WhatsApp button",
          "Display timings & services",
          "Add Google Reviews link",
        ],
      },
      {
        id: 6,
        title: "Real Estate Agents",
        list: [
          "Share clinic location instantly",
          "Add appointment WhatsApp button",
          "Display timings & services",
          "Add Google Reviews link",
        ],
      },
      {
        id: 7,
        title: "Doctors",
        list: [
          "Share clinic location instantly",
          "Add appointment WhatsApp button",
          "Display timings & services",
          "Add Google Reviews link",
        ],
      },
      {
        id: 8,
        title: "Real Estate Agents",
        list: [
          "Share clinic location instantly",
          "Add appointment WhatsApp button",
          "Display timings & services",
          "Add Google Reviews link",
        ],
      },

      {
        id: 9,
        title: "Doctors",
        list: [
          "Share clinic location instantly",
          "Add appointment WhatsApp button",
          "Display timings & services",
          "Add Google Reviews link",
        ],
      },
      {
        id: 10,
        title: "Real Estate Agents",
        list: [
          "Share clinic location instantly",
          "Add appointment WhatsApp button",
          "Display timings & services",
          "Add Google Reviews link",
        ],
      },
      {
        id: 11,
        title: "Doctors",
        list: [
          "Share clinic location instantly",
          "Add appointment WhatsApp button",
          "Display timings & services",
          "Add Google Reviews link",
        ],
      },
      {
        id: 12,
        title: "Real Estate Agents",
        list: [
          "Share clinic location instantly",
          "Add appointment WhatsApp button",
          "Display timings & services",
          "Add Google Reviews link",
        ],
      },
    ],
  };

  return (
    <section id="process" className="bg-white features-section">
      <Container className="position-relative z-2">
        <Row className="align-items-center">

          <Col sm={12}>
            <div class="row w-100 w-md-100 text-center mb-5">
              <h2 class="section-heading">Your business. One link.<br /> Instant connection.</h2> 
            </div>
          </Col>


          <div className="row scroll-wrap">

            {/* LEFT IMAGE */}
            <Col md={6} className="image-sticky">
              <div className="image-sticky">
                <div className="features-img wow perch-fadeInLeft fadeInLeft">
                  <img
                    src={featuresData.image}
                    alt="feature"
                    className="img-fluid"
                  />
                </div>
              </div>
            </Col>


            {/* RIGHT FEATURES */}
            <Col md={6} className="is-dg-column">
              <Row>

                {featuresData.features.map((feature) => {

                  const IconComponent = feature.icon;
                  return (
                    <Col xl={12} xxl={6} key={feature.id} className="mb-4">
                      <div className="wow perch-fadeInUp fadeInUp fbox-5">
                        <div className="fbox grey-color-box position-relative">
                          <div className="fbox-4-txt">
                            <h5>{feature.title}</h5>

                            <ul className="feature-list-two">
                              {feature.list.map((item, index) => (
                                <li key={index}>{item}</li>
                              ))}
                            </ul>

                          </div>
                        </div>
                      </div>
                    </Col>
                  )
                })}

              </Row>
            </Col>



          </div>




        </Row>
      </Container>
    </section>
  );
};

export default InstentConnection;