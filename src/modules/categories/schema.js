const categorySchema = {
  id: { type: "string", format: "uuid" },
  name: { type: "string" },
};

export const listCategorySchema = {
  summary: "list category",
  description: "list category",
  tags: ["categories"],
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
  tags: ["categories"],
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

export const putCategorySchema = {
  summary: "Update category",
  description: "Update category",
  tags: ["categories"],
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string", format: "uuid" },
    },
  },
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
  tags: ["categories"],
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
  tags: ["categories"],
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
