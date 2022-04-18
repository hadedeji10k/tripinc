import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { ISignUpFull } from "../../api/interfaces";

// import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import SecurityCodeModal from "../SecurityCodeModal/SecurityCodeModal";
import { Formik } from "formik";
import { BasicDetailsSchema } from "../../schema/yupSchema";
import { noSignUpData, signUp } from "../../api/responseHandlers";

import "./BasicDetails.css";

const BasicDetails: React.FC = () => {
  //creating IP state
  const [ip, setIP] = useState("");
  const [signUpData, setSignUpData] = useState({} as any);

  const navigate = useNavigate();

  //creating function to load ip address from the geolocation api
  const getData = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    setIP(res.data.IPv4);
  };

  useEffect(() => {
    // get previous data of sign up from localstorage
    const sign_up_data = JSON.parse(localStorage.getItem("signUpData") as any);
    // if no data prompt back to sign up page
    if (sign_up_data === undefined || sign_up_data === null) {
      noSignUpData();
    }
    // get Ip address
    getData();
    // set sign up data to state
    setSignUpData(sign_up_data);
  }, []);

  const initialValues = {
    phoneNumber: "",
    countryOfOrigin: "",
    cityOfOrigin: "",
    password: "",
    confirmPassword: "",
  };

  const onSubmit = (data: any) => {
    const formData: ISignUpFull = {
      firstName: signUpData?.firstName,
      lastName: signUpData?.lastName,
      phoneNumber: data.phoneNumber,
      email: signUpData?.email,
      city: data.cityOfOrigin,
      country: data.countryOfOrigin,
      password: data.password,
      signupChannel: "web",
      ipAddress: ip,
    };

    // send data to backend
    signUp(formData);
  };

  const [showModal, setShowModal] = useState<Boolean>(false);

  const toggleShowModal = (e: React.FormEvent): void => {
    e.preventDefault();
    setShowModal(!showModal);
  };

  return (
    <div className="basic_details_container">
      <div className="basic_details_word">
        <h1 className="basic_details_header">Basic Details</h1>
        <h3 className="basic_details_title">It’s all in the details.</h3>
      </div>
      <div>
        {/* Formik */}
        <Formik
          initialValues={initialValues}
          validationSchema={BasicDetailsSchema}
          onSubmit={(values) => {
            onSubmit(values);
          }}
        >
          {({ errors, touched, handleSubmit, handleChange, handleBlur }) => (
            //  signup form

            <form onSubmit={handleSubmit} autoComplete="off">
              <div>
                <label className="basic_details_label">Phone Number</label>
                <input
                  className="basic_details_input"
                  type="text"
                  placeholder="Phone Number"
                  name="phoneNumber"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.phoneNumber && touched.phoneNumber ? (
                  <p className="red_alert">{errors.phoneNumber}</p>
                ) : null}
              </div>
              <div>
                <label className="basic_details_label">Country of Origin</label>
                <input
                  className="basic_details_input"
                  type="text"
                  placeholder="Select Country"
                  name="countryOfOrigin"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.countryOfOrigin && touched.countryOfOrigin ? (
                  <p className="red_alert">{errors.countryOfOrigin}</p>
                ) : null}
              </div>
              <div>
                <label className="basic_details_label">City of Origin</label>
                <input
                  className="basic_details_input"
                  type="text"
                  placeholder="Enter city of Origin"
                  name="cityOfOrigin"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.cityOfOrigin && touched.cityOfOrigin ? (
                  <p className="red_alert">{errors.cityOfOrigin}</p>
                ) : null}
              </div>
              <div className="basic_details_line">
                <hr className="basic_details_or_line" />
              </div>
              <div>
                <label className="basic_details_label">Create Password</label>
                <input
                  className="basic_details_input"
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password ? (
                  <p className="red_alert">{errors.password}</p>
                ) : null}
              </div>
              <div>
                <label className="basic_details_label">Confirm Password</label>
                <input
                  className="basic_details_input"
                  type="password"
                  placeholder="Confirm your password"
                  name="confirmPassword"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.confirmPassword && touched.confirmPassword ? (
                  <p className="red_alert">{errors.confirmPassword}</p>
                ) : null}
              </div>
              <div className="basic_details_button_container">
                <button className="basic_details_button" type="submit">
                  Next!
                </button>
              </div>
            </form>

            // End of signup form
          )}
        </Formik>
        {/* End of Formik */}
      </div>
      <SecurityCodeModal showModal={showModal} setShowModal={setShowModal} />
      <div className="have_account">
        <h3>
          Already have an account?{" "}
          <a href="/" className="login_text">
            Login
          </a>
        </h3>
      </div>
    </div>
  );
};

export default BasicDetails;
