import { Accordion, AccordionDetails, Card } from "@mui/material";
import React, { FC } from "react";
import BaseCardHeader from "./BaseCardHeader";

type BaseCardProps = {
  children: React.ReactNode;
  title: string;
  logo?: string;
  expandable?: boolean;
  expansionSubtitle?: string;
  onClick?: () => void;
  onTitleClick?: () => void;
  defaultHeaderColor?: boolean;
  showExpandIcon?: boolean;
  withDivider?: boolean;
};

const BaseCard: FC<BaseCardProps> = ({
  children,
  expandable,
  expansionSubtitle,
  title,
  logo,
  defaultHeaderColor,
  onTitleClick,
  showExpandIcon = true,
  withDivider = true,
  ...rest
}) => {
  const [expanded, setExpanded] = React.useState(true);

  return (
    <Card
      className="my-2"
      onClick={rest.onClick}
      elevation={0}
      sx={{
        borderRadius: "10px",
      }}
    >
      <Accordion
        expanded={expanded && expandable}
        onChange={() => {
          if (expandable) setExpanded((prev) => !prev);
        }}
      >
        <BaseCardHeader
          expansionSubtitle={expansionSubtitle}
          expanded={expanded}
          showExpandIcon={showExpandIcon}
          title={title}
          logo={logo}
          defaultHeaderColor={defaultHeaderColor}
          withDivider={withDivider}
          onTitleClick={onTitleClick}
        />
        {expandable && (
          <AccordionDetails
            sx={{
              padding: 0,
            }}
            className="flex flex-row justify-center"
          >
            <div className="max-w-200 flex-1">{children}</div>
          </AccordionDetails>
        )}
      </Accordion>
    </Card>
  );
};

export default BaseCard;
