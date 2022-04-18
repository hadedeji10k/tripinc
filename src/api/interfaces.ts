
export interface ISignIn {
    email: string,
    password: string
}

export interface IEmailExists {
    email: string
}

export interface ISignUp {
    firstName: string
    lastName: string
    email: string
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