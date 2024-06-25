import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useAnimation,
} from "framer-motion";

const FadingTextContainer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerTopScroll, setContainerTopScroll] = useState<number | string>(
    "no data"
  );
  const [containerScrollHeight, setContainerScrollHeight] = useState<
    number | string
  >("no data");
  const [containerClientHeight, setContainerClientHeight] = useState<
    number | string
  >("no data");

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      const handleScroll = () => {
        setContainerTopScroll(container.scrollTop);
        setContainerScrollHeight(container.scrollHeight);
        setContainerClientHeight(container.clientHeight);
      };

      container.addEventListener("scroll", handleScroll);
      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  useEffect(() => {
    console.log(
      containerTopScroll,
      containerScrollHeight,
      containerClientHeight
    );
  }, [containerTopScroll, containerScrollHeight, containerClientHeight]);
  return (
    <div style={{ position: "relative", height: "100px", overflow: "auto" }}>
      <div ref={containerRef} style={{ height: "100%", paddingBottom: "20px" }}>
        <div style={{ height: "300px" }}>Scrollable content</div>
      </div>
      <div
        style={{
          position: "sticky",
          bottom: 0,
          left: 0,
          right: 0,
          height: "20px",
          backgroundColor: "white",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

export default FadingTextContainer;
