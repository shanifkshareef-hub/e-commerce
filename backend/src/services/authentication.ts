import express, { NextFunction } from "express";
import { getUserByEmail, createUser } from "../db/users";
import { generateLoginToken } from "../helpers";
import { BadRequestError, HttpError, UnauthorizedError } from "../errors";
import bcrypt from "bcryptjs";
import config from "../config";

export const login = async (
  req: express.Request,
  res: express.Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = await getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedError("Invalid login credentials");
    }

    let same = await bcrypt.compare(password, user.password);
    if (same) {
      const userData = {
        id: user.id,
        email: user.email,
        userName: user.userName,
      };
      let token: string = generateLoginToken(userData);

      return res.json({
        status: true,
        data: {
          user: userData,
          token: token,
        },
      });
    } else {
      throw new UnauthorizedError("Invalid login credentials");
    }
  } catch (error) {
    next(error);
  }
};

export const register = async (
  req: express.Request,
  res: express.Response,
  next: NextFunction
) => {
  try {
    const { email, password, userName } = req.body;

    if (!email || !password || !userName) {
      return res.sendStatus(400);
    }

    const salt = await bcrypt.genSalt(config.seed);
    let hashed: string = await bcrypt.hash(password, salt);
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      throw new BadRequestError("User already exists");
    }

    const { password: newPass, ...rest } = await createUser({
      email,
      userName,
      password: hashed,
    });

    return res.json({ status: true, data: rest });
  } catch (error) {
    next(error);
  }
};

export const getPk = async (_: express.Request, res: express.Response) => {
  try {
    return res.json({
      status: true,
      data: config.keys.public.replace(/\\n/gm, "\n"),
    });
  } catch (e) {
    throw new HttpError(503, "Unable to get public key");
  }
};
