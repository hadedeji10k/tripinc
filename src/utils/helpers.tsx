import jwt_decode from "jwt-decode";
import {
  IRefreshToken,
  ISignUpAndInResponse,
  ILocalUserProfile,
} from "../api/interfaces";
import { refreshToken } from "../api/responseHandlers";
import Swal from "sweetalert2";
import {
  getAllCountries,
  getCities,
  getUserByID,
  getUserProfilePictureByID,
} from "../api";
import { CitiesPageSize } from "./constants";

export const checkAuth = (): boolean => {
  let valid = false;
  if (localStorage.getItem("profile")) {
    try {
      let profile: ISignUpAndInResponse = JSON.parse(
        localStorage.getItem("profile") as any
      );

      // let token = profile.access_Token;
      // const decoded: any = jwt_decode(token);
      // const expires: Date = new Date(decoded?.exp * 1000);

      // if (expires > new Date()) valid = true;
      // console.log(expires);
      // console.log(new Date());
      if (profile.access_Token) valid = true;
    } catch {
      valid = false;
    }
  }
  return valid;
};

// log out user
export const localLogoutProfile = () => {
  localStorage.removeItem("profile");
};

export const cities = async () => {
  let cities = JSON.parse(localStorage.getItem("cities") as any);

  if (!cities && !cities?.hasNext) {
    console.log("cities not");
    let query = `PageSize=${CitiesPageSize}`;
    const citiesFetched = await getCities(query);
    const countriesData = {
      ...citiesFetched.data,
      date: new Date(),
    };
    localStorage.setItem("cities", JSON.stringify(countriesData));
    cities = JSON.parse(localStorage.getItem("cities") as any);
    if (cities?.hasNext) {
      // for (let i = 0; i < cities.totalPages.length; i++) {
      //   const element = cities.totalPages[i];
      //   await citiesHelper(element);
      // }
    }
  }

  if (cities?.hasNext) {
    console.log("has next");

    // for (let i = 0; i < cities.totalPages; i++) {
    //   // await citiesHelper(cities);
    // }
  }
};

export const citiesHelper = async (citiesData: any) => {
  console.log("reaching helper");
  const query = `PageSize=${CitiesPageSize}&PageNumber=${
    citiesData.currentPage + 1
  }`;
  const newCitiesFetched = await getCities(query);
  let existingData = JSON.parse(localStorage.getItem("cities") as any);
  const newCountriesData = {
    ...newCitiesFetched.data,
    date: new Date(),
  };
  newCountriesData.items = [...existingData.items, newCountriesData.items];
  localStorage.setItem("cities", JSON.stringify(newCountriesData));
};

export const countries = async () => {
  const countries = localStorage.getItem("countries");
  if (!countries) {
    const countriesFetched = await getAllCountries();
    console.log("countries");
    const countriesData = {
      data: countriesFetched.data.items,
      date: new Date(),
    };
    localStorage.setItem("countries", JSON.stringify(countriesData));
  }
};

export const localLogout = (navigate?: any, location?: any) => {
  localStorage.removeItem("profile");
  Swal.fire({
    title: "Error!",
    text: "You are logged out! kindly log in again to continue",
    icon: "error",
    confirmButtonText: "Ok",
  }).then((result) => {
    if (result.isConfirmed || result.isDenied || result.isDismissed) {
      navigate("/sign-in", {
        replace: true,
        state: { from: location?.pathname },
      });
      window.location.href = "/#/sign-in";
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
    const maxRefToken = new Date(expires + 1000 * 60 * 15);
    // const timeFromExpires = new Date(expires - 1000 * 60 * 2);
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

  await refreshToken(formData);
};

export const cannotRefreshAccessToken = () => {
  localStorage.removeItem("profile");
  Swal.fire({
    title: "Error!",
    text: "You are logged out! Cannot process any request, kindly log in again to continue",
    icon: "error",
    confirmButtonText: "Ok",
  }).then((result) => {
    if (result.isConfirmed || result.isDenied || result.isDismissed) {
      window.location.href = "/#/sign-in";
    }
  });
};

// (async () => {
//   await checkAuthAndRefresh();
// })();

// get user data
export const symbolHelper = (name) => {
  if (name.toLowerCase().includes("beach")) {
    return "🏝";
  } else if (name.toLowerCase().includes("adventure")) {
    return "🎢";
  } else if (name.toLowerCase().includes("arts")) {
    return "🎨";
  } else if (name.toLowerCase().includes("food")) {
    return "🍹";
  } else if (name.toLowerCase().includes("shopping")) {
    return "🏝";
  } else if (name.toLowerCase().includes("history")) {
    return "🏛";
  } else if (name.toLowerCase().includes("iconic")) {
    return "⛩";
  } else if (name.toLowerCase().includes("sporting")) {
    return "⚽️";
  } else if (name.toLowerCase().includes("wellness")) {
    return "🏵";
  } else if (name.toLowerCase().includes("outdoors")) {
    return "🌲";
  } else if (name.toLowerCase().includes("nightlife")) {
    return "🎷";
  } else if (name.toLowerCase().includes("tourist")) {
    return "🗽";
  } else if (name.toLowerCase().includes("film")) {
    return "🎬";
  } else {
    return "";
  }
};

export const localGetUser = () => {
  try {
    const user = JSON.parse(localStorage.getItem("profile") as any)?.user;

    if (!user) {
      return null;
    }
    const parsedUser = JSON.parse(user);

    return parsedUser;
  } catch {
    return null;
  }
};

export const getFullUserProfile = async () => {
  const userId = localGetUserId() as any;

  if (!userId) return {};

  const user = await getUserByID(userId);
  console.log(user);
  return user.data;
};

export const getUserProfilePicture = async (id?: any) => {
  let userId: any;
  if (id) {
    userId = id;
  } else {
    userId = localGetUserId() as any;
  }

  if (!userId) return null;

  const user = await getUserProfilePictureByID(userId);
  return user.data;
};

// get user id
export const localGetUserFullName = (): string | null => {
  const user = JSON.parse(localStorage.getItem("profile") as any)?.user;

  if (!user) {
    return null;
  }
  const parsedUser = JSON.parse(user);

  return `${parsedUser.firstName} ${parsedUser.lastName}`;
};

// get user id
export const localGetUserId = (): number | null => {
  const user = JSON.parse(localStorage.getItem("profile") as any)?.user;

  if (!user) {
    return null;
  }
  const parsedUser = JSON.parse(user);

  return parsedUser.userId;
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

// get cart length
export const localGetCartLength = (): number => {
  const cart = JSON.parse(localStorage.getItem("cart_data") as any);

  if (!cart) {
    return 0;
  } else {
    return cart.length;
  }
};
