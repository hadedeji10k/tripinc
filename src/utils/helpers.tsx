import jwt_decode from "jwt-decode";
import {
  IRefreshToken,
  ISignUpAndInResponse,
  ILocalUserProfile,
  ITripPlanningItineraryDay,
} from "../api/interfaces";
import { refreshToken } from "../api/responseHandlers";
import Swal from "sweetalert2";
import {
  getAllCountries,
  getCities,
  getUserByID,
  getUserCart,
  getUserOrder,
  getUserProfilePictureByID,
} from "../api";
import { CitiesPageSize, currencyList, monthNames } from "./constants";
import { addDays, differenceInDays, isPast } from "date-fns";

export const checkAuth = (): boolean => {
  let valid = false;
  if (localStorage.getItem("profile")) {
    try {
      let profile: ISignUpAndInResponse = JSON.parse(
        localStorage.getItem("profile") as any
      );

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
  localStorage.removeItem("cart_data");
  localStorage.removeItem("order_items");
};

export const localLogout = (navigate?: any, location?: any) => {
  localStorage.removeItem("profile");
  localStorage.removeItem("cart_data");
  localStorage.removeItem("order_items");
  Swal.fire({
    title: "Error!",
    text: "This feature is unavailable as you are not signed in. Please sign in to access this page.",
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

export const checkForAuth = async () => {
  let profile: ILocalUserProfile = JSON.parse(
    localStorage.getItem("profile") as any
  );
  if (profile) {
    const decoded: any = jwt_decode(profile.access_Token);
    const expiryDate = new Date(decoded?.exp * 1000);

    const maximumExpiryDate = new Date(addDays(expiryDate, 1));

    const difference = differenceInDays(new Date(), maximumExpiryDate);

    if (difference === 0 && isPast(expiryDate)) {
      const formData: IRefreshToken = {
        refreshToken: profile.refresh_Token,
      };
      await refreshToken(formData);
      return;
    } else if (isPast(maximumExpiryDate)) {
      localLogoutProfile();
      return;
    } else {
      return;
    }
  }
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
    text: "This feature is unavailable as you are not signed in. Please sign in to access this page.",
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

export const currencySymbolHelper = (currency: string) => {
  const filtered = currencyList.filter((item: any) => item.Code === currency);
  const symbol = filtered[0]?.Symbol;
  return symbol;
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

// get user full name
export const localGetUserFullName = (): string => {
  const user = JSON.parse(localStorage.getItem("profile") as any)?.user;

  if (!user) {
    return "";
  }
  const parsedUser = JSON.parse(user);

  return `${parsedUser.firstName} ${parsedUser.lastName}`;
};

// get user first name
export const localGetUserFirstName = (): string | null => {
  const user = JSON.parse(localStorage.getItem("profile") as any)?.user;

  if (!user) {
    return null;
  }
  const parsedUser = JSON.parse(user);

  return `${parsedUser.firstName}`;
};

export const isAmbassador = () => {
  const user = localGetUser();
  let user2;
  getFullUserProfile().then((result) => {
    console.log("result", result);
    user2 = result;
    console.log("User 1", user);
    console.log("User 2", user2);
    // return user?.role.map((item) => item.toLowerCase()).includes("ambassador");
  });
  return user2;
};

export const isTripPlanner = (): boolean => {
  const user = localGetUser();

  return user.role.map((item) => item.toLowerCase()).includes("tripPlanne");
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
export const localGetCartLength = async () => {
  const cart = JSON.parse(localStorage.getItem("cart_data") as any);

  if (cart) {
    return cart.length;
  } else {
    const userId = localGetUserId();
    if (userId) {
      const response = await getUserCart(userId);
      localStorage.setItem("cart_data", JSON.stringify(response.data));
      return response.data.length;
    } else {
      return 0;
    }
  }
};

// get Orders length
export const localGetOrdersLength = async () => {
  const orders = JSON.parse(localStorage.getItem("order_items") as any);

  if (orders) {
    return orders.totalCount;
  } else {
    const userId = localGetUserId();
    if (userId) {
      const response = await getUserOrder(userId);
      localStorage.setItem("order_items", JSON.stringify(response.data));
      return response.data.totalCount;
    } else {
      return 0;
    }
  }
};

// generate array with date
export const generateBucketListTripDateArray = (
  itemId: number,
  tripId: number,
  noOfPartner: number,
  startDate: Date,
  endDate: Date
) => {
  startDate = new Date(startDate);
  endDate = new Date(endDate);
  const date = new Date(startDate.getTime());
  let array: any = [];

  while (date <= endDate) {
    const arrayDateName = `${monthNames[date.getMonth()]} ${date.getDate()}`;
    array.push({
      label: arrayDateName,
      date: date.toISOString(),
    });
    date.setDate(date.getDate() + 1);
  }

  array = array.map((item) => {
    return {
      label: item.label,
      key: `${tripId},${item.date},${noOfPartner}`,
    };
  });

  return array;
};

// generate array with date
export const generateTripDateArray = (startDate: Date, endDate: Date) => {
  const date = new Date(startDate.getTime());
  let array: ITripPlanningItineraryDay[] = [];

  while (date <= endDate) {
    // const arrayDateName = `${monthNames[date.getMonth()]} ${date.getDate()}`;
    array.push({
      date: date.toISOString(),
      itineraries: [],
      customEvents: [],
    });
    date.setDate(date.getDate() + 1);
  }

  return array;
};

export const generateTripColorArray = (startDate: Date, endDate: Date) => {
  const date = new Date(startDate.getTime());
  let colorArray: any = [];

  const generateColor = (array: any) => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    if (array.includes(randomColor)) {
      generateColor(array);
    }
    return randomColor;
  };

  while (date <= endDate) {
    colorArray.push(generateColor(colorArray));
    date.setDate(date.getDate() + 1);
  }

  return colorArray;
};

// generate itinerary dates object men for itineraries
export const generateItineraryMenuObject = (array: any) => {
  let returnedArray: any = [];
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    returnedArray.push({
      id: i + 1,
      stateOfClass: false,
      arrayName: `${element.month} ${element.date}`,
      ...element,
    });
  }
  return returnedArray;
};

// get keys from Object
export const getKeysFromObject = (object: Object) => {
  let keys: any = [];

  for (let k in object) keys.push(k);

  return keys;
};

// function to help rearrange array
export const moveArray = (array: any, moveIndex: any, toIndex: any) => {
  /* Moves an array item from one position in an array to another.
       Note: This is a pure function so a new array will be returned, instead
       of altering the array argument.
      Arguments:
      1. array    : Array in which to move an item.         (required)
      2. moveIndex : The index of the item to move.          (required)
      3. toIndex  : The index to move item at moveIndex to. (required)
    */
  let itemRemovedArray = [
    ...array.slice(0, moveIndex),
    ...array.slice(moveIndex + 1, array.length),
  ];

  return [
    ...itemRemovedArray.slice(0, toIndex),
    array[moveIndex],
    ...itemRemovedArray.slice(toIndex, itemRemovedArray.length),
  ];
};

export const dateSuffix = (numberOfDate) => {
  switch (numberOfDate) {
    case 1:
    case 21:
    case 31:
      return "st";
    case 2:
    case 22:
      return "nd";
    case 3:
    case 23:
      return "rd";
    default:
      return "th";
  }
};

// const extension = (exportType == 'csv') ? 'csv' : (exportType == 'excel') ? 'xlsx' : 'csv';
//         const mimeType = (extension == 'csv') ? 'text/csv' : (extension == 'xlsx') ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' : 'application/json';
//         const fileName = "Orders-" + new Date().getTime() + `.${extension}`;
//         exportFromApi(fileName, result, mimeType);

export const exportFromApi = (fileName: string, data: any, type: string) => {
  const binaryData: any = [];
  binaryData.push(data);

  const url = window.URL.createObjectURL(new Blob(binaryData, { type }));
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.setAttribute("style", "display: none");
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
  a.remove();
};

export const checkForInterestStateOfClass = (
  array: any,
  id: string,
  type: string = "userInterestArray"
) => {
  let found;
  if (type === "notUserInterestArray") {
    found = array.filter((item) => item.toString() === id.toString());
  } else {
    found = array.filter(
      (item) => item.interestId.toString() === id.toString()
    );
  }
  if (found.length > 0) {
    return true;
  } else {
    return false;
  }
};

export const formatDateToMonthAndDay = (dateString: Date | string) => {
  const date = new Date(dateString);
  return `${
    monthNames[date.getMonth()]
  }, ${date.getDate()} ${date.getFullYear()}`;
};
