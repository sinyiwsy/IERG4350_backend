export const userSchema = {
  id: { type: "string", format: "uuid" },
  username: { type: "string" },
  password: { type: "string" },
  email: { type: "string" },
};

export const postUsersSchema = {
  summary: "register",
  description: "register",
  body: {
    type: "object",
    required: ["username", "password", "email"],
    properties: {
      username: { type: "string" },
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
      properties: userSchema,
    },
  },
};

export const postAdminSchema = {
  summary: "register",
  description: "register",
  body: {
    type: "object",
    required: ["username", "password", "email"],
    properties: {
      username: { type: "string" },
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