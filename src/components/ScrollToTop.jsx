import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import "../styles/ScrollToTop.scss";

const ScrollToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      className={`scroll-top ${show ? "active" : ""}`}
      onClick={() =>
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
      aria-label="Scroll to top"
    >
      <FaArrowUp className="arrow-icon" />
    </button>
  );
};

export default ScrollToTop;