import axios, { AxiosError, type AxiosInstance } from "axios";
import { notify } from "@/shared/notify/notify";

const cmsApi: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_CMS_API_BASE || "https://social-elite-cms.leapstud.io/api",
  // baseURL: "/cms",
  withCredentials: false,
  timeout: 20000,
});

const CMS_TOKEN = import.meta.env.VITE_CMS_TOKEN || "";
const AUTH_HEADER = "Authorization";

// ✅ attach bearer token (CMS)
cmsApi.interceptors.request.use((config) => {
  if (CMS_TOKEN) {
    config.headers = config.headers ?? {};
    (config.headers as any)[AUTH_HEADER] = `Bearer ${CMS_TOKEN}`;
  }
  return config;
});

// ✅ error handling: không logout, chỉ notify (trừ silent)
cmsApi.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    const cfg = (error.config ?? {}) as any;

    if (!cfg?.silent) {
      const msg =
        (error.response as any)?.data?.error?.message ||
        (error.response as any)?.data?.message ||
        error.message ||
        "CMS error. Please try again.";

      notify.error(msg);
    }

    return Promise.reject(error);
  }
);

export default cmsApi;
