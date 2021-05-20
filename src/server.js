import fastify from "fastify";
import Env from "fastify-env";
import S from "fluent-json-schema";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function createServer() {
  const server = await fastify({
    logger: {
      level: "info",
      file: `${__dirname}/../logs/server.log`,
      prettyPrint: true,
    },
  });

  await server.register(Env, {
    dotenv: true,
    schema: S.object()
      .prop("NODE_ENV", S.string().required())
      .prop("BASE_URL", S.string().required())
      .prop("REACT_APP_BASE_URL", S.string().required())
      // .prop("AWS_ACCESS_KEY_ID", S.string().required())
      // .prop("AWS_SECRET_ACCESS_KEY", S.string().required())
      // .prop("AWS_SESSION_TOKEN", S.string().required())
      .prop("S3_BUCKET_NAME", S.string().required())
      .prop("S3_BUCKET_REGION", S.string().required())
      .prop("STRIPE_PUBLISH_KEY", S.string().required())
      .prop("STRIPE_SECRET_KEY", S.string().required())
      .prop("STRIPE_WEBHOOK_SECRET", S.string().required())
      .valueOf(),
  });

  let tmp = server.config.BASE_URL.split(":");
  const address = tmp[1].slice(2);
  const port = tmp[2] ?? "3000";
  server.config.address = address;
  server.config.port = port;
  server.config.hostname = address + ":" + port;

  await server.register(import("fastify-cors"), {});

  await server.register(import("fastify-routes"));
  await server.register(import("fastify-autoload"), {
    dir: path.join(__dirname, "plugins"),
  });
  await server.register(import("fastify-raw-body"), {
    field: "rawBody",
    encoding: "utf8",
    global: false,
  });

  await server.register(import("./modules/health/routes.js"));
  await server.register(import("./modules/products/routes.js"));
  await server.register(import("./modules/categories/routes.js"));
  await server.register(import("./modules/users/routes.js"));
  await server.register(import("./modules/payments/routes.js"));

  return server;
}
