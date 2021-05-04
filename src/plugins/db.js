import "reflect-metadata";
import fp from "fastify-plugin";
import { createConnection } from "typeorm";

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
      entities: [["../**/entity.js"]],
    });

    console.log(`connecting to database: ${connectionOptions.type}...`);
    console.log("database connected");
    server.decorate("db", {
      inventory: connection.getRepository("inventory"),
      product: connection.getRepository("product"),
    });
  } catch (error) {
    console.log(error);
    console.log("make sure you have set .env variables - see .env.sample");
  }
});
