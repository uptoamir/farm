import { createRef, useEffect, useState } from "react";

export const useHeaderSize = (num: number) => {
  const [headerSize, setHeaderSize] = useState(num);

  // const headerRef = createRef<HTMLDivElement>();
  const headerRef: any = createRef();

  useEffect(() => {
    if (headerRef?.current) {
      setTimeout(() => {
        setHeaderSize(headerRef?.current?.clientHeight);
      }, 300);
    }
  }, [headerRef]);

  return [headerRef, headerSize];
};
