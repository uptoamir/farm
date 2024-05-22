import { useRouter } from "next/router";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { FC } from "react";
import Contract from "public/assets/contract.svg";
import Image from "next/image";
import { CONTRACT } from "src/core/routes";

const ContractCard: FC = () => {
  const router = useRouter();

  const theme = useTheme();

  return (
    <div
      onClick={() => router.push(CONTRACT)}
      className="h-16 flex justify-between items-center w-full p-4 mt-4 rounded-2xl border-1 border-primary cursor-pointer"
    >
      <div className="flex">
        <div
          style={{
            backgroundColor: theme.palette.background.light,
          }}
          className="w-10  h-10  ml-6 p-2  rounded-full flex justify-center items-center"
        >
          <Image
            src={Contract}
            className=""
            width={40}
            height={32}
            alt="contract"
          />
        </div>
        <Typography
          color="text.black"
          variant="h3"
          className="flex items-center justify-center"
        >
          کشاورزی قرارداد گندمی
        </Typography>
      </div>
    </div>
  );
};

export default ContractCard;
