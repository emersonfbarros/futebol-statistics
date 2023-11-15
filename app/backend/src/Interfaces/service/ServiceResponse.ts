type ServiceMessage = { message: string };

export type ServiceResponseStatus = 'SUCCESSFUL' | 'SERVER_ERROR';

export type ServiceResponse<T> = {
  status: ServiceResponseStatus;
  data: T | ServiceMessage;
};
