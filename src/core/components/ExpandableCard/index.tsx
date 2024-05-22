import React, { createContext, FC, useContext } from "react";
import Accordion, { AccordionProps } from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";

export type ExpandableCardContextValue = {
  isExpandable: boolean;
  isExpanded: boolean;
};

const ExpandableCardContext = createContext<
  ExpandableCardContextValue | undefined
>(undefined);

export const useExpandedCardState = () => {
  const context = useContext(ExpandableCardContext);
  if (!context) {
    throw new Error(
      "useExpandedCard must be used within the ExpandedCardContext.Provider"
    );
  }
  return context;
};

interface ExpandableCardProps extends AccordionProps {
  isExpandable?: boolean;
  divider?: "none" | "wide" | "narrow";
}

const ExpandableCard: FC<ExpandableCardProps> = ({
  isExpandable = true,
  divider = "none",
  children,
  ...rest
}) => {
  const [isExpanded, setIsExpanded] = React.useState(true);

  return (
    <ExpandableCardContext.Provider value={{ isExpandable, isExpanded }}>
      <div>
        <Accordion
          expanded={isExpanded}
          onChange={() => {
            if (isExpandable) setIsExpanded((prev) => !prev);
          }}
          className="p-4 pt-3"
          sx={{
            "& .MuiAccordionSummary-root, & .MuiAccordionSummary-root.Mui-expanded":
              {
                padding: 0,
                minHeight: "auto",
              },
            "& .MuiAccordionSummary-content, & .MuiAccordionSummary-content.Mui-expanded":
              {
                margin: 0,
              },
            "& .MuiAccordionDetails-root": {
              padding: 0,
            },
            "& .MuiAccordionDetails-root:before": {
              content: '""',
              display: "block",
              borderBottom:
                divider !== "none"
                  ? divider === "narrow"
                    ? "1px solid #DADEE7"
                    : "2px solid #EDEDED"
                  : "1px solid transparent",
              margin: `11px ${divider === "wide" ? "-16px" : 0}`,
            },
          }}
          {...rest}
        >
          {children}
        </Accordion>
      </div>
    </ExpandableCardContext.Provider>
  );
};

export { ExpandableCard, AccordionDetails as ExpandableCardContent };

export * from "./ExtandableCardTitle";
