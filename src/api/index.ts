// this file contains all api call

// import all api instances
import REGAPI from "./axiosInstances/onboarding";
import USERAPI from "./axiosInstances/usersecurity";
import TRIPAPI from "./axiosInstances/tripservice";

import axios, { AxiosResponse } from "axios";
import { ISignUpFull, ISignIn, IEmailExists, IRefreshToken, IGetUserByID, IGoogleSignUpFull, IUpdateProfile } from './interfaces';

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

export const getTopDeals = async (): Promise<AxiosResponse<any>> => {
    return await TRIPAPI.get('/api/Attractions/GetTopDeals');
}

export const getAllDeals = async (query: string): Promise<AxiosResponse<any>> => {
    return await TRIPAPI.get(`/api/Attractions?${query}`);
}

export const getAllCategories = async (): Promise<AxiosResponse<any>> => {
    return await TRIPAPI.get('/api/Categories/GetList');
}

export const getCategories = async (query: any): Promise<AxiosResponse<any>> => {
    return await TRIPAPI.get(`/api/Categories/GetList?${query}`);
}

export const googleApiProfile = async (tokenId: any): Promise<AxiosResponse<any>> => {
    return await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${tokenId}`);
}

