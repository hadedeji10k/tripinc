// this file contains all api call

// import all api instances
import REGAPI from "./axiosInstances/onboarding";
import USERAPI from "./axiosInstances/usersecurity";
import TRIPAPI from "./axiosInstances/tripservice";

import axios, { AxiosResponse } from "axios";
import { ISignUpFull, ISignIn, IEmailExists, IRefreshToken, IGetUserByID, IGoogleSignUpFull, IUpdateProfile, IUpdateUserCurrency, IUpdateUserTimeFormat, IUpdateUserPassword, ISignUpNewsLetter, IWishList, IAddCart, IVerifyAccount, IResendVerification, IUpdateCart, IAddReview, IMakeOrder, IInitiatePayment, IManagePlacesWishToVisit, IManagePlacesVisited, IForgotPasswordRequest, IConfirmForgotPasswordRequest, IManageUserFoods, IManageUserConsents, IManageUserInterests, IInitiateTripPlanning, IAddItemToTrip } from './interfaces';

// checks if email exists
export const checkIfEmailExists = async (formData: IEmailExists): Promise<AxiosResponse<any>> => {
    return await REGAPI.post("/api/Auth/CheckIfEmailExist", formData);
}


// refresh token 
export const refreshToken = async (formData: IRefreshToken): Promise<AxiosResponse<any>> => {
    return await USERAPI.post("/api/Auth/RefreshToken", formData);
}


// Registration and logging in

// sign up
export const signUp = async (formData: ISignUpFull): Promise<AxiosResponse<any>> => {
    return await REGAPI.post("/api/Auth/Register", formData);
}

// verify account
export const verifyAccount = async (formData: IVerifyAccount): Promise<AxiosResponse<any>> => {
    return await USERAPI.post("/api/Auth/VerifyAccount", formData);
}

// resend verification token to account
export const resendVerification = async (formData: IResendVerification): Promise<AxiosResponse<any>> => {
    return await USERAPI.post("/api/Auth/ResendVerification", formData);
}

// update user profile
export const updateProfile = async (formData: IUpdateProfile): Promise<AxiosResponse<any>> => {
    return await REGAPI.put("/api/Users/UpdateUser", formData);
}

// sign in 
export const signIn = async (formData: ISignIn): Promise<AxiosResponse<any>> => {
    return await USERAPI.post("/api/Auth/Login", formData);
}

// forgot password
export const forgotPasswordResquest = async (formData: IForgotPasswordRequest): Promise<AxiosResponse<any>> => {
    return await USERAPI.post("/api/Auth/ForgotPassword", formData);
}

// confirm forgot password
export const confirmForgotPasswordResquest = async (formData: IConfirmForgotPasswordRequest): Promise<AxiosResponse<any>> => {
    return await USERAPI.post("/api/Auth/ConfirmPasswordReset", formData);
}

// remote google sign up
export const googleSignUp = async (formData: IGoogleSignUpFull): Promise<AxiosResponse<any>> => {
    return await REGAPI.post("/api/Auth/SocialSignup", formData);
}

// remote google login
export const remoteGoogleLogin = async (formData: any): Promise<AxiosResponse<any>> => {
    return await USERAPI.post("/api/Auth/SocialLogin", formData);
}

// End of Registration and logging in



// get user by ID
export const getUserByID = async (id: IGetUserByID): Promise<AxiosResponse<any>> => {
    return await REGAPI.get(`/api/Users/${id}`);
}

// get user profile picture by ID
export const getUserProfilePictureByID = async (userId: IGetUserByID): Promise<AxiosResponse<any>> => {
    return await REGAPI.get(`/api/Users/GetProfilePicture/${userId}`);
}

export const updateUserProfilePicture = async (formData: any): Promise<AxiosResponse<any>> => {
    return await REGAPI.post("/api/Users/ChangeProfilePicture", formData);
}

export const getTopDeals = async (): Promise<AxiosResponse<any>> => {
    return await TRIPAPI.get('/api/Attractions/GetTopDeals');
}

export const getAttractionByID = async (id): Promise<AxiosResponse<any>> => {
    return await TRIPAPI.get(`/api/Attractions/${id}`);
}

// get tour by ID
export const getTourByID = async (id): Promise<AxiosResponse<any>> => {
    return await TRIPAPI.get(`/api/Tours/${id}`);
}

// get attractions
export const getAllDeals = async (query?: string): Promise<AxiosResponse<any>> => {
    return await TRIPAPI.get(`/api/Attractions?${query}`);
}

// get tours
export const getAllTours = async (query?: string): Promise<AxiosResponse<any>> => {
    return await TRIPAPI.get(`/api/Tours?${query}`);
}

export const getAllCountries = async (): Promise<AxiosResponse<any>> => {
    return await TRIPAPI.get('/api/GeoCountries?PageSize=300');
}

export const getCities = async (query?: string): Promise<AxiosResponse<any>> => {
    return await TRIPAPI.get(`/api/GeoCities?${query}`);
}

export const getAllCategories = async (): Promise<AxiosResponse<any>> => {
    return await TRIPAPI.get('/api/Categories/GetList');
}

export const getCategories = async (query: any): Promise<AxiosResponse<any>> => {
    return await TRIPAPI.get(`/api/Categories/GetList?${query}`);
}

// get user preference
export const getUserPreferences = async (userId: any): Promise<AxiosResponse<any>> => {
    return await TRIPAPI.get(`/api/UserPreferences/GetUserPreference/${userId}`);
}

// update user currency
export const updateUserCurrency = async (formData: IUpdateUserCurrency): Promise<AxiosResponse<any>> => {
    return await TRIPAPI.post(`/api/UserPreferences/UpdateUserCurrency`, formData);
}

// update user time format
export const updateUserTimeFormat = async (formData: IUpdateUserTimeFormat): Promise<AxiosResponse<any>> => {
    return await TRIPAPI.post(`/api/UserPreferences/UpdateUserTimeFormat`, formData);
}


// user Interests
export const getUserInterests = async (userId: any): Promise<AxiosResponse<any>> => {
    return await TRIPAPI.get(`/api/UserPreferences/GetUserInterests/${userId}`);
}

// manage user Interests
export const manageUserInterests = async (formData: IManageUserInterests): Promise<AxiosResponse<any>> => {
    return await TRIPAPI.post('/api/UserPreferences/ManageUserInterests', formData);
}
// export const removeInterestIds = async (formData: IManagePreference): Promise<AxiosResponse<any>> => {
//     return await TRIPAPI.delete('/api/UserPreferences/RemoveUserInterest', formData);
// }

// User Foods
export const getUserFoods = async (userId: any): Promise<AxiosResponse<any>> => {
    return await TRIPAPI.get(`/api/UserPreferences/GetUserFoods/${userId}`);
}

export const manageUserFoods = async (formData: IManageUserFoods): Promise<AxiosResponse<any>> => {
    return await TRIPAPI.post('/api/UserPreferences/ManageUserFoods', formData);
}

// User Consents
export const getUserConsents = async (userId: any): Promise<AxiosResponse<any>> => {
    return await TRIPAPI.get(`/api/UserPreferences/GetUserConsent/${userId}`);
}

export const manageUserConsents = async (formData: IManageUserConsents): Promise<AxiosResponse<any>> => {
    return await TRIPAPI.post('/api/UserPreferences/ManageUserConsent', formData);
}

// user places visited
export const getUserPlacesVisited = async (userId: any): Promise<AxiosResponse<any>> => {
    return await TRIPAPI.get(`/api/UserPreferences/GetPlacesVisited/${userId}`);
}

export const getUserPlacesWishToVisit = async (userId: any): Promise<AxiosResponse<any>> => {
    return await TRIPAPI.get(`/api/UserPreferences/GetPlacesWishToVisit/${userId}`);
}

export const managePlacesWishToVisit = async (formData: IManagePlacesWishToVisit): Promise<AxiosResponse<any>> => {
    return await TRIPAPI.post('/api/UserPreferences/ManagePlacesWishToVisit', formData);
}

export const managePlacesVisited = async (formData: IManagePlacesVisited): Promise<AxiosResponse<any>> => {
    return await TRIPAPI.post('/api/UserPreferences/ManagePlacesVisited', formData);
}


// update user password
export const updateUserPassword = async (formData: IUpdateUserPassword): Promise<AxiosResponse<any>> => {
    return await USERAPI.post(`/api/Auth/ChangePassword`, formData);
}

// signup to newsletter
export const signUpToNewsletter = async (formData: ISignUpNewsLetter): Promise<AxiosResponse<any>> => {
    return await TRIPAPI.post(`/api/NewsletterSubscriptions`, formData);
}

export const googleApiProfile = async (tokenId: any): Promise<AxiosResponse<any>> => {
    return await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${tokenId}`);
}

// add to wishlist
export const addToWishList = async (formData: IWishList): Promise<AxiosResponse<any>> => {
    return await TRIPAPI.post(`/api/WishLists`, formData);
}

// remove from wishlist
export const removeFromWishList = async (id: any, userId: any): Promise<AxiosResponse<any>> => {
    return await TRIPAPI.delete(`/api/WishLists/${id}/${userId}?useItemId=true`);
}

// get user wishlist
export const getUserWishList = async (userId: any): Promise<AxiosResponse<any>> => {
    return await TRIPAPI.get(`/api/WishLists/GetByUser/${userId}`);
}

// get user wishlist
export const getUserWishListAsAttraction = async (userId: any, query?: string): Promise<AxiosResponse<any>> => {
    return await TRIPAPI.get(`/api/WishLists/GetAsAttractionsByUser/${userId}?${query}`);
}

// add to cart
export const addToCart = async (formData: IAddCart): Promise<AxiosResponse<any>> => {
    return await TRIPAPI.post(`/api/Carts/AddToCart`, formData);
}

// update to cart
export const updateCart = async (formData: IUpdateCart): Promise<AxiosResponse<any>> => {
    return await TRIPAPI.post(`/api/Carts/UpdateCart`, formData);
}

// remove from cart
export const removeFromCart = async (cartId: any): Promise<AxiosResponse<any>> => {
    return await TRIPAPI.delete(`/api/Carts/RemoveFromCart/${cartId}`);
}

// get user cart
export const getUserCart = async (userId: any): Promise<AxiosResponse<any>> => {
    return await TRIPAPI.get(`/api/Carts/GetByUser/${userId}`);
}

// get user order
export const makeOrder = async (formData: IMakeOrder): Promise<AxiosResponse<any>> => {
    return await TRIPAPI.post(`/api/Orders/Checkout`, formData);
}

// get user order
export const getUserOrder = async (userId: any, query?: string): Promise<AxiosResponse<any>> => {
    return await TRIPAPI.get(`/api/Orders/GetByUser/${userId}?${query}`);
}

// get order details by order ID
export const getOrderByID = async (orderId: any): Promise<AxiosResponse<any>> => {
    return await TRIPAPI.get(`/api/Orders/${orderId}`);
}

// Export Order
export const exportOrder = async (query?: string): Promise<AxiosResponse<any>> => {
    return await TRIPAPI.get(`/api/Orders/Export?${query}`);
}


// add review
export const addReview = async (formData: IAddReview): Promise<AxiosResponse<any>> => {
    return await TRIPAPI.post(`/api/Ratings`, formData);
}


// PAYMENT
// Initialize payment
export const initiatePayment = async (formData: IInitiatePayment): Promise<AxiosResponse<any>> => {
    return await TRIPAPI.post("/api/Payments/InitiatePayment", formData);
}


// Trip Planning
export const initiateTripPlanning = async (formData: IInitiateTripPlanning): Promise<AxiosResponse<any>> => {
    return await TRIPAPI.post("/api/TripPlannings", formData);
}

export const getTripById = async (tripId: any): Promise<AxiosResponse<any>> => {
    return await TRIPAPI.get(`/api/TripPlannings/${tripId}`);
}

export const getUserTrips = async (userId: any, query?: string): Promise<AxiosResponse<any>> => {
    return await TRIPAPI.get(`/api/TripPlannings/GetByUser/${userId}?${query}`);
}

export const getTripItinerariesById = async (tripId: any): Promise<AxiosResponse<any>> => {
    return await TRIPAPI.get(`/api/TripPlannings/GetItineraries/${tripId}`);
}

export const addItemToTrip = async (formData: IAddItemToTrip): Promise<AxiosResponse<any>> => {
    return await TRIPAPI.post("api/TripPlannings/AddItemToTrip", formData);
}


// ADMIN
export const getAdminDashboard = async (tripLimit: number = 10): Promise<AxiosResponse<any>> => {
    return await TRIPAPI.get(`/api/Dashboard/GetDashboard?isAdmin=true&limit=${tripLimit}`);
}