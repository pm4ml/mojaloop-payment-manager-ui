import {
  createValidation,
  vd,
} from '@pm4ml/mojaloop-payment-manager-ui-components/dist/redux-validation';

const getDfspConfigValidation = () => ({
  id: createValidation([vd.isRequired]),
  name: createValidation([vd.isRequired]),
});

export { getDfspConfigValidation };
