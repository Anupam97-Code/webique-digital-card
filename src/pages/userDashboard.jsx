import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    FaLock, FaCheckCircle, FaFacebookF, FaInstagram, FaTwitter,
    FaLinkedinIn, FaWhatsapp, FaYoutube, FaMapMarkerAlt, FaEnvelope,
    FaDownload, FaHome, FaPlus, FaEllipsisV
} from 'react-icons/fa';
import '../styles/userPanel.scss';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
    const [activeTab, setActiveTab] = useState('Regular');

    const tabs = ['Regular', 'Special', 'Premium'];

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleLockClick = () => {
        alert('This card is locked. Upgrade your plan to unlock.');
    };

    // Content replicating the 4 visible cards
    const topCards = [
        {
            id: 1,
            src: "",
            plan: "",
            template: "",
        },
        {
            id: 2,
            src: "",
            plan: "",
            template: "",
        },
        {
            id: 3,
            src: "",
            plan: "",
            template: "",
        },
        {
            id: 4,
            src: "",
            plan: "",
            template: "",
        }
    ];

    const features = [
        'Profile Photo',
        'Name & Designation',
        'Call Button',
        'WhatsApp Button',
        'Google Map Location',
        'Up to 5 Social Media Links',
        'Save Contact Button (.vcf Download)'
    ];

    return (
        <div className="user-panel">
            {/* Header section */}
            <header className="user-panel__header">
                {/* logo */}
                <div className="user-panel__header-logo">
                    <div className="icon">W</div>
                    WEBIQUE <span>TECHNOLOGY</span>
                </div>

                {/* nav links */}
                <nav className="user-panel__header-nav d-none d-md-flex align-items-center">
                    <Link to="/view-card">View Card</Link>
                    <Link to="/edit-card">Edit Card</Link>
                    <Link to="/upgrade-plan">Upgrade Plan</Link>
                </nav>

                {/* user profile */}
                <div className="user-panel__header-user">
                    <div className="info text-end d-none d-sm-block">
                        <div className="name">Sakshi Dawre</div>
                        <div className="handle">Sakshi Dawre</div>
                    </div>
                    <img src="https://placehold.co/45x45/dfe6e9/2d3436?text=SD" alt="User Avatar" className="avatar" />
                </div>
            </header>

            {/* Main Content Area */}
            <main className="user-panel__main container-fluid">
                {/* Filter Navigation */}
                <section className="user-panel__filters">
                    <div className="btn-group" role="group">
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                className={`btn ${activeTab === tab ? 'active' : ''}`}
                                onClick={() => handleTabClick(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </section>


                <Row className="row">
                    {/* Card Grid List - Left Column */}
                    <Col md={8} xl={9} className="">
                        <Row className="user-panel__grid">

                            {/* Top 4 Visually Active Cards */}
                            {topCards.map((card, index) => (
                                <Col sm={12} md={6} lg={6} xl={4} className="p-2" key={card.id}>
                                    <div className="user-panel__card">

                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </Col>

                    {/* Plan Details Pane - Right Column */}
                    <Col md={4} xl={3} className="mt-4 mt-xl-0">
                        <div className="user-panel__sidebar">
                            <div className="sidebar-title">Selected Plan</div>
                            <div className="plan-name">Regular</div>

                            <div className="price-section">
                                <div className="price-label">Price</div>
                                <div className="prices">
                                    <div className="price-item">
                                        <span className="amount">₹ 100/</span>
                                        <span className="period">Monthly</span>
                                    </div>
                                    <div className="price-item">
                                        <span className="amount">₹ 800/</span>
                                        <span className="period">Yearly</span>
                                    </div>
                                </div>
                            </div>

                            <h4 className="features-title">Features</h4>
                            <ul className="features-list">
                                {features.map((feature, idx) => (
                                    <li key={idx}>
                                        <FaCheckCircle className="check-icon" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button className="btn-confirm">
                                Confirm Card
                            </button>
                        </div>
                    </Col>
                </Row>
            </main>
        </div>
    );
};

export default UserDashboard;
