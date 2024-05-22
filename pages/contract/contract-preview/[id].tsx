import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useTheme } from "@mui/material/styles";
import React, { useRef, useState } from "react";
import { NextPage } from "next/types";
import { reportScroll } from "src/core/utils/gaReporters";
import Image from "next/image";
import Arrow from "public/assets/arrow.svg";
import Button from "src/core/components/Button";
import Checkbox from "@mui/material/Checkbox";
import Preview from "src/features/Contract/components/Preview";
import FinalizedContractModal from "src/features/Home/components/FinalizedContractModal";
import {
  useFinalContractMutation,
  getContractPreviewQuery,
} from "src/features/Contract/api/hooks";
import PageWithHeader from "src/core/components/PageWithHeader";
import { useReduxSelector } from "src/core/utils/customHooks/reduxHooks";

const Typography = dynamic(() => import("@mui/material/Typography"), {
  suspense: true,
});

const label = { inputProps: { "aria-label": "Checkbox" } };

const ContractPreview: NextPage = () => {
  const router = useRouter();

  const { id } = router.query;

  const theme = useTheme();

  const ref = useRef(null);

  const [open, setOpen] = useState<boolean>(false);

  const [termsChecked, setTermsChecked] = useState<boolean>(false);

  const [downloadLink, setDownloadLink] = useState<string>("");

  const { mutate: patchFinalContract } = useFinalContractMutation();

  const userFarms = useReduxSelector((state) => state.userFarms);

  const { isFetching, data: ContractPreviewInfo } = getContractPreviewQuery({
    contract_id: id && id.toString(),
  });

  const handleSubmit = () => {
    patchFinalContract(
      {
        data: {
          id: id && id.toString(),
        },
      },
      {
        onSuccess(data) {
          setDownloadLink(data.data.file);
          setOpen(true);
        },
        onError(error) {
          
        }
      }
    );
  };

  return (
    <div
      className="flex flex-col flex-1 items-center pt-4"
      style={{ backgroundColor: theme.palette.background.default }}
    >
      <div
        ref={ref}
        className="flex flex-col flex-1 justify-between w-full max-w-3xl px-4 mb-2 no-scrollbar"
        onScrollCapture={(e) => {
          reportScroll("HomePage", e);
        }}
        id="SwipeScroll"
      >
        <div>
          <FinalizedContractModal
            open={open}
            setOpen={setOpen}
            downloadLink={downloadLink}
          />
          <Preview
            product={userFarms.chosenFarm?.product.name}
            preview={ContractPreviewInfo?.preview}
          />
          <div
            className="flex justify-start items-center rounded-12 px-2 py-1 mt-6"
            style={{ backgroundColor: theme.palette.background.grey }}
          >
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
              sx={{ fontWeight: 500 }}
              variant="h4"
              className="px-2"
            >
              کلیه{" "}
              <a style={{ color: theme.palette.text.link }}>قوانین و مقررات</a>{" "}
              را خوانده ام و آنها را می پذیرم
            </Typography>
          </div>
        </div>
        <div className="flex w-full mt-4">
          <Button
            variant="primary"
            className="flex-1 rounded-[15px] px-4 py-2 ml-3"
            disabled={!termsChecked}
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
  );
};

export default PageWithHeader(
  ContractPreview,
  "right",
  "پیش نمایش قرارداد",
  <Image src={Arrow} alt="arrow" />,
  "back"
);
