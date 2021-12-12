import { getAll } from "./getAll";
import { productsPath } from "./productsPath";
import * as fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";

export const add = async (name, email, phone) => {
  const products = await getAll();
  products.push({ id: uuidv4(), name, email, phone });
  const JSONProducts = JSON.stringify(products, null, 2);
  await fs.writeFile(productsPath, JSONProducts);
};
