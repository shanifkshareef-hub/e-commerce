import { UnauthorizedError } from "../errors";
import config from "../config";
import express from "express";
import jwt from "jsonwebtoken";

export const isAuthenticated = (
  req: express.Request,
  _: express.Response,
  next: express.NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split("Bearer ")[1];

      jwt.verify(token, config.keys.public, (err, user) => {
        if (err) {
          throw new UnauthorizedError("Unauthorised");
        }
        req.user = user;
        next();
      });
    } else {
      throw new UnauthorizedError("Unauthorised");
    }
  } catch (error) {
    next(error);
  }
};
