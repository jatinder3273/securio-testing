import React from "react";

const Modal = ({ show, setShow, handleConfirmEvent }) => {
  return (
    <div className={`modal fade show ${show ? "d-block" : ""}`} style={{ backgroundColor: "#00000069" }}>
      <div className="modal-dialog text-center">
        <div className="modal-content modal-box py-5">
          <h5>Electronic Communications Consent form</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
          <div className="d-flex justify-content-center">
            <button className="button-in" onClick={handleConfirmEvent}>
              Opt In
            </button>
            <button onClick={() => setShow(!show)} className="button-out">
              Opt Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
