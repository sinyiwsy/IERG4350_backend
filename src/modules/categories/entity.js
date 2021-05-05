import { EntitySchema } from "typeorm";

export const Category = new EntitySchema({
  name: "categories",
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
    },
  },
  relations: {
    product: {
      type: "many-to-one",
      target: "product",
    },
  },
});
