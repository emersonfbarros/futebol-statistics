type ServiceMessage = { message: string };

export type ServiceResponseStatus =
  | 'SUCCESSFUL'
  | 'SERVER_ERROR'
  | 'NOT_FOUND'
  | 'UNAUTHORIZED'
  | 'BAD_REQ';

export type ServiceResponse<T> = {
  status: ServiceResponseStatus;
  data: T | ServiceMessage;
};
