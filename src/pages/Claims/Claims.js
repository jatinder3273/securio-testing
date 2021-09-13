/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NotFound from "../../components/Common/NotFound";
import { Decrypt } from "../../config/common";
import { db } from "../../config/firestore";
import { LoaderContext } from "../../context/LoaderContext";
const Claims = () => {
  const { isLoaderOn, setLoader } = useContext(LoaderContext);
  const [claims, setClaims] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedDes, setSelectedDes] = useState("");
  /**
   * Get all Claims
   */
  const getClaims = async () => {
    try {
      setLoader(true);
      const userData = localStorage.getItem("_securioToken") ? Decrypt(localStorage.getItem("_securioToken")) : null;
      if (userData && userData._id) {
        const snapshot = await db
          .collection("claims")
          .where("userId", "==", userData._id)
          .get();
        const claimsList = [];
        await snapshot.docs.forEach(item => {
          claimsList.push(item.data());
        });
        setClaims([...claimsList]);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.log(error, "Error");
    }
  };

  const handleReadmore = (event, text) => {
    event.preventDefault();
    setSelectedDes(text);
    setShow(true);
  };

  useEffect(() => {
    getClaims();
  }, []);
  return (
    <React.Fragment>
      <div className="heading mb-4 d-flex justify-content-between align-items-center">
        <h2>Claims</h2>
        <Link to="/claims/add">
          <button className="btn-sm">
            <i className="fa fa-plus" /> Add New Claims
          </button>
        </Link>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Sr. No.</th>
              <th scope="col">Date</th>
              <th scope="col">How much the loss occurred</th>
              <th scope="col">What the loss entailed</th>
            </tr>
          </thead>
          <tbody>
            {claims.map((info, index) => (
              <tr key={index}>
                <th scope="row" width="80">
                  {index + 1}
                </th>
                <td width="150">{info.date}</td>
                <td>{info.lossOccurred}</td>
                <td>
                  {info.lossEntailed.length > 150 ? (
                    <>
                      {info.lossEntailed.substring(0, 150)}{" "}
                      <a href="#" onClick={event => handleReadmore(event, info.lossEntailed)}>
                        Read more
                      </a>
                    </>
                  ) : (
                    info.lossEntailed
                  )}
                </td>
              </tr>
            ))}
            {!isLoaderOn && claims.length === 0 ? (
              <tr>
                <td colSpan="5" className="border-0">
                  <NotFound />
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
      <div className={`modal fade show ${show ? "d-block" : ""}`} style={{ backgroundColor: "#00000069" }}>
        <div className="modal-dialog text-center mt-5 modal-dialog-custom">
          <div className="modal-content modal-box py-5">
            <button onClick={() => setShow(!show)} type="button" className="btn-close close-custom" data-bs-dismiss="modal" aria-label="Close" />
            <p>{selectedDes}</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Claims;
