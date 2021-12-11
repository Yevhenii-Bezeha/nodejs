import { getAll } from "./getAll";
import { productsPath } from "./productsPath";
import * as fs from "fs/promises";

export const deleteProduct = async (id) => {
  const products = await getAll();
  const updatedProducts = products.filter((el) => el.id !== id);
  const JSONProducts = JSON.stringify(updatedProducts, null, 2);
  await fs.writeFile(productsPath, JSONProducts);
};
