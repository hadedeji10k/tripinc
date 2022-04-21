import axios from "axios";
import { IRefreshToken, ISignUpAndInResponse } from '../interfaces';
import { cannotRefreshAccessToken, checkAuthForRefresh, getLocalRefreshToken, refreshAccessToken } from '../../utils/helpers'
import { refreshToken } from '../responseHandlers';

// swagger api - registration - https://onboarding.tripincmvptest.com/api-docs/index.html
// swagger api - user - https://usersecurity.tripincmvptest.com/api-docs/index.html

// user api
const USERAPI = axios.create({ baseURL: "https://usersecurity.tripincmvptest.com" });
USERAPI.interceptors.request.use(async (req: any) => {
    // const result = checkAuthForRefresh();
    // if (!result.tokenExpired) {
    //     if (localStorage.getItem("profile")) {
    //         let profile: ISignUpAndInResponse = JSON.parse(localStorage.getItem("profile") as any)

    //         let token = profile.access_Token

    //         req.headers.Authorization = `Bearer ${token}`;
    //         req.headers["x-access-token"] = token;
    //     }
    // }
    // return req;
    // const result = await checkAuthForRefresh();

    // if (!result.tokenExpired) {
    //     if (localStorage.getItem("profile")) {
    //         let profile: ISignUpAndInResponse = JSON.parse(localStorage.getItem("profile") as any)

    //         let token = profile.access_Token

    //         req.headers.Authorization = `Bearer ${token}`;
    //         req.headers["x-access-token"] = token;
    //     }
    // } else if (result.can_still_refresh) {
    //     // if token is expired but can still refresh
    //     // then refresh token and then send request
    //     let profile: ISignUpAndInResponse = JSON.parse(localStorage.getItem("profile") as any)
    //     const refresh_token = profile.refresh_Token;

    //     const formData: IRefreshToken = {
    //         refreshToken: refresh_token,
    //     };

    //     await refreshToken(formData);

    //     profile = JSON.parse(localStorage.getItem("profile") as any)
    //     let token = profile.access_Token

    //     req.headers.Authorization = `Bearer ${token}`;
    //     req.headers["x-access-token"] = token;
    // } else if (!result.can_still_refresh && !result.tokenExpired) {
    //     cannotRefreshAccessToken()
    // }

    // return req;


    const result = checkAuthForRefresh();
    console.log(result)
    if (result.tokenExpired !== null || result.can_still_refresh !== null || result.tokenExpired === false || result.can_still_refresh === false) {
        if (localStorage.getItem("profile")) {
            let profile: ISignUpAndInResponse = JSON.parse(localStorage.getItem("profile") as any)

            let token = profile.access_Token

            req.headers.Authorization = `Bearer ${token}`;
            req.headers["x-access-token"] = token;
        }
    } else if (result.can_still_refresh === true && result.tokenExpired === true) {
        const formData = {
            refreshToken: result.refreshToken,
        };
        refreshToken(formData);
        if (localStorage.getItem("profile")) {
            let profile: ISignUpAndInResponse = JSON.parse(localStorage.getItem("profile") as any)

            let token = profile.access_Token

            req.headers.Authorization = `Bearer ${token}`;
            req.headers["x-access-token"] = token;
        }
    } else if (result.can_still_refresh === null && result.tokenExpired === null) {
        cannotRefreshAccessToken()
    }

    return req;
});

export default USERAPI

// this is for onRejected

// , async (err) => {
//     const originalConfig = err.config;
//     if ((originalConfig.url !== "/api/Auth/Login" || originalConfig.url !== "/api/Auth/Register") && err.response) {
//         // Access Token was expired
//         if (err.response.status === 401 && !originalConfig._retry) {
//             originalConfig._retry = true;
//             try {
//                 const result = checkAuthForRefresh();
//                 if (result.can_still_refresh) {
//                     // if token is expired but can still refresh
//                     // then refresh token and then send request
//                     const data = await refreshToken({
//                         refreshToken: getLocalRefreshToken()
//                     })
//                     console.log(data)
//                     return USERAPI(originalConfig);
//                 }
//             } catch (_error) {
//                 return Promise.reject(_error);
//             }
//         }
//     }
//     return Promise.reject(err);
// }