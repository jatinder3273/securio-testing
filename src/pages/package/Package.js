import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import { useHistory, useLocation } from "react-router-dom";
import { calculatePercentageForYear, Decrypt, Encrypt } from "../../config/common";
import {
  SUBSCRIPTION_PLAN_10_MONTHLY,
  SUBSCRIPTION_PLAN_10_YEARLY,
  SUBSCRIPTION_PLAN_15_MONTHLY,
  SUBSCRIPTION_PLAN_15_YEARLY,
  SUBSCRIPTION_PLAN_20_MONTHLY,
  SUBSCRIPTION_PLAN_20_YEARLY,
  SUBSCRIPTION_PLAN_25_MONTHLY,
  SUBSCRIPTION_PLAN_25_YEARLY
} from "../../config";

const Package = () => {
  const [values, setValues] = useState();

  const history = useHistory();
  const search = useLocation().search;
  const _request = new URLSearchParams(search).get("_request");
  const [show, setShow] = useState(false);
  const [subscriptionName, setSubscriptionName] = useState("");
  const [monthlyPrice, setMonthlyPrice] = useState(0);
  const [subscriptionPlanM, setSubscriptionPlanM] = useState("");
  const [subscriptionPlanY, setSubscriptionPlanY] = useState("");
  const [yearlyPrice, setYearlyPrice] = useState(0);
  const decryptData = Decrypt(_request);

  const handleConfirmEvent = () => {
    const mergeData = { ...decryptData, ...values };
    var cryptedData = Encrypt(mergeData);
    history.push(`/billing?_request=${cryptedData}`);
  };

  /**
   * Calculate monthly and yearly price basis on some conditions
   * @param {Object} decryptData
   */
  const calculatePricing = async decryptData => {
    if (decryptData.coverageLimit === "10000" && decryptData?.premiumAddOn?.length === 0) {
      setSubscriptionPlanM(SUBSCRIPTION_PLAN_10_MONTHLY);
      setSubscriptionPlanY(SUBSCRIPTION_PLAN_10_YEARLY);
      setMonthlyPrice(10);
      setSubscriptionName("Pricing tier 1");
      const yearly = calculatePercentageForYear(10, 5);
      setYearlyPrice(yearly);
    }
    if (decryptData.coverageLimit === "10000" && decryptData?.premiumAddOn?.length !== 0) {
      setSubscriptionPlanM(SUBSCRIPTION_PLAN_20_MONTHLY);
      setSubscriptionPlanY(SUBSCRIPTION_PLAN_20_YEARLY);
      setMonthlyPrice(20);
      setSubscriptionName("Pricing tier 2");
      const yearly = calculatePercentageForYear(20, 5);
      setYearlyPrice(yearly);
    }
    if (decryptData.coverageLimit === "25000" && decryptData?.premiumAddOn?.length === 0) {
      setSubscriptionPlanM(SUBSCRIPTION_PLAN_15_MONTHLY);
      setSubscriptionPlanY(SUBSCRIPTION_PLAN_15_YEARLY);
      setMonthlyPrice(15);
      setSubscriptionName("Pricing tier 3");
      const yearly = calculatePercentageForYear(15, 5);
      setYearlyPrice(yearly);
      calculatePercentageForYear(15, 5);
    }
    if (decryptData.coverageLimit === "25000" && decryptData?.premiumAddOn?.length !== 0) {
      setSubscriptionPlanM(SUBSCRIPTION_PLAN_25_MONTHLY);
      setSubscriptionPlanY(SUBSCRIPTION_PLAN_25_YEARLY);
      setMonthlyPrice(25);
      setSubscriptionName("Pricing tier 4");
      const yearly = calculatePercentageForYear(25, 5);
      setYearlyPrice(yearly);
    }
  };

  const handleSelectPlan = subscriptionType => {
    setShow(true);
    setValues(values => ({
      ...values,
      subscriptionName,
      subscriptionType,
      subscriptionPrice: subscriptionType === "monthly" ? monthlyPrice : yearlyPrice,
      subscriptionPlanPriceId: subscriptionType === "monthly" ? subscriptionPlanM : subscriptionPlanY
    }));
  };

  useEffect(
    () => {
      calculatePricing(decryptData);
    },
    [decryptData]
  );
  return (
    <>
      <Modal show={show} setShow={setShow} handleConfirmEvent={handleConfirmEvent} />
      <div className="container mt-3 Image_Set">
        <div className="Choose">
          <h2>Choose your plan</h2>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        </div>
        <div className="row col-lg-12 col-sm-12 col-md-12 col-xs-12 justify-content-center my-5 custom-row">
          <div className="col-lg-3 text-center Monthly py-4 mt-3">
            <h4>Monthly</h4>
            <p>Lorem Ipsum is simply</p>
            <div className="d-flex justify-content-center One_Month">
              <h1>{monthlyPrice}</h1>
              <div className="One">
                <h5>$</h5>
                <h6>Per Month</h6>
              </div>
            </div>
            <div className="Card">
              <ul>
                <div className="d-flex Icon_Text">
                  <i className="fa fa-check" />
                  <li>Unlimited product updates</li>
                </div>
                <div className="d-flex Icon_Text">
                  <i className="fa fa-check" />
                  <li>Unlimited product updates</li>
                </div>
                <div className="d-flex Icon_Text">
                  <i className="fa fa-check" />
                  <li>Unlimited product updates</li>
                </div>
                <div className="d-flex Icon_Text">
                  <div className="remove-color">
                    <i className="fa fa-check" />
                  </div>
                  <li>Unlimited product updates</li>
                </div>
                <div className="d-flex Icon_Text">
                  <div className="remove-color">
                    <i className="fa fa-check" />
                  </div>
                  <li>Unlimited product updates</li>
                </div>
              </ul>
            </div>
            <button onClick={() => handleSelectPlan("monthly")}>
              <b>Go Premium</b>
            </button>
          </div>

          <div className="col-lg-3 text-center Free py-4">
            <h4>Yearly</h4>
            <p>Lorem Ipsum is simply</p>
            <div className="d-flex Icon_Text justify-content-center One_Month">
              <h1> {yearlyPrice} </h1>
              <div className="One">
                <h5>$</h5>
                <h6>Yearly</h6>
              </div>
            </div>
            <div className="Card">
              <ul>
                <div className="d-flex Icon_Text">
                  <i className="fa fa-check" />
                  <li>Unlimited product updates</li>
                </div>
                <div className="d-flex Icon_Text">
                  <i className="fa fa-check" />
                  <li>Unlimited product updates</li>
                </div>
                <div className="d-flex Icon_Text">
                  <i className="fa fa-check" />
                  <li>Unlimited product updates</li>
                </div>
                <div className="d-flex Icon_Text">
                  <div className="remove-color">
                    <i className="fa fa-check" />
                  </div>
                  <li>Unlimited product updates</li>
                </div>
                <div className="d-flex Icon_Text">
                  <div className="remove-color">
                    <i className="fa fa-check" />
                  </div>
                  <li>Unlimited product updates</li>
                </div>
              </ul>
            </div>
            <button onClick={() => handleSelectPlan("yearly")}>
              <b>Go Premium</b>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Package;
