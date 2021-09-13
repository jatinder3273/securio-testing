import React, { useContext } from "react";
import { LoaderContext } from "../../context/LoaderContext";
const Loader = () => {
  const { isLoaderOn } = useContext(LoaderContext);
  return isLoaderOn ? (
    <div className="global-spinner-overlay">
      <div className="loader-02" />
    </div>
  ) : null;
};

export default Loader;
