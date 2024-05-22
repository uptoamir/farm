import Typography from "@mui/material/Typography";
import Background from "public/assets/creditcard.png";
import { FC } from "react";

type CreditCardProps = {
  cash: number | undefined;
};

const CreditCard: FC<CreditCardProps> = ({ cash = 0 }) => {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-3xl overflow-auto col-span-2 grid grid-cols-1 rounded-xl md:rounded-[2rem] max-h-44 sm:max-h-none">
        <div
          style={{
            backgroundImage: `url(${Background.src})`,
            width: "100%",
            height: "100%",
          }}
          className="w-full rounded-3xl col-span-2 flex flex-col m-auto bg-no-repeat bg-cover sm:py-8 h-full shadow-lg"
        >
          <Typography
            color="white"
            variant="h4"
            sx={{
              marginRight: { xs: "1rem", sm: "2.5rem" },
              marginTop: { xs: "1rem", sm: "0.5rem" },
              fontWeight: 600,
            }}
          >
            کیف پول
          </Typography>
          <hr className="h-0 mx-10 mt-4 sm:mt-8 md:mt-18 border-0 border-opacity-50" />
          <div className="flex justify-center items-center flex-col mx-2">
            <Typography color="white" variant="h4" sx={{ marginY: "0.5rem" }}>
              اعتبار شما
            </Typography>
            <Typography color="white" variant="h4" sx={{ marginY: "0.5rem" }}>
              {cash} ریال
            </Typography>
          </div>
          <hr className="h-0 mx-10 mt-8 md:mt-20 border-0 border-opacity-50" />
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
