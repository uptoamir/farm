export const exists = (value: any) => {
  if (value !== undefined && value !== null) {
    return true;
  }
  return false;
};
