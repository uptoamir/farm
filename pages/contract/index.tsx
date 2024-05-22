import { useRouter } from "next/router";
import { useTheme } from "@mui/material/styles";
import React, { useRef, useEffect } from "react";
import { NextPage } from "next/types";
import { reportScroll } from "src/core/utils/gaReporters";
import Image from "next/image";
import Arrow from "public/assets/arrow.svg";
import InfoBox from "src/features/Contract/components/InfoBox";
import Button from "src/core/components/Button";
import { getUserInfoQuery } from "src/features/Contract/api/hooks";
import Loading from "src/core/components/Loading";
import { useDispatch } from "react-redux";
import { setUser } from "src/core/redux/slices/userFarmsReducer";
import { FARMS } from "src/core/routes";
import PageWithHeader from "src/core/components/PageWithHeader";

const Contract: NextPage = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const theme = useTheme();

  const ref = useRef(null);

  const { isFetching, data: userInfo } = getUserInfoQuery();

  useEffect(() => {
    if (userInfo) {
      dispatch(setUser(userInfo));
    }
  }, [userInfo]);

  const handleMap = (userInfo: any) => {
    const temp = {
      title: "",
      content: [
        { key: "نام", value: userInfo["user"]["first_name"], columns: true },
        {
          key: "نام خانوادگی",
          value: userInfo["user"]["last_name"],
          columns: true,
        },
        {
          key: "نام پدر",
          value: userInfo["natural_data"]["father_name"],
          columns: true,
        },
        {
          key: "کد ملی",
          value: userInfo["natural_data"]["national_id"],
          columns: true,
        },
        {
          key: "شماره همراه",
          value: userInfo["user"]["phone_number"],
          columns: true,
        },
      ],
    };
    return [temp];
  };

  return (
    <div
    className="flex flex-col flex-1 justify-start">
      {isFetching && <Loading />}
      {!isFetching && userInfo && (
          <div
            style={{
              backgroundColor: theme.palette.background.default,
            }}
            className="flex flex-col flex-1 items-center overflow-hidden relative no-scrollbar"
          >
            <div
              ref={ref}
              className="flex flex-col flex-1 justify-between w-full max-w-3xl px-4 no-scrollbar"
              onScrollCapture={(e) => {
                reportScroll("HomePage", e);
              }}
              id="SwipeScroll"
            >
              <InfoBox data={handleMap(userInfo)} confirm={false} />
              <Button
                variant="primary"
                className="rounded-12 m px-4 py-4"
                fontWeight={500}
                onClick={() => router.push(FARMS)}
              >
                استعلام اطلاعات از جهادکشاورزی
              </Button>
            </div>
        </div>
      )}
    </div>
  );
};

export default PageWithHeader(
  Contract,
  "right",
  "اطلاعات شخصی کشاورز",
  <Image src={Arrow} alt="arrow" />,
  "back"
);
