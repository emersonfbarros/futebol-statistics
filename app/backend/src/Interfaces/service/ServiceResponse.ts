type ServiceMessage = { message: string };

export type ServiceResponseStatus = 'successful' | 'serverError';

export type ServiceResponse<T> = {
  status: ServiceResponseStatus;
  data: T | ServiceMessage;
};
