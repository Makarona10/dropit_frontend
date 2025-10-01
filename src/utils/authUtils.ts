import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";

export const checkIsTokenExpired = (token: string) => {
  const isExpired =
    dayjs.unix(jwtDecode<any>(token || "").exp).diff(dayjs()) < 2;
  if (isExpired) {
    return true;
  }
  return false;
};
