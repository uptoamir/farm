/* eslint-disable no-use-before-define */
/* eslint-disable prefer-template */
export const getFormattedDate = (selectedDate?: Date) => {
  if (!selectedDate) return;
  return (
    String(selectedDate.getFullYear()) +
    "-" +
    String(selectedDate.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(selectedDate.getDate()).padStart(2, "0")
  );
};

export const getNDaysFrom = (days: number, baseDay?: Date) => {
  let date;
  if (!baseDay) date = new Date();
  else date = new Date(baseDay.getTime());
  date.setDate(date.getDate() + days);
  return date;
};

export const getRelativeFarsiDate = (date: Date | string) => {
  return date.toString();
};

/* eslint-disable no-loop-func */
export const divideHoursOfDay = (unit: number) => {
  const remind = 60 / unit;
  const clocks = [];
  for (let i = 8; i < 24; i++) {
    for (let j = 0; j < unit; j++) {
      if (j === 0) {
        clocks.push(`${i}:00`);
      } else {
        clocks.push(`${i}:${remind * j}`);
      }
    }
  }
  return clocks;
};

// eslint-disable-next-line max-statements
export const plusHour = (time: any, amount: number) => {
  const plus = 60 / amount;
  const minutes = time.split(":")[1];
  const hour = time.split(":")[0];
  let new_time = "";

  if (plus === 1) {
    new_time = `${parseInt(hour) + 1}:${minutes}`;
  } else if (plus === 2) {
    if (minutes + 30 >= 60) {
      new_time = `${parseInt(hour) + 1}:00`;
    } else {
      new_time = `${hour}:${parseInt(minutes) + 30}`;
    }
  } else if (plus === 4) {
    if (minutes < 45) {
      new_time = `${hour}:${parseInt(minutes) + 15}`;
    } else {
      new_time = `${parseInt(hour) + 1}:00`;
    }
  }

  return new_time;
};

export const getCustomFormatDayJalali = (
  inputValue: any,
  format = "jYYYY/jM/jD"
) => {
  if (!inputValue) return "";
  const inputFormat = format;
  return inputValue.locale("fa").format(inputFormat);
};

export const namedDate = (day: string) => {
  let today: string | Date = new Date();
  let tomorrow: string | Date = new Date(today);
  let yesterday: string | Date = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  yesterday.setDate(yesterday.getDate() - 1);
  today = today.toDateString();
  tomorrow = tomorrow.toDateString();
  yesterday = yesterday.toDateString();

  const result = day;
  switch (day) {
    case today:
      return "امروز";
    case tomorrow:
      return "فردا";
    case yesterday:
      return "دیروز";
  }
  return getDateTimeRtlFormat(result);
};

export const dateToJalali = (date: Date) => {
  const dateStr = date
    .toLocaleDateString("fa-IR")
    .replace(/([۰-۹])/g, (token) =>
      String.fromCharCode(token.charCodeAt(0) - 1728)
    );
  return dateStr
    .split("/")
    .map((item: string) => {
      if (item.length === 1) {
        return "0" + item;
      } else return item;
    })
    .join("/");
};

export const getDateTimeFormatISO = (date: string) => {
  const options = {
    hour: "numeric",
    minute: "numeric",
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  };
  if (typeof date === "string" && date.includes("USDT")) return date;
  const convertDate = getCustomeFormatISO(date, options);
  if (convertDate === "Invalid Date") return date;
  return convertDate;
};

export const getDateFormatISO = (date: string) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  // eslint-disable-next-line no-use-before-define
  return getCustomeFormatISO(date, options);
};
export const getCustomeFormatISO = (date: string, options: any) => {
  const convertDate = new Date(Date.parse(date)).toLocaleDateString(
    "fa-IR",
    options
  );
  return convertDate;
};

const setFormatDigitClock = (digit: number) => {
  if (!digit) return "00";
  return digit < 10 ? "0" + digit : digit;
};

export const getTimeFormatISO = (date: string) => {
  const nw = new Date(Date.parse(date));
  return (
    setFormatDigitClock(nw.getHours()) +
    ":" +
    setFormatDigitClock(nw.getMinutes())
  );
};

export const getCustomeFormatRtlISO = (date: string) => {
  return (
    getCustomeFormatISO(date, { weekday: "long" }) +
    " " +
    getCustomeFormatISO(date, { day: "numeric" }) +
    " " +
    getCustomeFormatISO(date, { month: "long" }) +
    " " +
    getCustomeFormatISO(date, { year: "numeric" })
  );
};

export const getCustomFormatRtlISONumeric = (date: string) => {
  return (
    getCustomeFormatISO(date, { year: "numeric" }) +
    "/" +
    getCustomeFormatISO(date, { month: "numeric" }) +
    "/" +
    getCustomeFormatISO(date, { day: "numeric" })
  );
};

export const getDateTimeRtlFormat = (date: string) => {
  return (
    getCustomeFormatISO(date, { day: "numeric" }) +
    " " +
    getCustomeFormatISO(date, { month: "long" })
  );
};

export const relativeTimeFormat = (date: string) => {
  const now = new Date();
  const duration = (new Date(Date.parse(date)).getTime() - now.getTime()) / 60;
  const rtf = new Intl.RelativeTimeFormat("fa", {
    localeMatcher: "best fit",
    numeric: "auto",
    style: "short",
  });
  return rtf.format(duration, "minutes");
};

export const remainingTimeFromNow = (date: string) => {
  const end_time = new Date(date).getTime();
  const start_time = new Date().getTime();
  const result: {
    days?: number;
    minute?: number;
    second?: number;
  } = {};
  result.days = Math.round((end_time - start_time) / (1000 * 60 * 60 * 24));
  result.minute = Math.floor((end_time - start_time) / (60 * 1000));
  result.second = Math.floor(((end_time - start_time) % (1000 * 60)) / 1000);
  return result;
};
