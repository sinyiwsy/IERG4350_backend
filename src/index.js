import Fastify from "fastify";
import safe from "make-promises-safe";
const fastify = Fastify({ logger: true });

fastify.register(import("./first-route.js"));

const start = async () => {
  try {
    const address = await fastify.listen(3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
