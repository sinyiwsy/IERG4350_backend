import "reflect-metadata";
import fp from "fastify-plugin";
import { createConnection } from "typeorm";
import { Product } from "../modules/products/entity.js";
import { Category } from "../modules/categories/entity.js";
import { User } from "../modules/users/entity.js";
export default fp(async (server) => {
  try {
    const connection = await createConnection({
      type: "mysql",
      host: "localhost",
      port: "5306", //TOOO: env,
      username: "admin",
      password: "adminpw",
      database: "bookshop",
      synchronize: true,
      entities: [Product, Category, User],
      // entities: [["../**/entity.js"]],
    });

    console.log("database connected");
    server.decorate("db", {
      products: connection.getRepository(Product),
      categories: connection.getRepository(Category),
      users: connection.getRepository(User),
    });
  } catch (error) {
    console.log(error);
    console.log("make sure you have set .env variables - see .env.sample");
  }
});
