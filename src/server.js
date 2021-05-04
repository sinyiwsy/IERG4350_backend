import fastify from "fastify";
import path from "path";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// import healthHandler from "./modules/health/routes";
// import productsHandler from "./modules/products/routes";
// import inventoryHandler from "./modules/inventory/routes";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function createServer() {
  const server = fastify({ logger: { prettyPrint: true } });

  server.register(import("fastify-cors"));
  server.register(import("fastify-autoload"), {
    dir: path.join(__dirname, "plugins"),
  });

  // server.register(import("./plugins/auth"));
  // // server.register(db);
  // // server.register(healthHandler);
  // // server.register(productsHandler);
  // // server.register(inventoryHandler);

  // server.setErrorHandler((error, req, res) => {
  //   req.log.error(error.toString());
  //   res.send({ error });
  // });

  // /*
  // generate temporary token to be used in app

  // server.ready(() => {
  //   const token = server.jwt.sign({ user_id: 'swr_user_id' })
  //   console.log(token)
  // })
  // */

  return server;
}
