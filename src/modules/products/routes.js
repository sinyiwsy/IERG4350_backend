import {
  listProductsSchema,
  postProductSchema,
  getProductSchema,
  deleteProductSchema,
  putProductSchema,
} from "./schema.js";

import { v4 as uuidv4 } from "uuid";

import { S3Client, PutObjectCommand, S3 } from "@aws-sdk/client-s3";

export default (server, options, next) => {
  async function uploadToS3(type, fileContent) {
    const Key = uuidv4() + `.${type}`;
    const uploadParams = {
      Bucket: server.config.S3_BUCKET_NAME,
      Key,
      Body: fileContent,
      ContentEncoding: "base64",
      ContentType: `image/${type}`,
      ACL: "public-read",
    };
    try {
      const s3 = new S3Client({
        region: server.config.S3_BUCKET_REGION,
      });
      await s3.send(new PutObjectCommand(uploadParams));
      return `https://${server.config.S3_BUCKET_NAME}.s3.amazonaws.com/${Key}`;
    } catch (err) {
      req.log.error(err);
      throw new Error("Failed to upload to s3");
    }
  }

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
      const { categoryId, name, price, description, imageContent } = req.body;
      let { image } = req.body;

      if (!image) {
        const fileContent = Buffer.from(
          imageContent.replace(/^data:image\/\w+;base64,/, ""),
          "base64"
        );
        const type = imageContent.split(";")[0].split("/")[1];
        image = await uploadToS3(type, fileContent);
      }

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
