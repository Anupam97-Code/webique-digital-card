import React from 'react'
import "../styles/Footer.scss"
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import FutarLog from "../assets/images/logo-futar.svg"
import phoneIcon from "../assets/images/phone-footer.svg"
import Insta from "../assets/images/insta.svg"
import fbk from "../assets/images/facebook.svg"
import linkd from "../assets/images/linkdin.svg"
import ButtonCall from './ButtonLink'
import { motion } from "framer-motion";
const Footer = () => {
  return (
    <footer id="reachus">
      {/* fotter main section */}
      <div className='footer-section' >
        <img src={FutarLog} alt='waqbiue log' className='futar-lgo d-none d-md-block' />
        <Container>
          <Row className="align-items-center justify-content-center d-flex flex-column text-white">
            <h2>
              Ready To Upgrade<br /> Your Business &nbsp;
              <span>Card&nbsp;
                <motion.span
                  className='idea-mark'
                  style={{ display: "inline-block" }}
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{
                    duration: 0.6,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "mirror",
                  }}
                >
                  ?
                </motion.span>
              </span><br />

            </h2>
            <p>Create a smart digital business card that’s easy to share, simple to update, and designed to help your business stand out.</p>

            <ButtonCall
              className='hero-btn my-4 '
              phone="+919860188007"
              label="Create Digital Card"
              icon={phoneIcon}
            />

            {/* <ButtonCall
              className='hero-btn my-4'
              phone="+919876543210"
              label="Book a Call"
              icon={phoneIcon}
            /> */}
            {/* <ul className="nav-list text-capitalize">
              <li>
                <Link to="/about">About us</Link>
              </li>
              <li>
                <Link to="/pricing">Pricing</Link>
              </li>
              <li>
                <Link to="/portfolio">Portfolio</Link>
              </li>
              <li>
                <Link to="/careers">career</Link>
              </li>
              <li>
                <Link to="/faq">faq's</Link>
              </li>
            </ul> */}
          </Row>
        </Container>
      </div>
      {/* footer bottom section  */}
      <div className='footer-bottom'>
        <Container>
          <Row className='d-flex justify-content-between row-gap-0 row-gap-md-2'>
            <Col xs={{ order: 3, span: 12 }} md={12} lg={{ order: 1, span: 4 }} className=' d-flex align-items-center justify-content-center justify-content-lg-start'>
              <p>© {new Date().getFullYear()} All Rights Reserved</p>
            </Col>
            <Col xs={{ order: 0, span: 12 }} md={12} lg={{ order: 1, span: 4 }} className=' d-flex align-items-center justify-content-center'>
              <ul className='footer-icns'>
                <li><a href='https://www.facebook.com/share/19Bko6nmR5/?mibextid=qi2Omg' target='_blank'><img src={fbk} /></a></li>
                <li><a href='https://www.instagram.com/webique_tech?igsh=Z2hzNGoya3dtZ2oy' target='_blank'><img src={Insta} /></a></li>
                <li><a href='https://www.linkedin.com/company/webiquetech' target='_blank'><img src={linkd} /></a></li>
              </ul>
            </Col>
            <Col xs={{ order: 4, span: 12 }} md={12} lg={{ order: 1, span: 4 }} className='company-link d-flex align-items-center justify-content-center justify-content-lg-end'>
              <p className='text-center text-lg-end'>
                Powered by &nbsp;
                <a href='https://www.webique.in/' target='_blank' className='text-white'>Webique Technology</a>
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </footer >
  )
}

export default Footer
