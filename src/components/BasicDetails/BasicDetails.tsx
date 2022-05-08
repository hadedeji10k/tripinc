import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { ISignUpFull } from "../../api/interfaces";
import { AuthContext } from "../../stores/Auth";

import { countryData } from "../../currentUserData";

// import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import SecurityCodeModal from "../SecurityCodeModal/SecurityCodeModal";
import { Formik } from "formik";
import { BasicDetailsSchema } from "../../schema/yupSchema";
import { noSignUpData, signUp } from "../../api/responseHandlers";

import "./BasicDetails.css";
import Swal from "sweetalert2";

const BasicDetails: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //creating IP state
  const [ip, setIP] = useState("");
  const [signUpData, setSignUpData] = useState({} as any);

  // country states
  const [countryFilteredData, setCountryFilteredData] = useState<any>([]);

  const [country, setCountry] = useState("");
  const [countryError, setCountryError] = useState("");

  // city states
  const [cityFilteredData, setCityFilteredData] = useState<any>([]);

  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState("");

  const authContext = useContext(AuthContext);

  // select country input
  let countryInputElement = document.getElementById("country_input") as any;
  let cityInputElement = document.getElementById(
    "city_input"
  ) as HTMLInputElement;

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

  useEffect(() => {
    setCountry(countryInputElement?.value);
    setCity(cityInputElement?.value);
    // console.log("reached");
    console.log(country);

    const isCountry = countryData.filter((item) => {
      return item.name.toLowerCase() === country?.toLowerCase();
    });
    console.log(isCountry);
    let elementToDisabled = cityInputElement?.disabled;
    if (isCountry.length > 0) {
      setCountryError("");
      elementToDisabled = false;
    } else {
      elementToDisabled = true;
    }

    return () => {};
  }, [countryInputElement, cityInputElement, country]);

  const initialValues = {
    phoneNumber: "",
    // countryOfOrigin: "",
    // cityOfOrigin: "",
    password: "",
    confirmPassword: "",
  };

  const onSubmit = (data: any) => {
    setIsLoading(true);

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
    // console.log(formData);
    signUp(formData).then((res) => {
      authContext.login();
      authContext.setUserId(res.userId);
    });
    setIsLoading(false);
  };

  const [showModal, setShowModal] = useState<Boolean>(false);

  const toggleShowModal = (e: React.FormEvent): void => {
    e.preventDefault();
    setShowModal(!showModal);
  };

  const handleCountryClick = (e: any) => {
    e.preventDefault();
    let value = e.target.innerHTML;

    switch (e.target.id) {
      case "country_mapped":
        // setCountryFilteredData([]);
        setCountry(value);
        countryInputElement.value = value;

        const dropDownElement = document.getElementById(
          "country_dropdown"
        ) as any;
        dropDownElement.style.display = "none";

        setCountryError("");
        cityInputElement.disabled = false;

        const isCountry = countryData.filter((item) => {
          return item.name.toLowerCase() === country?.toLowerCase();
        });

        if (isCountry.length > 0) {
          setCountryError("");
          cityInputElement.disabled = false;
        } else {
          setCountryError("Please select a valid country");
          cityInputElement.disabled = true;
        }

        break;
      case "city_mapped":
        // setCountryFilteredData([]);
        setCity(value);
        cityInputElement.value = value;

        const cityDropDownElement = document.getElementById(
          "city_dropdown"
        ) as any;
        cityDropDownElement.style.display = "none";

        setCityError("");
        break;
    }
  };

  const handleCountryBlur = (e: any) => {
    e.preventDefault();
    let value = e.target.value;
    switch (e.target.id) {
      case "country_input":
        setTimeout(() => {
          const dropDownElement = document.getElementById(
            "country_dropdown"
          ) as any;
          dropDownElement.style.display = "none";

          const isCountry = countryData.filter((item) => {
            return item.name.toLowerCase() === country?.toLowerCase();
          });

          if (isCountry.length > 0) {
            setCountryError("");
            cityInputElement.disabled = false;
          } else {
            setCountryError("Please select a valid country");
            cityInputElement.disabled = true;
          }
        }, 200);
        break;
      case "city_input":
        setTimeout(() => {
          const cityDropDownElement = document.getElementById(
            "city_dropdown"
          ) as any;
          cityDropDownElement.style.display = "none";
        }, 200);
        break;
    }
  };

  // function to handle country when changing
  const handleClick = (e: any) => {
    e.preventDefault();
    const searchWord = e.target.value;
    switch (e.target.id) {
      case "country_input":
        setCountry(searchWord);
        const dropDownElement = document.getElementById(
          "country_dropdown"
        ) as any;
        dropDownElement.style.display = "block";

        if (
          searchWord === "" ||
          searchWord === null ||
          searchWord === undefined
        ) {
          setCountryFilteredData([]);
        } else {
          const newFilter = countryData.filter((value) => {
            return value.name.toLowerCase().includes(searchWord.toLowerCase());
          });

          setCountryFilteredData(newFilter);
        }
        break;
      case "city_input":
        setCity(searchWord);
        const cityDropDownElement = document.getElementById(
          "city_dropdown"
        ) as any;
        cityDropDownElement.style.display = "block";
        console.log("clicked");

        if (
          searchWord === "" ||
          searchWord === null ||
          searchWord === undefined
        ) {
          setCityFilteredData([]);
        } else {
          const newFilter = countryData.filter((value) => {
            return value.name.toLowerCase().includes(searchWord.toLowerCase());
          });

          setCityFilteredData(newFilter);
        }
    }
  };

  return (
    <>
      {isLoading ? Swal.showLoading() : null}

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

              <form onSubmit={handleSubmit} autoComplete="none">
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
                  <div className="dropdown">
                    <label className="basic_details_label">
                      Country of Origin
                    </label>
                    <input
                      id="country_input"
                      className="basic_details_input"
                      type="text"
                      placeholder="Select Country"
                      name="countryOfOrigin"
                      onChange={handleClick}
                      defaultValue={country}
                      onBlur={handleCountryBlur}
                      onClick={handleClick}
                    />
                    {countryData.length > 0 && (
                      <div className="dropdown-content" id="country_dropdown">
                        {countryFilteredData.map((item) => (
                          <p
                            key={item.id}
                            id="country_mapped"
                            className="pop_up_data_item"
                            onClick={handleCountryClick}
                          >
                            {item.name}
                          </p>
                        ))}
                      </div>
                    )}
                    {countryError ? (
                      <p className="red_alert">{countryError}</p>
                    ) : null}
                  </div>
                </div>
                <div>
                  <div className="dropdown">
                    <label className="basic_details_label">
                      City of Origin
                    </label>
                    <input
                      id="city_input"
                      className="basic_details_input"
                      type="text"
                      placeholder="Select City"
                      name="cityOfOrigin"
                      onChange={handleClick}
                      defaultValue={city}
                      onBlur={handleCountryBlur}
                      // onClick={handleClick}
                      disabled={true}
                    />
                    {countryData.length > 0 && (
                      <div className="dropdown-content" id="city_dropdown">
                        {cityFilteredData.map((item) => (
                          <p
                            key={item.id}
                            id="city_mapped"
                            className="pop_up_data_item"
                            onClick={handleCountryClick}
                          >
                            {item.name}
                          </p>
                        ))}
                      </div>
                    )}
                    {cityError ? (
                      <p className="red_alert">{cityError}</p>
                    ) : null}
                  </div>
                </div>
                {/* <div>
                <label className="basic_details_label">City</label>
                <select
                  name=""
                  id="city_input"
                  onClick={selectClick}
                  disabled={true}
                  className="basic_details_input basic_details_select"
                >
                  <option className="city_option" value="">
                    Select City
                  </option>
                  <option className="city_option" value="city_1">
                    City 1
                  </option>
                  <option className="city_option" value="city_2">
                    City 2
                  </option>
                  <option className="city_option" value="city_3">
                    City 3
                  </option>
                </select>
              </div> */}
                {/* <div>
                <label className="basic_details_label">City of Origin</label>
                <input
                  id="city_input"
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
              </div> */}
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
                  <label className="basic_details_label">
                    Confirm Password
                  </label>
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
    </>
  );
};

export default BasicDetails;
