type ServiceMessage = { message: string };

export type ServiceResponseStatus =
  | 'SUCCESSFUL'
  | 'CREATED'
  | 'SERVER_ERROR'
  | 'NOT_FOUND'
  | 'UNAUTHORIZED'
  | 'BAD_REQ'
  | 'UNPROCESSABLE';

export type ServiceResponse<T> = {
  status: ServiceResponseStatus;
  data: T | ServiceMessage;
};
