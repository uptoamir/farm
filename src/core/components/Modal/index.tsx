import { FC, ReactNode } from "react";
import ClientOnlyPortal from "../ClientOnlyPortal";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Button from "../Button";

export type ModalPropsType = {
  show: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  variant: "bottomSheet" | "modal";
  snapHeight?: number | string;
  snapWidth?: number | string;
};

const Modal: FC<ModalPropsType> = ({
  show,
  title,
  onClose,
  children,
  variant = "modal",
}) => {
  const theme = useTheme();

  return (
    <>
      {show && (
        <ClientOnlyPortal selector="#modal">
          <div
            className="fixed left-0 top-0 right-0 bottom-0 flex items-center justify-center z-1200"
            style={{
              backgroundColor: theme.palette.background.faded,
            }}
            onClick={() => onClose()}
          >
            <div
              className={`w-full overflow-scroll gap-2 flex flex-col items-center p-4 ${
                variant === "modal"
                  ? "rounded-14 mx-3"
                  : "rounded-t-28 absolute bottom-0"
              }`}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: "850px",
                backgroundColor: theme.palette.background.paper,
                maxHeight: "80vh",
              }}
            >
              <div
                className="relative w-full flex flex-row items-center justify-center border-b-1 p-2 pb-4 mb-2"
                style={{
                  borderColor: theme.palette.divider,
                }}
              >
                <Button
                  iconName="close"
                  small
                  iconColor={theme.palette.common.black}
                  className="mx-1 ml-2 absolute right-0"
                  iconSize={16}
                  onClick={() => onClose()}
                />
                <Typography variant="h3">{title}</Typography>
              </div>
              <div className="w-full">{children}</div>
            </div>
          </div>
        </ClientOnlyPortal>
      )}
    </>
  );
};
export default Modal;
