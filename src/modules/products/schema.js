export const productSchema = {
  id: { type: "string", format: "uuid" },
  cateogryId: { type: "string", format: "uuid" },
  name: { type: "string" },
  description: { type: "string" },
  image: { type: "string", format: "uri" },
  price: { type: "integer", minimum: 1 },
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
    required: ["cateogryId", "name", "price"],
    properties: {
      cateogryId: { type: "string", format: "uuid" },
      name: { type: "string" },
      price: { type: "integer", minimum: 1 },
      description: { type: "string" },
      image: { type: "string", format: "uri" },
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

export const putProductSchema = {
  summary: "update product",
  description: "update product",
  body: {
    type: "object",
    properties: {
      cateogryId: { type: "string", format: "uuid" },
      name: { type: "string" },
      price: { type: "integer", minimum: 1 },
      description: { type: "string" },
      image: { type: "string", format: "uri" },
    },
  },
};
