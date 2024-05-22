export const regexIRI: RegExp = new RegExp("^\\d{9}$");
export const regexIRIWithZero: RegExp = new RegExp(
  "^[\u06F0][\u06F0-\u06F9]{3}[\u06F0-\u06F9]{3}[\u06F0-\u06F9]{4}"
);
