import { readFileSync } from "fs";
import { join } from "desm";
import fp from "fastify-plugin";
import Swagger from "fastify-swagger";

const { version } = JSON.parse(
  readFileSync(join(import.meta.url, "../../package.json"))
);

async function swaggerGenerator(fastify, opts) {
  // Swagger documentation generator for Fastify.
  // It uses the schemas you declare in your routes to generate a swagger compliant doc.
  // https://github.com/fastify/fastify-swagger
  fastify.register(Swagger, {
    routePrefix: "/documentation",
    swagger: {
      info: {
        title: "Bookshop backend",
        description: "API documentation",
      },
      externalDocs: {
        url: "https://github.com/sinyiwsy/IERG4350_backend.git",
        description: "Find more info here",
      },
      host: "localhost:4000", // and your deployed url
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json", "text/html"],
      securityDefinitions: {
        Bearer: {
          type: "apiKey",
          name: "Authorization",
          in: "header",
        },
      },
    },
    // let's expose the documentation only in development
    // it's up to you decide who should see this page,
    // but it's alwaysx better to start safe.
    exposeRoute: fastify.config.NODE_ENV !== "production",
  });
}

export default fp(swaggerGenerator, {
  name: "swaggerGenerator",
});
