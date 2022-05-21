import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import "./Signup.css";
import "antd/dist/antd.css";
import { FaFacebookF } from "react-icons/fa";
import { BsGoogle } from "react-icons/bs";
import { Formik } from "formik";
import { SignUpSchema } from "../../schema/yupSchema";
import { checkIfEmailExists } from "../../api/responseHandlers";
import { checkAuth } from "../../utils/helpers";
import { IGoogleSignUp, ISignUp } from "../../api/interfaces";
import { GoogleLogin } from "react-google-login";
import { remoteGoogleLogin } from "../../api/responseHandlers";
import { GoogleLoginClientId } from "../../utils/constants";
import Swal from "sweetalert2";
import { googleApiProfile } from "../../api";

const Signup = () => {
  document.title = "TripInc - Sign Up";

  const [remoteError, setRemoteError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
  };

  const onSubmit = async (data: ISignUp) => {
    setIsLoading((prev) => !prev);
    await checkIfEmailExists(data).then((res) => {
      // setIsLoading(false);
      setIsLoading((prev) => !prev);
      window.location.href = "/#/basic-details";
    });
  };

  const handleGoogleLogin = async (googleData: any) => {
    setIsLoading(true);
    let providerKey: any;
    const profileObj = googleData.profileObj;
    const tokenObj = googleData.tokenObj;

    await googleApiProfile(tokenObj.id_token).then((res) => {
      providerKey = res.data.kid;
    });

    const formData: IGoogleSignUp = {
      email: profileObj.email,
      lastName: profileObj.familyName,
      firstName: profileObj.givenName,
      displayName: profileObj.name,
      pictureUrl: profileObj.imageUrl,
      idToken: tokenObj.id_token,
      providerUserId: googleData.googleId,
      provider: "GOOGLE",
      providerKey,
    };

    localStorage.setItem("socialSignUpData", JSON.stringify(formData));
    setIsLoading(false);
    window.location.href = "/#/social-basic-details";
    // remoteGoogleLogin(googleData)
    //   .then((response: any) => {
    //     console.log(response);
    //     // localLogin(response);
    //     // authContext.login();
    //     // authContext.setUserId(response.data.user.id);
    //     // authContext.setUsername(response.data.user.username);
    //     // navigate("/");
    //   })
    //   .catch((error: any) => {
    //     setIsLoading(false);
    //     const errors = Object.values(error?.response?.data);
    //     const merged = errors.flat(1);
    //     setRemoteError(merged.join(" "));
    //   }).finally(() => {
    //     setIsLoading(false);
    // });
  };

  const handleGoogleLoginFailed = () => {
    // (TODO) handle failed
    setRemoteError("Google Login unsuccessful.");
  };

  return (
    <>
      {/* {isLoading ? Swal.showLoading() : null} */}
      <div className="signup_container">
        <div className="signup_word">
          <h1 className="signup_header">Sign up</h1>
          <h3 className="signup_title">Welcome to Tripinc. All aboard.</h3>
        </div>
        <div className="external_signup_button">
          <GoogleLogin
            clientId={GoogleLoginClientId}
            render={(renderProps) => (
              <button
                className="signup_google_button"
                onClick={renderProps.onClick}
              >
                <BsGoogle /> Google
              </button>
            )}
            onSuccess={handleGoogleLogin}
            onFailure={handleGoogleLoginFailed}
            cookiePolicy={"single_host_origin"}
            // isSignedIn={true}
            // responseType="code"
          />

          {/* <button className="signup_google_button" type="submit">
          <BsGoogle /> Google
        </button> */}
          <button className="signup_facebook_button" type="submit">
            <FaFacebookF /> Facebook
          </button>
        </div>
        <div className="remote_error">
          {remoteError ? <p className="red_alert">{remoteError} </p> : null}
        </div>
        <div className="signup_or">
          <hr className="signup_or_line" />
          <h3 className="signup_or_text">Or continue with email</h3>
        </div>
        <div>
          {/* Formik */}
          <Formik
            initialValues={initialValues}
            validationSchema={SignUpSchema}
            onSubmit={(values) => {
              onSubmit(values);
            }}
          >
            {({ errors, touched, handleSubmit, handleChange, handleBlur }) => (
              //  signup form

              <form
                onSubmit={handleSubmit}
                autoComplete="off"
                className="sign_up_form"
              >
                <div>
                  <label className="signup_label">First Name</label>
                  <input
                    name="firstName"
                    className="signup_input"
                    type="text"
                    placeholder="Enter your first name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.firstName && touched.firstName ? (
                    <p className="red_alert">{errors.firstName}</p>
                  ) : null}
                </div>
                <div>
                  <label className="signup_label">Last Name</label>
                  <input
                    name="lastName"
                    className="signup_input"
                    type="text"
                    placeholder="Enter your last name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.lastName && touched.lastName ? (
                    <p className="red_alert">{errors.lastName}</p>
                  ) : null}
                </div>
                <div>
                  <label className="signup_label">Email</label>
                  <input
                    name="email"
                    className="signup_input"
                    type="email"
                    placeholder="Enter your email address"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email ? (
                    <p className="red_alert">{errors.email}</p>
                  ) : null}
                </div>
                <Spin spinning={isLoading}>
                  <div className="signup_button_container">
                    <button className="signup_button" type="submit">
                      Create Profile
                    </button>
                  </div>
                </Spin>
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
    </>
  );
};

export default Signup;
