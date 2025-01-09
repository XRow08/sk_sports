import axios from "axios";
import { parseCookies } from "nookies";

const URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3333/api/v1";

const Api = axios.create({
  baseURL: URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

Api.interceptors.request.use(
  (config) => {
    const cookies = parseCookies();
    const token = cookies.authToken;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default Api;
