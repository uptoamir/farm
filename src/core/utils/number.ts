export const reverseString = (value: string): string =>
  value.split("").reverse().join("");

export const generateSegmentedNumber = (
  value: number | string,
  separator?: string
): string => {
  return reverseString(
    // eslint-disable-next-line prefer-template
    reverseString((value + "") as string)
      ?.match(/.{1,3}/g)
      ?.join(separator ?? ",") as string
  );
};

export const segmentedNumberToNumber = (
  value: string,
  seprator?: string
): number => {
  return Number(value.split(seprator ?? ",").join(""));
};

const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

export const PersianToEnglishNumber = (value: string): string => {
  if (typeof value !== "string") return "";
  let result = value.toString();
  for (let i = 0; i < 10; i++) {
    const replaceItem = new RegExp(persianNumbers[i], "g");
    result = result.replace(replaceItem, `${i}`);
  }
  return result;
};

const ObjectPersianNumbers: object | any = {
  0: "۰",
  1: "۱",
  2: "۲",
  3: "۳",
  4: "۴",
  5: "۵",
  6: "۶",
  7: "۷",
  8: "۸",
  9: "۹",
};
export const EnglishToPersianNumber = (
  value: string | number | null | undefined
): string | undefined => {
  if (value === undefined || value === null) return "";
  if (typeof value !== "string") value = value?.toString();

  let result = value.toString();

  const replaceItem = result.match(/[0-9]/g);
  if (replaceItem !== null && replaceItem.length !== 0) {
    for (let i = 0; i < replaceItem.length; i++)
      result = result.replace(
        replaceItem[i],
        ObjectPersianNumbers[replaceItem[i]]
      );
  }
  return result;
};

export const englishToTwoDigitPersianNumber = (num: number) => {
  return String(num)
    .padStart(2, "0")
    .split("")
    .map((n) => n)
    .join("");
};
