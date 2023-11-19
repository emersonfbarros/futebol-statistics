import { ServiceResponseStatus } from '../types/ServiceResponse';

export default class Defaults {
  static getHttpCode(status: ServiceResponseStatus): number {
    switch (status) {
      case 'SUCCESSFUL':
        return 200;
      case 'CREATED':
        return 201;
      case 'SERVER_ERROR':
        return 500;
      case 'NOT_FOUND':
        return 404;
      case 'UNAUTHORIZED':
        return 401;
      case 'BAD_REQ':
        return 400;
      case 'UNPROCESSABLE':
        return 422;
      default:
        throw new Error(`Invalid status: ${status}`);
    }
  }
}
