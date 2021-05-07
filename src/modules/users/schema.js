export const userSchema = {
  id: { type: "string", format: "uuid" },
  password: { type: "string" },
  email: { type: "string" },
};

export const postUsersSchema = {
  summary: "register",
  description: "register",
  body: {
    type: "object",
    required: ["password", "email"],
    properties: {
      password: { type: "string" },
      email: { type: "string" },
    },
  },
  response: {
    201: {
      type: "object",
      required: ["success", "values"],
      properties: {
        success: { type: "number" },
        values: { tyep: userSchema },
      },
    },
  },
};

export const postUserLoginSchema = {
  summary: "login",
  description: "login",
  body: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: { type: "string" },
      password: { type: "string" },
    },
  },
  response: {
    200: {
      type: "object",
      required: ["success", "values"],
      properties: {
        success: { type: "number" },
        values: { tyep: userSchema },
      },
    },
  },
};

export const postAdminSchema = {
  summary: "register",
  description: "register",
  body: {
    type: "object",
    required: ["password", "email"],
    properties: {
      password: { type: "string" },
      email: { type: "string" },
    },
  },
  response: {
    201: {
      type: "object",
      properties: userSchema,
    },
  },
};
