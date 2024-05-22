import Typography from "@mui/material/Typography";
import { FC } from "react";
import Image from "next/image";
import Card from "src/core/components/Card";

type BoxCardProps = {
  image: any;
  text: string;
};

const BoxCard: FC<BoxCardProps> = ({ image, text }) => {
  return (
    <Card
      className="flex flex-col justify-center items-center w-24 "
      style={{}}
    >
      <Image
        src={image}
        className="w-18 h-18  rounded-2xl border-1 border-primary p-2"
        width={120}
        height={32}
        alt="calendar"
      />
      <Typography color="text.black" variant="h4" sx={{ paddingY: "0.5rem" }}>
        {text}
      </Typography>
    </Card>
  );
};

export default BoxCard;
