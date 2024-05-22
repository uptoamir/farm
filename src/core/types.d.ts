/* eslint-disable no-unused-vars */
type GetUserInfoRequest = {
  user_id?: string;
};

type GetContractPreviewRequest = {
  contract_id?: string;
};

type Section = {
  id: string;
  used_capacity: number;
};

type ContractDraftPostType = {
  farm?: string | number | undefined;
  sections_data?: Array<Section>;
};

type OtpType = {
  phone_number: string | string[] | undefined;
  national_id: string | string[] | undefined;
  is_legal: boolean;
};

type LoginType = {
  phone_number: string | string[] | undefined;
  otp: string | number | undefined;
};

type InitialContractType = {
  id?: string | number | undefined;
  use_insurance?: boolean | undefined;
};

type PostContractDraftRequest = {
  data: ContractDraftPostType;
};

type PostOtpRequest = {
  data: OtpType;
};

type PostLoginRequest = {
  data: LoginType;
};

type PostContractContradictRequest = {
  id: string | number;
};

type PatchInitialContractRequest = {
  data: InitialContractType;
};

type FinalContractType = {
  id?: string | number | undefined;
};

type PatchFinalContractRequest = {
  data: FinalContractType;
};

type GetEstimationsRequest = {
  id?: string;
};

type EstimationSection = {
  id: string | number | undefined;
  section: {
    id: string | number | undefined;
    jahad_name: string | undefined;
    product: {
      id: string | number | undefined;
      name: string | undefined;
      fee: number | undefined;
    };
    max_capacity: string | number | undefined;
    min_capacity: string | number | undefined;
  };
  cultivation_area: string | number | undefined;
  production_estimation: string | number | undefined;
  unit_price: string | number | undefined;
  total_price: string | number | undefined;
};

type GetUserInfoResponse = {
  id: string | number;
  user: {
    first_name: string | null | undefined;
    last_name: string | null | undefined;
    full_name: string | null | undefined;
    phone_number: string | null | undefined;
    avatar: string | null;
  };
  is_legal: boolean;
  natural_data: {
    id: string | number;
    national_id: string | number;
    father_name: string | null | undefined;
  };
  legal_data:
    | {
        id: string | number;
        company_id: string | number;
      }
    | undefined;
};

type GetContractPreviewResponse = {
  id: string | number;
  preview: string;
};
