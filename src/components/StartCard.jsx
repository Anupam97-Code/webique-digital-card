import React, { useEffect, useState } from "react";
import "../styles/StartCard.scss";

const StatCard = () => {
  const [count, setCount] = useState(0);
  const target = 74;

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const step = target / (duration / 20);

    const interval = setInterval(() => {
      start += step;
      if (start >= target) {
        start = target;
        clearInterval(interval);
      }
      setCount(Math.round(start));
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="stat-box">
      <h2>{count}+</h2>

      <div className="lines">
       Happy Customers
      </div>

      {/* Vertical bars */}
      <div className="bars">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  );
};

export default StatCard;