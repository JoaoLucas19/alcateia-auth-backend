import { Request, Response, NextFunction } from "express";
import * as productService from "./product.service";

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json({ data: product });
  } catch (err) { next(err); }
}

export async function list(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const products = await productService.listProducts();
    res.status(200).json({ data: products });
  } catch (err) { next(err); }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const product = await productService.getProduct(String(req.params.id));
    res.status(200).json({ data: product });
  } catch (err) { next(err); }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const product = await productService.updateProduct(String(req.params.id), req.body);
    res.status(200).json({ data: product });
  } catch (err) { next(err); }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await productService.deleteProduct(String(req.params.id));
    res.status(200).json({ message: "Produto deletado com sucesso" });
  } catch (err) { next(err); }
}