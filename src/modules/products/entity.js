import { EntitySchema } from "typeorm";

export const Product = new EntitySchema({
  name: "product",
  tableName: "products",
  columns: {
    id: {
      primary: true,
      type: "varchar",
      generated: "uuid",
    },
    name: {
      type: "varchar",
    },
    description: {
      type: "varchar",
      default: "",
    },
    image: {
      type: "varchar",
      default: "",
    },
    unit: {
      type: "int",
    },
    createdAt: {
      name: "created_at",
      createDate: true,
    },
  },
});
