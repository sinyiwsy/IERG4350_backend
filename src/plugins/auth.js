import fp from "fastify-plugin";

export default fp(async function (fastify, opts) {
  fastify.register(import("fastify-jwt"), {
    secret: "supersecret",
  });

  fastify.decorate("authenticate", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
});
