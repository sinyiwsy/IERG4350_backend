import safe from "make-promises-safe";
import { createServer } from "./src/server.js";

const start = async () => {
  const server = await createServer();
  try {
    await server.listen(
      server.config.port,
      server.config.address,
      (err, address) => {
        if (err) throw err;
        console.log(`server listening on ${address}`);
      }
    );
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
