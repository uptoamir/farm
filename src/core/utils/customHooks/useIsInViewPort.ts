import React, { useEffect, useState } from "react";

export const useIsInViewport = (
  rootMargin: string,
  element?: React.RefObject<Element>
) => {
  const [isVisible, setVisibility] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisibility(entry.isIntersecting);
      },
      { rootMargin }
    );

    element?.current && observer.observe(element.current);

    return () => {
      if (element?.current) observer.unobserve(element.current);
    };
  }, [element]);

  return isVisible;
};
