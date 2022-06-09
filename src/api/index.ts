// this file contains all api call

// import all api instances
import REGAPI from "./axiosInstances/onboarding";
import USERAPI from "./axiosInstances/usersecurity";
import TRIPAPI from "./axiosInstances/tripservice";

import axios, { AxiosResponse } from "axios";
import { ISignUpFull, ISignIn, IEmailExists, IRefreshToken, IGetUserByID, IGoogleSignUpFull, IUpdateProfile, IUpdateUserCurrency, IUpdateUserTimeFormat, IUpdateUserPassword, ISignUpNewsLetter, IWishList, IAddCart, IVerifyAccount, IResendVerification, IUpdateCart, IAddReview } from './interfaces';

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

// verify account
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

export const getAllDeals = async (query?: string): Promise<AxiosResponse<any>> => {
    return await TRIPAPI.get(`/api/Attractions?${query}`);
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

// update user time format
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

// add review
export const addReview = async (formData: IAddReview): Promise<AxiosResponse<any>> => {
    return await TRIPAPI.post(`/api/Ratings`, formData);
}
