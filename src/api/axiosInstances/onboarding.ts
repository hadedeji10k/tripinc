import axios from "axios";
import { IRefreshToken, ISignUpAndInResponse } from '../interfaces';
import { cannotRefreshAccessToken, checkAuthForRefresh, refreshAccessToken } from '../../utils/helpers'
import { refreshToken } from "../responseHandlers";

// swagger api - registration - https://onboarding.tripincmvptest.com/api-docs/index.html
// swagger api - user - https://usersecurity.tripincmvptest.com/api-docs/index.html

// registration api
const REGAPI = axios.create({ baseURL: "https://onboarding.tripincmvptest.com" });

REGAPI.interceptors.request.use(async (req: any) => {

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
    //     // console.log("refresh token")
    //     let profile: ISignUpAndInResponse = JSON.parse(localStorage.getItem("profile") as any)
    //     const refresh_token = profile.refresh_Token;

    //     const formData: IRefreshToken = {
    //         refreshToken: refresh_token,
    //     };
    //     // console.log(formData)

    //     const data = refreshToken(formData);
    //     console.log(data)
    //     // profile = JSON.parse(localStorage.getItem("profile") as any)
    //     // let token = profile.access_Token

    //     // req.headers.Authorization = `Bearer ${token}`;
    //     // req.headers["x-access-token"] = token;
    // } else if (!result.can_still_refresh && !result.tokenExpired) {
    //     cannotRefreshAccessToken()
    // }

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

export default REGAPI;