import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import React from "react";

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  iscentered?: string;
  logos?: string[];
  icons?: string[];
  // eslint-disable-next-line no-unused-vars
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    variant="scrollable"
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))(({ theme, iscentered, icons }) => ({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    height: 4,
  },
  "& .MuiTabs-indicatorSpan": {
    width: icons ? "calc(100% - 35px)" : "calc(100% - 40px)",
    marginRight: icons ? "11px" : "",
    marginTop: icons ? "-8px" : "",
    marginBottom: icons ? "9px" : "",
    borderRadius: "8px 8px 0px 0px",
    backgroundColor: theme.palette.primary.main,
  },
  "& .MuiTabs-flexContainer": {
    justifyContent: iscentered ? "center" : "",
  },
}));

export default StyledTabs;
