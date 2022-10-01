import axios from "axios";
import { devTripServiceUrl, runtimeEnvironment, testTripServiceUrl, tripServiceUrl } from "../../utils/constants";
import { ISignUpAndInResponse } from '../interfaces';

// swagger api - registration - `${tripServiceUrl}/api-docs/index.html`

const baseURL =
    (runtimeEnvironment as string) === "dev" ? devTripServiceUrl
        : (runtimeEnvironment as string) === "test" ? testTripServiceUrl
            : tripServiceUrl;

// TRIP SERVICE api
const TRIPAPI = axios.create({ baseURL });

TRIPAPI.interceptors.request.use(async (req: any) => {

    let profile: ISignUpAndInResponse = JSON.parse(localStorage.getItem("profile") as any)

    let token = profile?.access_Token

    req.headers.Authorization = `Bearer ${token}`;
    req.headers["x-access-token"] = token;

    return req;
});

export default TRIPAPI;