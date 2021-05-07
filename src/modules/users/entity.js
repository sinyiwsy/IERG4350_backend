import { EntitySchema } from "typeorm";

export const User = new EntitySchema({
  name: "user",
  tableName: "users",
  columns: {
    id: {
      primary: true,
      type: "varchar",
      generated: "uuid",
    },
    username: {
      type: "varchar",
    },
    passwordHash: {
      type: "varchar",
    },
    email: {
      type: "varchar",
    },
    isAdmin:{
      type: "int",
      default: 0,
    }
  },
});
