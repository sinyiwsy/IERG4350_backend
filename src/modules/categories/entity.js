import { EntitySchema } from "typeorm";

export const Category = new EntitySchema({
  name: "category",
  tableName: "categories",
  columns: {
    id: {
      primary: true,
      type: "varchar",
      generated: "uuid",
    },
    name: {
      name: "name",
      type: "varchar",
      unique: true,
    },
  },
  relations: {
    product: {
      type: "one-to-many",
      target: "product",
    },
  },
});
