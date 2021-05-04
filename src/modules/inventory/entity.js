import { EntitySchema } from "typeorm";

export const inventorySchema = new EntitySchema({
  name: "inventory",
  tableName: "inventories",
  columns: {
    id: {
      primary: true,
      type: "string",
      generated: "uuid",
    },
    quantity: {
      type: "number",
    },
    expiryDate: {
      name: "expiry_date",
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
  relations: {
    product: {
      type: "many-to-one",
      target: "product",
    },
  },
});
