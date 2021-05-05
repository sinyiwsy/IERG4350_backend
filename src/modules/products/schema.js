export const productSchema = {
  id: { type: "string", format: "uuid" },
  name: { type: "string" },
  description: { type: "string" },
  image: { type: "string", format: "uri" },
  unit: { type: "string" },
  createdAt: { type: "string", format: "date-time" },
  updatedAt: { type: "string", format: "date-time" },
};

export const listProductsSchema = {
  summary: "products",
  description: "products",
  response: {
    200: {
      type: "array",
      items: {
        properties: productSchema,
      },
    },
  },
};

export const postProductSchema = {
  summary: "create product",
  description: "create product",
  body: {
    type: "object",
    required: ["name", "unit"],
    properties: {
      name: { type: "string" },
      unit: { type: "integer", minimum: 1 },
    },
  },
  response: {
    201: {
      type: "object",
      properties: productSchema,
    },
  },
};

export const getProductSchema = {
  summary: "get product",
  description: "get product",
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string", format: "uuid" },
    },
  },
  response: {
    200: {
      type: "object",
      properties: productSchema,
    },
  },
};

export const deleteProductSchema = {
  summary: "delete product",
  description: "delete product",
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string", format: "uuid" },
    },
  },
  response: {
    200: {
      type: "boolean",
    },
  },
};
