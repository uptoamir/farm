export const findQueryId = (str: string) => {
  const regexpQuotes = /.*lead=(\d+).*/;
  if (str.match(regexpQuotes)?.[1]) return str.match(regexpQuotes)?.[1];
  else return false;
};
