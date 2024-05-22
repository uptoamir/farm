import { Typography, useTheme } from "@mui/material";
import { FC } from "react";
import CustomizeSlider, {
  CustomizeSliderProps,
} from "src/core/components/CustomizeSlider";

type CultivationDeterminationPropsType = CustomizeSliderProps & {
  plotNumber: number;
  productName: string;
};

const CultivationDetermination: FC<CultivationDeterminationPropsType> = ({
  plotNumber,
  productName,
  unit,
  defaultAmount,
  maxAmount,
  minAmount,
  selectedAmount,
  setAmount,
  steps,
}) => {
  const theme = useTheme();

  return (
    <div className="flex flex-col gap-1.5 p-1">
      <Typography variant="body1">{`شماره قطعه ${plotNumber}: ${productName}`}</Typography>
      <div className="flex flex-row gap-2">
        <Typography variant="body1">حداکثر مقدار مجاز:</Typography>
        <Typography
          variant="body1"
          color={theme.palette.text.warning}
        >{`${maxAmount} ${unit}`}</Typography>
      </div>
      <CustomizeSlider
        selectedAmount={selectedAmount}
        defaultAmount={defaultAmount}
        maxAmount={maxAmount}
        minAmount={minAmount}
        steps={steps}
        setAmount={setAmount}
        unit={unit}
      />
    </div>
  );
};
export default CultivationDetermination;
