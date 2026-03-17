import { useEffect, useRef, useState } from "react";

const VideoSlider = ({ videos }) => {
  const containerRef = useRef(null);
  const videoRefs = useRef([]);
  const lightboxRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(null);

  // 🔥 Mouse drag (desktop swipe)
  useEffect(() => {
    const slider = containerRef.current;
    if (!slider) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = (e) => {
      isDown = true;
      slider.classList.add("dragging");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const handleMouseLeave = () => (isDown = false);
    const handleMouseUp = () => (isDown = false);

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5;
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener("mousedown", handleMouseDown);
    slider.addEventListener("mouseleave", handleMouseLeave);
    slider.addEventListener("mouseup", handleMouseUp);
    slider.addEventListener("mousemove", handleMouseMove);

    return () => {
      slider.removeEventListener("mousedown", handleMouseDown);
      slider.removeEventListener("mouseleave", handleMouseLeave);
      slider.removeEventListener("mouseup", handleMouseUp);
      slider.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // 🔥 Horizontal slider autoplay
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;

          if (entry.isIntersecting && entry.intersectionRatio === 1) {
            video.currentTime = 0;
            video.play();
            setTimeout(() => video.pause(), 2000);
          } else {
            video.pause();
          }
        });
      },
      { threshold: 1.0 }
    );

    videoRefs.current.forEach((vid) => vid && observer.observe(vid));

    return () => observer.disconnect();
  }, []);

  // 🔥 Scroll to clicked video in lightbox
  useEffect(() => {
    if (lightboxRef.current && activeIndex !== null) {
      lightboxRef.current.scrollTop = window.innerHeight * activeIndex;
    }
  }, [activeIndex]);

  // 🔥 Vertical reels autoplay
  useEffect(() => {
    if (activeIndex === null) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;

          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            video.play();
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.6 }
    );

    const vids = document.querySelectorAll(".reel-video");
    vids.forEach((v) => observer.observe(v));

    return () => observer.disconnect();
  }, [activeIndex]);

  return (
    <>
      {/* 🔥 Slider */}
      <div
        ref={containerRef}
        style={{
          display: "flex",
          overflowX: "auto",
          gap: "10px",
          scrollSnapType: "x mandatory",
          cursor: "grab"
        }}
      >
        {videos.map((item, index) => (
          <div
            key={index}
            style={{
              flex: "0 0 35.33%",
              scrollSnapAlign: "center",
              borderRadius: "12px",
              overflow: "hidden",
              cursor: "pointer"
            }}
            onClick={() => setActiveIndex(index)}
          >
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={item.galleryImage}
              muted
              playsInline
              preload="metadata"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover"
              }}
            />
          </div>
        ))}
      </div>

      {/* 🔥 Lightbox (Reels) */}
      {activeIndex !== null && (
        <div
          ref={lightboxRef}
          style={{
            position: "fixed",
            inset: 0,
            background: "#000",
            zIndex: 9999,
            overflowY: "auto",
            scrollSnapType: "y mandatory"
          }}
        >
          {videos.map((item, index) => (
            <div
              key={index}
              style={{
                height: "100vh",
                scrollSnapAlign: "start",
                position: "relative"
              }}
            >
              <video
                className="reel-video"
                src={item.galleryImage}
                muted
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }}
              />

              {/* ❌ Close */}
              <button
                onClick={() => setActiveIndex(null)}
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  zIndex: 10000,
                  background: "rgba(0,0,0,0.5)",
                  color: "#fff",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "6px"
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 🔥 Drag cursor style */}
      <style>
        {`
          .dragging {
            cursor: grabbing !important;
          }
        `}
      </style>
    </>
  );
};

export default VideoSlider;