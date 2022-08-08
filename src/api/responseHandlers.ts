import * as api from ".";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";
import { ISignIn, ISignUp, ISignUpAndInResponse, ISignUpFull, IEmailExists, ILocalUserProfile, IRefreshToken, IGoogleSignUpFull, IUpdateProfile, IUpdateUserTimeFormat, IUpdateUserCurrency, IUpdateUserPassword, ISignUpNewsLetter, IWishList, IAddCart, IVerifyAccount, IResendVerification, IAddReview, IMakeOrder, IManagePreference, IManagePlacesWishToVisit, IManagePlacesVisited, IForgotPasswordRequest } from "./interfaces";

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
        text: "You have successfully created a new profile. An account verification mail has been sent to your email address. Kindly verify your account.",
        icon: "success",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed || result.isDenied || result.isDismissed) {
          window.location.href = "/#/preferences";
        }
      });
      return user
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
        text: "You have successfully created a new profile",
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
      return false
    }

    // if there is error
    if (response.status !== 200) {
      Swal.fire({
        title: "Error!",
        text: `Sign in was not successful. Please try again later`,
        icon: "error",
        confirmButtonText: "Ok",
      });
      return false
    }
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: "Error!",
      text: `Sign in was not successful. Please try again later`,
      icon: "error",
      confirmButtonText: "Ok",
    });
    return false
  }
};

export const verifyAccount = async (formData: IVerifyAccount) => {
  try {
    const response = await api.verifyAccount(formData);

    if (response.status === 200 && response.data.status === true) {
      Swal.fire({
        title: "Success!",
        text: "You have successfully verified your account.",
        icon: "success",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed || result.isDenied || result.isDismissed) {
          window.location.href = "/#/profile";
        }
      });
    }

    if (response.status === 200 && response.data.status === false) {
      Swal.fire({
        title: "Error!",
        text: `Verifying account was not successful, ${response.data.message}`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }

    // if there is error
    if (response.status !== 200) {
      Swal.fire({
        title: "Error!",
        text: `Verifying account was not successful. Please try again later`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: "Error!",
      text: `Verifying account was not successful. Please try again later`,
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
};

export const resendVerification = async (formData: IResendVerification) => {
  try {
    const response = await api.resendVerification(formData);

    if (response.status === 200 && response.data.status === true) {
      Swal.fire({
        title: "Success!",
        text: "A verification code has been sent to your mail. Kindly check your mail and follow the instructions.",
        icon: "success",
        confirmButtonText: "Ok",
      })
      return true
    }

    if (response.status === 200 && response.data.status === false) {
      Swal.fire({
        title: "Error!",
        text: `Error sending verification code to your email, ${response.data.message}`,
        icon: "error",
        confirmButtonText: "Ok",
      });
      return false
    }

    // if there is error
    if (response.status !== 200) {
      Swal.fire({
        title: "Error!",
        text: `Error sending verification code to your email. Please try again later`,
        icon: "error",
        confirmButtonText: "Ok",
      });
      return false
    }
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: "Error!",
      text: `Error sending verification code to your email. Please try again later`,
      icon: "error",
      confirmButtonText: "Ok",
    });
    return false
  }
};

export const forgotPasswordRequest = async (formData: IForgotPasswordRequest) => {
  try {
    const response = await api.forgotPasswordResquest(formData);

    if (response.status === 200 && response.data.status === true) {
      Swal.fire({
        title: "Success!",
        text: `Email sent, ${response.data.message}`,
        icon: "success",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed || result.isDenied || result.isDismissed) {
          window.location.href = "/#/sign-in";
        }
      });
      return true
    }

    if (response.status === 200 && response.data.status === false) {
      Swal.fire({
        title: "Error!",
        text: `Error sending an email to you, ${response.data.message}`,
        icon: "error",
        confirmButtonText: "Ok",
      });
      return false
    }

    // if there is error
    if (response.status !== 200) {
      Swal.fire({
        title: "Error!",
        text: `Error sending an email to you. Please try again later`,
        icon: "error",
        confirmButtonText: "Ok",
      });
      return false
    }
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: "Error!",
      text: `Error sending an email to you. Please try again later`,
      icon: "error",
      confirmButtonText: "Ok",
    });
    return false
  }
};

export const updateUser = async (formData: IUpdateProfile) => {
  try {
    const response = await api.updateProfile(formData);

    if (response.status === 200 && response.data.status === true) {
      Swal.fire({
        title: "Success!",
        text: "You have successfully updated your profile",
        icon: "success",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed || result.isDenied || result.isDismissed) {
          window.location.href = "/#/profile";
        }
      });
    }

    if (response.status === 200 && response.data.status === false) {
      Swal.fire({
        title: "Error!",
        text: `Updating profile was not successful, ${response.data.message}`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }

    // if there is error
    if (response.status !== 200) {
      Swal.fire({
        title: "Error!",
        text: `Updating profile was not successful. Please try again later`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: "Error!",
      text: `Updating profile was not successful. Please try again later`,
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
};

// add to wishlist
export const addToWishList = async (formData: IWishList) => {
  try {
    const response = await api.addToWishList(formData);

    if (response.status === 200 && response.data.status === true) {
      Swal.fire({
        title: "Success!",
        text: "You have successfully added item to your wish list.",
        icon: "success",
        confirmButtonText: "Ok",
      })
      return true
    }

    if (response.status === 200 && response.data.status === false) {
      Swal.fire({
        title: "Error!",
        text: `Adding to wishlist was not successful, ${response.data.message}`,
        icon: "error",
        confirmButtonText: "Ok",
      });
      return false
    }

    // if there is error
    if (response.status !== 200) {
      Swal.fire({
        title: "Error!",
        text: `Adding to wishlist was not successful. Please try again later`,
        icon: "error",
        confirmButtonText: "Ok",
      });
      return false
    }
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: "Error!",
      text: `Adding to wishlist was not successful. Please try again later`,
      icon: "error",
      confirmButtonText: "Ok",
    });
    return false
  }
};

// remove from wishlist
export const removeFromWishList = async (id: any, userId: any) => {
  try {
    const response = await api.removeFromWishList(Number(id), Number(userId));

    if (response.status === 200 && response.data.status === true) {
      Swal.fire({
        title: "Success!",
        text: "You have successfully removed item from your wish list.",
        icon: "success",
        confirmButtonText: "Ok",
      })
      return true
    }

    if (response.status === 200 && response.data.status === false) {
      Swal.fire({
        title: "Error!",
        text: `Removing from wishlist was not successful, ${response.data.message}`,
        icon: "error",
        confirmButtonText: "Ok",
      });
      return false
    }

    // if there is error
    if (response.status !== 200) {
      Swal.fire({
        title: "Error!",
        text: `Removing from wishlist was not successful. Please try again later`,
        icon: "error",
        confirmButtonText: "Ok",
      });
      return false
    }
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: "Error!",
      text: `Removing from wishlist was not successful. Please try again later`,
      icon: "error",
      confirmButtonText: "Ok",
    });
    return false
  }
};

// add to cart
export const addToCart = async (formData: IAddCart) => {
  try {
    const response = await api.addToCart(formData);

    if (response.status === 200 && response.data.status === true) {
      const cart = JSON.parse(
        localStorage.getItem("cart_data") as any
      );
      if (cart?.length > 0) {
        const newCart = [...cart, response.data.data]
        localStorage.setItem("cart_data", JSON.stringify(newCart));
      } else {
        const newCart = [response.data.data]
        localStorage.setItem("cart_data", JSON.stringify(newCart));
      }

      return true
    }

    if (response.status === 200 && response.data.status === false) {
      Swal.fire({
        title: "Error!",
        text: `Adding to Cart was not successful, ${response.data.message}`,
        icon: "error",
        confirmButtonText: "Ok",
      });
      return false
    }

    // if there is error
    if (response.status !== 200) {
      Swal.fire({
        title: "Error!",
        text: `Adding to Cart was not successful. Please try again later`,
        icon: "error",
        confirmButtonText: "Ok",
      });
      return false
    }
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: "Error!",
      text: `Adding to Cart was not successful. Please try again later`,
      icon: "error",
      confirmButtonText: "Ok",
    });
    return false
  }
};

// remove from cart
export const removeFromCart = async (id: any) => {
  try {
    const response = await api.removeFromCart(Number(id));

    if (response.status === 200 && response.data.status === true) {
      Swal.fire({
        title: "Success!",
        text: "You have successfully removed item from your Cart.",
        icon: "success",
        confirmButtonText: "Ok",
      })

      const cart = JSON.parse(
        localStorage.getItem("cart_data") as any
      );

      const newCart = cart?.filter(item => Number(item.id) !== Number(id))
      localStorage.setItem("cart_data", JSON.stringify(newCart));
      return true
    }

    if (response.status === 200 && response.data.status === false) {
      Swal.fire({
        title: "Error!",
        text: `Removing from Cart was not successful, ${response.data.message}`,
        icon: "error",
        confirmButtonText: "Ok",
      });
      return false
    }

    // if there is error
    if (response.status !== 200) {
      Swal.fire({
        title: "Error!",
        text: `Removing from Cart was not successful. Please try again later`,
        icon: "error",
        confirmButtonText: "Ok",
      });
      return false
    }
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: "Error!",
      text: `Removing from Cart was not successful. Please try again later`,
      icon: "error",
      confirmButtonText: "Ok",
    });
    return false
  }
};


// Make order
export const makeOrder = async (formData: IMakeOrder) => {
  try {
    const response = await api.makeOrder(formData);

    if (response.status === 200 && response.data.status === true) {
      Swal.fire({
        title: "Success!",
        text: "You have successfully placed your cart items on order. Kindly check your order list to view your orders.",
        icon: "success",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed || result.isDenied || result.isDismissed) {
          window.location.reload()
        }
      })
      return true
    }

    if (response.status === 200 && response.data.status === false) {
      Swal.fire({
        title: "Error!",
        text: `Placing order was not successful, ${response.data.message}`,
        icon: "error",
        confirmButtonText: "Ok",
      });
      return false
    }

    // if there is error
    if (response.status !== 200) {
      Swal.fire({
        title: "Error!",
        text: `Placing order was not successful. Please try again later`,
        icon: "error",
        confirmButtonText: "Ok",
      });
      return false
    }
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: "Error!",
      text: `Placing order was not successful. Please try again later`,
      icon: "error",
      confirmButtonText: "Ok",
    });
    return false
  }
};

export const signUpToNewsLetter = async (formData: ISignUpNewsLetter) => {
  try {
    const response = await api.signUpToNewsletter(formData);

    if (response.status === 200 && response.data.status === true) {
      Swal.fire({
        title: "Success!",
        text: "You have successfully sign up to our newsletter, we will send you updates",
        icon: "success",
        confirmButtonText: "Ok",
      })
      // .then((result) => {
      //   if (result.isConfirmed || result.isDenied || result.isDismissed) {
      //     window.location.href = "/";
      //   }
      // });
    }

    if (response.status === 200 && response.data.status === false) {
      Swal.fire({
        title: "Error!",
        text: `Error signing up in the newsletter, ${response.data.message}`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }

    // if there is error
    if (response.status !== 200) {
      Swal.fire({
        title: "Error!",
        text: `Error signing up in the newsletter. Please try again later`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: "Error!",
      text: `Error signing up in the newsletter. Please try again later`,
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
};

export const updateUserPassword = async (values, userId) => {
  const { password, newPassword } = values;

  const passwordData: IUpdateUserPassword = {
    userId: userId,
    oldPassword: password,
    newPassword
  };
  console.log(passwordData)
  try {
    const response = await api.updateUserPassword(passwordData);

    if (response.status === 200 && response.data.status === true) {
      Swal.fire({
        title: "Success!",
        text: "You have successfully updated your profile",
        icon: "success",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed || result.isDenied || result.isDismissed) {
          window.location.href = "/#/profile";
        }
      });
    }

    if (response.status === 200 && response.data.status === false) {
      Swal.fire({
        title: "Error!",
        text: `Updating profile was not successful, ${response.data.message}`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }

    // if there is error
    if (response.status !== 200) {
      Swal.fire({
        title: "Error!",
        text: `Updating profile was not successful. Please try again later`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: `Updating profile was not successful. Please try again later`,
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
};

export const updateUserPreference = async (values, userId) => {
  const { preferedTimeFormat, preferedCurrency } = values;
  const timeFormData: IUpdateUserTimeFormat = {
    userId: userId,
    preferedTimeFormat,
  };
  const currencyFormData: IUpdateUserCurrency = {
    userId: userId,
    preferedCurrency,
  };
  try {
    const response = await api.updateUserTimeFormat(timeFormData);
    const response2 = await api.updateUserCurrency(currencyFormData);

    if (response.status === 200 && response.data.status === true && response2.status === 200 && response2.data.status === true) {
      Swal.fire({
        title: "Success!",
        text: "You have successfully updated your profile",
        icon: "success",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed || result.isDenied || result.isDismissed) {
          window.location.href = "/#/profile";
        }
      });
    }

    if (response.status === 200 && response.data.status === false) {
      Swal.fire({
        title: "Error!",
        text: `Updating profile was not successful, ${response.data.message}`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }

    if (response2.status === 200 && response2.data.status === false) {
      Swal.fire({
        title: "Error!",
        text: `Updating profile was not successful, ${response2.data.message}`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }

    // if there is error
    if (response.status !== 200) {
      Swal.fire({
        title: "Error!",
        text: `Updating profile was not successful. Please try again later`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
    // if there is error
    if (response2.status !== 200) {
      Swal.fire({
        title: "Error!",
        text: `Updating profile was not successful. Please try again later`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: `Updating profile was not successful. Please try again later`,
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
};


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
      return false
    }

    if (response.status === 200 && response.data.status === false) {
      localStorage.setItem("signUpData", JSON.stringify(formData));
      return true
    }
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: "Error!",
      text: "Please try again.",
      icon: "error",
      confirmButtonText: "Ok",
    });
    return false
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
      window.location.href = "/#/sign-up";
    }
  });
};

// add review to attraction
export const addReview = async (formData: IAddReview) => {
  try {
    const response = await api.addReview(formData);

    if (!formData.attractionId || !formData.comment || !formData.fullName || !formData.rating || !formData.userId) {
      Swal.fire({
        title: "Error!",
        text: "Error, please try again",
        icon: "error",
        confirmButtonText: "Ok",
      })
      return false
    }

    if (response.status === 200 && response.data.status === true) {
      Swal.fire({
        title: "Success!",
        text: "You have successfully added a review on this attraction",
        icon: "success",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed || result.isDenied || result.isDismissed) {
          window.location.reload();
        }
      });
      return true
    }

    if (response.status === 200 && response.data.status === false) {
      Swal.fire({
        title: "Error!",
        text: `Adding review was not successful, ${response.data.message}`,
        icon: "error",
        confirmButtonText: "Ok",
      });
      return false
    }

    // if there is error
    if (response.status !== 200) {
      Swal.fire({
        title: "Error!",
        text: `Adding review was not successful. Please try again later`,
        icon: "error",
        confirmButtonText: "Ok",
      });
      return false
    }
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: "Error!",
      text: `Adding review was not successful. Please try again later`,
      icon: "error",
      confirmButtonText: "Ok",
    });
    return false
  }
};

// update user picture
export const updateUserPicture = async (formData: any) => {
  try {
    const response = await api.updateUserProfilePicture(formData);

    if (response.status === 200 && response.data.status === true) {
      Swal.fire({
        title: "Success!",
        text: "You have successfully updated your profile picture",
        icon: "success",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed || result.isDenied || result.isDismissed) {
          window.location.reload();
        }
      });
      return true
    }

    if (response.status === 200 && response.data.status === false) {
      Swal.fire({
        title: "Error!",
        text: `Updating Picture was not successful, ${response.data.message}`,
        icon: "error",
        confirmButtonText: "Ok",
      });
      return false
    }

    // if there is error
    if (response.status !== 200) {
      Swal.fire({
        title: "Error!",
        text: `Updating Picture was not successful. Please try again later`,
        icon: "error",
        confirmButtonText: "Ok",
      });
      return false
    }
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: "Error!",
      text: `Updating Picture was not successful. Please try again later`,
      icon: "error",
      confirmButtonText: "Ok",
    });
    return false
  }
};

// update user preferences
export const managePreference = async (formData: IManagePreference) => {
  try {
    const response = await api.managePreference(formData);

    if (response.status === 200 && response.data.status === true) {
      Swal.fire({
        title: "Success!",
        text: "You have successfully updated your profile preferences",
        icon: "success",
        confirmButtonText: "Ok",
      })
      return true
    }

    if (response.status === 200 && response.data.status === false) {
      Swal.fire({
        title: "Error!",
        text: `Updating profile preference was not successful, ${response.data.message}`,
        icon: "error",
        confirmButtonText: "Ok",
      });
      return false
    }

    // if there is error
    if (response.status !== 200) {
      Swal.fire({
        title: "Error!",
        text: `Updating profile preference was not successful. Please try again later`,
        icon: "error",
        confirmButtonText: "Ok",
      });
      return false
    }
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: "Error!",
      text: `Updating profile preference was not successful. Please try again later`,
      icon: "error",
      confirmButtonText: "Ok",
    });
    return false
  }
};

// update user wish to visit palaces
export const managePlacesWishToVisit = async (formData: IManagePlacesWishToVisit) => {
  try {
    const response = await api.managePlacesWishToVisit(formData);

    if (response.status === 200 && response.data.status === true) {
      Swal.fire({
        title: "Success!",
        text: "You have successfully updated your bucket list places.",
        icon: "success",
        confirmButtonText: "Ok",
      })
      return true
    }

    if (response.status === 200 && response.data.status === false) {
      Swal.fire({
        title: "Error!",
        text: `Updating your bucket list places was not successful, ${response.data.message}`,
        icon: "error",
        confirmButtonText: "Ok",
      });
      return false
    }

    // if there is error
    if (response.status !== 200) {
      Swal.fire({
        title: "Error!",
        text: `Updating your bucket list places was not successful. Please try again later`,
        icon: "error",
        confirmButtonText: "Ok",
      });
      return false
    }
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: "Error!",
      text: `Updating your bucket list places was not successful. Please try again later`,
      icon: "error",
      confirmButtonText: "Ok",
    });
    return false
  }
};

// update user places visited
export const managePlacesVisited = async (formData: IManagePlacesVisited) => {
  try {
    const response = await api.managePlacesVisited(formData);

    if (response.status === 200 && response.data.status === true) {
      Swal.fire({
        title: "Success!",
        text: "You have successfully updated your visited places",
        icon: "success",
        confirmButtonText: "Ok",
      })
      return true
    }

    if (response.status === 200 && response.data.status === false) {
      Swal.fire({
        title: "Error!",
        text: `Updating your visited places was not successful, ${response.data.message}`,
        icon: "error",
        confirmButtonText: "Ok",
      });
      return false
    }

    // if there is error
    if (response.status !== 200) {
      Swal.fire({
        title: "Error!",
        text: `Updating your visited places was not successful. Please try again later`,
        icon: "error",
        confirmButtonText: "Ok",
      });
      return false
    }
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: "Error!",
      text: `Updating your visited places was not successful. Please try again later`,
      icon: "error",
      confirmButtonText: "Ok",
    });
    return false
  }
};

