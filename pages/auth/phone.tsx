import { useTheme } from "@mui/material/styles";
import React, { useRef, useState } from "react";
import { NextPage } from "next/types";
import { reportScroll } from "src/core/utils/gaReporters";
import Image from "next/image";
import InfoBox from "src/features/Contract/components/InfoBox";
import Loading from "src/core/components/Loading";
import CultivationDeterminationBottomSheet from "src/features/Home/Containers/CultivationDeterminationBottomSheet";
import useFarmsInfo from "src/features/Contract/utils/customHooks/useFarmsInfo";
import PageWithHeader from "src/core/components/PageWithHeader";
import Phone from "public/assets/auth-phone.svg";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import CustomTab from "src/core/components/CustomTab";
import { useRouter } from "next/router";
import StyledInput from "src/core/components/StyledInput";
import Checkbox from "@mui/material/Checkbox";
import Button from "src/core/components/Button";
import { HOME, NATIONALID } from "src/core/routes";
import { regexIRIWithZero } from "src/core/utils/regex";

const label = { inputProps: { "aria-label": "Checkbox" } };

const Farms: NextPage = () => {
  const theme = useTheme();

  const ref = useRef(null);

  const router = useRouter();

  const [termsChecked, setTermsChecked] = useState<boolean>(false);

  const tabNumberCounter: () => number = () => {
    if (router.asPath.split("#").length > 1)
      if (2 > parseInt(router.asPath.split("#")[1]))
        return parseInt(router.asPath.split("#")[1]);
    return 0;
  };

  const tabNumber = tabNumberCounter();

  const handleChangeIndex = (index: number) => {
    router.replace({ hash: `${index}` });
  };

  const [phone, setPhone] = useState<string>("");

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
            <div className="flex flex-col items-center w-full">
              <CustomTab
                items={["حقیقی", "حقوقی"]}
                currentTab={tabNumber}
                onChange={(event: React.SyntheticEvent, newValue: number) => {
                  handleChangeIndex(newValue);
                }}
              />
              <Image
                src={Phone}
                className="w-auto sm:w-[22rem] pt-8"
                alt="farmer"
              />
              <div className="flex flex-col self-start">
                <Typography
                  color="black"
                  variant="h1"
                  sx={{
                    marginRight: "0.25rem",
                    fontSize: { xs: "14px", sm: "16px" },
                    fontFamily: "dana-FaNum",
                    fontWeight: "700",
                  }}
                  className="flex pt-10"
                >
                  ورود به سامانه
                </Typography>
                <Typography
                  color="black"
                  variant="h3"
                  sx={{
                    marginRight: "0.25rem",
                    fontSize: { xs: "12px", sm: "14px" },
                    fontFamily: "dana-FaNum",
                    fontWeight: "400",
                    lineHeight: "24px",
                  }}
                  className="flex justify-center items-center pt-3 text-justify"
                >
                  شماره همراه خود را جهت ورود وارد کنید
                </Typography>
              </div>
              <div className="self-start pt-2 flex flex-row-reverse w-full">
                <StyledInput
                  padding={25}
                  name="name"
                  id="outlined-name"
                  value={phone}
                  autoFocus
                  onChange={(e) => setPhone(e.target.value)}
                  label="شماره همراه"
                  sx={{ width: "100%", marginTop: 2 }}
                  inputProps={{
                    style: {
                      height: "29px",
                      color: theme.palette.common.black,
                    },
                  }}
                />
              </div>
              <div className="flex justify-start items-center rounded-12 py-3 self-start">
                <Checkbox
                  {...label}
                  color="primary"
                  checked={termsChecked}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setTermsChecked(event.target.checked)
                  }
                />
                <Typography
                  color="text.black"
                  sx={{ fontWeight: 500, fontSize: { xs: "12px", sm: "14px" } }}
                  variant="h4"
                >
                  کلیه{" "}
                  <a style={{ color: theme.palette.text.link }}>
                    قوانین و مقررات
                  </a>{" "}
                  را خوانده ام و آنها را می پذیرم
                </Typography>
              </div>
            </div>
            <div className="flex w-full">
              <Button
                variant="primary"
                className="rounded-12 px-4 py-4 w-full"
                fontWeight={500}
                disabled={!termsChecked || !regexIRIWithZero.test(phone)}
                onClick={() =>
                  router.push({
                    pathname: NATIONALID,
                    hash: `${tabNumber}`,
                    query: { phone },
                  })
                }
              >
                تایید
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Farms;
