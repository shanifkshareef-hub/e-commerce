import { NotFoundError } from "../errors";
import { create, deleteOne, getAll, getOne, update } from "../db/product";
import { NextFunction, Request, Response } from "express";
import { checkObjectId } from "../helpers";

export const getAllProducts = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await getAll();

    return res.json({ status: true, data: products });
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const isIdValid = checkObjectId(id);
    if (!isIdValid) {
      throw new NotFoundError("Product not found");
    }
    const product = await getOne(id);

    return res.json({ status: true, data: product });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await create(req.body);

    return res.json({ status: true, data: product });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const isIdValid = checkObjectId(id);
    if (!isIdValid) {
      throw new NotFoundError("Product not found");
    }
    const product = await update(id, req.body);

    return res.json({ status: true, data: product });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const isIdValid = checkObjectId(id);
    if (!isIdValid) {
      throw new NotFoundError("Product not found");
    }
    const deletedProduct = await deleteOne(id);

    return res.json({ status: true, data: deletedProduct });
  } catch (error) {
    next(error);
  }
};
