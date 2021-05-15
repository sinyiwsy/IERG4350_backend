export const productSchema = {
  id: { type: "string", format: "uuid" },
  categoryId: { type: "string", format: "uuid" },
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
  tags: ["products"],
  response: {
    200: {
      type: "object",
      required: ["success", "values"],
      properties: {
        success: { type: "number" },
        values: { tyep: productSchema },
      },
    },
  },
};

export const postProductSchema = {
  summary: "create product",
  description: "create product",
  tags: ["products"],
  body: {
    type: "object",
    required: ["categoryId", "name", "price"],
    properties: {
      categoryId: { type: "string", format: "uuid" },
      name: { type: "string" },
      price: { type: "integer", minimum: 1 },
      description: { type: "string" },
      image: {
        type: "string",
        format: "uri",
      },
      imageContent: {
        type: "string",
        pattern: "^data:image/.*;base64,/9j",
      },
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
  tags: ["products"],
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
  tags: ["products"],
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
  tags: ["products"],
  body: {
    type: "object",
    properties: {
      categoryId: { type: "string", format: "uuid" },
      name: { type: "string" },
      price: { type: "integer", minimum: 1 },
      description: { type: "string" },
      image: { type: "string", format: "uri" },
    },
  },
};
