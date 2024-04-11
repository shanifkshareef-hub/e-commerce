import express from "express";

import { isAuthenticated } from "../middlewares";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
  getProduct,
} from "../services/products";
import {
  IdParamSchema,
  ProductCreateSchema,
  ProductQuerySchema,
} from "../middlewares/validations";

export default (router: express.Router) => {
  router.get("/products", isAuthenticated, ProductQuerySchema, getAllProducts);
  router.get("/products/:id", isAuthenticated, IdParamSchema, getProduct);
  router.post("/products", isAuthenticated, ProductCreateSchema, createProduct);
  router.put(
    "/products/:id",
    isAuthenticated,
    ProductCreateSchema,
    updateProduct
  );
  router.delete("/products/:id", isAuthenticated, IdParamSchema, deleteProduct);
};
