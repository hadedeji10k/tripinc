import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Spin } from "antd";
import "antd/dist/antd.min.css";
import "./Signin.css";
import { FaFacebookF } from "react-icons/fa";
import { BsGoogle } from "react-icons/bs";
import { Formik } from "formik";
import { ISignIn } from "../../api/interfaces";
import { SignInSchema } from "../../schema/yupSchema";
import { googleSignIn, signIn } from "../../api/responseHandlers";
import { GoogleLogin } from "react-google-login";
// import { remoteGoogleLogin } from "../../api/responseHandlers";
import { GoogleLoginClientId } from "../../utils/constants";

import { AuthContext } from "../../stores/Auth";
import Swal from "sweetalert2";

const Signin = () => {
  document.title = "TripInc - Sign In";

  const [remoteError, setRemoteError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const authContext = useContext(AuthContext);

  const [ip, setIP] = useState("");

  const user = JSON.parse(localStorage.getItem("profile") as any);
  if (user) {
    Swal.fire({
      title: "Opps!",
      text: "You are currently logged in",
      icon: "info",
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed || result.isDenied || result.isDismissed) {
        window.location.href = "/";
      }
    });
  }

  //creating function to load ip address from the geolocation api
  const getData = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    setIP(res.data.IPv4);
  };

  useEffect(() => {
    // get Ip address
    getData();
  }, []);

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const formData: ISignIn = {
      username: data.email,
      password: data.password,
      channel: "web",
      ipAddress: ip,
    };
    const response = await signIn(formData);

    authContext.login();
    authContext.setUserId(response.userId);
    // authContext.setUsername(response.username);
    authContext.setUserProfile();

    // success message
    Swal.fire({
      title: "Success!",
      text: "You have successfully logged in",
      icon: "success",
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed || result.isDenied || result.isDismissed) {
        window.location.href = "/";
      }
    });
  };

  const handleGoogleLogin = (googleData: any) => {
    setIsLoading(true);
    // const profileObj = googleData.profileObj;
    // const tokenObj = googleData.tokenObj;

    const formData = {
      // email: profileObj.email,
      // lastName: profileObj.familyName,
      // firstName: profileObj.givenName,
      // displayName: profileObj.name,
      // pictureUrl: profileObj.imageUrl,
      // idToken: tokenObj.id_token,
      // providerUserId: googleData.googleId,
    };

    // console.log(googleData);
    googleSignIn(formData);
    // remoteGoogleLogin(formData).then((response: any) => {
    //   console.log(response);
    // localLogin(response);
    // authContext.login();
    // authContext.setUserId(response.data.user.id);
    // authContext.setUsername(response.data.user.username);
    // navigate("/");
    // });
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
      <Spin spinning={isLoading}>
        <div className="signin_container">
          <div className="signin_word">
            <h1 className="signin_header">Log in</h1>
            <h3 className="signin_title">Let’s get you back to planning!</h3>
          </div>
          <div className="external_signin_button">
            <GoogleLogin
              clientId={GoogleLoginClientId}
              render={(renderProps) => (
                <button
                  className="signin_google_button"
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
            {/* <button className="signin_google_button" type="submit">
          <BsGoogle /> Google
        </button> */}
            <button className="signin_facebook_button" type="submit">
              <FaFacebookF /> Facebook
            </button>
          </div>
          <div className="remote_error">
            {remoteError ? <p className="red_alert">{remoteError} </p> : null}
          </div>
          <div className="signin_or">
            <hr className="signin_or_line" />
            <h3 className="signin_or_text">Or continue with email</h3>
          </div>
          <div>
            {/* Formik */}
            <Formik
              initialValues={initialValues}
              validationSchema={SignInSchema}
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
                //  signin form

                <form
                  onSubmit={handleSubmit}
                  autoComplete="off"
                  className="sign_in_form"
                >
                  <div>
                    <label className="signin_label">Email</label>
                    <input
                      name="email"
                      className="signin_input"
                      type="email"
                      placeholder="Enter your email address"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.email && touched.email ? (
                      <p className="red_alert">{errors.email}</p>
                    ) : null}
                  </div>
                  <div>
                    <label className="signin_label">Password</label>
                    <input
                      name="password"
                      className="signin_input"
                      type="password"
                      placeholder="Enter your password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.password && touched.password ? (
                      <p className="red_alert">{errors.password}</p>
                    ) : null}
                  </div>
                  <div className="password_box">
                    <span className="remember_me">
                      <label className="checkbox">
                        <input type="checkbox" className="checkbox_input" />
                        <div className="checkbox_box"></div>
                        Remember Me
                      </label>
                    </span>
                    <span className="forgot_password">
                      <a href="/">I forgot my password!</a>
                    </span>
                  </div>
                  <div className="signin_button_container">
                    <button className="signin_button" type="submit">
                      Let's go!
                    </button>
                  </div>
                </form>

                // End of signup form
              )}
            </Formik>
          </div>
          <div className="have_account">
            <h3>
              Don’t have an account?{" "}
              <a href="/#/sign-up" className="login_text">
                Sign up here.
              </a>
            </h3>
          </div>
        </div>
      </Spin>
    </>
  );
};

export default Signin;
