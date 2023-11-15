import { ServiceResponseStatus } from '../Interfaces/service/ServiceResponse';

export default class Defaults {
  static getHttpCode(status: ServiceResponseStatus): number {
    switch (status) {
      case 'SUCCESSFUL':
        return 200;
      case 'SERVER_ERROR':
        return 500;
      default:
        throw new Error(`Invalid status: ${status}`);
    }
  }
}
