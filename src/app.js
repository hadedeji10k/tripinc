// import axios, { AxiosResponse } from "axios";
// import { ISignUp } from "./interfaces";
const axios = require("axios");

// swagger api - registration - https://onboarding.tripincmvptest.com/api-docs/index.html
// swagger api - user - https://usersecurity.tripincmvptest.com/api-docs/index.html

const REGAPI = axios.create({
  baseURL: "https://onboarding.tripincmvptest.com/api-docs",
});

const app = (req) => {
  if (window.localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(window.localStorage.getItem("profile")).token
    }`;
  }
  return "req";
};

console.log(app());
