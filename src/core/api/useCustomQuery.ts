const generateRandomInteger = (attempt: number) => {
  const responseTimes = [
    { min: 0, max: 5 },
    { min: 5, max: 10 },
    { min: 10, max: 15 },
  ];
  let min;
  let max;
  if (attempt === 1 || attempt === 2 || attempt === 0) {
    min = responseTimes[attempt].min;
    max = responseTimes[attempt].max;
    return Math.floor(min + Math.random() * (max - min + 1)) * 1000;
  } else {
    return 20 * 1000;
  }
};

import { AxiosResponse } from "axios";
import {
  QueryKey,
  QueryFunction,
  UseQueryOptions,
  useQuery,
} from "@tanstack/react-query";

export const useCustomQuery = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  keys: TQueryKey,
  apiFn: QueryFunction<AxiosResponse, TQueryKey>,
  queryOptions?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    "queryKey" | "queryFn"
  >,
  // eslint-disable-next-line id-denylist
  data?: any
  // eslint-disable-next-line max-params
) => {
  return useQuery<TQueryFnData, TError, TData, TQueryKey>(
    keys,
    async () => {
      try {
        const result = await apiFn(data);
        if (result.status / 100 === 2) return result?.data;
      } catch (e) {
        return Promise.reject(e);
      }
    },
    {
      ...queryOptions,
      retry: 3,
      retryDelay: (attemptIndex) => generateRandomInteger(attemptIndex),
    }
  );
};
