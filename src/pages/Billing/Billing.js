import React, { useContext, useEffect, useState } from "react";
import MLogo from "../../assets/images/maltipal-logo.png";
import Footer from "./footer";
import { useHistory, useLocation } from "react-router-dom";
import { Decrypt } from "../../config/common";
import { db, auth, CloudFunctions } from "./../../config/firestore";
import moment from "moment";
import { toast } from "react-toastify";
import config from "../../config";
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import { LoaderContext } from "../../context/LoaderContext";

const inputStyle = {
  iconColor: "#c4f0ff",
  color: "#212529",
  fontWeight: "500",
  fontSmoothing: "antialiased",
  ":-webkit-autofill": {
    color: "#212529"
  },
  "::placeholder": {
    color: "#ccc"
  }
};
const Billing = () => {
  const stripe = useStripe();
  const { setLoader } = useContext(LoaderContext);
  const elements = useElements();

  const history = useHistory();
  const search = useLocation().search;
  const _request = new URLSearchParams(search).get("_request");
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  /**
   * Handle submit function of final step
   * @param {HTMLFormElement} event
   */
  const handleOnSubmit = async event => {
    event.preventDefault();
    try {
      if (!formValidate()) {
        return false;
      }
      if (!stripe || !elements) {
        return false;
      }
      setLoader(true);
      let decryptedData = Decrypt(_request);
      const parameters = { ...values, ...decryptedData };
      let paymentMethodId = "";
      const cardNumberElement = elements?.getElement(CardNumberElement);
      const snapshot = await db
        .collection("users")
        .where("email", "==", parameters.email)
        .get();
      if (snapshot.empty) {
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: "card",
          card: cardNumberElement
        });

        if (!error) {
          paymentMethodId = paymentMethod.id;
        }
        const createSubscription = CloudFunctions.httpsCallable("createSubscription");
        const response = await createSubscription({
          email: parameters.email,
          price: parameters.subscriptionPlanPriceId,
          paymentMethod: paymentMethodId,
          subscription: parameters.subscriptionType
        });
        console.log(response, "response.data");
        if (response.data.actionRequired) {
          const subscriptionId = response.data.subscribe.id;
          const { error } = await stripe.confirmCardPayment(response.data.clientSecret);
          if (!error) {
            const checkSubscripton = CloudFunctions.httpsCallable("checkSubscripton");
            const checkSubscriptonRes = await checkSubscripton({
              id: subscriptionId
            });
            await addUserInfo(parameters, checkSubscriptonRes.data);
            toast.dark("Registration Successfully.");
            history.push(`/login`);
          }
        } else {
          await addUserInfo(parameters, response.data.subscribe);
          toast.dark("Registration Successfully.");
          history.push(`/login`);
        }
      } else {
        toast.dark("Email is already exist.");
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
      toast.dark(error.message);
      console.log(error, "error");
    }
  };

  const addUserInfo = async (parameters, subscription) => {
    const password = (Math.random() + 1).toString(36).substring(2);
    const res = await auth.createUserWithEmailAndPassword(values.email, password);
    const userInfo = res.user;
    await db
      .collection("users")
      .doc(userInfo.uid)
      .set({
        firstName: parameters.firstName,
        lastName: parameters.lastName,
        email: values.email,
        dob: moment(parameters.dob).format("L"),
        city: parameters.city,
        noOfDependents: parameters.noOfDependents,
        profilePicture: "",
        stripeCustomerId: subscription.customer,
        state: parameters.state,
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      });

    await addPolicy(parameters, userInfo.uid, subscription);
    await auth.sendPasswordResetEmail(values.email, { url: `${config.baseUrl}login` });
  };

  /**
   * Add policy detail after registring the user
   * @param {Object} params
   * @param {String} userId
   */
  const addPolicy = async (params, userId, subscription) => {
    await db.collection("policies").add({
      userId,
      desiredCoverage: params.desiredCoverage,
      coverageLimit: params.coverageLimit,
      premiumAddOn: params.premiumAddOn,
      subscriptionPrice: params.subscriptionPrice,
      subscriptionType: params.subscriptionType,
      subscriptionName: params.subscriptionName,
      email: params.email,
      planId: subscription.plan.id,
      productId: subscription.plan.product,
      stripeActiveSubscriptionID: subscription.id,
      subscriptionStatus: subscription.status,
      subscriptionCreated: subscription.created,
      subscriptionCurrentPeriodStart: subscription.current_period_start,
      subscriptionCurrentPeriodEnd: subscription.current_period_end,
      subscriptionEnded: subscription.ended || 0,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  };

  /**
   * Handle onChnage Event of all input fields
   * @param {HTMLInputElement} event
   */
  const handleOnChange = event => {
    setValues(values => ({ ...values, [event.target.name]: event.target.value }));
    setErrors(errors => ({ ...errors, [event.target.name]: "" }));
    if (!event.target.value) {
      setErrors(errors => ({ ...errors, [event.target.name]: "Above field is required." }));
    }
  };
  /**
   * Handle onChnage Event of all input fields
   * @param {HTMLInputElement} event
   */
  const handleOnChangeCard = event => {
    setValues(values => ({ ...values, [event.elementType]: event.complete }));
    setErrors(errors => ({ ...errors, [event.elementType]: "" }));
    if (event.empty) {
      setErrors(errors => ({ ...errors, [event.elementType]: "Above field is required." }));
    }
    if (!event.complete) {
      setErrors(errors => ({
        ...errors,
        [event.elementType]: event.elementType === "cardNumber" ? "Please enter a valid card number" : "Value is invalid"
      }));
    }
  };

  /**
   * Form validation of login form
   */
  const formValidate = () => {
    let isValid = true;
    let errorsClone = errors;
    setErrors({});
    let fieldList = ["email", "cardName", "cardNumber", "cardExpiry", "cardCvc"];

    for (let x of fieldList) {
      if (!values[x]) {
        isValid = false;
        setErrors(errors => ({
          ...errors,
          [x]:
            x === "cardNumber" || x === "cardExpiry" || x === "cardCvc"
              ? errorsClone[x] || "Above field is required."
              : "Above field is required."
        }));
      }
    }
    return isValid;
  };

  useEffect(
    () => {
      if (!_request) {
        history.push(`/`);
      }
    },
    [_request, history]
  );
  return (
    <>
      <div className="container">
        <form onSubmit={handleOnSubmit}>
          <div>
            <h2>Billing Address</h2>
            <div className="col-lg-5 col-sm-12 col-ex-12">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email ID
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
                onChange={handleOnChange}
              />
              {errors.email ? <small className="text-danger">{errors.email}</small> : ""}
            </div>
          </div>
          <div>
            <div className="paytam">
              <h2>Payment Details</h2>
              <h6>
                <b>Stripe</b>
              </h6>
              <img src={MLogo} className="mlogo" alt="" />
              <p>This payment will be made via stripe and your details will not be stored or shared with any other platform.</p>
            </div>
            <div className="row col-lg-12  Form mt-4">
              <div className="form-group col-lg-5">
                <label htmlFor="card-name">Name on card</label>
                <input type="text" className="form-control" id="card-name" name="cardName" onChange={handleOnChange} />
                {errors.cardName ? <small className="text-danger">{errors.cardName}</small> : ""}
              </div>
              <div className="form-group col-lg-5">
                <label htmlFor="card-number">Card Number</label>
                <CardNumberElement
                  className="form-control"
                  onChange={handleOnChangeCard}
                  name="cardNumber"
                  options={{
                    style: {
                      base: inputStyle
                    }
                  }}
                />
                {errors.cardNumber ? <small className="text-danger">{errors.cardNumber}</small> : ""}
              </div>
            </div>
            <div className="row col-lg-12 Form">
              <div className="form-group col-lg-5">
                <label htmlFor="month-year">MM/YY</label>
                <CardExpiryElement
                  className="form-control"
                  onChange={handleOnChangeCard}
                  options={{
                    style: {
                      base: inputStyle
                    }
                  }}
                />
                {errors.cardExpiry ? <small className="text-danger">{errors.cardExpiry}</small> : ""}
              </div>
              <div className="form-group col-lg-5">
                <label htmlFor="cvv">CVV</label>
                <CardCvcElement
                  className="form-control"
                  onChange={handleOnChangeCard}
                  options={{
                    style: {
                      base: inputStyle
                    }
                  }}
                />
                {errors.cardCvc ? <small className="text-danger">{errors.cardCvc}</small> : ""}
              </div>
            </div>

            <div className="col-lg-5 Form">
              {/* <CardElement className="form-control" options={{ hidePostalCode: true }} /> */}
            </div>
            <button type="submit" className="Next_Button" disabled={!stripe}>
             Submit
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Billing;
