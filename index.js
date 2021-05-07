import safe from "make-promises-safe";
import { createServer } from "./src/server.js";

const start = async () => {
  const server = await createServer();
  try {
    let tmp = server.config.BASE_URL.split(":");
    const address = tmp[1].slice(2);
    const port = tmp[2] ?? "3000";
    await server.listen(port, address, (err, address) => {
      if (err) throw err;
      console.log(`server listening on ${address}`);
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
