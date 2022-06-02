import axios from "axios";
import { IRefreshToken, ISignUpAndInResponse } from '../interfaces';
import { cannotRefreshAccessToken, checkAuthForRefresh, refreshAccessToken } from '../../utils/helpers'
import { refreshToken } from "../responseHandlers";
import { testOnboardingServiceUrl, onboardingServiceUrl } from "../../utils/constants";

const ENDPOINTS_NO_TOKEN = ['/api/Auth/CheckIfEmailExist', '/api/Auth/Register', '/api/Auth/SocialSignup', '/api/Users/GetProfilePicture/:userId'];

const testingEnvironment = true
const baseURL = testingEnvironment ? testOnboardingServiceUrl : onboardingServiceUrl

// registration api
const REGAPI = axios.create({ baseURL });

REGAPI.interceptors.request.use(async (req: any) => {

    if (ENDPOINTS_NO_TOKEN.includes(req.url)) {
        return req
    }

    const result = checkAuthForRefresh();

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
        // cannotRefreshAccessToken()
        Promise.reject("Access token expired")
    }

    return req;
});

export default REGAPI;