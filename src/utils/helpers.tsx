import jwt_decode from "jwt-decode";
import {
  IRefreshToken,
  ISignUpAndInResponse,
  ILocalUserProfile,
} from "../api/interfaces";
import { refreshToken } from "../api/responseHandlers";
import Swal from "sweetalert2";
import { getUserByID } from "../api";

export const checkAuth = (): boolean => {
  let valid = false;
  if (localStorage.getItem("profile")) {
    try {
      let profile: ISignUpAndInResponse = JSON.parse(
        localStorage.getItem("profile") as any
      );

      let token = profile.access_Token;
      const decoded: any = jwt_decode(token);
      const expires: Date = new Date(decoded?.exp * 1000);

      if (expires > new Date()) valid = true;
      console.log(expires);
      console.log(new Date());
    } catch {
      valid = false;
    }
  }
  return valid;
};

// log out user
export const localLogout = () => {
  localStorage.removeItem("profile");
  Swal.fire({
    title: "Error!",
    text: "You are logged out! kindly log in again to continue",
    icon: "error",
    confirmButtonText: "Ok",
  }).then((result) => {
    if (result.isConfirmed || result.isDenied || result.isDismissed) {
      window.location.href = "/sign-in";
    }
  });
};

export const checkAuthForRefresh = () => {
  let tokenExpired: boolean | null = false;
  let can_still_refresh: boolean | null = false;
  let refreshToken: string = "";

  if (localStorage.getItem("profile")) {
    let profile: ILocalUserProfile = JSON.parse(
      localStorage.getItem("profile") as any
    );
    let token = profile.access_Token;
    const decoded: any = jwt_decode(token);
    const expired = new Date(decoded?.exp * 1000);
    const expires = new Date(decoded?.exp * 1000).getTime();
    const maxRefToken = new Date(expires + 1000 * 60 * 5);
    const timeFromExpires = new Date(expires - 1000 * 60 * 2);
    let time = new Date();
    // let time = new Date(Date.now() - 1000 * 60 * 2);
    if (expired > time) {
      tokenExpired = false;
      can_still_refresh = false;
    } else if (maxRefToken > time) {
      can_still_refresh = true;
      tokenExpired = true;
      refreshToken = profile.refresh_Token;
    } else {
      // localLogout();
      tokenExpired = null;
      can_still_refresh = null;
    }
  } else {
    tokenExpired = null;
    can_still_refresh = null;
  }
  return {
    tokenExpired,
    can_still_refresh,
    refreshToken,
  };
};

export const refreshAccessToken = async () => {
  let profile: ILocalUserProfile = JSON.parse(
    localStorage.getItem("profile") as any
  );
  const refresh_token = profile.refresh_Token;

  const formData: IRefreshToken = {
    refreshToken: refresh_token,
  };

  const data = await refreshToken(formData);
  return data;
};

export const cannotRefreshAccessToken = () => {
  // localStorage.removeItem("profile");
  Swal.fire({
    title: "Error!",
    text: "You are logged out! Cannot process any request, kindly log in again to continue",
    icon: "error",
    confirmButtonText: "Ok",
  }).then((result) => {
    if (result.isConfirmed || result.isDenied || result.isDismissed) {
      window.location.href = "/sign-in";
    }
  });
};

// (async () => {
//   await checkAuthAndRefresh();
// })();

// get user data
export const localGetUser = () => {
  try {
    const user = JSON.parse(localStorage.getItem("profile") as any).user;
    return user;
  } catch {
    return null;
  }
};

// get user id
export const localGetUserId = (): number | null => {
  const user = JSON.parse(localStorage.getItem("profile") as any).user;
  if (user === null) {
    return null;
  }
  return user.userId;
};

// get user id
export const remoteGetUser = async (id: any) => {
  const user = await getUserByID(id);
  return user;
};

export const getLocalRefreshToken = () => {
  const profile: ILocalUserProfile = JSON.parse(
    localStorage.getItem("profile") as any
  );
  return profile?.refresh_Token;
};

export const getLocalAccessToken = () => {
  const profile: ILocalUserProfile = JSON.parse(
    localStorage.getItem("profile") as any
  );
  return profile?.access_Token;
};

export const updateLocalProfile = (data: any) => {
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
    expiry,
  };
  localStorage.setItem("profile", JSON.stringify(profile));
};

export const setUser = (user: any) => {
  console.log(JSON.stringify(user));
  let profile = JSON.parse(localStorage.getItem("profile") as any);
  profile.user = user;
  localStorage.setItem("profile", JSON.stringify(profile));
};

export const removeUser = () => {
  localStorage.removeItem("user");
};
