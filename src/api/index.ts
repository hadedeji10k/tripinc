// this file contains all api call

// import all api instances
import REGAPI from "./onboarding";
import USERAPI from "./usersecurity";

import { AxiosResponse } from "axios";
import { ISignUpFull, ISignIn, IEmailExists, IRefreshToken } from './interfaces';


export const signUp = async (formData: ISignUpFull): Promise<AxiosResponse<any>> => {
    return await REGAPI.post("/api/Auth/Register", formData);
}

export const checkIfEmailExists = async (formData: IEmailExists): Promise<AxiosResponse<any>> => {
    return await REGAPI.post("/api/Auth/CheckIfEmailExist", formData);
}

// sign in 
export const signIn = async (formData: ISignIn): Promise<AxiosResponse<any>> => {
    return await USERAPI.post("/api/Auth/Login", formData);
}

// remote google login
export const remoteGoogleLogin = async (formData: any): Promise<AxiosResponse<any>> => {
    return await USERAPI.post("/api/Auth/Login", formData);
}

export const refreshToken = async (formData: IRefreshToken): Promise<AxiosResponse<any>> => {
    return await USERAPI.post("/api/Auth/RefreshToken", formData);
}