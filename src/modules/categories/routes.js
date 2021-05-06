import {
  getCategorySchema,
  postCategorySchema,
  listCategorySchema,
  deleteCategorySchema,
} from "./schema.js";

import { productSchema } from "../products/schema.js";

import { getConnection } from "typeorm";
import { Category } from "./entity.js";
import { Product } from "../products/entity.js";

export default function inventoryHandler(server, options, next) {
  server.get(
    "/categories",
    { schema: listCategorySchema },
    async (req, res) => {
      req.log.info(`list categories from db`);

      console.log("----");

      console.log(server.db);
      console.log("----");

      const categories = await server.db.categories.find();
      res.send(categories);
    }
  );
  server.post(
    "/categories",
    { schema: postCategorySchema },
    // { schema: postCategorySchema, preValidation: [server.authenticate] },
    async (req, res) => {
      const { name } = req.body;

      req.log.info(`save category to db`);
      const category = await server.db.categories.save({
        name,
      });
      res.code(201).send(category);
    }
  );
  server.get(
    "/categories/:id",
    { schema: getCategorySchema },
    async (req, res) => {
      req.log.info(`get category ${req.params.id} from db`);
      const category = await server.db.categories.findOne(req.params.id);
      res.send(category);
    }
  );
  server.delete(
    "/categories/:id",
    { schema: deleteCategorySchema },
    // { schema: deleteCategorySchema, preValidation: [server.authenticate] },
    async (req, res) => {
      req.log.info(`get category ${req.params.id} for deletion`);
      const category = await server.db.categories.findOne(req.params.id);
      req.log.info(`delete category: ${category.id}`);
      await server.db.categories.remove(category);
      res.code(200).send({});
    }
  );

  server.get(
    "/categories/:id/products",
    {
      schema: {
        ...getCategorySchema,
        response: {
          200: {
            type: "array",
            properties: productSchema,
          },
        },
      },
    },
    async (req, res) => {
      req.log.info(`get all products belongs to category ${req.params.id}`);
      const category = await server.db.categories.findOne(req.params.id);
      const products = await server.db.products.find({
        relations: ["category"],
      });
      res.code(200).send(products);
    }
  );
  next();
}
