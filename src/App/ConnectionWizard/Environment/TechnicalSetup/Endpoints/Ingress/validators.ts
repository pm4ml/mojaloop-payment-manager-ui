import {
  createValidation,
  vd,
} from '@pm4ml/mojaloop-payment-manager-ui-components-legacy/dist/redux-validation';
import { URLValidator, portValidator, IPAddressValidator } from '../validators';

const getIngressUrlValidation = () => createValidation([vd.isRequired, URLValidator]);
const getIngressPortValidation = () => createValidation([vd.isRequired, portValidator]);
const getIngressAddressValidation = () => createValidation([vd.isRequired, IPAddressValidator]);

export { getIngressUrlValidation, getIngressAddressValidation, getIngressPortValidation };
