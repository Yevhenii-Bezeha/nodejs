import * as fs from "fs/promises";
import { productsPath } from "./productsPath";

export const getAll = async () => {
  const products = await fs.readFile(productsPath, "utf-8");
  return JSON.parse(products);
};
