/* eslint-disable max-statements */
import { Typography, useTheme } from "@mui/material";
import { FC } from "react";
import Modal from "src/core/components/Modal";
import CultivationDetermination from "../../components/ CultivationDetermination";
import Button from "src/core/components/Button";

type CultivationDeterminationBottomSheetProps = {
  sections: any;
  open: any;
  setOpen: any;
  handleChange: any;
  handleSubmit: any;
  unit?: string;
  massage?: string;
};

const CultivationDeterminationBottomSheet: FC<
  CultivationDeterminationBottomSheetProps
> = ({
  sections,
  open,
  setOpen,
  handleChange,
  handleSubmit,
  unit = "هکتار",
  massage = "لطفا مقدار سطح زیر کشت مد نظر خود را در سال زراعی 1402-1401 انتخاب نمایید.",
}) => {
  const theme = useTheme();

  return (
    <div>
      <Modal
        onClose={() => setOpen(false)}
        title="انتخاب سطح زیر کشت"
        show={open}
        variant="bottomSheet"
        snapHeight={"70vh"}
      >
        <Typography variant="body1" className="pb-2">
          کشاورز گرامی
        </Typography>
        <Typography
          className="tracking-zero leading-4 pb-2"
          variant="body1"
          sx={{ lineHeight: 2 }}
        >
          {massage}
        </Typography>
        {sections?.map((element: any, idx: number) => {
          return (
            <CultivationDetermination
              key={idx}
              plotNumber={1}
              productName={element.product.name}
              unit={unit}
              selectedAmount={element.value}
              defaultAmount={0}
              maxAmount={element.max_capacity}
              minAmount={element.min_capacity}
              steps={1}
              setAmount={(value) => handleChange(element.id, value)}
            />
          );
        })}
        <div
          className="flex flex-row gap-2 py-5 px-5 mt-2 mb-3 rounded-12 items-center justify-start"
          style={{ background: theme.palette.secondary.light }}
        >
          <Typography className="text-center" variant="body1">
            مجموع سطح انتخاب شده:
          </Typography>
          <Typography variant="h3">
            {`${sections?.reduce(
              (accumulator: any, currentValue: any) =>
                accumulator + currentValue.value,
              0
            )} ${unit}`}
          </Typography>
        </div>
        <Button
          variant="primary"
          className="px-1.5 py-3 rounded-8"
          fullWidth={true}
          onClick={() => handleSubmit()}
        >
          <Typography variant="h3">تایید</Typography>
        </Button>
      </Modal>
    </div>
  );
};

export default CultivationDeterminationBottomSheet;
