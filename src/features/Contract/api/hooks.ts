import { AxiosResponse } from "axios";
import { useCustomMutation } from "src/core/api/useCustomMutation";
import { useCustomQuery } from "src/core/api/useCustomQuery";
import { UseMutationOptions } from "@tanstack/react-query";
import {
  getUserInfoAPI,
  getFarmsInfoAPI,
  postContractDraftAPI,
  getEstimationsAPI,
  patchInitialContractAPI,
  patchFinalContractAPI,
  getContractPreviewAPI,
  postContractContradictAPI,
} from ".";

export const getUserInfoQuery = () =>
  useCustomQuery<Promise<GetUserInfoResponse>, Error, GetUserInfoResponse>(
    ["user-info"],
    () => getUserInfoAPI(),
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    }
  );

export const getFarmsInfoQuery = () =>
  useCustomQuery<Promise<any>, Error, any>(
    ["farms-info"],
    () => getFarmsInfoAPI(),
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    }
  );

export const useContractDraftMutation = (
  options?: Omit<
    UseMutationOptions<
      AxiosResponse<any>,
      Error,
      PostContractDraftRequest,
      any
    >,
    "mutationFn"
  >
) =>
  useCustomMutation<AxiosResponse<any>, Error, PostContractDraftRequest, any>(
    postContractDraftAPI,
    {
      ...options,
    }
  );

export const getEstimationsQuery = (options: GetEstimationsRequest) =>
  useCustomQuery<Promise<any>, Error, any>(
    ["estimation-info", options.id],
    () => getEstimationsAPI(options),
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    }
  );

export const useInitailContractMutation = (
  options?: Omit<
    UseMutationOptions<
      AxiosResponse<any>,
      Error,
      PatchInitialContractRequest,
      any
    >,
    "mutationFn"
  >
) =>
  useCustomMutation<
    AxiosResponse<any>,
    Error,
    PatchInitialContractRequest,
    any
  >(patchInitialContractAPI, {
    ...options,
  });

export const useFinalContractMutation = (
  options?: Omit<
    UseMutationOptions<
      AxiosResponse<any>,
      Error,
      PatchFinalContractRequest,
      any
    >,
    "mutationFn"
  >
) =>
  useCustomMutation<AxiosResponse<any>, Error, PatchFinalContractRequest, any>(
    patchFinalContractAPI,
    {
      ...options,
    }
  );

export const getContractPreviewQuery = (options: GetContractPreviewRequest) =>
  useCustomQuery<
    Promise<GetContractPreviewResponse>,
    Error,
    GetContractPreviewResponse
  >(
    ["contract-preview", options.contract_id],
    () => getContractPreviewAPI(options),
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    }
  );

export const useContractContradictMutation = (
  options?: Omit<
    UseMutationOptions<
      AxiosResponse<any>,
      Error,
      PostContractContradictRequest,
      any
    >,
    "mutationFn"
  >
) =>
  useCustomMutation<
    AxiosResponse<any>,
    Error,
    PostContractContradictRequest,
    any
  >(postContractContradictAPI, {
    ...options,
  });
