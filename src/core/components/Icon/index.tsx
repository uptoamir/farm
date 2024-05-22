import React, { FC, Suspense } from "react";
import dynamic from "next/dynamic";
import { IconProps } from "react-icomoon";
import iconSet from "./selection.json";

const IcoMoon = dynamic(() => import("react-icomoon"), {
  suspense: true,
});

type IIconProps = IconProps & {
  className?: string;
  color?: string;
};

const Icon: FC<IIconProps> = ({ color, className, ...props }: IIconProps) => (
  <Suspense>
    <IcoMoon
      iconSet={iconSet}
      className={className}
      {...props}
      style={{ color: color }}
    />
  </Suspense>
);

export default Icon;
