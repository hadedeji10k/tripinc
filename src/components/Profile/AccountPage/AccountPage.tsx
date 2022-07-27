import React, { useState } from "react";
import { Spin, Switch } from "antd";
import "antd/dist/antd.min.css";
import "./AccountPage.css";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Formik } from "formik";
import {
  ProfileDetailsPreferenceSchema,
  ProfileDetailsSchema,
} from "../../../schema/yupSchema";
import { userData } from "../../../currentUserData";
import AccountPageModal from "../Modal/AccountPageModal/AccountPageModal";
import Swal from "sweetalert2";
import {
  updateUserPreference,
  updateUserPassword,
} from "../../../api/responseHandlers";

interface AccountPageProps {
  userPreference: any;
}

const AccountPage = ({ userPreference }: AccountPageProps) => {
  const [showAccountPageModal, setShowAccountPageModal] =
    useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showPasswordEdit, setShowPasswordEdit] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [showCurrentPassword, setShowCurrentPassword] =
    useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showNewConfirmPassword, setShowNewConfirmPassword] =
    useState<boolean>(false);

  // const toggleShowAccountModal = (e: React.FormEvent): void => {
  //   e.preventDefault();
  //   setShowAccountPageModal(!showAccountPageModal);
  // };
  const handlePasswordSubmit = async (values: any) => {
    // e.preventDefault();
    setIsLoading(true);
    await updateUserPassword(values, userPreference.userId);
    setShowPasswordEdit((prevState) => !prevState);
    setIsLoading(false);
  };

  const handlePreferenceSubmit = async (values: any) => {
    // e.preventDefault();
    setIsLoading(true);
    await updateUserPreference(values, userPreference.userId);
    setShowEdit((prevState) => !prevState);
    setIsLoading(false);
  };

  const toggleShowEdit = (e: React.FormEvent): void => {
    e.preventDefault();
    setShowEdit((prevState) => !prevState);
  };

  const toggleCancelShowEdit = (e: React.FormEvent): void => {
    e.preventDefault();
    Swal.fire({
      title: "Warning!",
      text: "Are you sure you want to cancel changes?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel changes!",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        setShowEdit((prevState) => !prevState);
      }
    });
  };

  const togglePasswordCancelShowEdit = (e: React.FormEvent): void => {
    e.preventDefault();
    Swal.fire({
      title: "Warning!",
      text: "Are you sure you want to cancel changes?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel changes!",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        setShowPasswordEdit((prevState) => !prevState);
        setShowCurrentPassword(false);
      }
    });
  };

  const toggleShowPasswordEdit = (e: React.FormEvent): void => {
    e.preventDefault();
    setShowPasswordEdit((prevState) => !prevState);
  };

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const initialPreferenceValues = {
    preferedCurrency: "",
    preferedTimeFormat: "",
  };

  const initialValues = {
    password: "",
    newPassword: "",
    confirmPassword: "",
  };

  return (
    <Spin spinning={isLoading} size="large">
      <div className="personal_info">
        <div className="profile_details">
          <div className="box">
            <h3 className="header">Account Settings</h3>
            <div className="profile_details_container">
              {/* Formik for preference */}
              <Formik
                initialValues={initialPreferenceValues}
                validationSchema={ProfileDetailsPreferenceSchema}
                onSubmit={(values) => {
                  handlePreferenceSubmit(values);
                }}
              >
                {({
                  errors,
                  touched,
                  handleSubmit,
                  handleChange,
                  handleBlur,
                }) => (
                  <>
                    {/* Preferencess as form */}
                    <form
                      onSubmit={handleSubmit}
                      autoComplete="off"
                      className="sign_in_form"
                    >
                      <div className="profile_details_item">
                        <div className="profile_details_item_row">
                          <label className="personal_info_label">
                            Preferred Currency
                          </label>
                          {/* <input
                            name="preferredCurrency"
                            className="personal_info_input"
                            type="text"
                            placeholder={userData?.preferredCurrency}
                            disabled={!showEdit}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          /> */}
                          <select
                            name="preferedCurrency"
                            id=""
                            className="personal_info_input"
                            disabled={!showEdit}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option value={userPreference?.preferedCurrency}>
                              {userPreference?.preferedCurrency}
                            </option>
                            <option value="NGN">NGN</option>
                            <option value="GBP">GBP</option>
                          </select>
                          {errors.preferedCurrency &&
                          touched.preferedCurrency ? (
                            <p className="red_alert">
                              {errors.preferedCurrency}
                            </p>
                          ) : null}
                        </div>
                        <div className="profile_details_item_row">
                          <label className="personal_info_label">
                            Time Format
                          </label>
                          {/* <input
                          name="timeFormat"
                          className="personal_info_input"
                          type="text"
                          placeholder={userData?.timeFormat}
                          disabled={!showEdit}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        /> */}
                          <select
                            name="preferedTimeFormat"
                            id=""
                            className="personal_info_input"
                            disabled={!showEdit}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option value={userPreference?.preferedTimeFormat}>
                              {userPreference?.preferedTimeFormat}
                            </option>
                            <option value="12">12 hours</option>
                            <option value="24">24 hours</option>
                          </select>
                          {errors.preferedTimeFormat &&
                          touched.preferedTimeFormat ? (
                            <p className="red_alert">
                              {errors.preferedTimeFormat}
                            </p>
                          ) : null}
                        </div>
                      </div>
                      <div className="profile_details_item">
                        <div className="profile_details_item_row">
                          {!showEdit ? (
                            <button
                              className="personal_info_button"
                              onClick={toggleShowEdit}
                            >
                              Edit Settings
                            </button>
                          ) : null}
                          {showEdit ? (
                            <button
                              className="personal_info_button"
                              type="submit"
                            >
                              Save Settings
                            </button>
                          ) : null}
                          {showEdit ? (
                            <button
                              className="personal_info_button_cancel"
                              onClick={toggleCancelShowEdit}
                            >
                              Cancel
                            </button>
                          ) : null}
                        </div>
                      </div>
                    </form>
                  </>

                  // End of form
                )}
              </Formik>
              {/* End of formik preference */}

              {/* Formik */}
              <Formik
                initialValues={initialValues}
                validationSchema={ProfileDetailsSchema}
                onSubmit={(values) => {
                  handlePasswordSubmit(values);
                }}
              >
                {({
                  errors,
                  touched,
                  handleSubmit,
                  handleChange,
                  handleBlur,
                }) => (
                  <>
                    {/* password as form */}
                    <form
                      onSubmit={handleSubmit}
                      autoComplete="off"
                      className="sign_in_form"
                    >
                      <div className="profile_details_item">
                        <div className="profile_details_item_row">
                          <div className="password_div">
                            <label className="personal_info_label">
                              Current Password
                            </label>
                            {showPasswordEdit ? (
                              <span
                                className="sign_in_code_eyes_icon"
                                onClick={() =>
                                  setShowCurrentPassword((prev) => !prev)
                                }
                              >
                                {showCurrentPassword ? (
                                  <AiFillEyeInvisible />
                                ) : (
                                  <AiFillEye />
                                )}
                              </span>
                            ) : null}
                          </div>
                          <input
                            name="password"
                            className="personal_info_input"
                            type={showCurrentPassword ? "text" : "password"}
                            placeholder={userData?.password}
                            disabled={!showPasswordEdit}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {showPasswordEdit &&
                          errors.password &&
                          touched.password ? (
                            <p className="red_alert">{errors.password}</p>
                          ) : null}
                        </div>
                        {!showPasswordEdit ? (
                          <div className="profile_details_item_row">
                            <button
                              className="personal_info_button"
                              onClick={toggleShowPasswordEdit}
                            >
                              {/* {showEdit ? "Edit Account" : "Save Settings"} */}
                              Edit Password
                            </button>
                          </div>
                        ) : null}

                        {showPasswordEdit ? (
                          <div className="profile_details_item_row">
                            <div className="password_div">
                              <label className="personal_info_label">
                                New Password
                              </label>
                              <span
                                className="sign_in_code_eyes_icon"
                                onClick={() =>
                                  setShowNewPassword((prev) => !prev)
                                }
                              >
                                {showNewPassword ? (
                                  <AiFillEyeInvisible />
                                ) : (
                                  <AiFillEye />
                                )}
                              </span>
                            </div>
                            <input
                              name="newPassword"
                              className="personal_info_input"
                              type={showNewPassword ? "text" : "password"}
                              placeholder={userData?.password}
                              disabled={!showPasswordEdit}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {showPasswordEdit &&
                            errors.newPassword &&
                            touched.newPassword ? (
                              <p className="red_alert">{errors.newPassword}</p>
                            ) : null}
                          </div>
                        ) : null}
                      </div>
                      {showPasswordEdit ? (
                        <div className="profile_details_item">
                          <div className="profile_details_item_row">
                            <div className="password_div">
                              <label className="personal_info_label">
                                Confirm New Password
                              </label>
                              <span
                                className="sign_in_code_eyes_icon"
                                onClick={() =>
                                  setShowNewConfirmPassword((prev) => !prev)
                                }
                              >
                                {showNewConfirmPassword ? (
                                  <AiFillEyeInvisible />
                                ) : (
                                  <AiFillEye />
                                )}
                              </span>
                            </div>
                            <input
                              name="confirmPassword"
                              className="personal_info_input"
                              type={
                                showNewConfirmPassword ? "text" : "password"
                              }
                              placeholder={userData?.password}
                              disabled={!showPasswordEdit}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {showPasswordEdit &&
                            errors.confirmPassword &&
                            touched.confirmPassword ? (
                              <p className="red_alert">
                                {errors.confirmPassword}
                              </p>
                            ) : null}
                          </div>
                          <div className="profile_details_item_row">
                            <button
                              className="personal_info_button"
                              type="submit"
                            >
                              {showPasswordEdit
                                ? "Save Password"
                                : "Edit Password"}
                            </button>
                            {showPasswordEdit ? (
                              <button
                                className="personal_info_button_cancel"
                                onClick={togglePasswordCancelShowEdit}
                              >
                                Cancel
                              </button>
                            ) : null}
                          </div>
                        </div>
                      ) : null}
                    </form>
                  </>

                  // End of form
                )}
              </Formik>
              {/* End of formik */}
            </div>
          </div>

          <AccountPageModal
            showAccountPageModal={showAccountPageModal}
            setShowAccountPageModal={setShowAccountPageModal}
          />

          <div className="box">
            <h3 className="header">Permissions</h3>
            <div className="permission">
              <div className="permission_container">
                <div className="permission_item_container">
                  <div>
                    <h4 className="permission_header">Privacy</h4>
                  </div>
                  <div className="permission_item">
                    <div className="permission_item_content">
                      <p>
                        We use cookies to help personalise content, tailor ads,
                        as well as provide a safer user expereince for you on
                        our platform.
                      </p>
                    </div>
                    <div className="permission_item_content2">
                      {/* <button className="personal_info_button">Edit</button> */}
                      <Switch defaultChecked={false} onChange={onChange} />
                    </div>
                  </div>
                  <div>
                    <h4 className="permission_header">Shares</h4>
                  </div>
                  <div className="permission_item">
                    <div className="permission_item_content">
                      <p>
                        I give permission for my trip, including my profile
                        name, location and activity check in to be share onto
                        social platforms such as Facebook.{" "}
                      </p>
                    </div>
                    <div className="permission_item_content2">
                      {/* <button className="personal_info_button">Edit</button> */}
                      <Switch defaultChecked={false} onChange={onChange} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default AccountPage;
