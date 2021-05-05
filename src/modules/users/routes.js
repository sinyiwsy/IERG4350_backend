import { postUsersSchema, postUserLoginSchema } from "./schema.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

export default (server, options, next) => {
  server.post("/user", { schema: postUsersSchema }, async (req, res) => {
    const { username, password, email } = req.body;

    req.log.info(`save user to db`);
    
    const passwordHash = bcrypt.hashSync(password, saltRounds);

    const user = await server.db.users.save({
      username,
      passwordHash,
      email,
    });

    res.code(201).send(user);
  });
  server.post(
    "/user/login",
    { schema: postUserLoginSchema },
    async (req, res) => {
      const { username, password } = req.body;
      const user = await server.db.users.findOne({username});

      if(!bcrypt.compareSync(password, user.passwordHash)){
        res.code(400).send({});
      }

      const token = await server.jwt.sign({username});
      res.code(200).send(user.passwordHash);
    }
  );
  next();
};
