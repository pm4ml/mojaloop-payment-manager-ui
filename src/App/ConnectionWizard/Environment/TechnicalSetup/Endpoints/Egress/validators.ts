import {
  createValidation,
  vd,
} from '@pm4ml/mojaloop-payment-manager-ui-components-legacy/dist/redux-validation';
import { portValidator, IPAddressValidator } from '../validators';

const getEgressPortValidation = () => createValidation([vd.isRequired, portValidator]);
const getEgressAddressValidation = () => createValidation([vd.isRequired, IPAddressValidator]);

export { getEgressAddressValidation, getEgressPortValidation };
