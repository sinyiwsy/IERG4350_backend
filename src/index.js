import fastify from "fastify";

// Require the framework and instantiate it
const server = fastify({
  logger: true,
});

// Declare a route
server.get("/", (request, reply) => {
  reply.send({ hello: "world" });
});

// Run the server!
server.listen(3000, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
