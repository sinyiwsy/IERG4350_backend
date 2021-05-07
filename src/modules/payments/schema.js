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

export const createSessionSchema = {
  summary: "Create checkout session for react client",
  description: "create checkout session",
  tags: ["payment"],
  body: {
    type: "object",
    required: ["shoppingCart"],
    properties: { ...shoppingCartSchema },
  },
};
