import "reflect-metadata";
import fp from "fastify-plugin";
import { createConnection } from "typeorm";
import { Product } from "../modules/products/entity.js"

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
      entities: [Product],
      // entities: [["../**/entity.js"]],
    });

    console.log("database connected");
    server.decorate("db", {
      products: connection.getRepository(Product),
    });
  } catch (error) {
    console.log(error);
    console.log("make sure you have set .env variables - see .env.sample");
  }
});
