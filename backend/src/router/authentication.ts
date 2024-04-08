import express from "express";

import { getPk, login, register } from "../controllers/authentication";

export default (router: express.Router) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
  router.get("/auth/pk", getPk);
};
