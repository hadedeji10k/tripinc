import axios from "axios";
import { ISignUpAndInResponse } from '../interfaces';
import { devUserServiceUrl, runtimeEnvironment, testUserServiceUrl, userServiceUrl } from "../../utils/constants";

// swagger api - registration - https://usersecurity.tripincmvptest.com/api-docs/index.html

const baseURL =
    (runtimeEnvironment as string) === "dev" ? devUserServiceUrl
        : (runtimeEnvironment as string) === "test" ? testUserServiceUrl
            : userServiceUrl;

const ENDPOINTS_NO_TOKEN = ['/api/Auth/Login', '/api/Auth/SocialLogin']

// user api
const USERAPI = axios.create({ baseURL });

USERAPI.interceptors.request.use(async (req: any) => {

    if (ENDPOINTS_NO_TOKEN.includes(req.url)) {
        return req
    }

    if (localStorage.getItem("profile")) {
        let profile: ISignUpAndInResponse = JSON.parse(localStorage.getItem("profile") as any)

        let token = profile.access_Token

        req.headers.Authorization = `Bearer ${token}`;
        req.headers["x-access-token"] = token;
    }

    return req;
});

export default USERAPI