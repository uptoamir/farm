import { AxiosResponse } from "axios";
import API, { baseURL } from "src/core/api/axiosConfig";

const api = API.getInstance();

export const getUserInfoAPI = async (): Promise<
  AxiosResponse<GetUserInfoRequest, any>
> => {
  const path = `/users/`;
  const url = baseURL + path;
  const name = "GetUserInfo";
  return api.GetMethod<GetUserInfoRequest>({ url, name, withToken: true });
};

export const getFarmsInfoAPI = async (): Promise<AxiosResponse<any, any>> => {
  const path = `/farm/`;
  const url = baseURL + path;
  const name = "GetFarmsInfo";
  return api.GetMethod<any>({ url, name, withToken: true });
};

export const postContractDraftAPI = async (
  args: PostContractDraftRequest
): Promise<AxiosResponse<any, any>> => {
  const path = `/contracts/submit?action=draft`;
  const url = baseURL + path;
  const data = args.data;
  const name = "PostContractDraft";
  return api.PostMethod<any>({ url, name, data, withToken: true });
};

export const postContractContradictAPI = async (
  args: PostContractContradictRequest
): Promise<AxiosResponse<any, any>> => {
  const path = `/farm/contradict/${args.id}/declare`;
  const url = baseURL + path;
  const name = "PostContractContradict";
  return api.PostMethod<any>({ url, name, withToken: true });
};

export const getEstimationsAPI = async (
  args: any
): Promise<AxiosResponse<any, any>> => {
  const path = `/contracts/${args.id}/estimations`;
  const url = baseURL + path;
  const name = "GetEstimationsInfo";
  return api.GetMethod<any>({ url, name, withToken: true });
};

export const patchInitialContractAPI = async (
  args: PatchInitialContractRequest
): Promise<AxiosResponse<any, any>> => {
  const path = `/contracts/submit?action=initial`;
  const url = baseURL + path;
  const data = args.data;
  return api.PostMethod<any>({ url, data });
};

export const patchFinalContractAPI = async (
  args: PatchFinalContractRequest
): Promise<AxiosResponse<any, any>> => {
  const path = `/contracts/submit?action=final`;
  const url = baseURL + path;
  const data = args.data;
  return api.PatchMethod<any>({ url, data });
};

export const getContractPreviewAPI = async (
  args: any
): Promise<AxiosResponse<GetContractPreviewRequest, any>> => {
  const path = `/contracts/${args.contract_id}/preview`;
  const url = baseURL + path;
  const name = "GetContractPreview";
  return api.GetMethod<GetContractPreviewRequest>({
    url,
    name,
    withToken: true,
  });
};
