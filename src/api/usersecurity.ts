import axios from "axios";
import { ISignUpAndInResponse } from './interfaces';

// swagger api - registration - https://onboarding.tripincmvptest.com/api-docs/index.html
// swagger api - user - https://usersecurity.tripincmvptest.com/api-docs/index.html

// user api
const USERAPI = axios.create({ baseURL: "https://usersecurity.tripincmvptest.com" });
USERAPI.interceptors.request.use((req: any) => {
    if (localStorage.getItem("profile")) {
        let profile: ISignUpAndInResponse = JSON.parse(localStorage.getItem("profile") as any)

        let token = profile.access_Token

        req.headers.Authorization = `Bearer ${token}`;
        req.headers["x-access-token"] = token;
    }
    return req;
});

export default USERAPI