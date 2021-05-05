import safe from "make-promises-safe";
import { createServer } from "./server.js";

const start = async () => {
  try {
    const server = await createServer();
    const PORT = "3000";
    await server.listen(+PORT, "0.0.0.0", (err, address) => {
      if (err) throw err;
      console.log(`server listening on ${address}`);
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
