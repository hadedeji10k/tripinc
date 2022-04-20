// this file contains all api call

// import all api instances
import REGAPI from "./onboarding";
import USERAPI from "./usersecurity";

import { AxiosResponse } from "axios";
import { ISignUpFull, ISignIn, IEmailExists, IRefreshToken, IGetUserByID } from './interfaces';

// sign up
export const signUp = async (formData: ISignUpFull): Promise<AxiosResponse<any>> => {
    return await REGAPI.post("/api/Auth/Register", formData);
}

// checks if email exists
export const checkIfEmailExists = async (formData: IEmailExists): Promise<AxiosResponse<any>> => {
    return await REGAPI.post("/api/Auth/CheckIfEmailExist", formData);
}

// get user by ID
export const getUserByID = async (id: IGetUserByID): Promise<AxiosResponse<any>> => {
    return await REGAPI.get(`/api/Users/${id}`);
}

// sign in 
export const signIn = async (formData: ISignIn): Promise<AxiosResponse<any>> => {
    return await USERAPI.post("/api/Auth/Login", formData);
}

// remote google login
export const remoteGoogleLogin = async (formData: any): Promise<AxiosResponse<any>> => {
    return await USERAPI.post("/api/Auth/Login", formData);
}

// refresh token 
export const refreshToken = async (formData: IRefreshToken): Promise<AxiosResponse<any>> => {
    return await USERAPI.post("/api/Auth/RefreshToken", formData);
}
