import React, { useContext, useEffect, useState } from "react";
import NotFound from "../../components/Common/NotFound";
import PolicyCard from "../../components/PolicyCard";
import { Decrypt } from "../../config/common";
import { LoaderContext } from "../../context/LoaderContext";
import { db } from "./../../config/firestore";

const Policy = () => {
  const { isLoaderOn, setLoader } = useContext(LoaderContext);
  const [policies, setPolicies] = useState([]);
  const getPolicies = async () => {
    try {
      setLoader(true);
      const userData = localStorage.getItem("_securioToken") ? Decrypt(localStorage.getItem("_securioToken")) : null;
      if (userData && userData._id) {
        const snapshot = await db
          .collection("policies")
          .where("userId", "==", userData._id)
          .get();
        const policiesList = [];
        await snapshot.docs.forEach(item => {
          policiesList.push(item.data());
        });
        setPolicies([...policiesList]);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.log(error, "Error");
    }
  };
  useEffect(() => {
    getPolicies();
  }, []);
  return (
    <div className="policy">
      <div className="heading">
        <h2>Policy</h2>
      </div>
      <div className="row">
        {policies.map((card, index) => (
          <div className="col-lg-4 mb-3" key={index}>
            <PolicyCard detail={card} />
          </div>
        ))}

        {!isLoaderOn && policies.length === 0 ? <NotFound />: null}
      </div>
    </div>
  );
};

export default Policy;
