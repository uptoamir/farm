import { useRouter } from "next/router";
import { useTheme } from "@mui/material/styles";
import React, { useRef } from "react";
import { NextPage } from "next/types";
import { reportScroll } from "src/core/utils/gaReporters";
import Image from "next/image";
import Arrow from "public/assets/arrow.svg";
import InfoBox from "src/features/Contract/components/InfoBox";
import Button from "src/core/components/Button";
import { useReduxSelector } from "src/core/utils/customHooks/reduxHooks";
import { ESTIMATION } from "src/core/routes";
import { UserFarmsType } from "src/core/redux/slices/userFarmsReducer";
import { useContractDraftMutation } from "src/features/Contract/api/hooks";
import PageWithHeader from "src/core/components/PageWithHeader";

const InfoCheck: NextPage = () => {
  const router = useRouter();

  const theme = useTheme();

  const ref = useRef(null);

  const userFarms = useReduxSelector((state) => state.userFarms);

  const { mutate: postContractDraft } = useContractDraftMutation();

  const handleMap: (userFarms: UserFarmsType) => Array<InfoBoxItem> = (userFarms) => {
    return [
      {
        title: "اطلاعات شخصی کشاورز",
        content: [
          {
            key: "نام",
            value: userFarms.user.user.first_name,
            columns: true,
          },
          {
            key: "نام خانوادگی",
            value: userFarms.user.user.last_name,
            columns: true,
          },
          {
            key: "نام پدر",
            value: userFarms.user.natural_data.father_name,
            columns: true,
          },
          {
            key: "کد ملی",
            value: userFarms.user.natural_data.national_id,
            columns: true,
          },
          {
            key: "شماره همراه",
            value: userFarms.user.user.phone_number,
            columns: true,
          },
        ],
      },
      {
        title: "اطلاعات زمین کشاورزی",
        content: [
          {
            key: "نام مرکز جهاد کشاورزی",
            value: userFarms.chosenFarm?.jahad_name,
            columns: true,
          },
          {
            key: "نوع کشت",
            value: userFarms.chosenFarm?.cultivation_type?.name,
            columns: true,
          },
          {
            key: "نام کالا",
            value: userFarms.chosenFarm?.product.name,
            columns: true,
          },
          {
            key: "سطح زیر کشت انتخاب شده",
            value: `${userFarms.chosenFarm?.sections.reduce(
              (accumulator: any, currentValue: any) =>
                accumulator + currentValue.value,
              0
            )} هکتار`,
            columns: true,
          },
          {
            key: "آدرس زمین کشاورزی",
            value: userFarms.chosenFarm?.address.location,
            columns: false,
          },
        ],
      },
    ];
  };

  const handleSubmit = () => {
    const sections_data: Array<Section> = [];
    userFarms.chosenFarm?.sections.map((element: any) =>
      sections_data.push({ id: element.id, used_capacity: element.value })
    );
    postContractDraft(
      {
        data: {
          farm: userFarms.chosenFarm?.id,
          sections_data,
        },
      },
      {
        onSuccess(data) {
          router.push(`${ESTIMATION}/${data.data.id}`);
        },
      }
    );
  };

  return (
    <>
      <div
        style={{ backgroundColor: theme.palette.background.default }}
        className="flex flex-col flex-1"
      >
        <div
          style={{
            backgroundColor: theme.palette.background.default,
          }}
          className="flex flex-col items-center flex-1 overflow-hidden no-scrollbar"
        >
          <div
            ref={ref}
            className="flex flex-col flex-1 justify-between w-full max-w-3xl px-4 mb-2 no-scrollbar"
            onScrollCapture={(e) => {
              reportScroll("HomePage", e);
            }}
            id="SwipeScroll"
          >
            <InfoBox data={handleMap(userFarms)} confirm={false} />
            <div className="flex w-full rounded-12 py-2 min-w-full">
              <Button
                variant="primary"
                className="flex-1 rounded-[15px] px-4 py-2 ml-3"
                onClick={() => handleSubmit()}
              >
                تایید و ادامه
              </Button>
              <Button
                variant="inherit"
                outlined
                outlinedColor={theme.palette.primary.main}
                outlinedWidth={2}
                className="flex-1 rounded-[15px] px-4 py-2"
                onClick={() => router.back()}
              >
                بازگشت
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageWithHeader(
  InfoCheck,
  "right",
  "بررسی اطلاعات",
  <Image src={Arrow} alt="arrow" />,
  "back"
);
