import { ServiceResponseStatus } from '../Interfaces/service/ServiceResponse';

const httpCodesMap: { [K in ServiceResponseStatus]: number } = {
  successful: 200,
  serverError: 500,
};

export default httpCodesMap;
