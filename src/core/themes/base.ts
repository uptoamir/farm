/* eslint-disable no-unused-vars */
import { createTheme, Palette, ThemeOptions } from "@mui/material/styles";
import React from "react";

declare module "@mui/material/styles" {
  interface TypeText {
    fade: string;
    primary: string;
    secondary: string;
    disabled: string;
    grey: string;
    link: string;
    shadow: string;
    black: string;
    white: string;
    lightGrey: string;
  }

  interface TypeBackground {
    default: string;
    light: string;
    paper: string;
    faded: string;
    grey: string;
  }

  interface TypographyVariants {
    subtitle3: React.CSSProperties;
  }

  interface TypographyVariants {
    h7: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    subtitle3?: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    h7?: React.CSSProperties;
  }

  interface Theme {
    palette: Omit<Palette, "text" | "background"> & {
      text: TypeText & {
        fade: string;
        mask: string;
        border: string;
        warning: string;
      };
      background: TypeBackground;
    };
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    subtitle3: true;
  }
}
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    h7: true;
  }
}

// eslint-disable-next-line complexity, no-unused-vars
export const baseThemeObject: (isLightMode: boolean) => ThemeOptions = (
  isLightMode: boolean
) => {
  const theme = createTheme();
  return {
    palette: {
      primary: {
        light: isLightMode ? "rgb(237, 229, 255)" : "rgb(49, 43, 58)",
        main: isLightMode ? "rgb(0, 102, 102)" : "rgb(0, 102, 102)",
        dark: "rgb(65,0,153)",
        contrastText: "rgb(255,255,255)",
      },
      secondary: {
        light: isLightMode ? "rgb(237, 237, 237)" : "rgb(50,50,50)",
        main: "rgb(146, 146, 146)",
      },
      error: {
        light: isLightMode ? "rgb(248, 241, 240)" : "rgb(255, 180, 171)",
        main: "#FF414D",
        dark: "rgb(212,39,39)",
        contrastText: "rgb(255,255,255)",
      },
      success: {
        main: "rgb(100,177,109)",
        contrastText: "rgb(255,255,255)",
      },
      mode: isLightMode ? "light" : "dark",
      common: {
        black: "rgb(0,0,0)",
        white: "rgb(255,255,255)",
      },
      text: {
        primary: isLightMode ? "rgb(0 102 102)" : "rgb(255,255,255)",
        lightGrey: isLightMode ? "#E0E0E0" : "#E0E0E0",
        white: isLightMode ? "#FFFFFF" : "#000000",
        black: isLightMode ? "#000000" : "#FFFFFF",
        secondary: "#4D5467",
        grey: isLightMode ? "rgb(120,120,120)" : "rgb(164,152,152)",
        link: isLightMode ? "rgb(62, 117, 200)" : "rgb(62, 117, 200)",
        fade: "rgb(105,105,105)",
        disabled: "rgb(192,196,206)",
        warning: "rgb(209, 163, 112)",
      },
      divider: isLightMode ? "rgb(192,196,206)" : "rgb(50,50,50)",
      action: {
        // active: "rgb(0,0,0)",
        // hover: "rgb(0,0,0)",
        hoverOpacity: 0.8,
        // selected: "rgb(0,0,0)",
        // selectedOpacity: number,
        disabled: "rgb(192,196,206)",
        // disabledOpacity: number,
        // disabledBackground: "rgb(0,0,0)",
        // focus: "rgb(0,0,0)",
        // focusOpacity: number,
        // activatedOpacity: number,
      },
      background: {
        default: isLightMode ? "#FFFFFF" : "rgb(0,0,0)",
        light: isLightMode ? "#dbf7f7" : "rgb(0,0,0)",
        paper: isLightMode ? "rgb(255,255,255)" : "rgb(23,23,23)",
        selected: isLightMode ? "rgb(245, 243, 245)" : "rgb(37, 36, 39)",
        grey: isLightMode ? "rgb(240, 243, 246)" : "rgb(240, 243, 246)",
        faded: "rgba(0,0,0,0.4)",
      },

      // getContrastText: (background: string) => "rgb(0,0,0)",
    },
    typography: {
      fontFamily: "iransans-num, iransans",
      h1: {
        fontSize: 18,
        fontWeight: 700,
      },
      h2: {
        fontSize: 16,
        fontWeight: 600,
      },
      h3: {
        fontSize: 15,
        fontWeight: 600,
        // [theme.breakpoints.up("sm")]: {
        //   fontSize: 20,
        // },
      },
      h4: {
        fontSize: 14,
        fontWeight: 500,
        // [theme.breakpoints.up("sm")]: {
        //   fontSize: 16,
        // },
      },
      h5: {
        fontSize: 13,
        fontWeight: 400,
      },
      // h6: {
      //   fontSize: 12,
      //   fontWeight: 400,
      // },
      h6: {
        fontSize: 10,
        fontWeight: 500,
        // [theme.breakpoints.up("sm")]: {
        //   fontSize: 14,
        // },
      },
      h7: {
        fontSize: 8,
        fontWeight: 500,
        // [theme.breakpoints.up("sm")]: {
        //   fontSize: 14,
        // },
      },
      subtitle1: {
        fontSize: 16,
        fontWeight: 800,
      },
      subtitle2: {
        fontSize: 13,
        fontWeight: 600,
      },
      subtitle3: {
        fontSize: 12,
        fontWeight: 600,
      },
      body1: {
        fontSize: 14,
        fontWeight: 400,
      },
      body2: {
        fontSize: 12,
        fontWeight: 300,
      },
      caption: {
        fontSize: 10,
        fontWeight: 500,
        color: "darkgrey",
      },
      button: {
        fontSize: 32,
        fontWeight: 500,
      },
      overline: {
        fontSize: 32,
        fontWeight: 700,
      },
    },
  };
};

export const baseTheme = (isLightMode: boolean) =>
  createTheme(baseThemeObject(isLightMode));
