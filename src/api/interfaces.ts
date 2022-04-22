
export interface ISignIn {
    password: string
    username: string
    channel: string
    ipAddress: string
}

export interface IEmailExists {
    email: string
}

export interface IRefreshToken {
    refreshToken: string
}

export interface IGetUserByID {
    id: number
}


export interface ISignUp {
    firstName: string
    lastName: string
    email: string
}

export interface ISignUpAndInResponse {
    access_Token: string,
    refresh_Token: string,
    expires_In: number,
    grant_Type: string,
    status: boolean,
    message: string
}
export interface ISignUpFull {
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    city: string
    country: string
    password: string
    signupChannel: string
    ipAddress: string
}


export interface ILocalUserProfile {
    access_Token: string,
    refresh_Token: string,
    expires_In: number,
    grant_Type: string,
    user: {},
    expiry: number
}

export interface IGoogleSignUpFull {
    provider: string,
    providerUserId: string,
    providerKey: string,
    email: number,
    phoneNumber?: string,
    displayName: string,
    firstName: string,
    lastName: string,
    idToken: string,
    city: string,
    country: string,
    pictureUrl: string,
    signupChannel: string,
    ipAddress: string
}

export interface IGoogleSignUp {
    providerUserId: string,
    providerKey: string,
    email: number,
    displayName: string,
    firstName: string,
    lastName: string,
    idToken: string,
    pictureUrl: string
}