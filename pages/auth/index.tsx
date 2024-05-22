import { useTheme } from "@mui/material/styles";
import React, { useRef } from "react";
import { NextPage } from "next/types";
import { reportScroll } from "src/core/utils/gaReporters";
import Image from "next/image";
import InfoBox from "src/features/Contract/components/InfoBox";
import Loading from "src/core/components/Loading";
import CultivationDeterminationBottomSheet from "src/features/Home/Containers/CultivationDeterminationBottomSheet";
import useFarmsInfo from "src/features/Contract/utils/customHooks/useFarmsInfo";
import PageWithHeader from "src/core/components/PageWithHeader";
import Farmer from "public/assets/auth-intro.svg";
import Arrow from "public/assets/arrow-left.svg";
import GTCLogo from "public/assets/GTC-logo.svg";
import Hamraheaval from "public/assets/hamraheaval.svg";
import Typography from "@mui/material/Typography";
import Link from "next/link";

const Farms: NextPage = () => {
  const theme = useTheme();

  const ref = useRef(null);

  return (
    <div
      className="relative flex flex-col justify-start pb-4 min-h-screen"
      style={{
        backgroundColor: theme.palette.background.default,
      }}
    >
      <div
        className="flex flex-col flex-1"
        style={{
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <div
          style={{ backgroundColor: theme.palette.background.default }}
          className="flex flex-col flex-1 justify-start items-center overflow-hidden relative no-scrollbar"
        >
          <div
            ref={ref}
            className="flex flex-col flex-1 items-center justify-between w-full max-w-3xl px-4 no-scrollbar"
            style={{
              backgroundColor: theme.palette.background.default,
            }}
            onScrollCapture={(e) => {
              reportScroll("HomePage", e);
            }}
            id="SwipeScroll"
          >
            <div className="flex flex-col items-center w-full pt-10">
              <Image
                src={Farmer}
                className="w-auto sm:w-[22rem]"
                alt="farmer"
              />
              <div className="flex flex-col items-start">
                <Typography
                  color="black"
                  variant="h1"
                  sx={{
                    marginRight: "0.25rem",
                    fontSize: { xs: "12px", sm: "14px" },
                    fontFamily: "dana-FaNum",
                    fontWeight: "600",
                  }}
                  className="flex pt-9"
                >
                  نرم افزار جامع کشت قراردادی
                </Typography>
                <Typography
                  color="black"
                  variant="h3"
                  sx={{
                    marginRight: "0.25rem",
                    fontSize: { xs: "12px", sm: "14px" },
                    fontFamily: "dana-FaNum",
                    fontWeight: "200",
                    lineHeight: "24px",
                  }}
                  className="flex justify-center items-center pt-7 text-justify pl-12"
                >
                  در راستای توسعه‌ کشت‌ قراردادی و به منظور افزایش سود
                  تولیدکننده، حذف واسطه‌ها، افزایش کیفیت محصولات و کاهش ریسک
                  بازار و تولید ایجاد شده است
                </Typography>
              </div>
              <div className="self-start pt-12 flex flex-row-reverse">
                <Link href="/auth/phone" className="pr-3">
                  <Typography
                    color="primary"
                    variant="h3"
                    sx={{
                      marginRight: "0.25rem",
                      fontSize: { xs: "16px", sm: "18px" },
                      fontWeight: "600",
                      fontFamily: "dana-FaNum",
                    }}
                    className="border-b-1"
                  >
                    بعدی
                  </Typography>
                </Link>
                <Image src={Arrow} className="" alt="farmer" />
              </div>
            </div>
            <div className="flex">
              <Image src={Hamraheaval} className="ml-5" alt="Hamraheaval" />
              <Image src={GTCLogo} className="" alt="GTC" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Farms;
