import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  GoogleLogin,
  GoogleOAuthProvider,
  useGoogleLogin,
  useGoogleOneTapLogin,
} from "@react-oauth/google";
import axios from "axios";
import { Spin } from "antd";
import { FaFacebookF } from "react-icons/fa";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { BsGoogle } from "react-icons/bs";
import { Formik } from "formik";
import Swal from "sweetalert2";

import "antd/dist/antd.min.css";
import "./Signin.css";
import { IForgotPasswordRequest, ISignIn } from "api/interfaces";
import { SignInSchema } from "schema/yupSchema";
import {
  forgotPasswordRequest,
  googleSignIn,
  signIn,
} from "api/responseHandlers";
// import { remoteGoogleLogin } from "api/responseHandlers";
import { GoogleLoginClientId } from "utils/constants";

import { AuthContext } from "stores/Auth";

const Signin = () => {
  document.title = "TripInc - Sign In";
  console.log("Google", GoogleLoginClientId);

  const [remoteError, setRemoteError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const { state }: { state: any } = useLocation();
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

    if (response !== false) {
      authContext.login();
      authContext.setLoggedIn(true);
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
          // window.location.href = "/";
          const path = state ? state?.from : "/";
          navigate(path);
        }
      });
    } else {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Swal.fire({
      title: "Enter your email address",
      input: "email",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Forgot Password",
      confirmButtonColor: "#5e75cd",
      showLoaderOnConfirm: true,
      preConfirm: async (email) => {
        const formData: IForgotPasswordRequest = {
          email,
        };
        return await forgotPasswordRequest(formData);
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
  });

  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      console.log(credentialResponse);
    },
    onError: () => {
      console.log("Login Failed");
    },
  });

  return (
    <>
      <Spin spinning={isLoading}>
        <div className="signin_container">
          <div className="signin_word">
            <h1 className="signin_header">Log in</h1>
            <h3 className="signin_title">Let’s get you back to planning!</h3>
          </div>
          <div className="external_signin_button">
            <button
              className="signin_google_button"
              onClick={() => googleLogin()}
            >
              <BsGoogle /> Google
            </button>
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
                  <div className="password_box">
                    <span className="remember_me">
                      <label className="checkbox">
                        <input type="checkbox" className="checkbox_input" />
                        <div className="checkbox_box"></div>
                        Remember Me
                      </label>
                    </span>
                    <span
                      className="sign_in_forgot_password"
                      onClick={handleForgotPassword}
                    >
                      I forgot my password!
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
            <h3 className="fs-5">
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
