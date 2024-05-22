import { FC, LegacyRef, RefObject } from "react";

export enum TEXT_FIELD_TYPE {
  TEXT = "text",
  PASSWORD = "password",
  TEXTAREA = "textarea",
  NUMBER = "number",
  EMAIL = "email",
}

export type PropsFormComponents = {
  className?: string;
  onSubmitForm?: (() => void | undefined) | undefined | any;
  children?: React.ReactNode;
  formClassName?: string;
};

export type FormItemType = {
  itemName: string;
  label?: string;
  nextRef?: RefObject<
    HTMLDivElement | HTMLButtonElement | HTMLElement | HTMLInputElement
  >;
  prevRef?: RefObject<
    HTMLDivElement | HTMLButtonElement | HTMLElement | HTMLInputElement
  >;
  ref?:
    | RefObject<HTMLDivElement | HTMLInputElement>
    | LegacyRef<HTMLInputElement>;
  autoFocused?: boolean;
  validation?: Function;
  onKeyPress?: Function;
  disabled?: boolean;
  inputProps?: {};
  iconName?: string;
  type: TEXT_FIELD_TYPE;
  value?: string;
  className?: string;
};
