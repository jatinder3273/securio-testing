import React from "react";
import { Field } from "formik";

const InputField = ({  errors, label, ...rest }) => {
  return (
    <div className="form-group">
      {label ? <label className="form-label">{label}</label> : ""}
      <Field {...rest} />
      {errors ? <div className="text-danger">{errors}</div> : null}
    </div>
  );
};

export default InputField;
