import React, { createRef } from "react";

export const refCreator = (arr: string[], refObj: Record<string, any>) => {
  arr.map((el) => (refObj[el] = createRef<React.LegacyRef<HTMLDivElement>>()));
};
