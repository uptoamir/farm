import moment from "jalali-moment";

const currentYear = moment().locale("fa").format("YYYY");
const leapCondition =
  moment.from(`14${currentYear}/12/30`, "fa", "YYYY/MM/DD").format("YY") ===
  "Invalid date"
    ? 29
    : 30;

type persianDateType = {
  name: string;
  numberOfDays: number;
};

const persianDates: Record<string, persianDateType> = {
  1: {
    name: "فروردین",
    numberOfDays: 31,
  },
  2: {
    name: "اردیبهشت",
    numberOfDays: 31,
  },
  3: {
    name: "خرداد",
    numberOfDays: 31,
  },
  4: {
    name: "تیر",
    numberOfDays: 31,
  },
  5: {
    name: "مرداد",
    numberOfDays: 31,
  },
  6: {
    name: "شهریور",
    numberOfDays: 31,
  },
  7: {
    name: "مهر",
    numberOfDays: 30,
  },
  8: {
    name: "آبان",
    numberOfDays: 30,
  },
  9: {
    name: "آذر",
    numberOfDays: 30,
  },
  10: {
    name: "دی",
    numberOfDays: 30,
  },
  11: {
    name: "بهمن",
    numberOfDays: 30,
  },
  12: {
    name: "اسفند",
    numberOfDays: leapCondition,
  },
};

export const dateGenerator = (currentMonth: string, numberOfMonth: number) => {
  const dates = [];
  const numberGenerator = (num: number) => {
    return num >= 10 ? num.toString() : `0${num}`;
  };
  for (
    let i: number = Number(currentMonth) - 1;
    i < Number(currentMonth) + numberOfMonth;
    i++
  ) {
    if (i < 0) {
      dates.push({
        year: Number(currentYear) - 1,
        month: { name: persianDates[12].name, number: "12" },
        days: [...Array(persianDates[12].numberOfDays).keys()],
      });
    } else if (i <= 12) {
      dates.push({
        year: Number(currentYear),
        month: {
          name: persianDates[i.toString()].name,
          number: numberGenerator(i),
        },
        days: [...Array(persianDates[i].numberOfDays).keys()],
      });
    } else
      dates.push({
        year: Number(currentYear) + 1,
        month: {
          name: persianDates[(i - 12).toString()].name,
          number: numberGenerator(i - 12),
        },
        days: [...Array(persianDates[i - 12].numberOfDays).keys()],
      });
  }
  return dates;
};
