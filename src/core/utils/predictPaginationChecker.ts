/* eslint-disable no-unused-vars */
import React from "react";

export const paginationChecker = (
  e: React.UIEvent<HTMLDivElement, UIEvent>,
  pageNumber: number,
  count: number | null | undefined,
  setPageNumber: (p: any) => void
) => {
  const element = e.target as HTMLDivElement;

  if (
    element.scrollTop > 4014 * (pageNumber - 1) + 480 &&
    count &&
    pageNumber < Math.ceil(count / 20)
  )
    setPageNumber((c: any) => pageNumber + 1);
};
