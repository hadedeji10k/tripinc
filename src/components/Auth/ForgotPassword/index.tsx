import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./ForgotPassword.css";
import { Spin } from "antd";
import "antd/dist/antd.min.css";
import MyGif from "../../../images/success.gif";
import { confirmForgotPasswordResquest } from "../../../api";
import { IConfirmForgotPasswordRequest } from "../../../api/interfaces";
import { Formik } from "formik";
import { ConfirmPasswordRequestSchema } from "../../../schema/yupSchema";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const ForgotPassword = () => {
  const [passwordResetSuccessful, setPasswordResetSuccessful] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [searchParams] = useSearchParams();
  const userId = searchParams.get("UserId");
  const resetCode = searchParams.get("ResetCode") as string;

  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const handleSubmitPasswordRequest = (data: any) => {
    setIsLoading(true);

    const formData: IConfirmForgotPasswordRequest = {
      userId: parseInt(userId as string),
      resetCode,
      newPassword: data.password,
    };

    confirmForgotPasswordResquest(formData)
      .then(() => {
        setPasswordResetSuccessful(true);
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Spin spinning={isLoading} size="large">
      <div className="account_verified_container">
        {!passwordResetSuccessful ? (
          <div>
            <h1 className="account_verified_header m_t_30 m_b_10">
              Password Reset
            </h1>
            <h3 className="account_verified_title m_b_15">
              Complete your password reset process.
            </h3>

            {/* Formik */}
            <Formik
              initialValues={initialValues}
              validationSchema={ConfirmPasswordRequestSchema}
              onSubmit={(values) => {
                handleSubmitPasswordRequest(values);
              }}
            >
              {({
                errors,
                touched,
                handleSubmit,
                handleChange,
                handleBlur,
              }) => (
                //  signin form

                <form
                  onSubmit={handleSubmit}
                  autoComplete="off"
                  className="sign_in_form"
                >
                  <div>
                    <div className="password_div">
                      <label className="signin_label">Password</label>
                      <span
                        className="sign_in_code_eyes_icon"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                      </span>
                    </div>
                    <input
                      name="password"
                      className="signin_input"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.password && touched.password ? (
                      <p className="red_alert">{errors.password}</p>
                    ) : null}
                  </div>
                  <div>
                    <div className="password_div">
                      <label className="signin_label">Confirm Password</label>
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
                      name="confirmPassword"
                      className="signin_input"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.confirmPassword && touched.confirmPassword ? (
                      <p className="red_alert">{errors.confirmPassword}</p>
                    ) : null}
                  </div>

                  <div className="signin_button_container">
                    <button className="signin_button m_b_40" type="submit">
                      Reset password
                    </button>
                  </div>
                </form>

                // End of signup form
              )}
            </Formik>
          </div>
        ) : (
          <div className="account_verified_word">
            <h1 className="account_verified_header">Success!</h1>
            <img className="success_gif" src={MyGif} alt="hello" />
            <h3 className="account_verified_title">
              Your password has been reset successfully.
            </h3>

            <button
              className="basic_details_button"
              onClick={() => {
                window.location.href = "/#/sign-in";
              }}
            >
              Sign In!
            </button>
          </div>
        )}

        {error ? (
          <div className="account_verified_word">
            <h1 className="account_verified_header">Error!</h1>
            <h3 className="account_verified_title">
              Error while trying to reset your password, please try again.
            </h3>

            <button
              className="basic_details_button"
              onClick={() => {
                window.location.href = "/#/sign-in";
              }}
            >
              Go to Sign In page!
            </button>
          </div>
        ) : null}
      </div>
    </Spin>
  );
};

export default ForgotPassword;
