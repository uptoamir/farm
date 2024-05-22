import Typography from "@mui/material/Typography";
import React, { FC } from "react";
import { useTheme } from "@mui/material/styles";

export type PageHeaderProps = {
  title?: string;
  renderMain?: () => React.ReactNode;
  renderSide?: () => React.ReactNode;
  side?: string;
};

const PageHeader: FC<PageHeaderProps> = ({
  title,
  side = "left",
  renderMain,
  renderSide,
}) => {
  const theme = useTheme();

  return (
    <div
      style={{
        backgroundColor: theme.palette.background.default,
      }}
      className="flex flex-row-reverse justify-center items-center px-5 py-4 border-b border-[#EAEDF3] top-0 w-full fixed z-50"
    >
      {side === "right" && (
        <div style={{ marginLeft: "auto", visibility: "hidden" }}></div>
      )}
      {side === "right" && (
        <div style={{ marginRight: "auto" }}>{renderSide && renderSide()}</div>
      )}
      <div className="flex flex-row items-end">
        {renderMain ? (
          renderMain()
        ) : (
          <Typography color="textPrimary" variant="h1" className="px-2">
            {title}
          </Typography>
        )}
      </div>

      {side === "left" && (
        <div style={{ marginLeft: "auto" }}>{renderSide && renderSide()}</div>
      )}
      {side === "left" && (
        <div style={{ marginLeft: "auto", visibility: "hidden" }}></div>
      )}
    </div>
  );
};

export default PageHeader;
