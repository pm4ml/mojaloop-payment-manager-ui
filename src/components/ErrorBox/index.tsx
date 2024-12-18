import React, { FC } from 'react';
import { MessageBox } from '@pm4ml/mojaloop-payment-manager-ui-components-legacy/dist/index';

interface ErrorBoxProps {}
const ErrorBox: FC<ErrorBoxProps> = ({ children }) => (
  <MessageBox kind="danger" icon="warning-sign" size={20} fontSize={14} style={{ margin: 5 }}>
    {children}
  </MessageBox>
);
export default ErrorBox;
