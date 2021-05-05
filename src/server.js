import fastify from "fastify";
import Env from "fastify-env";
import S from "fluent-json-schema";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// import healthHandler from "./modules/health/routes";
// import productsHandler from "./modules/products/routes";
// import inventoryHandler from "./modules/inventory/routes";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function createServer() {
  const server = await fastify({ log: true });

  await server.register(Env, {
    schema: S.object().prop("NODE_ENV", S.string().required()).valueOf(),
  });

  await server.register(import("fastify-cors"));
  await server.register(import("fastify-autoload"), {
    dir: path.join(__dirname, "plugins"),
  });
  await server.register(import("./modules/products/routes.js"));
  await server.register(import("./modules/categories/routes.js"));
  // server.register(import("fastify-autoload"), {
  //   dir: __dirname,
  //   dirNameRoutePrefix: false, // lack of prefix will mean no prefix, instead of directory name
  //   indexPattern: /.*routes(\.ts|\.js|\.cjs|\.mjs)$/
  // });

  // server.register(productsHandler);
  // server.register(inventoryHandler);

  // server.register(require("fastify-oas"), {
  //   routePrefix: "/docs",
  //   exposeRoute: true,
  //   swagger: {
  //     info: {
  //       title: "inventory api",
  //       description: "api documentation",
  //       version: "0.1.0"
  //     },
  //     servers: [
  //       { url: "http://localhost:3000", description: "development" },
  //       {
  //         url: "https://<production-url>",
  //         description: "production"
  //       }
  //     ],
  //     schemes: ["http"],
  //     consumes: ["application/json"],
  //     produces: ["application/json"],
  //     security: [{ bearerAuth: [] }],
  //     securityDefinitions: {
  //       bearerAuth: {
  //         type: "http",
  //         scheme: "bearer",
  //         bearerFormat: "JWT"
  //       }
  //     }
  //   }
  // });

  // server.setErrorHandler((error, req, res) => {
  //   req.log.error(error.toString());
  //   res.send({ error });
  // });

  // // generate temporary token to be used in app
  // server.ready(() => {
  //   const token = server.jwt.sign({ user_id: "swr_user_id" });
  //   console.log(token);
  // });

  return server;
}
