import express from "express";
import { getPk, login, register } from "../controllers/authentication";
import { RegisterSchema, loginSchema } from "../middlewares/validations";

export default (router: express.Router) => {
  router.post("/auth/register", RegisterSchema, register);
  router.post("/auth/login", loginSchema, login);
  router.get("/auth/pk", getPk);
};
