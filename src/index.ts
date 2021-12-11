import * as productsAction from "./products/index";
import { Command, OptionValues } from "commander";

interface IParameters {
  action: string;
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
}

const actionInvoke = async ({
  action,
  id,
  name,
  phone,
  email,
}: OptionValues) => {
  switch (action) {
    case "getAll":
      const allProducts = await productsAction.getAll();
      console.log(allProducts);
      break;
    case "getById":
      const product = await productsAction.getById(id);
      console.log(product);
      break;
    case "update":
      const updatedProduct = await productsAction.update(
        id,
        name,
        phone,
        email
      );
      break;
    case "delete":
      await productsAction.deleteProduct(id);
      break;
    default:
      console.log("Provide correct arguments");
  }
};

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
actionInvoke(argv);
