import Cookies from "universal-cookie";
import { KJUR } from "jsrsasign";
import dayJs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import { notification } from "antd";
export const cookieStore = new Cookies();

dayJs.extend(localizedFormat);
dayJs.extend(relativeTime);
export const dayjs = dayJs;

export const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export const clearCookies = () => {
  const keys = ["token", "pk"];

  keys.forEach((key) => {
    cookieStore.remove(key, { path: "/" });
  });
};

export function isAuthenticated(): boolean {
  let token = cookieStore.get("token");
  let pk = cookieStore.get("pk");

  if (!token || !pk) return false;

  if (
    !KJUR.jws.JWS.verifyJWT(token, pk, { alg: ["RS256"], gracePeriod: 120 })
  ) {
    notification.error({ message: "Error during authentication" });
    return false;
  }
  return true;
}

export function generateRandom(min: number, max: number) {
  // find diff
  let difference = max - min;

  // generate random number
  let rand = Math.random();

  // multiply with difference
  rand = Math.floor(rand * difference);

  // add with min value
  rand = rand + min;

  return rand;
}
