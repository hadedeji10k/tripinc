import * as api from ".";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";
import { ISignIn, ISignUp, ISignUpAndInResponse, ISignUpFull, IEmailExists, ILocalUserProfile, IRefreshToken, IGoogleSignUpFull } from "./interfaces";

export const signUp = async (formData: ISignUpFull) => {
  try {
    const response = await api.signUp(formData);

    const data: ISignUpAndInResponse = response.data

    if (response.status === 200 && response.data.status === true) {
      // decode user access access_token
      // decode token
      const decoded = jwt_decode(data.access_Token) as any;
      const user = decoded.UserData;
      const expiry = decoded.exp;

      // extract user details from response
      let profile: ILocalUserProfile = {
        access_Token: data.access_Token,
        refresh_Token: data.refresh_Token,
        expires_In: data.expires_In,
        grant_Type: data.grant_Type,
        user,
        expiry
      };

      // delete signUp data in local localStorage
      localStorage.removeItem("signUpData");

      // save user profile to local storage
      localStorage.setItem("profile", JSON.stringify(profile));

      // success message
      Swal.fire({
        title: "Success!",
        text: "You have successfully created new profile",
        icon: "success",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed || result.isDenied || result.isDismissed) {
          window.location.href = "/";
        }
      });
    }

    // if there is error
    if (response.status === 200 && response.data.status === false) {
      Swal.fire({
        title: "Error!",
        text: `Sign up was not successful, ${response.data.message}`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: "Error!",
      text: `Sign up was not successful. Please try again later`,
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
};

export const googleSignUp = async (formData: IGoogleSignUpFull) => {
  try {
    const response = await api.googleSignUp(formData);

    const data: ISignUpAndInResponse = response.data
    console.log(data)

    if (response.status === 200 && response.data.status === true) {
      // decode user access access_token
      // decode token
      const decoded = jwt_decode(data.access_Token) as any;
      const user = decoded.UserData;
      const expiry = decoded.exp;

      // extract user details from response
      let profile: ILocalUserProfile = {
        access_Token: data.access_Token,
        refresh_Token: data.refresh_Token,
        expires_In: data.expires_In,
        grant_Type: data.grant_Type,
        user,
        expiry
      };

      // delete signUp data in local localStorage
      localStorage.removeItem("signUpData");

      // save user profile to local storage
      localStorage.setItem("profile", JSON.stringify(profile));

      // success message
      Swal.fire({
        title: "Success!",
        text: "You have successfully created new profile",
        icon: "success",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed || result.isDenied || result.isDismissed) {
          window.location.href = "/";
        }
      });
    }

    // if there is error
    if (response.status === 200 && response.data.status === false) {
      Swal.fire({
        title: "Error!",
        text: `Sign up was not successful, ${response.data.message}`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: "Error!",
      text: `Sign up was not successful. Please try again later`,
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
};

export const signIn = async (formData: ISignIn) => {
  try {
    const response = await api.signIn(formData);

    const data: ISignUpAndInResponse = response.data

    if (response.status === 200 && response.data.status === true) {
      // decode user access access_token
      // decode token
      const decoded = jwt_decode(response.data.access_Token) as any;
      const user = decoded.UserData;
      const expiry = decoded.exp;

      // extract user details from response
      let profile: ILocalUserProfile = {
        access_Token: data.access_Token,
        refresh_Token: data.refresh_Token,
        expires_In: data.expires_In,
        grant_Type: data.grant_Type,
        user,
        expiry
      };

      // save user profile to local storage
      localStorage.setItem("profile", JSON.stringify(profile));

      return user;
    }

    if (response.status === 200 && response.data.status === false) {
      Swal.fire({
        title: "Error!",
        text: `Sign in was not successful, ${response.data.message}`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }

    // if there is error
    if (response.status !== 200) {
      Swal.fire({
        title: "Error!",
        text: `Sign in was not successful. Please try again later`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: "Error!",
      text: `Sign in was not successful. Please try again later`,
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
};

export const googleSignIn = async (formData: any) => {
  try {
    const response = await api.remoteGoogleLogin(formData);

    const data: ISignUpAndInResponse = response.data

    if (response.status === 200 && response.data.status === true) {
      // decode user access access_token
      // decode token
      const decoded = jwt_decode(response.data.access_Token) as any;
      const user = decoded.UserData;
      const expiry = decoded.exp;

      // extract user details from response
      let profile: ILocalUserProfile = {
        access_Token: data.access_Token,
        refresh_Token: data.refresh_Token,
        expires_In: data.expires_In,
        grant_Type: data.grant_Type,
        user,
        expiry
      };

      // save user profile to local storage
      localStorage.setItem("profile", JSON.stringify(profile));

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
    }

    // if there is error
    if (response.status !== 200) {
      Swal.fire({
        title: "Error!",
        text: `Sign in was not successful. Please try again later`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: "Error!",
      text: `Sign in was not successful. Please try again later`,
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
};

export const refreshToken = async (formData: IRefreshToken) => {
  const response = await api.refreshToken(formData);

  const data: ISignUpAndInResponse = response.data

  if (response.status === 200 && response.data.status === true) {
    // decode user access access_token
    // decode token
    const decoded = jwt_decode(response.data.access_Token) as any;
    const user = decoded.UserData;
    const expiry = decoded.exp;

    // extract user details from response
    let profile: ILocalUserProfile = {
      access_Token: data.access_Token,
      refresh_Token: data.refresh_Token,
      expires_In: data.expires_In,
      grant_Type: data.grant_Type,
      user,
      expiry
    };

    // save user profile to local storage
    localStorage.setItem("profile", JSON.stringify(profile));
    return "refreshed"
  }
};

// remote google log in

export const remoteGoogleLogin = async (values: any) => {
  let loginData = {};
  if ("tokenObj" in values.googleData) {
    const accessToken = values.tokenObj.access_token;
    loginData = { accessToken: accessToken };
  } else {
    loginData = values;
  }

  // loginData.grant_Type = "google";

  return {
    loginData,
    values
  };
  // const response = await api.remoteGoogleLogin(loginData);
  // For local testing
  // return axios.post("http://127.0.0.1:8000/v1/social-auth/google/", loginData);
};

// {
//     "access_Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjE4IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6InN0cmluZyBzdHJpbmciLCJlbWFpbCI6InN0cmluZ0BnLmNvIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiTGltaXRlZEFjY2VzcyIsIlVzZXJEYXRhIjoie1widXNlcklkXCI6MTgsXCJhY2NvdW50VHlwZVwiOlwiQ3VzdG9tZXJcIixcInBob25lTnVtYmVyXCI6XCJzdHJpbmdcIixcImZpcnN0TmFtZVwiOlwic3RyaW5nXCIsXCJsYXN0TmFtZVwiOlwic3RyaW5nXCIsXCJlbWFpbFwiOlwic3RyaW5nQGcuY29cIn0iLCJuYmYiOjE2NTAyODE1NTEsImV4cCI6MTY1MDI4MjQ1MSwiaXNzIjoiaHR0cHM6Ly90cmlwaW5jbXZwdGVzdC5jb20iLCJhdWQiOiJodHRwczovL3RyaXBpbmNtdnB0ZXN0LmNvbSJ9.lq3EkMRAGBNmCzUs1PbNiyZGDCtl-RNlvvoG6_Omkv8",
//     "refresh_Token": "6483d1b577a9445b9dae2479a2abb9ca",
//     "expires_In": 1440,
//     "grant_Type": "LimitedAccess",
//     "status": true,
//     "message": "You have successfully created new profile"
//   }

export const checkIfEmailExists = async (formData: ISignUp) => {
  try {
    const emailData: IEmailExists = {
      email: formData.email,
    };

    const response = await api.checkIfEmailExists(emailData);

    if (response.status === 200 && response.data.status === true) {
      Swal.fire({
        title: "Email already exists",
        text: "Please try another email",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }

    if (response.status === 200 && response.data.status === false) {
      localStorage.setItem("signUpData", JSON.stringify(formData));
      window.location.href = "/basic-details";
    }
  } catch (error) {
    console.log(error);
  }
};

export const noSignUpData = () => {
  Swal.fire({
    title: "You don't have any credentials on our system",
    text: "This page should be after signing up on sign up page, Please try signing up again",
    icon: "error",
    confirmButtonText: "Ok",
  }).then((result) => {
    if (result.isConfirmed || result.isDenied || result.isDismissed) {
      window.location.href = "/sign-up";
    }
  });
};
