import { ServiceResponseStatus } from '../Interfaces/service/ServiceResponse';

export default class Defaults {
  static getHttpCode(status: ServiceResponseStatus): number {
    switch (status) {
      case 'SUCCESSFUL':
        return 200;
      case 'SERVER_ERROR':
        return 500;
      case 'NOT_FOUND':
        return 404;
      default:
        throw new Error(`Invalid status: ${status}`);
    }
  }
}
