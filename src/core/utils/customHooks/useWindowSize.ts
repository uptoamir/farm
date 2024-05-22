import { useState, useEffect } from "react";
export interface ISizeProps {
  width: number;
  height: number;
}

export const SCREENS = {
  XS: 430,
  SM: 576,
  FABLET: 672,
  MD: 768,
  MidLg: 865,
  LG: 992,
  TB: 1056,
  XL: 1200,
};

export const useWindowSize = (): ISizeProps => {
  const getWindowSize = () => ({
    width: document.body.offsetWidth,
    height: window.innerHeight,
  });

  const [windowSize, setWindowSize] = useState<ISizeProps>(getWindowSize());

  const handleResize = () => {
    setWindowSize(getWindowSize());
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};
