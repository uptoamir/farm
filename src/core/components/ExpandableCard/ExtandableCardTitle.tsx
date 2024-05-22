/* eslint-disable no-unused-vars */
import React, { FC, ReactNode } from "react";
import Typography from "@mui/material/Typography";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useExpandedCardState, ExpandableCardContextValue } from ".";

type ExpandableCardTitleProps = {
  children: ReactNode;
  renderTitleLeftElement?: (state: ExpandableCardContextValue) => ReactNode;
  renderTitleRightElement?: (state: ExpandableCardContextValue) => ReactNode;
  renderMoreIconLeftElement?: (state: ExpandableCardContextValue) => ReactNode;
  renderMoreIconRightElement?: (state: ExpandableCardContextValue) => ReactNode;
};

export const ExpandableCardTitle: FC<ExpandableCardTitleProps> = ({
  children,
  renderTitleLeftElement,
  renderTitleRightElement,
  renderMoreIconLeftElement,
  renderMoreIconRightElement,
  ...props
}) => {
  const state = useExpandedCardState();

  return (
    <AccordionSummary
      expandIcon={
        state.isExpandable && (
          <div className="flex flex-row items-center gap-2">
            {renderMoreIconRightElement?.(state)}
            <ExpandMoreIcon />
            {renderMoreIconLeftElement?.(state)}
          </div>
        )
      }
    >
      <div className="flex flex-row items-center gap-2">
        {renderTitleRightElement?.(state)}
        <Typography
          variant="h4"
          fontSize={14}
          fontWeight={700}
          color={(theme) => theme.palette.primary.main}
          {...props}
        >
          {children}
        </Typography>
        {renderTitleLeftElement?.(state)}
      </div>
    </AccordionSummary>
  );
};
