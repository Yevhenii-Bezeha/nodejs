import { getAll } from "./getAll";
import { productsPath } from "./productsPath";
import * as fs from "fs/promises";

export const update = async (id, name, email, phone) => {
  const products = await getAll();
  const updatedProducts = products.map((el) => {
    if (el.id === id) {
      el.name = name;
      el.email = email;
      el.phone = phone;
      return el;
    }
    return el;
  });
  const JSONProducts = JSON.stringify(updatedProducts, null, 2);
  await fs.writeFile(productsPath, JSONProducts);
};
