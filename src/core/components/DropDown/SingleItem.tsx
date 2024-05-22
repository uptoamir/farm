import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FC } from "react";
import Typography from "@mui/material/Typography";
import { ItemDetail } from ".";
import Image from "next/image";

type SingleItemType = {
  detail: ItemDetail;
  onClick?: () => void;
  margin?: boolean;
  showExpandIcon?: boolean;
  rotateExpandIcon?: boolean;
  height?: number;
  lastItem?: boolean;
  bgColor?: string;
  width?: string | number;
  borderColor?: string;
};
const SingleItem: FC<SingleItemType> = ({
  detail,
  onClick,
  rotateExpandIcon = false,
  showExpandIcon = false,
  height = 30,
  bgColor,
  width = "90%",
  borderColor,
}) => (
  <div
    className={`flex mx-auto flex-row justify-start gap-3 items-center text-center p-2 relative  ${
      showExpandIcon ? "rounded-6 " : ""
    }`}
    style={{
      backgroundColor: bgColor,
      border: `2px solid ${borderColor}`,
      borderTop: showExpandIcon ? `2px solid ${borderColor}` : "unset",
      minHeight: height,
      width: width,
    }}
    onClick={onClick}
  >
    {detail?.logo && (
      <Image alt="logo" src={detail?.logo} height={30} width={30} />
    )}
    <div className="flex flex-col">
      <Typography color="textPrimary">{detail?.title}</Typography>
      <Typography color="textPrimary">{detail?.subTitle}</Typography>
    </div>
    <ExpandMoreIcon
      className={`absolute left-3 ${rotateExpandIcon ? "rotate-180" : ""} ${
        showExpandIcon ? "visible" : "invisible"
      }`}
    />
  </div>
);

export default SingleItem;
