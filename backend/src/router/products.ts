import express from "express";

import { isAuthenticated, isOwner } from "../middlewares";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/products";

export default (router: express.Router) => {
  router.get("/products", isAuthenticated, getAllProducts);
  router.delete("/products/:id", isAuthenticated, deleteProduct);
  router.post("/products", createProduct);
  router.put("/products/:id", updateProduct);
};
