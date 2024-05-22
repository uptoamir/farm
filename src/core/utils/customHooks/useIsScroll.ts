import _ from "lodash";
import { useEffect, useState } from "react";

export const useIsScroll = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const handleScroll = _.debounce((e) => {
    const currentScrollPos = e.target.scrollTop;
    if (
      (prevScrollPos > currentScrollPos &&
        prevScrollPos - currentScrollPos > 10) ||
      currentScrollPos < 10
    )
      window.dispatchEvent(
        new CustomEvent("customScrollEvent", {
          detail: { hide: false },
        })
      );
    else
      window.dispatchEvent(
        new CustomEvent("customScrollEvent", {
          detail: { hide: true },
        })
      );

    setPrevScrollPos(currentScrollPos);
  }, 100);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return handleScroll;
};
