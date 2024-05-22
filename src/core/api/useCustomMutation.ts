import {
  MutationFunction,
  MutationOptions,
  useMutation,
} from "@tanstack/react-query";

export const useCustomMutation = <
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown
>(
  mutationFn: MutationFunction<TData, TVariables>,
  options?: MutationOptions<TData, TError, TVariables, TContext>
) => {
  return useMutation<TData, TError, TVariables, TContext>(mutationFn, options);
};
