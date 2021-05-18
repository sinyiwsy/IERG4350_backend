import Stripe from "stripe";
import { createSessionSchema, getSuccessPaymentsSchema } from "./schema.js";
import { paymentStatus } from "./entity.js";

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
                images: [dbData.image],
              },
              unit_amount: dbData.price * 100,
            },
            quantity: product.quantity,
          };
        })
      );
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        line_items: products,
        success_url: `${server.config.REACT_APP_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${server.config.REACT_APP_BASE_URL}/cancel?session_id={CHECKOUT_SESSION_ID}`,
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

  server.get(
    "/payments/success",
    { schema: getSuccessPaymentsSchema },
    async (req, res) => {
      const user = await server.verifyJWT(req, res);
      const successPayment = await server.db.payments.find({
        where: [{ user, status: paymentStatus.success }],
      });
      return { payments: successPayment };
    }
  );
  server.post(
    "/payment/webhook",
    {
      config: { rawBody: true },
      schema: { tags: ["payment"] },
    },
    async (req, res) => {
      const payload = req.rawBody;
      const sig = req.headers["stripe-signature"];
      let event;
      console.log(payload);
      try {
        event = stripe.webhooks.constructEvent(
          payload,
          sig,
          server.config.STRIPE_WEBHOOK_SECRET
        );
      } catch (err) {
        throw { statusCode: 400, message: `Webhook Error: ${err.message}` };
      }
      // Handle the checkout.session.comp,leted event
      if (event.type === "checkout.session.completed") {
        // console.log("================================================");
        // console.log(event);
        const session = event.data.object;
        await fulfillOrder(server, session);
      }
      res.code(200).send();
    }
  );

  next();
}

async function fulfillOrder(server, session) {
  console.log(session);
  const payment = await server.db.payments.findOne({ sessionId: session.id });
  await server.db.payments.save({
    ...payment,
    status: paymentStatus.success,
    reference: session,
  });
}
