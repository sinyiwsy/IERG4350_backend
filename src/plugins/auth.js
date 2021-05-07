import fp from "fastify-plugin";
import bcrypt from "bcrypt";

export default fp(async function (fastify, opts) {
  fastify.register(import("fastify-jwt"), {
    secret: "supersecret",
  });

  fastify.register(import("fastify-auth"));

  fastify.decorate("verifyJWT", verifyJWT);
  fastify.decorate("verifyUserAndPassword", verifyUserAndPassword);
  fastify.addSchema({
    $id: "auth",
    type: "object",
    properties: {
      authorization: { type: "string" },
    },
    required: ["authorization"],
  });

  async function verifyJWT(request, reply) {
    const jwt = this.jwt;
    if (request.body && request.body.failureWithReply) {
      reply.code(401).send({ error: "Unauthorized" });
      throw new Error();
    }
    if (!request.headers.authorization) {
      throw new Error("Missing token header");
    }
    try {
      const token = request.headers.authorization.split(" ").pop();
      const decoded = await jwt.verify(token);
      const user = await this.db.users.findOne({ email: decoded.email });
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
    const user = await server.db.users.findOne({ email: request.body.email });
    if (
      !user ||
      !bcrypt.compareSync(request.body.password, user.passwordHash)
    ) {
      throw new Error();
    }
  } catch (err) {
    request.log.error(err);
    throw new Error("Password not valid");
  }
}
