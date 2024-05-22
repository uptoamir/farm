import React, { FC } from "react";
import Image from "next/image";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";

type BaseCardHeaderProps = {
  expansionSubtitle?: string;
  expanded?: boolean;
  showExpandIcon?: boolean;
  title?: string;
  logo?: string;
  defaultHeaderColor?: boolean;
  withDivider?: boolean;
  onTitleClick?: () => void;
};

const StyledAccordionSummary = styled((props: any) => (
  <AccordionSummary {...props} />
))(() => ({
  minHeight: "48px !important",
  maxHeight: 10,

  "& .MuiAccordionSummary-content": {
    "&.Mui-expanded": {
      minHeight: 10,
      margin: 0,
      padding: 0,
    },
  },
}));

const BaseCardHeader: FC<BaseCardHeaderProps> = ({
  expansionSubtitle,
  expanded = false,
  showExpandIcon = false,
  title,
  logo,
  defaultHeaderColor,
  withDivider,
  onTitleClick,
}) => {
  const theme = useTheme();

  return (
    <StyledAccordionSummary
      expandIcon={
        showExpandIcon && (
          <Typography variant="subtitle1" color="textPrimary">
            {!expanded && expansionSubtitle}
            <ExpandMoreIcon />
          </Typography>
        )
      }
      sx={{
        borderBottom: expanded && withDivider ? "1px solid" : "",
        borderColor: (theme: { palette: { text: { grey: any } } }) =>
          theme.palette.text.grey,
        minHeight: 10,
      }}
    >
      <div
        className="flex flex-row"
        onClick={(e) => {
          if (onTitleClick) {
            e.stopPropagation();
            onTitleClick();
          }
        }}
      >
        {logo && <Image alt="logo" src={logo} width={20} height={20} />}
        <Typography
          style={{
            color: defaultHeaderColor
              ? theme.palette.text.primary
              : theme.palette.primary.main,
            paddingRight: logo ? "10px" : "",
          }}
          variant="subtitle2"
        >
          {title}
        </Typography>
      </div>
    </StyledAccordionSummary>
  );
};

export default BaseCardHeader;
