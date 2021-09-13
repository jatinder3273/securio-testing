import React, { useContext } from "react";
import { Formik, Form } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Yup from "yup";
import moment from "moment";
import InputField from "../../components/Common/InputField";
import { db } from "../../config/firestore";
import { Decrypt } from "../../config/common";
import { LoaderContext } from "../../context/LoaderContext";
import { useHistory } from "react-router-dom";
const ValidationSchema = Yup.object().shape({
  date: Yup.string().required("Loss Occurred date is required"),
  lossOccurred: Yup.string().required("Loss Occurred is required"),
  lossEntailed: Yup.string().required("Loss Entailed is required")
});
const ClaimsAdd = () => {
  const history = useHistory();
  const { setLoader } = useContext(LoaderContext);
  const handleSubmit = async values => {
    try {
      setLoader(true);
      const userData = localStorage.getItem("_securioToken") ? Decrypt(localStorage.getItem("_securioToken")) : null;
      await db.collection("claims").add({
        date: values.date,
        lossEntailed: values.lossEntailed,
        lossOccurred: values.lossOccurred,
        userId: userData._id,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      setLoader(false);
      history.push(`/claims`);
    } catch (error) {
      setLoader(false);
      console.log(error, "Error");
    }
  };
  return (
    <React.Fragment>
      <div className="heading mb-4">
        <h2>Claims</h2>
      </div>
      <Formik
        initialValues={{
          lossOccurred: "",
          lossEntailed: "",
          date: ""
        }}
        validationSchema={ValidationSchema}
        onSubmit={values => handleSubmit(values)}
      >
        {({ errors, values, setFieldValue }) => (
          <Form>
            <div className="row">
              <div className="col-lg-6 mb-3">
                <label className="form-label">When the loss occurred</label>
                <DatePicker
                  name="date"
                  className="form-control"
                  selected={values.date ? new Date(values.date) : null}
                  onChange={date => setFieldValue("date", date ? moment(date).format("YYYY-MM-DD") : null)}
                />
                {errors.date ? <div className="text-danger">{errors.date}</div> : null}
              </div>
              <div className="col-lg-6 mb-3">
                <InputField
                  name="lossOccurred"
                  type="text"
                  className="form-control"
                  label="How much $ the loss involved?"
                  errors={errors.lossOccurred}
                />
              </div>
              <div className="col-lg-12 mb-5">
                <InputField
                  name="lossEntailed"
                  as="textarea"
                  className="form-control"
                  label="What the loss entailed"
                  errors={errors.lossEntailed}
                />
              </div>
              <div>
                <button type="submit" className="btn btn-dark w-100" style={{ maxWidth: 160 }}>
                  Save
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default ClaimsAdd;
