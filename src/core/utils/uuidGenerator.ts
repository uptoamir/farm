import { v4 as uuid } from "uuid";

export const getCookies = () =>
  Object.fromEntries(
    document.cookie
      .split("; ")
      .map((v) => v.split(/=(.*)/s).map(decodeURIComponent))
  );

export const uuidGenerator = () => {
  if (!getCookies().uuid) {
    const t = new Date();
    t.setTime(t.getTime() + 31556952000);
    document.cookie = `uuid = ${uuid()}; path=/; expires=${t.toUTCString()};`;
  }
};
