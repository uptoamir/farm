import classnames from "classnames";
import React from "react";
import { useState, useEffect, FC } from "react";

export interface ITimerProps {
  minute?: number;
  second?: number;
  href?: string;
  className?: string;
  children?: React.ReactNode;
  finishHandler?: (() => void | undefined) | undefined | any;
}

const Timer: FC<ITimerProps> = (props) => {
  const { minute = 0, second = 0, className, finishHandler, ...rest } = props;

  const [minutes, setMinutes] = useState<number>(minute);
  const [seconds, setSeconds] = useState<number>(second);
  const [finalMoments, setFinalMoments] = useState(false);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds <= 59 && minutes === 0) {
        setFinalMoments(true);
      }
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          finishHandler(true);
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <div>
      <div
        className={classnames(className ? className : "text-primary-base mx-4")}
        {...rest}
      >
        {" "}
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
    </div>
  );
};

export default Timer;
