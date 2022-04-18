import axios from "axios";

// swagger api - registration - https://onboarding.tripincmvptest.com/api-docs/index.html
// swagger api - user - https://usersecurity.tripincmvptest.com/api-docs/index.html

// user api
const USERAPI = axios.create({ baseURL: "https://usersecurity.tripincmvptest.com" });
USERAPI.interceptors.request.use((req: any) => {
    if (localStorage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile") as any).token
            }`;
    }
    return req;
});

export default USERAPI