import { useTheme } from "@mui/material/styles";
import React, { useEffect, useRef, useState } from "react";
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
import { HOME, PHONE } from "src/core/routes";
import OtpForm from "src/features/Auth/components/otp-moleclus/OtpForm";
import { FormItemType } from "../../src/core/types/FormItemtypes";
import { useLoginMutation } from "src/features/Auth/api/hooks";
import { PersianToEnglishNumber } from "src/core/utils/number";
import { USER_TOKEN_KEY } from "src/core/constants";

const tabInputLabel: { [id: string]: string } = {
  0: "شماره ملی",
  1: "شناسه ملی",
};

const Farms: NextPage = () => {
  const theme = useTheme();

  const ref = useRef(null);

  const router = useRouter();

  const { phone } = router.query;

  const { mutate: postLogin } = useLoginMutation();

  const tabNumberCounter: () => number = () => {
    if (router.asPath.split("#").length > 1)
      if (2 > parseInt(router.asPath.split("#")[1]))
        return parseInt(router.asPath.split("#")[1]);
    return 0;
  };

  const [field, setField] = useState<FormItemType[]>();

  const handleSendCodeAgain = () => {};

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    let result = field?.map((item) => item.value).join("");
    postLogin(
      {
        data: {
          phone_number: phone && phone.toString(),
          otp: PersianToEnglishNumber(result ?? ""),
        },
      },
      {
        onSuccess(data) {
          console.log(data);
          localStorage?.setItem(USER_TOKEN_KEY, data?.data?.access);
          // router.push(HOME);
        },
      }
    );
  };

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
              <Image src={Phone} className="w-auto sm:w-[22rem]" alt="farmer" />
              <div className="flex flex-col self-start w-full">
                <div className="flex justify-between items-baseline">
                  <Typography
                    color="black"
                    variant="h1"
                    sx={{
                      marginRight: "0.25rem",
                      fontSize: { xs: "16px", sm: "16px" },
                      fontFamily: "dana-FaNum",
                      fontWeight: "600",
                    }}
                    className="flex pt-12"
                  >
                    کد احراز هویت
                  </Typography>
                  <Link href="/auth/phone" className="pr-3">
                    <Typography
                      color="primary"
                      variant="h3"
                      sx={{
                        marginRight: "0.25rem",
                        fontSize: { xs: "14px", sm: "14px" },
                        fontWeight: "600",
                      }}
                      className="border-b-1 pb-[1px]"
                    >
                      اصلاح شماره تلفن
                    </Typography>
                  </Link>
                </div>
                <Typography
                  color="black"
                  variant="h3"
                  sx={{
                    marginRight: "0.25rem",
                    fontSize: { xs: "16px", sm: "16px" },
                    fontFamily: "dana-FaNum",
                    fontWeight: "200",
                    lineHeight: "24px",
                  }}
                  className="flex justify-start items-center pt-7 text-justify"
                >
                  کد ارسال شده به شماره همراه خود را وارد کنید
                </Typography>
              </div>
              <div className="pt-3 flex flex-row-reverse justify-center w-full">
                <OtpForm
                  onSubmitForm={(values: any) => console.log(values)}
                  sendCodeAgain={() => handleSendCodeAgain()}
                  field={field}
                  setField={setField}
                />
              </div>
            </div>
            <div className="flex w-full">
              <Button
                variant="primary"
                className="rounded-12 px-4 py-4 w-full"
                fontWeight={500}
                onClick={(e) => handleSubmit(e)}
              >
                ورود
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Farms;
