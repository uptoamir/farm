import { Slider, Typography, useTheme } from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";

export type CustomizeSliderProps = {
  defaultAmount: number;
  minAmount: number;
  maxAmount: number;
  steps: number;
  selectedAmount: number;
  setAmount: Dispatch<SetStateAction<number>>;
  unit: string;
};

const CustomizeSlider: FC<CustomizeSliderProps> = ({
  defaultAmount,
  selectedAmount,
  maxAmount,
  minAmount,
  setAmount,
  steps,
  unit,
}) => {
  const theme = useTheme();

  const handleRevertedAmount = (
    event: Event,
    setAmount: Dispatch<SetStateAction<number>>
  ) => {
    const target = event.target as HTMLInputElement;
    setAmount(maxAmount - (target.value as unknown as number) + minAmount);
  };

  return (
    <div
      className="flex flex-row items-center justify-between gap-5"
      style={{ width: "85%" }}
    >
      <Slider
        track="inverted"
        size="medium"
        aria-label="Area"
        sx={{ width: "80%" }}
        defaultValue={maxAmount - defaultAmount + minAmount}
        value={maxAmount - selectedAmount + minAmount}
        valueLabelDisplay="off"
        onChange={(e) => handleRevertedAmount(e, setAmount)}
        step={steps}
        marks
        min={minAmount}
        max={maxAmount}
      />
      <div
        className="flex flex-row gap-2 p-2 px-3 rounded-6 items-center justify-center"
        style={{ background: theme.palette.secondary.light }}
      >
        <Typography sx={{ width: 15 }} className="text-center" variant="body1">
          {selectedAmount}
        </Typography>
        <Typography color={theme.palette.secondary.main} variant="body1">
          {unit}
        </Typography>
      </div>
    </div>
  );
};
export default CustomizeSlider;
