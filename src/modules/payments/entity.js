import { EntitySchema } from "typeorm";

export const paymentStatus = {
  pending: "Pending",
  success: "Success",
  failed: "Failed",
};

export const Payment = new EntitySchema({
  name: "payment",
  tableName: "payments",
  columns: {
    id: {
      primary: true,
      type: "varchar",
      generated: "uuid",
    },
    sessionId: {
      name: "session_id",
      type: "varchar",
      unique: true,
    },
    status: {
      type: "varchar",
      default: paymentStatus.pending,
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
