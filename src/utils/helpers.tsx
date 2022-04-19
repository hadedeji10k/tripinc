import jwt_decode from "jwt-decode";
import {
  IRefreshToken,
  ISignUpAndInResponse,
  ILocalUserProfile,
} from "../api/interfaces";
import { refreshToken } from "../api/responseHandlers";

export const checkAuth = (): boolean => {
  let valid = false;
  // const localProfile = localStorage.getItem("profile") as any;
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
  console.log(valid);
  return valid;
};

// log out user
export const localLogout = () => {
  localStorage.removeItem("profile");
};

export const checkAuthAndRefresh = async () => {
  let can_refresh: boolean = false;

  let profile: ILocalUserProfile = JSON.parse(
    localStorage.getItem("profile") as any
  );

  if (localStorage.getItem("profile")) {
    let token = profile.access_Token;
    const decoded: any = jwt_decode(token);
    const expired = new Date(decoded?.exp * 1000);
    const expires = new Date(decoded?.exp * 1000).getTime();
    const timeFromExpires = new Date(expires - 1000 * 60 * 2);
    let time = new Date();
    // let time = new Date(Date.now() - 1000 * 60 * 2);
    if (expired > time) {
      if (timeFromExpires <= time && time <= expired) {
        can_refresh = true;
      } else {
        can_refresh = false;
      }
    } else {
      localLogout();
    }
  } else {
    can_refresh = false;
  }

  if (can_refresh) {
    const refresh_token = profile.refresh_Token;

    const formData: IRefreshToken = {
      refreshToken: refresh_token,
    };

    await refreshToken(formData);
  }
};

(async () => {
  await checkAuthAndRefresh();
})();

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
