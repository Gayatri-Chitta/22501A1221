import dayjs from "dayjs";

export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isPositiveInteger = (n) => Number.isInteger(+n) && +n > 0;

export const defaultExpiry = () => dayjs().add(30, "minute");