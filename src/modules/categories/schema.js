const categorySchema = {
  id: { type: "string", format: "uuid" },
  name: { type: "string" },
};

export const listCategorySchema = {
  summary: "list category",
  description: "list category",
  response: {
    200: {
      type: "array",
      items: {
        properties: categorySchema,
      },
    },
  },
};

export const postCategorySchema = {
  summary: "create Category",
  description: "create Category",
  body: {
    type: "object",
    required: ["name"],
    properties: {
      name: { type: "string" },
    },
  },
  response: {
    201: {
      type: "object",
      properties: categorySchema,
    },
  },
};
export const getCategorySchema = {
  summary: "get Category",
  description: "get Category",
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
      properties: categorySchema,
    },
  },
};

export const deleteCategorySchema = {
  summary: "delete Category",
  description: "delete Category",
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
    },
  },
};
