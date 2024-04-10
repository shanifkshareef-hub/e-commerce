import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import { KJUR } from "jsrsasign";

export const cookieStore = new Cookies();

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

  console.log(token, pk);

  if (!token || !pk) return false;

  if (
    !KJUR.jws.JWS.verifyJWT(token, pk, { alg: ["RS256"], gracePeriod: 120 })
  ) {
    toast("Error during authentication");

    return false;
  }
  return true;
}
