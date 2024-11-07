import { Paper, Typography } from "@mui/material";
import "./CircleChart.scss";
import { useEffect, useRef, useState } from "react";
import { scrollToRef } from "../../utils/scrollUtils";
const CircleChart = ({ items, shown, className }) => {
  const [visible, setVisible] = useState(false);
  const chartRef = useRef(null);
  const baseRef = useRef(null);

  const observer = new IntersectionObserver(
    (enteries) => {
      enteries.forEach((entry) => {
        if (entry.isIntersecting) setVisible(true);
      });
    },
    { root: null, rootMargin: "0px", threshold: 0.5 }
  );

  useEffect(() => {
    observer.observe(chartRef?.current);
    if (baseRef.current && shown) {
      scrollToRef(baseRef);
      setTimeout(() => scrollToRef(baseRef), 35);
    }
  }, [shown]);

  return (
    <Paper elevation={10} className={`wrapper ${className}`}>
      <Typography fontSize="3rem" fontWeight="bold" className="emojiTitle">
        האימוג'ים הכי משומשים
      </Typography>
      <div ref={chartRef} className="chart">
        {items.map((item, index) => (
          <div
            className={`podium index${index} ${visible ? "visible" : ""}`}
            style={item.style}
            key={index}
          >
            <Typography className="emoji">{item.character}</Typography>
            <Typography className="amount">{item.amount}</Typography>
          </div>
        ))}
        <div ref={baseRef} className="base" />
      </div>
    </Paper>
  );
};

export default CircleChart;
