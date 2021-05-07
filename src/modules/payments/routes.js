import Stripe from "stripe";
import { createSessionSchema } from "./schema.js";

export default function (server, options, next) {
  const stripe = Stripe(server.config.STRIPE_SECRET_KEY);

  server.post(
    "/create-checkout-session",
    { schema: createSessionSchema },
    async (req, res) => {
      const user = await server.verifyJWT(req, res);

      let shoppingCart = req.body.shoppingCart;

      const products = await Promise.all(
        shoppingCart.map(async (product) => {
          const dbData = await server.db.products.findOne({ id: product.id });
          return {
            price_data: {
              currency: "hkd",
              product_data: {
                name: dbData.name,
              },
              unit_amount: dbData.price * 100,
            },
            quantity: product.quantity,
          };
        })
      );
      console.log(products);
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        line_items: products,
        success_url: `${server.config.BASE_URL}/success`,
        cancel_url: `${server.config.BASE_URL}/cancel`,
      });

      const payment = await server.db.payments.save({
        user,
        sessionId: session.id,
        details: products,
        reference: session,
      });

      return session;
    }
  );
  next();
}
