import { AxiosResponse } from "axios";
import API, { baseURL } from "src/core/api/axiosConfig";

const api = API.getInstance();

export const postOtpAPI = async (
  args: PostOtpRequest
): Promise<AxiosResponse<any, any>> => {
  const path = `/users/auth/otp-request`;
  const url = baseURL + path;
  const data = args.data;
  const name = "PostOtp";
  return api.PostMethod<any>({ url, name, data });
};

export const postLoginAPI = async (
  args: PostLoginRequest
): Promise<AxiosResponse<any, any>> => {
  const path = `/users/auth/login`;
  const url = baseURL + path;
  const data = args.data;
  const name = "PostOtp";
  return api.PostMethod<any>({ url, name, data });
};
