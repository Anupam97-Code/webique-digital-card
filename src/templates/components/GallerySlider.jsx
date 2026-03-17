import React, { useState, useEffect, memo } from "react";
import { Row, Col } from "react-bootstrap";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const GallerySlider = memo(({ slideData }) => {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 400);
    useEffect(() => {

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 400);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };

    }, []);

    // split array into groups of 4
    const chunkArray = (arr, size) => {
        const result = [];
        for (let i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, i + size));
        }
        return result;
    };

    const slides = chunkArray(slideData, 4);

    const openLightbox = (index) => {
        setCurrentIndex(index);
        setLightboxOpen(true);
    };

    const nextImage = () => {
        setCurrentIndex((prev) =>
            prev === slideData.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? slideData.length - 1 : prev - 1
        );
    };

    return (
        <>
            {/* gallery slider */}
            <div
                className="slider-container d-flex"
                style={{
                    overflowX: "auto",
                    width: "100%",
                    gap: "24px",
                    scrollSnapType: "x mandatory"
                }}
            >
                {slides.map((slide, slideIndex) => (
                    <div
                        className="slide"
                        key={slideIndex}
                        style={{
                            maxWidth: "100%",
                            scrollSnapAlign: "start",
                            flexShrink: 0
                        }}
                    >
                        <Row>
                            {slide.map((value, index) => {
                                const realIndex = slideIndex * 4 + index;

                                return (
                                    <Col xs={6} key={index} className="mb-3 px-2">
                                        <div style={{ position: "relative", width: isMobile ? "100%" : "181px", height: "120px" }}>
                                            <img
                                                src={value.galleryImage}
                                                alt={value.imageAlt}
                                                onClick={() => openLightbox(realIndex)}
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    borderRadius: "4px",
                                                    objectFit: "cover",
                                                    cursor: "pointer"
                                                }}
                                            />
                                            {value.imageText !== "" && (
                                                <p
                                                    style={{
                                                        position: "absolute",
                                                        bottom: 0,
                                                        left: 0,
                                                        margin: 0,
                                                        padding: "20px 10px 10px",
                                                        color: "#ffffff",
                                                        fontSize: "13px",
                                                        zIndex: 2,
                                                        pointerEvents: "none",
                                                        background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)",
                                                        width: "100%",
                                                        borderBottomLeftRadius: "4px",
                                                        borderBottomRightRadius: "4px"
                                                    }}
                                                >
                                                    {value.imageText}
                                                </p>
                                            )}
                                        </div>
                                    </Col>
                                );
                            })}
                        </Row>
                    </div>
                ))}
            </div>

            {/* lightBox */}
            {lightboxOpen && (
                <div
                    onClick={() => setLightboxOpen(false)}
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "#0000007e",
                        zIndex: 9999,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    {/* Close */}
                    <button
                        onClick={(e) => { e.stopPropagation(); setLightboxOpen(false); }}
                        className="d-flex align-items-center justify-content-center"
                        style={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                            padding: "10px",
                            borderRadius: "50%",
                            background: "#000",
                            border: "none",
                            color: "#fff",
                            zIndex: 10000
                        }}
                    >
                        <X size={32} />
                    </button>

                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            maxWidth: "90%",
                            maxHeight: "100%",
                            padding: "20px 0"
                        }}
                    >
                        {/* onclick index image */}
                        <img
                            src={slideData[currentIndex].galleryImage}
                            alt={slideData[currentIndex].imageAlt}
                            style={{
                                maxWidth: "100%",
                                maxHeight: "calc(90vh - 80px)",
                                borderRadius: "8px",
                                objectFit: "contain"
                            }}
                        />

                        {/* Navigation Arrows */}
                        <div
                            style={{
                                display: "flex",
                                gap: "20px",
                                marginTop: "20px"
                            }}
                        >
                            {/* Prev */}
                            <button
                                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                style={{
                                    background: "transparent",
                                    border: "none",
                                    color: "#fff"
                                }}
                            >
                                <ChevronLeft size={40} />
                            </button>

                            {/* next slide */}
                            <button
                                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                style={{
                                    background: "transparent",
                                    border: "none",
                                    color: "#fff"
                                }}
                            >
                                <ChevronRight size={40} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
});

export default GallerySlider;
