import { useEffect, useState } from "react";
import { FloatingElementsContainer, FloatingElement } from "./index.styled";

const FloatingElements = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getSize = (baseSize: number) => {
    if (windowWidth <= 576) return baseSize * 0.6; // smaller for mobile
    if (windowWidth <= 992) return baseSize * 0.8; // slightly smaller for tablets
    return baseSize;
  };

  const elements = [
    {
      size: getSize(60),
      top: 20,
      left: 10,
      delay: 0,
      duration: 6,
      shape: "circle" as const,
      color: "primary",
    },
    {
      size: getSize(40),
      top: 60,
      left: 20,
      delay: 1,
      duration: 8,
      shape: "square" as const,
      color: "secondary",
    },
    {
      size: getSize(80),
      top: 30,
      left: 80,
      delay: 2,
      duration: 7,
      shape: "triangle" as const,
      color: "accent",
    },
    {
      size: getSize(50),
      top: 70,
      left: 70,
      delay: 3,
      duration: 9,
      shape: "square" as const,
      color: "primary",
    },
    {
      size: getSize(70),
      top: 40,
      left: 40,
      delay: 4,
      duration: 10,
      shape: "circle" as const,
      color: "secondary",
    },
    {
      size: getSize(30),
      top: 80,
      left: 90,
      delay: 2,
      duration: 7,
      shape: "triangle" as const,
      color: "accent",
    },
    {
      size: getSize(45),
      top: 15,
      left: 60,
      delay: 3,
      duration: 8,
      shape: "square" as const,
      color: "primary",
    },
    {
      size: getSize(55),
      top: 85,
      left: 30,
      delay: 1,
      duration: 9,
      shape: "circle" as const,
      color: "secondary",
    },
  ];

  return (
    <FloatingElementsContainer>
      {elements.map((element, index) => (
        <FloatingElement key={index} {...element} />
      ))}
    </FloatingElementsContainer>
  );
};

export default FloatingElements;
