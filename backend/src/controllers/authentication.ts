import express from "express";

import { getUserByEmail, createUser } from "../db/users";
import { generateLoginToken } from "../helpers";
import { UnauthorizedError } from "../errors";
import bcrypt from "bcryptjs";
import config from "../config";

export const login = async (req: express.Request, res: express.Response) => {
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
      let token = generateLoginToken(user);

      return {
        user: {
          id: user.id,
          email: user.email,
          userName: user.username,
        },
        token: token,
      };
    } else {
      throw new UnauthorizedError("Invalid login credentials");
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.sendStatus(400);
    }

    const salt = await bcrypt.genSalt(config.seed);
    let hashed: string = await bcrypt.hash(password, salt);
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.sendStatus(400);
    }

    const user = await createUser({
      email,
      username,
      password: hashed,
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
