import React, { useRef, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import gsap from 'gsap';
import "../styles/marqueeSliders.scss";
import { AnimatedContent, BlurText } from './shared/TextAnimation';

const industryData1 = [
    "Doctors",
    "Real Estate Agents",
    "CA / Consultants",
    "Builders",
    "Doctors",
    "Property Dealers",
    "Real Estate Agents",
    "CA / Consultants",
    "Builders",
    "Interior Decorators",
    "Packers & Movers"
];

const industryData2 = [
    "Electricians",
    "Plumbers",
    "Carpenters",
    "Restaurants",
    "Cafés",
    "Bakeries",
    "Caterers",
    "Cloud Kitchens",
    "Sweet Shop",

]

const industryData3 = [
    "Salons",
"Beauty Parlours",
"Spas",
"Massage Centers",
"Tattoo Studios"

]

const industryData4 = [
   "Coaching Classes",
"Tuition Centers",
"Computer Training Institutes",
"Skill Development Centers",
"Event Planners",
"Wedding Planners",
"Decorators",
"Tent & Lighting Services",
"DJs & Sound Services"
]



const MarqueeRow = ({ items, speed = 20, reverse = false }) => {
    const rowRef = useRef(null);

    useEffect(() => {
        const row = rowRef.current;
        const itemsWidth = row.scrollWidth / 3;

        gsap.fromTo(
            row,
            { x: reverse ? -itemsWidth : 3 },
            {
                x: reverse ? 0 : -itemsWidth,
                duration: speed,
                ease: "linear",
                repeat: -1
            }
        );
    }, [speed, reverse]);

    return (
        <div className="marquee-wrapper">
            <ul className="marquee-content" ref={rowRef}>
                {[...items, ...items, ...items].map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

const IndustrySliders = () => {
    return (
        <section className="industery-marquee bg-white features-section ">
            <AnimatedContent
                distance={120}
                direction="vertical"
                reverse={false}
                duration={0.8}
                ease="power3.out"
                initialOpacity={0}
                animateOpacity
                scale={1}
                threshold={0.1}
                delay={0}
            >
                <Container>
                    <div className="title-count text-center mb-3 mb-lg-5">


                        <BlurText
                            text="A Smarter Digital Card for Every Business"
                            delay={100}
                            animateBy="words"
                            direction="bottom"
                            className="justify-content-center  section-heading"
                        />
                    </div>
                    <div className="marquee-main-container">
                        <div className="overlay overlay-left"></div>
                        <div className="overlay overlay-right"></div>

                        <MarqueeRow items={industryData1} speed={40} />
                        <MarqueeRow items={industryData2} speed={39} reverse />
                        <MarqueeRow items={industryData3} speed={29} />
                        <MarqueeRow items={industryData4} speed={35} reverse />
                    </div>
                </Container>
            </AnimatedContent>
        </section>
    );
};

export default IndustrySliders;
