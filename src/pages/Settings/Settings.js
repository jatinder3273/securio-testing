import React, { useContext } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputField from "../../components/Common/InputField";
import { auth } from "../../config/firestore";
import firebase from "firebase/app";
import { LoaderContext } from "../../context/LoaderContext";
import { toast } from "react-toastify";
const ChangePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Current password is required."),
  newPassword: Yup.string().required("Password is required"),
  confirmPassword: Yup.string().oneOf([Yup.ref("newPassword"), null], "Password and confirm password not match")
});
const Settings = () => {
  const { setLoader } = useContext(LoaderContext);

  /**
   * Changes password submit function
   * @param {FormInputs} values
   */
  const handleSubmit = async values => {
    try {
      setLoader(true);
      const user = auth.currentUser;
      const cred = firebase.auth.EmailAuthProvider.credential(user.email, values.currentPassword);
      await user.reauthenticateWithCredential(cred);
      await user.updatePassword(values.newPassword);
      toast.dark("Password Updated Successfully.");
      setLoader(false);
    } catch (error) {
      setLoader(false);
      toast.dark("Old password is invalid!");
      console.log(error, "Error");
    }
  };

  return (
    <React.Fragment>
      <div className="heading mb-4">
        <h2>Change password</h2>
      </div>
      <Formik
        initialValues={{
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        }}
        validationSchema={ChangePasswordSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="row">
              <div className="col-lg-6 mb-3">
                <InputField
                  name="currentPassword"
                  type="password"
                  className="form-control"
                  label="Current Password"
                  errors={errors.currentPassword}
                  touched={touched}
                />
              </div>
              <div className="col-lg-6 mb-3">
                <InputField
                  name="newPassword"
                  type="password"
                  className="form-control"
                  label="New Password"
                  errors={errors.newPassword}
                  touched={touched}
                />
              </div>
              <div className="col-lg-6 mb-5">
                <InputField
                  name="confirmPassword"
                  type="password"
                  className="form-control"
                  label="Confirm password"
                  errors={errors.confirmPassword}
                  touched={touched}
                />
              </div>
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-dark w-100" style={{ maxWidth: 200 }}>
                  Change Password
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default Settings;
