import { EntitySchema } from "typeorm";

export const inventorySchema = new EntitySchema({
  name: "product",
  tableName: "products",
  columns: {
    id: {
      primary: true,
      type: "string",
      generated: "uuid",
    },
    name: {
      type: "string",
    },
    image: {
      type: "string",
    },
    expiresIn: {
      name: "expires_in",
      type: "number",
    },
    unit: {
      type: "string",
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
});
