import React, { useState, FC, useEffect, createRef } from "react";
// import Button, { BTN_TYPE, BTN_HTML_TYPE } from 'src/core/atoms/Button';
import {
  FormItemType,
  TEXT_FIELD_TYPE,
} from "../../../../../core/types/FormItemtypes";
import {
  PersianToEnglishNumber,
  EnglishToPersianNumber,
} from "src/core/utils/number";
import Button from "src/core/components/Button";
import { BTN_HTML_TYPE } from "src/core/components/Button";

export interface IOtpInputProps {
  code?: string;
  numInputs: number;
  onSubmitForm: Function;
  expiredTime: boolean;
  field?: FormItemType[];
  setField: (value: FormItemType[]) => void;
}

const Otpinput: FC<IOtpInputProps> = ({
  numInputs,
  onSubmitForm,
  expiredTime,
  field,
  setField,
  ...props
}) => {
  const nodes = Array.apply(null, Array(numInputs)).map((val) =>
    createRef<HTMLInputElement>()
  );

  const createNodesField: (numInput: number) => FormItemType[] = (
    numInput: number
  ) => {
    let result = Array.apply(null, Array(numInputs)).map((val, idx) => {
      return {
        itemName: "number" + idx,
        ref: nodes[idx],
        nextRef: nodes[idx + 1],
        prevRef: idx > 0 ? nodes[idx - 1] : nodes[0],
        type: TEXT_FIELD_TYPE.TEXT,
      };
    });
    return result;
  };
  //   const [field, setField] = useState<FormItemType[]>();

  useEffect(() => {
    setField(createNodesField(numInputs));
  }, []);

  const handleInputsValue = (name: string, value: string) => {
    let field_tmp = field || [];
    field_tmp = field_tmp?.map((input) => {
      if (input.itemName === name) {
        input.value = EnglishToPersianNumber(value);
      }
      return input;
    });
    setField([...field_tmp]);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: FormItemType
  ) => {
    const { name, value } = e.target;
    if (!isNaN(+value)) {
      handleInputsValue(name, value);
      // @ts-ignore
      if (e.nativeEvent.inputType != "deleteContentBackward") {
        item.nextRef && item.nextRef.current?.focus();
      } else {
        item.prevRef && item.prevRef.current?.focus();
      }
    }
  };
  const handleOnKeyDown = (e: React.KeyboardEvent, item: FormItemType) => {
    let reg = "^Digit";
    let regexp = new RegExp(reg);
    if (e.code === "Backspace" && !item.value) {
      item.prevRef && item.prevRef.current?.focus();
    }
    if (regexp.test(e.code) && item.value) {
      handleInputsValue(item.itemName as string, e.key);
      item.nextRef && item.nextRef.current?.focus();
    }
  };

  return (
    <form className="w-full flex justify-center">
      <div className="dir-ltr flex justify-between w-full">
        {field?.map((item, idx) => (
          <input
            key={idx}
            name={item.itemName}
            type="text"
            className="otpInput !w-10 sm:!w-10 m-0 mx-2 xs:m-3 sm:mx-4"
            ref={item.ref as React.LegacyRef<HTMLInputElement>}
            onChange={(e) => handleChange(e, item)}
            maxLength={1}
            onKeyDown={(e: React.KeyboardEvent) => handleOnKeyDown(e, item)}
            value={item.value}
          />
        ))}
      </div>
    </form>
  );
};

export default Otpinput;
