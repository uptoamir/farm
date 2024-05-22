/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import classnames from "classnames";
import React, { FC } from "react";
import Icon from "../Icon";
import { Theme, useTheme } from "@mui/material/styles";
import { CircularProgress } from "@mui/material";

export enum BTN_HTML_TYPE {
  SUBMIT = "submit",
  RESET = "reset",
  BUTTON = "button",
}

export enum BTN_SIZE {
  NORMAL = "normal",
  SMALL = "small",
}

export interface IButtonProps extends React.HTMLProps<HTMLButtonElement> {
  title?: string;
  htmlType?: BTN_HTML_TYPE;
  onClick?: (p?: any) => void;
  iconName?: string;
  iconClassName?: string;
  iconSize?: number;
  isIconRight?: boolean;
  href?: string;
  className?: string;
  textClassName?: string;
  iconColor?: string;
  btnSize?: BTN_SIZE;
  fullWidth?: boolean;
  disabled?: boolean;
  textColor?: string;
  loading?: boolean;
  backgroundColor?: string;
  loadingSize?: number;
  variant?:
    | "primary"
    | "secondary"
    | "grey"
    | "error"
    | "success"
    | "warning"
    | "inherit"
    | "secondaryReverse"
    | "light";
  small?: boolean;
  isCenter?: boolean;
  outlined?: boolean;
  outlinedColor?: string;
  outlinedWidth?: number;
  customStyle?: boolean;
  withBorder?: boolean;
  isHide?: boolean;
  fontSize?: number;
  fontWeight?: number;
}

// eslint-disable-next-line complexity
const Button: FC<IButtonProps> = (props) => {
  const {
    children,
    title,
    iconName,
    isIconRight,
    htmlType = BTN_HTML_TYPE.BUTTON,
    onClick,
    iconColor,
    href,
    disabled,
    className,
    iconClassName,
    iconSize,
    fullWidth,
    small,
    outlined,
    outlinedColor,
    outlinedWidth,
    customStyle,
    withBorder,
    textClassName,
    textColor,
    backgroundColor,
    loading,
    fontSize,
    loadingSize,
    fontWeight,
    isCenter,
    isHide,
    ...rest
  } = props;

  const theme = useTheme();
  const styles = handleStyles(props, theme);

  return (
    <React.Fragment>
      {!href && (
        <button
          {...rest}
          type={htmlType}
          onClick={onClick}
          disabled={disabled || loading}
          className={classnames(
            handleClassName(props),
            isIconRight ? "flex-row-reverse" : "flex-row",
            isCenter ? "justify-center" : ""
          )}
          style={{
            visibility: isHide ? "hidden" : "visible",
            color: textColor ?? styles.colorPair.color,
            backgroundColor: backgroundColor ?? styles.colorPair.bgColor,
            border: outlined
              ? `solid ${outlinedWidth ?? 1}px ${outlinedColor ?? "black"}`
              : "unset",
            opacity: disabled ? 0.6 : 1,
          }}
        >
          {loading ? (
            <CircularProgress size={loadingSize ?? 28} color="primary" />
          ) : (
            (title || children || iconName) && (
              <React.Fragment>
                {(children || title) && (
                  <span style={{ fontSize: fontSize, fontWeight: fontWeight }}>
                    {children || title}
                  </span>
                )}
                {iconName && (
                  <Icon
                    icon={iconName}
                    size={iconSize ? iconSize : 30}
                    color={iconColor}
                    className={classnames(iconClassName)}
                  />
                )}
              </React.Fragment>
            )
          )}
        </button>
      )}
    </React.Fragment>
  );
};

export default Button;

type ColorPairType = {
  color: string;
  bgColor: string;
};

const handleStyles: (
  props: IButtonProps,
  theme: Theme
) => { colorPair: ColorPairType } = (props: IButtonProps, theme: Theme) => {
  const styleColorMap: Record<string, ColorPairType> = {
    default: {
      bgColor: "transparent",
      color: theme.palette.primary.contrastText,
    },
    primary: {
      bgColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    secondary: {
      bgColor: theme.palette.common.white,
      color: theme.palette.primary.main,
    },
    secondaryReverse: {
      bgColor: theme.palette.background.default,
      color: theme.palette.text.primary,
    },
    grey: {
      bgColor: theme.palette.secondary.light,
      color: theme.palette.primary.main,
    },
    warning: {
      bgColor: theme.palette.warning.main,
      color: theme.palette.warning.contrastText,
    },
    success: {
      bgColor: theme.palette.success.main,
      color: theme.palette.success.contrastText,
    },
    error: {
      bgColor: "transparent",
      color: theme.palette.error.main,
    },
    inherit: {
      bgColor: "transparent",
      color: theme.palette.text.primary,
    },
    light: {
      bgColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
    },
  };

  return { colorPair: styleColorMap[props.variant ?? "default"] };
};

const baseClassName = `flex items-center content-center cursor-default`;

const withBorderClassName = "border-1 border-solid border-borders-primary ";

const sizeBasedClasses = (isSmall: boolean) => {
  return isSmall ? " text-12 " : " text-16 ";
};

const handleClassName = (props: IButtonProps) => {
  const {
    className,
    small,
    fullWidth,
    btnSize,
    withBorder,
    isCenter,
    customStyle,
  } = props;
  let result = baseClassName;
  result += fullWidth ? " w-full" : "";
  result += isCenter ? " justify-center gap-2" : " justify-around";
  result += customStyle
    ? ""
    : sizeBasedClasses(btnSize === BTN_SIZE.SMALL || !!small);

  result = (className ? `${className} ` : "") + result;
  result += withBorder ? ` ${withBorderClassName}` : "";
  return result;
};
