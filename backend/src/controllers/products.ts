import { create, deleteOne, getAll, getOne, update } from "../db/product";
import express from "express";

export const getAllProducts = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const products = await getAll();

    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const createProduct = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const product = await create(req.body);

    return res.status(200).json(product).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updateProduct = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const product = await update(id, req.body);

    return res.status(200).json(product).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deleteProduct = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const deletedProduct = await deleteOne(id);

    return res.json(deletedProduct);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
