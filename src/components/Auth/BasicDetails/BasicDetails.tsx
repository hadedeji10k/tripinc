import React, { useState, useEffect, useContext } from "react";
import { Spin } from "antd";
import "antd/dist/antd.min.css";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

import { ISignUpFull } from "../../../api/interfaces";
import { AuthContext } from "../../../stores/Auth";

// import { countryData } from "../../currentUserData";

// import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import SecurityCodeModal from "../SecurityCodeModal/SecurityCodeModal";
import { Formik } from "formik";
import { BasicDetailsSchema } from "../../../schema/yupSchema";
import { noSignUpData, signUp } from "../../../api/responseHandlers";

import "./BasicDetails.css";
import Swal from "sweetalert2";
import { getAllCountries, getCities } from "../../../api";
import Box from "@mui/material/Box";

const BasicDetails: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [showSecurityModal, setShowSecurityModal] = useState<Boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  //creating IP state
  const [ip, setIP] = useState("");
  const [signUpData, setSignUpData] = useState({} as any);

  // country states
  const [countries, setCountries] = useState<any>([]);
  const [country, setCountry] = useState("");
  const [countryError, setCountryError] = useState("");

  // country code
  const [countryCode, setCountryCode] = useState("");

  // city states
  const [cities, setCities] = useState<any>([]);
  const [city, setCity] = useState("");
  const [cityDisabled, setCityDisabled] = useState(true);
  const [cityError, setCityError] = useState("Select country to enable cities");

  const authContext = useContext(AuthContext);

  // select country input
  // let countryInputElement = document.getElementById("country_input") as any;
  // let cityInputElement = document.getElementById(
  //   "city_input"
  // ) as HTMLInputElement;

  //creating function to load ip address from the geolocation api
  const getData = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    setIP(res.data.IPv4);
  };

  // to fetch all countries
  useEffect(() => {
    const localStorageCountries = JSON.parse(
      localStorage.getItem("countries") as any
    );
    if (localStorageCountries.data.length > 0) {
      setCountries(localStorageCountries.data);
    } else {
      getAllCountries().then((res) => {
        setCountries(res.data.items);
      });
    }
  }, []);

  // to fetch all cities
  useEffect(() => {
    const localStorageCities = JSON.parse(
      localStorage.getItem("cities") as any
    );
    if (localStorageCities?.items.length > 0) {
      setCities(localStorageCities.items);
    } else {
      const query = `CountryCode=${countryCode}`;
      getCities(query).then((res) => {
        console.log(res.data);
        setCities(res.data.items);
      });
    }
  }, [countryCode]);

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
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Error, please make sure you select country and city.",
        showConfirmButton: false,
      });
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
        setIsLoading(false);
        setShowSecurityModal(true);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  // function to handle country when changing
  const handleCountryClick = (e: any) => {
    if (e) {
      setCountry(e.countryName);
      setCountryCode(e.isoCode);
      setCountryError("");
      setCityDisabled(false);
      setCityError("");
    }
    console.log(e);
  };
  const handleCityClick = (e: any) => {
    if (e) {
      setCity(e.countryName);
      setCityError("");
    }
    console.log(e);
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
                  {/* <div>
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
                      {countries.length > 0 && (
                        <div className="dropdown-content" id="country_dropdown">
                          {countryFilteredData.map((item) => (
                            <p
                              key={item.id}
                              id="country_mapped"
                              className="pop_up_data_item"
                              onClick={handleCountryClick}
                            >
                              {item.countryName}
                            </p>
                          ))}
                        </div>
                      )}
                      {countryError ? (
                        <p className="red_alert">{countryError}</p>
                      ) : null}
                    </div>
                  </div> */}
                  <div className="basic_details_country">
                    <label className="basic_details_label">Country</label>
                    <Autocomplete
                      disabled={false}
                      disablePortal
                      disableClearable
                      onChange={(event: any, newValue: string | null) => {
                        event.preventDefault();
                        handleCountryClick(newValue);
                      }}
                      options={countries}
                      getOptionLabel={(option: any) => option.countryName}
                      id="combo-box"
                      sx={{}}
                      renderOption={(props, option) => (
                        <Box
                          component="li"
                          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                          {...props}
                        >
                          <img
                            loading="lazy"
                            width="20"
                            src={`https://flagcdn.com/w20/${option.isoCode.toLowerCase()}.png`}
                            srcSet={`https://flagcdn.com/w40/${option.isoCode.toLowerCase()}.png 2x`}
                            alt=""
                          />
                          {option.countryName} ({option.isoCode})
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField {...params} label="Country" />
                      )}
                    />
                    {countryError ? (
                      <>
                        <br />
                        <p className="red_alert">{countryError}</p>
                      </>
                    ) : null}
                  </div>
                  <div className="basic_details_country">
                    <label className="basic_details_label">City</label>
                    <Autocomplete
                      disabled={cityDisabled}
                      disablePortal
                      disableClearable
                      onChange={(event: any, newValue: string | null) => {
                        event.preventDefault();
                        handleCityClick(newValue);
                      }}
                      options={countries}
                      getOptionLabel={(option: any) => option.countryName}
                      id="combo-box2"
                      sx={{}}
                      renderOption={(props, option) => (
                        <Box
                          component="li"
                          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                          {...props}
                        >
                          <img
                            loading="lazy"
                            width="20"
                            src={`https://flagcdn.com/w20/${option.isoCode.toLowerCase()}.png`}
                            srcSet={`https://flagcdn.com/w40/${option.isoCode.toLowerCase()}.png 2x`}
                            alt=""
                          />
                          {option.countryName} ({option.isoCode})
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField {...params} label="City" />
                      )}
                    />
                    {cityError ? (
                      <>
                        <br />
                        <p className="red_alert">{cityError}</p>
                      </>
                    ) : null}
                  </div>
                  {/* <div>
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
                      {cities.length > 0 && (
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
                  </div> */}
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
          <SecurityCodeModal
            showSecurityModal={showSecurityModal}
            setShowSecurityModal={setShowSecurityModal}
          />
          <div className="have_account">
            <h3>
              Already have an account?{" "}
              <a href="/" className="login_text">
                Login
              </a>
            </h3>
          </div>
        </div>
      </Spin>
    </>
  );
};

export default BasicDetails;
