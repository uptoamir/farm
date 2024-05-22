import { InputBaseProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import React, { ChangeEventHandler } from "react";

type InputProps = {
  required?: boolean;
  id?: string;
  label?: React.ReactNode;
  defaultValue?: unknown;
  autoComplete?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  inputRef?: React.Ref<any>;
  placeholder?: string;
  autoFocus?: boolean;
  name?: string;
  select?: boolean;
  variant?: "outlined" | "filled" | "standard";
  size?: "small" | "medium";
  type?: React.InputHTMLAttributes<unknown>["type"];
  value?: unknown;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  className?: string;
  padding?: number;
  inputProps?: InputBaseProps["inputProps"];
};

const StyledInput = styled((props: InputProps) => <TextField {...props} />)(
  ({ padding }) => ({
    "& legend": {
      textAlign: "right !important",
    },

    "& .MuiInputLabel-root": {
      transformOrigin: "top right !important",
      lineHeight: "2em",
    },

    "& .MuiInputLabel-formControl": {
      left: "unset !important",
      right: "0 !important",
      marginRight: "4px",

      "&.MuiInputLabel-outlined": {
        right: "25px !important",
      },
    },

    "& .MuiSvgIcon-root": {
      right: "unset",
      left: "10px",
    },

    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      "& .MuiSelect-select": {
        paddingRight: "12px !important",
        minHeight: "unset",
        padding: `${padding}px 0`,
      },
    },
  })
);

export default StyledInput;
