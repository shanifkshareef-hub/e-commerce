import express from "express";

import { isAuthenticated } from "../middlewares";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
  getProduct,
} from "../controllers/products";

export default (router: express.Router) => {
  router.get("/products", isAuthenticated, getAllProducts);
  router.get("/products/:id", isAuthenticated, getProduct);
  router.post("/products", isAuthenticated, createProduct);
  router.put("/products/:id", isAuthenticated, updateProduct);
  router.delete("/products/:id", isAuthenticated, deleteProduct);
};
