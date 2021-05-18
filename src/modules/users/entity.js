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
    email: {
      type: "varchar",
      unique: true,
    },
    passwordHash: {
      type: "varchar",
    },
    isAdmin: {
      type: "boolean",
      default: false,
    },
  },
  relations: {
    payments: {
      target: "payments",
      type: "one-to-many",
    },
  },
});
