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
    createdAt: {
      name: "created_at",
      createDate: true,
    },
    updatedAt: {
      name: "updated_at",
      updateDate: true,
    },
  },
  relations: {
    products: {
      target: "products",
      type: "one-to-many",
    },
  },
});
