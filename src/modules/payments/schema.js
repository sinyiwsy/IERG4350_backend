import { paymentStatus } from "./entity.js";
const shoppingCartSchema = {
  shoppingCart: {
    type: "array",
    items: {
      type: "object",
      required: ["id", "quantity"],
      properties: {
        id: { type: "string", format: "uuid" },
        quantity: { type: "integer", minimum: 1 },
      },
    },
  },
};

const paymentSchema = {
  type: "object",
  required: ["status", "details"],
  properties: {
    id: { type: "string", format: "uuid" },
    status: {
      type: "string",
      pattern: `(${paymentStatus.pending})|(${paymentStatus.failed})|(${paymentStatus.success})`,
    },
    details: {
      type: "array",
    },
    createdAt: {
      type: "string",
      format: "date-time",
    },
  },
};

export const createSessionSchema = {
  summary: "Create checkout session for react client",
  description: "create checkout session",
  tags: ["payment"],
  headers: { $ref: "auth" },
  body: {
    type: "object",
    required: ["shoppingCart"],
    properties: { ...shoppingCartSchema },
  },
};

export const getSuccessPaymentsSchema = {
  summary: "Query all success payment records",
  description: "Query all success payment records",
  tags: ["payment"],
  headers: { $ref: "auth" },
  response: {
    200: {
      type: "object",
      properties: {
        payments: {
          type: "array",
          items: {
            ...paymentSchema,
          },
        },
      },
    },
  },
};
