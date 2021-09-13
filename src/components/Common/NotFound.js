import React from "react";

const NotFound = ({ title }) => {
  return (
    <div className="p-3 text-center border">
      <h4 className="mb-0">{title}</h4>
    </div>
  );
};

export default NotFound;

NotFound.defaultProps = {
    title : "No data found"
}
