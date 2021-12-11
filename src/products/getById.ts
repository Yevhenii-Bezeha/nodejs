import { getAll } from "./getAll";

export const getById = async (id: string) => {
  const products = await getAll();
  return products.find((el) => el.id === id);
};
