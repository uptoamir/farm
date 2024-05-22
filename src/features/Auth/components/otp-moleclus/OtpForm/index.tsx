import React, { useState } from "react";
import classnames from "classnames";
import OtpInputs from "../OtpInputs";
import Timer from "../Timer";
import Button from "src/core/components/Button";
import {
  PropsFormComponents,
  FormItemType,
} from "../../../../../core/types/FormItemtypes";

type IOtpFormProps = {
  sendCodeAgain: () => void;
  field?: FormItemType[];
  setField: (value: FormItemType[]) => void;
};
type IOtpProps = PropsFormComponents & IOtpFormProps;

const initialExpiredTimeValue = {
  minute: 1,
  second: undefined,
};
const OtpForm: React.FC<IOtpProps> = ({
  onSubmitForm,
  sendCodeAgain,
  className,
  field,
  setField,
  ...props
}) => {
  const [isSxpiredTime, setIsExpiredTime] = useState(false);
  const [expiredTimeData, setExpiredTimeData] = useState<{
    minute: undefined | number;
    second: undefined | number;
  }>(initialExpiredTimeValue);
  return (
    <div
      className={classnames(
        "flex flex-col items-center w-full justify-center",
        className
      )}
      style={{ maxWidth: "80%" }}
    >
      <OtpInputs
        numInputs={4}
        onSubmitForm={(values: string | number) => onSubmitForm(values)}
        expiredTime={isSxpiredTime}
        field={field}
        setField={setField}
      />
      <div className="flex w-full">
        {/* {!isSxpiredTime && ( */}
        <div className="text-18 flex mt-4 font-normal mx-auto w-full justify-start">
          <Timer
            finishHandler={(value: boolean) => {
              if (value) {
                setIsExpiredTime(true);
              }
            }}
            minute={expiredTimeData.minute}
            second={expiredTimeData.second}
          />
        </div>
        <Button
          className="mt-3 mx-auto font-bold text-16 w-44 !justify-end ml-4"
          variant="inherit"
          small={true}
          disabled={!isSxpiredTime}
          onClick={() => {
            setIsExpiredTime(false);
            setExpiredTimeData({ ...initialExpiredTimeValue });
            sendCodeAgain();
          }}
        >
          ارسال مجدد
        </Button>
      </div>
    </div>
  );
};

export default OtpForm;
