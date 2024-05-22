import { useTheme } from "@mui/material/styles";
import React, { useRef } from "react";
import { NextPage } from "next/types";
import { reportScroll } from "src/core/utils/gaReporters";
import CreditCard from "src/features/Home/components/CreditCard";
import BoxCard from "src/features/Home/components/BoxCard";
import WeatherCard from "src/features/Home/components/WeatherCard";
import Myaccount from "public/assets/myaccount.svg";
import Image from "next/image";
import ContractCard from "src/features/Home/components/ContractCard";
import DigitalService from "public/assets/digitalService.svg";
import MarketFarm from "public/assets/marketFarm.svg";
import MoreServices from "public/assets/moreServices.svg";
import PageWithHeader from "src/core/components/PageWithHeader";
import authRoute from "src/core/utils/authRoute";

const Home: NextPage = () => {
  const theme = useTheme();

  const ref = useRef(null);

  return (
    <div
      style={{ backgroundColor: theme.palette.background.default }}
      className="flex flex-col flex-1 px-4 items-center pt-4"
    >
      <div
        ref={ref}
        className="flex flex-col flex-1 pb-10 w-full max-w-3xl mb-2 no-scrollbar"
        onScrollCapture={(e) => {
          reportScroll("HomePage", e);
        }}
        id="SwipeScroll"
      >
        <CreditCard cash={0} />
        <WeatherCard />
        <ContractCard />
        <div className="flex justify-between my-4">
          <BoxCard image={DigitalService} text={" خدمات دیجیتال"} />
          <BoxCard image={MarketFarm} text={"بازار کشاورزان"} />
          <BoxCard image={MoreServices} text={"سایر خدمات"} />
        </div>
      </div>
    </div>
  );
};

export default authRoute(
  PageWithHeader(
    Home,
    "left",
    "سامانه کشت قراردادی",
    <Image src={Myaccount} alt="myaccount" />
  )
);
