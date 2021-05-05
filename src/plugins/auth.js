import fp from "fastify-plugin";

export default fp(async function (fastify, opts) {
  fastify.register(import("fastify-jwt"), {
    secret: "supersecret",
  });

  fastify.register(import("fastify-auth"));

  fastify.decorate("verifyJWTandRedis", verifyJWTandRedis);
  fastify.decorate("verifyUserAndPassword", verifyUserAndPassword);

  async function verifyJWTandRedis(request, reply) {
    const jwt = this.jwt;
    const redis = this.redis["authdb-async"];

    if (request.body && request.body.failureWithReply) {
      reply.code(401).send({ error: "Unauthorized" });
      throw new Error();
    }

    if (!request.raw.headers.auth) {
      throw new Error("Missing token header");
    }

    try {
      const decoded = await jwt.verify(request.raw.headers.auth);
      const password = redis.get(decoded.user);
      if (!password || password !== decoded.password) {
        throw new Error();
      }
      return decoded;
    } catch (err) {
      request.log.error(err);
      throw new Error("Token not valid");
    }
  }
});

async function verifyUserAndPassword(request, reply) {
  const redis = this.redis["authdb-async"];

  try {
    const password = redis.get("password");
    if (!password || password !== request.body.password) {
      throw new Error();
    }
  } catch (err) {
    request.log.error(err);
    throw new Error("Password not valid");
  }
}
