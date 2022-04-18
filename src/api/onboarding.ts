import axios from "axios";

// swagger api - registration - https://onboarding.tripincmvptest.com/api-docs/index.html
// swagger api - user - https://usersecurity.tripincmvptest.com/api-docs/index.html

// registration api
const REGAPI = axios.create({ baseURL: "https://onboarding.tripincmvptest.com" });
REGAPI.interceptors.request.use((req: any) => {
    if (localStorage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile") as any).token
            }`;
    }
    return req;
});

export default REGAPI;