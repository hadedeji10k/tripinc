import jwt_decode from "jwt-decode";
import { IRefreshToken, ISignUpAndInResponse } from "../api/interfaces";
import { refreshToken } from "../api";

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

export const checkAuthAndRefresh = () => {
  let can_refresh = false;

  let profile: ISignUpAndInResponse = JSON.parse(
    localStorage.getItem("profile") as any
  );

  if (localStorage.getItem("profile")) {
    try {
      let token = profile.access_Token;
      const decoded: any = jwt_decode(token);
      const expired = new Date(decoded?.exp * 1000);
      const expires = new Date(decoded?.exp * 1000).getTime();
      const timeFromExpires = new Date(expires - 1000 * 60 * 2);
      let time = new Date();
      // let time = new Date(Date.now() - 1000 * 60 * 2);
      // console.log(time);
      // console.log(timeFromExpires);
      // console.log(expired);
      if (expired > time) {
        if (timeFromExpires <= time && time <= expired) {
          can_refresh = true;
        } else {
          can_refresh = false;
        }
      } else {
        can_refresh = false;
      }
    } catch {
      can_refresh = false;
    }
  }

  if (can_refresh) {
    const refresh_token = profile.refresh_Token;

    const formData: IRefreshToken = {
      refreshToken: refresh_token,
    };

    // refreshToken(formData).then((res: any) => {
    //   if (res.status === 200) {
    //     let profile: ISignUpAndInResponse = JSON.parse(
    //       localStorage.getItem("profile") as any
    //     );
    profile.access_Token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjE3IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6InN0cmluZyBzdHJpbmciLCJlbWFpbCI6InN0cmluZ0BnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJMaW1pdGVkQWNjZXNzIiwiVXNlckRhdGEiOiJ7XCJ1c2VySWRcIjoxNyxcImFjY291bnRUeXBlXCI6XCJDdXN0b21lclwiLFwicGhvbmVOdW1iZXJcIjpcInN0cmluZ1wiLFwiZmlyc3ROYW1lXCI6XCJzdHJpbmdcIixcImxhc3ROYW1lXCI6XCJzdHJpbmdcIixcImVtYWlsXCI6XCJzdHJpbmdAZ21haWwuY29tXCJ9IiwibmJmIjoxNjUwMzE3ODg3LCJleHAiOjE2NTAzNjI5ODcsImlzcyI6Imh0dHBzOi8vdHJpcGluY212cHRlc3QuY29tIiwiYXVkIjoiaHR0cHM6Ly90cmlwaW5jbXZwdGVzdC5jb20ifQ.vrPjGnKqIfuFN6i9LQMrxlIsgN_avq7bS78oKGe8F4U";

    localStorage.setItem("profile", JSON.stringify(profile));
    //   }
    // });
  } else {
    console.log("can't refresh");
  }
  console.log(can_refresh);
};

checkAuthAndRefresh();

// log out user
export const localLogout = () => {
  localStorage.removeItem("profile");
};

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

// refresh_Token:"4c1f1dc1cc0b4990b9051af5bb488ae2"

// export default function authHeader() {
//   const userStr = localStorage.getItem("user");
//   let user = null;
//   if (userStr)
//     user = JSON.parse(userStr);
//   if (user && user.accessToken) {
//     // return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
//     return { 'x-access-token': user.accessToken };       // for Node Express back-end
//   } else {
//     return {};
//   }
// }
