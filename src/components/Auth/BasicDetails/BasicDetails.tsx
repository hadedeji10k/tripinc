import React, { useState, useEffect, useContext } from "react";
import { message, Spin } from "antd";
import "antd/dist/antd.min.css";
import axios from "axios";
import Autocomplete from "react-google-autocomplete";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { ISignUpFull } from "../../../api/interfaces";
import { AuthContext } from "../../../stores/Auth";
// import SecurityCodeModal from "../SecurityCodeModal/SecurityCodeModal";
import { Formik } from "formik";
import { BasicDetailsSchema } from "../../../schema/yupSchema";
import { noSignUpData, signUp } from "../../../api/responseHandlers";
import "./BasicDetails.css";
import { GOOGLEAPIKEY } from "../../../utils/constants";

const BasicDetails: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // const [showSecurityModal, setShowSecurityModal] = useState<Boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  //creating IP state
  const [ip, setIP] = useState("");
  const [signUpData, setSignUpData] = useState({} as any);

  // country states
  const [country, setCountry] = useState("");

  // city states
  const [city, setCity] = useState("");

  const authContext = useContext(AuthContext);

  //creating function to load ip address from the geolocation api
  const getData = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    setIP(res.data.IPv4);
  };

  useEffect(() => {
    // get previous data of sign up from localStorage
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
    setIsLoading(true);

    if (!country || !city) {
      message.error(
        "Error, please make sure you select country and city from the list.",
        3
      );
      setIsLoading(false);
      return;
    }

    const formData: ISignUpFull = {
      firstName: signUpData?.firstName,
      lastName: signUpData?.lastName,
      phoneNumber: data.phoneNumber,
      email: signUpData?.email,
      city,
      country,
      password: data.password,
      signupChannel: "web",
      ipAddress: ip,
    };

    // send data to backend
    signUp(formData)
      .then((res) => {
        authContext.login();
        authContext.setUserId(res.userId);
      })
      .catch(() => {
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Spin spinning={isLoading} size="large">
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
              {({
                errors,
                touched,
                handleSubmit,
                handleChange,
                handleBlur,
              }) => (
                //  signup form

                <form onSubmit={handleSubmit} autoComplete="none">
                  <div>
                    <label className="basic_details_label">Phone Number</label>
                    <input
                      name="phoneNumber"
                      className="basic_details_input"
                      type="text"
                      placeholder="Phone Number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.phoneNumber && touched.phoneNumber ? (
                      <p className="red_alert">{errors.phoneNumber}</p>
                    ) : null}
                  </div>

                  <div className="basic_details_country">
                    <label className="basic_details_label">Country</label>
                    <Autocomplete
                      apiKey={GOOGLEAPIKEY}
                      onPlaceSelected={(selected: any) => {
                        setCountry(selected.formatted_address);
                      }}
                      options={{
                        types: ["country"],
                        fields: ["formatted_address"],
                      }}
                      placeholder="Where do you live?"
                      className="basic_details_input"
                      id="country_input"
                    />
                  </div>
                  <div className="basic_details_country">
                    <label className="basic_details_label">City</label>
                    <Autocomplete
                      // ref={inputRef}
                      apiKey={GOOGLEAPIKEY}
                      onPlaceSelected={(selected: any) => {
                        setCity(selected.formatted_address);
                      }}
                      options={{
                        types: [],
                        fields: ["formatted_address"],
                      }}
                      placeholder="City"
                      className="basic_details_input"
                      id="city_input"
                    />
                  </div>
                  <div className="basic_details_line">
                    <hr className="basic_details_or_line" />
                  </div>
                  <div>
                    <div className="password_div">
                      <label className="basic_details_label">
                        Create Password
                      </label>
                      <span
                        className="sign_in_code_eyes_icon"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                      </span>
                    </div>
                    <input
                      className="basic_details_input"
                      type={showPassword ? "text" : "password"}
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
                    <div className="password_div">
                      <label className="basic_details_label">
                        Confirm Password
                      </label>
                      <span
                        className="sign_in_code_eyes_icon"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                      >
                        {showConfirmPassword ? (
                          <AiFillEyeInvisible />
                        ) : (
                          <AiFillEye />
                        )}
                      </span>
                    </div>
                    <input
                      className="basic_details_input"
                      type={showConfirmPassword ? "text" : "password"}
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

          <div className="have_account">
            <h3>
              Already have an account?{" "}
              <a href="/#/sign-in" className="login_text">
                Login
              </a>
            </h3>
          </div>
        </div>
        {/* <SecurityCodeModal
          showSecurityModal={showSecurityModal}
          setShowSecurityModal={setShowSecurityModal}
        /> */}
      </Spin>
    </>
  );
};

export default BasicDetails;
