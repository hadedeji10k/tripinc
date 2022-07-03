
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


export interface IUpdateUserCurrency {
    userId: string
    preferedCurrency: string
}

export interface IUpdateUserTimeFormat {
    userId: string
    preferedTimeFormat: string
}

export interface IUpdateUserPassword {
    userId: string
    oldPassword: string
    newPassword: string
}

export interface ISignUp {
    firstName: string
    lastName: string
    email: string
}

export interface ISignUpNewsLetter {
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
export interface IResendVerification {
    recipient: string,
    verificationType: string,
}

export interface IVerifyAccount {
    userId: number | null,
    token: string,
    verificationType: string,
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

export interface IUpdateProfile {
    userId: number | undefined
    firstName: string
    lastName: string
    phoneNumber: string
    email?: string
    alias?: string
    city: string
    country: string
    postCode: string
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
    phoneNumber: string,
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
    provider: string,
    providerKey: string,
    email: number,
    displayName: string,
    firstName: string,
    lastName: string,
    idToken: string,
    pictureUrl: string
}

export interface IUserProfile {
    firstName: string,
    lastName: string,
    alias?: string,
    phoneNumber?: string,
    email: string,
    city?: string,
    country?: string,
    postCode?: string,
    averageTravelCount?: number,
    referralCode?: string,
    accountType?: string,
    signupChannel?: string,
    emailVerified?: boolean,
    phoneVerified?: boolean,
    status?: string,
    profilePicture?: string,
    creatorId?: number,
    creator?: {
        id?: number,
        firstName?: string,
        lastName?: string,
        phoneNumber?: string,
        email?: string
    },
    id?: number,
    createdDate?: Date,
    updatedDate?: Date
}

export interface ICart {
    id: number,
    createdDate: Date,
    updatedDate: Date,
    userId: number | null,
    itemId: number,
    itemName: string,
    unitPrice: number,
    quantity: number,
    totalAmount: number,
    imageUrl: string,
    sessionId: string,
    associatedTripId: number,
    date: Date
}

export interface IMakeOrder {
    userId: number | null,
    tripId?: number
}
export interface IOrderItem {
    orderId: number,
    userId: number,
    itemId: number,
    itemName: string,
    currency: string,
    unitPrice: number,
    quantity: number,
    totalAmount: number,
    imageUrl: string,
    isFulfilled: boolean,
    isCancelled: boolean,
    cancellationDate: any,
    id: number,
    createdDate: Date,
    updatedDate: Date | null
}

export interface IOrderDetails {
    userId: number,
    userFullName: string,
    email: string,
    tripId: number | null,
    orderReference: string,
    totalAmount: number,
    currency: string,
    paid: boolean,
    paymentDate: Date | null,
    amountPaid: number,
    status: string,
    cancellationReason: string | null,
    items: IOrderItem[],
    id: number,
    createdDate: Date | null,
    updatedDate: Date | null
}

export interface IAddCart {
    userId: number | null,
    itemId: number,
    itemType: string,
    itemName: string,
    currency: string,
    unitPrice: number,
    quantity: number,
    imageUrl: string,
    date: Date
}

export interface IUpdateCart {
    userId: number | null,
    tripId?: number,
    items?:
    {
        cartId: number,
        quantity: number
    }[]
}

export interface IAddReview {
    userId: number | null,
    fullName: string | null,
    attractionId: number,
    rating: number,
    comment: string
}

export interface ICategory {
    code: string | null
    createdDate: string | null
    id: number
    name: string
    updatedDate: string | null
}
export interface IFormattedCategory {
    code: string | null
    createdDate: string | null
    updatedDate: string | null
    id: number
    title: string
    stateOfClass: boolean,
    symbol?: string
}

export interface IWishList {
    userId?: number | null
    itemId?: number
    itemType?: string
    provider?: string
    tripId?: number
}
export interface IRatings {
    id: number,
    userId: number,
    fullName: string,
    attractionId: number,
    rating: number,
    comment: string,
    stateOfClass: boolean,
    image: string
}
export interface IDeal {
    id: number,
    createdDate: Date,
    updatedDate?: Date,
    itemType: string,
    title: string,
    postalCode?: string,
    price: number,
    currency: string,
    location: string,
    city: string,
    country: string,
    longitude: number,
    latitude: number,
    distance?: number,
    openingHour: string,
    closingHour: string,
    bestVisitingTime: string[],
    openingDaysList: string[],
    availableDates?: Date[],
    typicalTimeSpent?: number,
    description: string,
    averageRating?: number,
    numberOfRatings?: number,
    imageUrl?: string,
    termsAndConditions: string,
    greatForList: string[],
    thingsToPackList?: string[],
    creatorUserId?: number,
    creatorName?: string,
    updatedBy?: string,
    isActive?: true,
    isCovidFriendly?: true,
    isPublished?: true,
    featured?: true,
    liked?: true,
    photos: [
        {
            id: number,
            photoUrl: string
        }
    ],
    categories: [
        {
            id: number,
            name: string,
            code: string
        }
    ],
    tags?: [
        {
            id: number,
            name: string
        }
    ],
    ratings: [
        {
            userId: number,
            fullName: string,
            attractionId: number,
            rating: number,
            comment: string
        }
    ],
    abstract?: string,
    highlights?: string[],
    inclusions?: string,
    exclusions?: string,
    additionalInformation?: string,
    bestseller?: true,
    certified?: true,
    tourUrl?: string,
    supplierId?: number,
    provider?: string,
    tourId?: number,
    tourCode?: string,
    freeSale?: true,
    locationList?: [
        {
            locationId: number,
            type: string,
            name: string,
            englishName: string,
            city: string,
            country: string,
            coordinates: {
                lat: number,
                long: number
            },
            parentId: number,
            viewport: {
                swLat: number,
                swLong: number,
                neLat: number,
                neLong: number
            }
        }
    ],
    durationList?: [
        {
            duration: number,
            unit: string
        }
    ],
    cancellationPolicyText: string,
    expiryDate?: Date
}

export interface IPagination {
    hasNext: boolean,
    hasPrevious: boolean,
    currentPage: number,
    pageSize: number,
    totalPages: number,
    totalCount: number,
}

export interface ITripPlanning {

}