import { EntitySchema } from "typeorm";

export const Payment = new EntitySchema({
  name: "payment",
  tableName: "payment",
  columns: {
    id: {
      primary: true,
      type: "varchar",
      generated: "uuid",
    },
    details: {
      type: "json",
    },
    reference: {
      type: "json",
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
    user: {
      type: "many to one",
      target: "user",
      joinColumn: { name: "user_id" },
      cascade: true,
    },
  },
});
