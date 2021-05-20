import {
  postUsersSchema,
  postUserLoginSchema,
  postAdminSchema,
} from "./schema.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

export default (server, options, next) => {
  server.post("/user", { schema: postUsersSchema }, async (req, res) => {
    const { password, email } = req.body;

    req.log.info(`save user to db`);

    const passwordHash = bcrypt.hashSync(password, saltRounds);

    const user = await server.db.users.save({
      passwordHash,
      email,
    });

    const response = await server.wrappedJSON(1, user);
    res.code(201).send(response);
  });
  server.post(
    "/user/login",
    { schema: postUserLoginSchema },
    async (req, res) => {
      const { email, password } = req.body;
      const user = await server.db.users.findOne({ email });

      if (!bcrypt.compareSync(password, user.passwordHash)) {
        res.code(400).send({});
      }

      const token = await server.jwt.sign({
        id: user.id,
        email: email,
        password: password,
      });

      const json = {
        email: user.email,
        isAdmin: user.isAdmin,
        token: token,
      };

      const response = await server.wrappedJSON(1, json);
      res.code(200).send(response);
    }
  );
  server.post(
    "/user/verify",
    {
      schema: {
        summary: "verify user",
        description: "verify user",
        headers: { $ref: "auth" },
      },
    },
    async (req, res) => {
      const jwt = await server.verifyJWT(req, res);
      res.code(200).send("hi");
    }
  );

  server.post("/user/admin", { schema: postAdminSchema }, async (req, res) => {
    const { password, email } = req.body;

    req.log.info(`save user to db`);
    const passwordHash = bcrypt.hashSync(password, saltRounds);
    const isAdmin = true;

    const user = await server.db.users.save({
      passwordHash,
      email,
      isAdmin,
    });

    res.code(201).send(user);
  });
  next();
};
