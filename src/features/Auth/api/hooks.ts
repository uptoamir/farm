import { AxiosResponse } from "axios";
import { useCustomMutation } from "src/core/api/useCustomMutation";
import { useCustomQuery } from "src/core/api/useCustomQuery";
import { UseMutationOptions } from "@tanstack/react-query";
import { postLoginAPI, postOtpAPI } from ".";

export const useOtpMutation = (
  options?: Omit<
    UseMutationOptions<AxiosResponse<any>, Error, PostOtpRequest, any>,
    "mutationFn"
  >
) =>
  useCustomMutation<AxiosResponse<any>, Error, PostOtpRequest, any>(
    postOtpAPI,
    {
      ...options,
    }
  );

export const useLoginMutation = (
  options?: Omit<
    UseMutationOptions<AxiosResponse<any>, Error, PostLoginRequest, any>,
    "mutationFn"
  >
) =>
  useCustomMutation<AxiosResponse<any>, Error, PostLoginRequest, any>(
    postLoginAPI,
    {
      ...options,
    }
  );
