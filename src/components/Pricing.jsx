import { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../styles/PricingSection.scss";
import { GoCheckCircle } from "react-icons/go";
import priceIcnOne from '../assets/images/price-1.svg'
import priceIcnTwo from '../assets/images/price-2.svg'
import priceIcnThr from '../assets/images/price-3.svg'
import { BlurText } from "./shared/TextAnimation";
const Pricing = () => {
  const [planType, setPlanType] = useState("monthly");

  const pricingData = {
    title: "Simple, Flexible Pricing",

    monthly: [
      {
        title: "Regular",
        icn: priceIcnOne,
        currency: "₹",
        price: "100",
        duration: "/Monthly",
        features: [
          "Profile Photo",
          "Name & Designation",
          "Call Button",
          "WhatsApp Button",
          "Google Map Location",
          "Up to 5 Social Media Links",
          "Save Contact Button (.vcf Download)",

        ]
      },
      {
        title: "Special",
        icn: priceIcnTwo,
        tag: "Popular",
        currency: "₹",
        price: "150",
        duration: "/Monthly",
        bgColor: "#F0F7FF",
        features: [
          "Everything in Basic Package",
          "Services Section",
          "Image Gallery",
          "Card Share Button",
          "Card QR Code",
          "Google Review Direct Link",



        ]
      },
      {
        title: "Premium",
        icn: priceIcnThr,
        currency: "₹",
        price: "200",
        duration: "/Monthly",
        features: [
          "Everything in Special Package",
          "Payment QR (UPI / Bank Details)",
          "Brochure PDF Download Option",

          "Inquiry Form (Leads on WhatsApp/Email)",
          "Video Integration",


        ]
      }
    ],
    yearly: [
      {
        title: "Regular",
        icn: priceIcnOne,
        currency: "₹",
        price: "800",
        duration: "/Yearly (Save 33%)",
        features: [
          "Profile Photo",
          "Name & Designation",
          "Call Button",
          "WhatsApp Button",
          "Google Map Location",
          "Up to 5 Social Media Links",
          "Save Contact Button (.vcf Download)",
        ]
      },
      {
        title: "Special",
        icn: priceIcnTwo,
        tag: "Popular",
        currency: "₹",
        price: "1400",
        duration: "/Yearly (Save 22%)",
        features: [
          "Everything in Basic Package",
          "Services Section",
          "Image Gallery",
          "Card Share Button",
          "Card QR Code",
          "Google Review Direct Link",
        ]
      },
      {
        title: "Premium",
        icn: priceIcnThr,
        currency: "₹",
        price: "1800",
        duration: "/Yearly (Save 25%)",
        features: [
          "Everything in Special Package",
          "Payment QR (UPI / Bank Details)",
          "Brochure PDF Download Option",
          "Inquiry Form (Leads on WhatsApp/Email)",
          "Video Integration",

        ]
      }
    ]
  };

  return (
    <section className="pricing-section" id="pricing">
      <Container>

        <Row className="justify-content-center text-center mb-3 mb-md-5">
          <Col md={8}>

            <BlurText
              text={pricingData.title}
              delay={100}
              animateBy="words"
              direction="bottom"
              className="justify-content-center section-heading"
            />


          </Col>
        </Row>
        {/* Toggle */}
        <div className="pricing-toggle">
          <span className={planType === "monthly" ? "active" : ""}>
            Monthly
          </span>

          <label className="switch">
            <input
              type="checkbox"
              onChange={() =>
                setPlanType(planType === "monthly" ? "yearly" : "monthly")
              }
            />
            <span className="slider"></span>
          </label>

          <span className={planType === "yearly" ? "active" : ""}>
            Yearly <span className="y-off"></span>
          </span>
        </div>

        {/* Cards */}
        <Row className="pricing-scroll g-4 align-items-stretch flex-nowrap">
          {pricingData[planType].map((plan, index) => (
            <Col md={4} key={index} className="mt-0 mt-md-4">
              <Card className={`pricing-card h-100 ${plan.tag === "Popular" ? "gradient-border-card" : ""}`}>


                <Card.Body >
                  <img src={plan.icn} />
                  <h4 className="plan-title">{plan.title}</h4>
                  {plan.tag && (
                    <span className="popular-badge">{plan.tag}</span>
                  )}
                  <div className="price">
                    <span className="currency">{plan.currency}</span>

                    <span className="amount">{plan.price}</span>
                    <span className="duration">{plan.duration}</span>
                  </div>

                  <ul className="feature-list">
                    {plan.features.map((feature, i) => (

                      <li key={i}>{feature}</li>

                    ))}
                  </ul>

                  {/* <button className="btn btn-primary w-100">
                    Get Started
                  </button> */}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Pricing;
