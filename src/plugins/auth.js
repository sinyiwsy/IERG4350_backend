import fp from "fastify-plugin";
import bcrypt from "bcrypt";

export default fp(async function (fastify, opts) {
  fastify.register(import("fastify-jwt"), {
    secret: "supersecret",
  });

  fastify.register(import("fastify-auth"));

  fastify.decorate("verifyJWT", verifyJWT);
  fastify.decorate("verifyUserAndPassword", verifyUserAndPassword);

  async function verifyJWT(request, reply) {
    const jwt = this.jwt;

    if (request.body && request.body.failureWithReply) {
      reply.code(401).send({ error: "Unauthorized" });
      throw new Error();
    }

    if (!request.raw.headers.auth) {
      throw new Error("Missing token header");
    }

    try {
      const decoded = await jwt.verify(request.raw.headers.auth);
      const user = await server.db.users.findOne({username : decoded.username});
      if (!user || !bcrypt.compareSync(decoded.password, user.passwordHash)) {
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
  try {
    const user = await server.db.users.findOne({username : request.body.username});
    if (!user || !bcrypt.compareSync(request.body.password, user.passwordHash)) {
      throw new Error();
    }
  } catch (err) {
    request.log.error(err);
    throw new Error("Password not valid");
  }
}
