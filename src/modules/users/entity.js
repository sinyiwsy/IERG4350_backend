import { EntitySchema } from "typeorm";

export const User = new EntitySchema({
  name: "users",
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
  },
});
