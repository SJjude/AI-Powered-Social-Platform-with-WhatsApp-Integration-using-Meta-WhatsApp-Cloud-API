export type ApiErrorResponse = {
  error: {
    code: string;
    details?: unknown;
    message: string;
  };
};

export type ApiSuccessResponse<TData> = {
  data: TData;
};
