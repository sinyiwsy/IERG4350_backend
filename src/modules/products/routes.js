import {
  listProductsSchema,
  postProductSchema,
  getProductSchema,
  deleteProductSchema,
  putProductSchema,
} from "./schema.js";

export default (server, options, next) => {
  server.get("/products", { schema: listProductsSchema }, async (req, res) => {
    req.log.info(`list products from db`);
    const products = await server.db.products.find();
    const response = await server.wrappedJSON(1, products);
    res.code(200).send(response);
  });
  server.post(
    "/products",
    { schema: postProductSchema },
    // { schema: postProductSchema, preValidation: [server.authenticate] },
    async (req, res) => {
      const { categoryId, name, price, description, image } = req.body;

      const category = await server.db.categories.findOne(categoryId);
      req.log.info(`save product to db`);
      const inventory = await server.db.products.save({
        category,
        name,
        price,
        description,
        image,
      });

      res.code(201).send(inventory);
    }
  );
  server.get(
    "/products/:id",
    { schema: getProductSchema },
    async (req, res) => {
      req.log.info(`get product ${req.params.id} from db`);
      const product = await server.db.products.findOne(req.params.id);
      // if (req.user.user_id !== inventory.owner) {
      //   throw new Error("Unauthorized access")
      // }
      res.send(product);
    }
  );
  server.delete(
    "/products/:id",
    { schema: deleteProductSchema },
    async (req, res) => {
      req.log.info(`delete product ${req.params.id} from db`);
      const product = await server.db.products.findOne(req.params.id);
      await server.db.products.remove(product);
      res.code(200).send({});
    }
  );

  server.put(
    "/products/:id",
    { schema: putProductSchema },
    async (req, res) => {
      req.log.info(`update product ${req.params.id} from db`);
      const product = await server.db.products.update(req.body);
      return product;
    }
  );

  next();
};
