import config from "../config";
import crypto from "crypto";
import jwt from "jsonwebtoken";

export const random = () => crypto.randomBytes(128).toString("base64");

export const generateLoginToken = (user: any): string => {
  var privateKey = config.keys.private.replace(/\\n/gm, "\n");

  var token = jwt.sign({ id: user.id, email: user.email }, privateKey, {
    expiresIn: "3d",
    algorithm: "RS256",
  });
  return token;
};
