import React from "react";
import PolicyIcon from "../assets/images/policy-icon.svg";
import moment from "moment";
const PolicyCard = ({ detail }) => {
  return (
    <div className="card">
      <div className="card-header bg-white py-3 d-flex align-items-center justify-content-between">
        <div className="d-flex">
          <img src={PolicyIcon} className="me-2" width="16" alt="" />
          <h5 className="card-title mb-0">{detail?.subscriptionType === "yearly" ? "Yearly" : "Monthly"}</h5>
        </div>
        <div className="">
          <p className="price mb-0">$ {detail?.subscriptionPrice || 0}</p>
        </div>
      </div>
      <div className="card-body bg-white">
        <p className="card-text">
          {"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt "}
        </p>
        <p className="card-billing-date text-primary">
          Next Billing Date : <b>{moment(detail.subscriptionCurrentPeriodEnd * 1000).format("DD/MM/YYYY")}</b>
        </p>
        <div className="d-flex justify-content-between g-0">
          <button className="btn btn-outline-primary">Download</button>
          <button className="text-primary btn bg-white">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default PolicyCard;
