import React, { FC } from "react";

type CardProps = {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};
const Card: FC<CardProps> = ({ children, className, style }) => {
  return (
    <div style={style} className={className}>
      {children}
    </div>
  );
};

export default Card;
