import React from "react";
import { useState, useEffect, Activity } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Col, Nav, Row } from "react-bootstrap";
import { HiOutlineMail } from "react-icons/hi";
import { IoCallOutline } from "react-icons/io5";


const ContactItem = ({ icon, title, contactHerf, contactValue, extraClass }) => {
    return (
        <>
            <div className={`contact-ce d-flex align-items-center justify-content-start gap-3 ${extraClass}`}>
                <span className="icon">{icon}</span>
                <div className="contact-info d-flex flex-column align-items-start justify-content-start">
                    <p className="text-white mb-1">{title}</p>
                    <a href={contactHerf} className="text-white">{contactValue}</a>
                </div>
            </div>
        </>
    )
}

export const SideBar = () => {

    const [open, setOpen] = useState(false);

    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    const sections = ["home", "Our Process", "demo", "pricing", "features", "contact"];
    const scrollToId = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 90);

            const scrollPosition = window.scrollY + window.innerHeight / 2;

            for (let section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const top = element.offsetTop;
                    const bottom = top + element.offsetHeight;

                    if (scrollPosition >= top && scrollPosition < bottom) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    // Lock body scroll when sidebar is open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [open]);

    const sidebarVariants = {
        hidden: { x: 500, opacity: 0 },
        visible: { x: 0, opacity: 1 },
        exit: { x: 500, opacity: 0, transition: { duration: 0.4 } },
    };
    const iconTop = { open: { rotate: 45, y: 7, x: -1 }, closed: { rotate: 0, y: 0, x: 0 } };
    const iconMiddle = { open: { opacity: 0 }, closed: { opacity: 1 } };
    const iconBottom = { open: { rotate: -45, y: -8, x: 1 }, closed: { rotate: 0, y: 0, x: 0 } };


    return (
        <>
            <div
                type="button"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                className={open ? "toggle-none d-lg-none align-item border-0 shadow-none" : "toggle-btn d-lg-none align-item border-0 shadow-none"}
            >
                <motion.div animate={open ? "open" : "closed"} variants={iconTop} transition={{ duration: 0.3 }}>
                    <div className="toggle-bar"></div>
                </motion.div>
                <motion.div animate={open ? "open" : "closed"} variants={iconMiddle} transition={{ duration: 0.3 }}>
                    <div className="toggle-bar"></div>
                </motion.div>
                <motion.div animate={open ? "open" : "closed"} variants={iconBottom} transition={{ duration: 0.3 }}>
                    <div className="toggle-bar"></div>
                </motion.div>
            </div>
            <AnimatePresence>
                {open && (
                    <>
                        <motion.div
                            className="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setOpen(false)}
                        ></motion.div>

                        <motion.div
                            className="side-bar-menu d-flex d-lg-none "
                            variants={sidebarVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ duration: 0.45 }}
                        >
                            <div className="side-bar">
                                <Activity>
                                    <Nav className="side-link">
                                        <Nav.Link onClick={() => { scrollToId("home"), setOpen(false) }} className="">Home</Nav.Link>
                                        <Nav.Link onClick={() => { scrollToId("Our Process"), setOpen(false) }} className="">Our Process</Nav.Link>
                                        <Nav.Link onClick={() => { scrollToId("demo"), setOpen(false) }} className="">Demo</Nav.Link>
                                        <Nav.Link onClick={() => { scrollToId("pricing"), setOpen(false) }} className="">Pricing</Nav.Link>
                                        <Nav.Link onClick={() => { scrollToId("features"), setOpen(false) }} className="">Features</Nav.Link>
                                        <Nav.Link onClick={() => { scrollToId("contact"), setOpen(false) }} className="">Contact</Nav.Link>
                                    </Nav>
                                </Activity>
                                <div className="side-bar-contact d-flex flex-column gap-3 mt-4">
                                    <ContactItem
                                        icon={<HiOutlineMail />}
                                        title={"Email"}
                                        contactHerf={"mailto:Spiplnsk@gmail.com"}
                                        contactValue={"Spiplnsk@gmail.com"}
                                        extraClass={"border-bottom pb-2"}
                                    />
                                    <ContactItem
                                        icon={<IoCallOutline />}
                                        title={"Call"}
                                        contactHerf={"tel:+917745061210"}
                                        contactValue={"7745061210"}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}

