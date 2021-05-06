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
    price: {
      type: "integer",
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
    category: {
      type: "many-to-one",
      target: "category",
      joinColumn: { name: "category_id" },
      cascade: true,
    },
  },
});
