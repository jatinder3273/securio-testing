/* eslint-disable max-len */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripeConfig = require("./stripe.json");
const stripe = require("stripe")(stripeConfig.secret_api_key);
admin.initializeApp();

const getStripeCustomerId = async (data) => {
  const customer = await stripe.customers.create({
    email: data.email,
    description: "Donation customer",
    payment_method: data.paymentMethod,
    invoice_settings: {
      default_payment_method: data.paymentMethod,
    },
  });
  const subscribe = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{price: data.price}],
    expand: ["latest_invoice.payment_intent"],
  });
  if (subscribe.latest_invoice.payment_intent.status === "requires_action") {
    // proceed to 3ds
    return {
      status: 200,
      message: "3D Secure required",
      actionRequired: true,
      clientSecret: subscribe.latest_invoice.payment_intent.client_secret,
      id: subscribe.latest_invoice.payment_intent.id,
      subscribe,
    };
  }
  if (subscribe.latest_invoice.payment_intent.status === "succeeded") {
    return {
      status: 200,
      message: "Payment successful!",
      subscribe,
    };
  }
  return {status: 400, message: "Payment failed!"};
};

exports.createSubscription = functions.https.onCall((data, context) => {
  return getStripeCustomerId(data);
});
exports.checkSubscripton = functions.https.onCall((data, context) => {
  return stripe.subscriptions.retrieve(data.id);
  // stripe.paymentIntents.retrieve(data.id);
});

const updateSubscription = (subscriptionObject) => {
  return admin.firestore().collection("policies").where("stripeActiveSubscriptionID", "==", subscriptionObject.id).get().then((snapshot) => {
    if (snapshot.empty) {
      throw Error("account does not exist with subscription id: "+subscriptionObject.id);
    } else {
      const actions = [];
      snapshot.forEach((policy) => {
        actions.push(
            policy.ref.set({
              subscriptionStatus: subscriptionObject.status,
              subscriptionCreated: subscriptionObject.created,
              subscriptionCurrentPeriodStart: subscriptionObject.current_period_start,
              subscriptionCurrentPeriodEnd: subscriptionObject.current_period_end,
              subscriptionEnded: subscriptionObject.ended || 0,
            }, {merge: true}),
        );
      });
      return Promise.all(actions);
    }
  }).then((writeResult) => {
    return true;
  }).catch((err) => {
    throw err;
  });
};
exports.webhook = functions.https.onRequest((request, response) => {
  const stripe = require("stripe")(stripeConfig.secret_api_key);
  const endpointSecret = stripeConfig.endpoint_secret;
  const sig = request.headers["stripe-signature"];
  let event;
  try {
    let result = false;
    event = stripe.webhooks.constructEvent(request.rawBody, sig, endpointSecret);
    if (event.type.indexOf("customer.subscription.") === 0) {
      result = updateSubscription(event.data.object);
    }
    if (result) {
      response.json({received: true});
    } else {
      throw Error("unknown error");
    }
  } catch (err) {
    console.log(`Webhook Error: ${err.message}`);
    response.status(400).send(`Webhook Error: ${err.message}`);
  }
});


