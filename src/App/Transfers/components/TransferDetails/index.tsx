/* eslint-disable react/jsx-curly-newline */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
import { State, Dispatch } from 'store/types';
import {
  Button,
  ErrorBox,
  Modal,
  FormInput,
  TextField,
  Row,
  Spinner,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from 'components';
import { TransferRequestDetailsModal } from './RequestDetailModal';
import { TransferPartyDetailsModal } from './PartyDetailsModal';
import * as actions from '../../actions';
import * as selectors from '../../selectors';
import { TransferDetails } from '../../types';
import { NONAME } from 'dns';

const stateProps = (state: State) => ({
  model: selectors.getTransferDetails(state),
  transferDetailsError: selectors.getTransferDetailsError(state),
  isTransferDetailsPending: selectors.getIsTransferDetailsPending(state),
});

const dispatchProps = (dispatch: Dispatch) => ({
  onModalCloseClick: () => dispatch(actions.toggleTransferDetailsModal()),
});

interface TransferDetailsModalProps {
  model?: TransferDetails;
  transferDetailsError: string | null;
  isTransferDetailsPending: boolean;
  onModalCloseClick: () => void;
}

const TransferDetailsModal: FC<TransferDetailsModalProps> = ({
  model,
  transferDetailsError,
  isTransferDetailsPending,
  onModalCloseClick,
}) => {
  let content = null;

  if (transferDetailsError || !model) {
    content = <ErrorBox>Transfer: Unable to load transfer details</ErrorBox>;
  } else if (isTransferDetailsPending) {
    content = (
      <div className="transfers__transfers__loader">
        <Spinner size={20} />
      </div>
    );
  } else if (model) {
    content = (
      <div className="transfers__transfer__details">
        <TransferDetailsView model={model} />
      </div>
    );
  }

  return (
    <Modal
      id="transferDetails"
      title="Transfer Details"
      width="1000px"
      onClose={onModalCloseClick}
      isSubmitEnabled={false}
    >
      {content}
    </Modal>
  );
};

interface TransferDetailsProps {
  model: TransferDetails;
}

const TransferDetailsView: FC<TransferDetailsProps> = ({ model }) => {
  const [isRequestDetailsVisible, setIsRequestDetailsVisible] = useState(false);
  const [requestModel, setRequestModel] = useState(null);
  const [requestModalTitle, setRequestModalTitle] = useState('');

  const [isRequestPartyDetailsVisible, setIsRequestPartyDetailsVisible] = useState(false);
  const [partyModel, setPartyModel] = useState(null);
  const [partyModalTitle, setPartyModalTitle] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showPayeeParty = (aModel: any) => {
    setPartyModel(aModel);
    setPartyModalTitle('Payee Party');
    setIsRequestPartyDetailsVisible(!isRequestPartyDetailsVisible);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showPayerParty = (aModel: any) => {
    setPartyModel(aModel);
    setPartyModalTitle('Payer Party');
    setIsRequestPartyDetailsVisible(!isRequestPartyDetailsVisible);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showPartyLookupResponse = (aModel: any) => {
    setRequestModel(aModel);
    setRequestModalTitle('Party Lookup Response');
    setIsRequestDetailsVisible(!isRequestDetailsVisible);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showQuoteRequest = (aModel: any) => {
    setRequestModel(aModel);
    setRequestModalTitle('Quote Request');
    setIsRequestDetailsVisible(!isRequestDetailsVisible);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showQuoteResponse = (aModel: any) => {
    setRequestModel(aModel);
    setRequestModalTitle('Quote Response');
    setIsRequestDetailsVisible(!isRequestDetailsVisible);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showTransferPrepare = (aModel: any) => {
    setRequestModel(aModel);
    setRequestModalTitle('Transfer Prepare');
    setIsRequestDetailsVisible(!isRequestDetailsVisible);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showTransferFulfil = (aModel: any) => {
    setRequestModel(aModel);
    setRequestModalTitle('Transfer Fulfil');
    setIsRequestDetailsVisible(!isRequestDetailsVisible);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showTransferError = (aModel: any) => {
    setRequestModel(aModel);
    setRequestModalTitle('Transfer Error');
    setIsRequestDetailsVisible(!isRequestDetailsVisible);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showFxQuoteRequest = (aModel: any) => {
    setRequestModel(aModel);
    setRequestModalTitle('Fx Quote Request');
    setIsRequestDetailsVisible(!isRequestDetailsVisible);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showFxQuoteResponse = (aModel: any) => {
    setRequestModel(aModel);
    setRequestModalTitle('Fx Quote Response');
    setIsRequestDetailsVisible(!isRequestDetailsVisible);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showFxTransferPrepare = (aModel: any) => {
    setRequestModel(aModel);
    setRequestModalTitle('Fx Transfer Prepare');
    setIsRequestDetailsVisible(!isRequestDetailsVisible);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showFxTransferFulfil = (aModel: any) => {
    setRequestModel(aModel);
    setRequestModalTitle('Fx Transfer Fulfil');
    setIsRequestDetailsVisible(!isRequestDetailsVisible);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showConversionError = (aModel: any) => {
    setRequestModel(aModel);
    setRequestModalTitle('Conversion Error');
    setIsRequestDetailsVisible(!isRequestDetailsVisible);
  };

  let transferStateInput = (
    <FormInput
      disabled={true}
      label="Transfer State"
      value={model.technicalDetails.transferState}
    />
  );

  if (model.technicalDetails.lastError) {
    transferStateInput = (
      <div className="forminput__row">
        <div className="forminput-input">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label>Transfer State</label>
          <TextField
            disabled={false}
            label="Transfer State"
            value={model.technicalDetails.transferState}
            onButtonClick={() => showTransferError(model.technicalDetails.lastError)}
            buttonText="View Error"
            buttonKind="secondary"
          />
        </div>
      </div>
    );
  }

  let conversionStateInput = (
    <div
      style={{
        width: '100%',
        color: model.needFx ? 'initial' : 'rgba(128, 128, 128, 0.5)',
      }}
      title={!model.needFx ? 'This Option is only available when FX conversions are present' : ''}
    >
      <FormInput
        disabled={true}
        label="Conversion State"
        value={model.needFx ? model.technicalDetails.conversionState : ''}
      />
    </div>
  );

  if (model.technicalDetails.lastError) {
    conversionStateInput = (
      <div className="forminput__row">
        <div className="forminput-input">
          <label>Conversion State</label>
          <TextField
            disabled={false}
            label="Conversion State"
            value={model.needFx ? model.technicalDetails.conversionState : ''}
            onButtonClick={() => showConversionError(model.technicalDetails.lastError)}
            buttonText="View Error"
            buttonKind="secondary"
          />
        </div>
      </div>
    );
  }

  const [isCopiedSchemeTransferId, setIsCopiedSchemeTransferId] = useState(false);
  const [isCopiedTransferId, setIsCopiedTransferId] = useState(false);
  const [isCopiedQuoteId, setIsCopiedQuoteId] = useState(false);
  const [isCopiedHomeTId, setIsCopiedHomeTId] = useState(false);
  const [isCopiedConversionRId, setIsCopiedConversionRId] = useState(false);
  const [isCopiedCommitRId, setIsCopiedCommitRId] = useState(false);

  const copySchemeTransferId = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopiedSchemeTransferId(true);
    setTimeout(() => setIsCopiedSchemeTransferId(false), 2000);
  };
  const copyTransferId = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopiedTransferId(true);
    setTimeout(() => setIsCopiedTransferId(false), 2000);
  };
  const copyQuoteId = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopiedQuoteId(true);
    setTimeout(() => setIsCopiedQuoteId(false), 2000);
  };
  const copyHomeTId = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopiedHomeTId(true);
    setTimeout(() => setIsCopiedHomeTId(false), 2000);
  };
  const copyConversionRId = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopiedConversionRId(true);
    setTimeout(() => setIsCopiedConversionRId(false), 2000);
  };
  const copyCommitRId = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopiedCommitRId(true);
    setTimeout(() => setIsCopiedCommitRId(false), 2000);
  };

  const trim = (id: string) => {
    const maxLength = 21;
    if (id.length > maxLength) {
      return id.substring(0, maxLength) + '...';
    }
    return id;
  };

  const trimTt = (id: string) => {
    const maxLength = 15;
    if (id.length > maxLength) {
      return id.substring(0, maxLength) + '...';
    }
    return id;
  };

  return (
    <div>
      <Tabs>
        <TabList>
          <Tab>Transfer Details</Tab>
          <Tab>Transfer Terms</Tab>
          <Tab>Transfer Parties</Tab>
          <Tab>Technical Details</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Row align="flex-start" style={{ marginTop: '5px' }}>
              <div
                style={{
                  flex: '0 0 24%',
                  marginRight: '5px',
                  maxWidth: '25%',
                  position: 'relative',
                }}
              >
                <FormInput
                  disabled={true}
                  label="Transfer ID"
                  type="text"
                  value={trim(model.transferId)}
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  onClick={() => copyTransferId(model.transferId)}
                >
                  {isCopiedTransferId ? (
                    <span style={{ color: '#acacac', fontWeight: 'normal', marginTop: '20px' }}>
                      ✓Copied
                    </span>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="22"
                      viewBox="0 0 24 24"
                      width="22"
                      fill="#acacac"
                      style={{ marginLeft: '8px', marginTop: '16px' }}
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                    </svg>
                  )}
                </span>
              </div>
              <div style={{ flex: '0 0 24%', marginRight: '5px', maxWidth: '25%' }}>
                <FormInput
                  disabled={true}
                  label="Transfer State"
                  type="text"
                  value={model.transferState}
                />
              </div>
              <div style={{ flex: '0 0 24%', marginRight: '5px', maxWidth: '25%' }}>
                <FormInput
                  id="transfer-details-basic-modal__direction"
                  disabled={true}
                  label="Direction"
                  type="text"
                  value={model.direction}
                />
              </div>
              <div style={{ flex: '0 0 24%', marginRight: '5px', maxWidth: '25%' }}>
                <FormInput
                  disabled={true}
                  label="Transaction Type"
                  type="text"
                  value={model.transactionType}
                />
              </div>
            </Row>

            <Row align="flex-start" style={{ marginTop: '5px' }}>
              <div style={{ flex: '0 0 24%', marginRight: '5px', maxWidth: '25%' }}>
                <FormInput
                  disabled={true}
                  label="Send Amount"
                  type="text"
                  value={model.sendAmount}
                />
              </div>
              <div style={{ flex: '0 0 24%', marginRight: '5px', maxWidth: '25%' }}>
                <FormInput
                  disabled={true}
                  label="Send Currency"
                  type="text"
                  value={model.sendCurrency}
                />
              </div>
              <div style={{ flex: '0 0 24%', marginRight: '5px', maxWidth: '25%' }}>
                <FormInput
                  disabled={true}
                  label="Date Submitted"
                  type="text"
                  value={model.dateSubmitted}
                />
              </div>

              {/* <div style={{ flex: '0 0 24%', marginRight: '5px', maxWidth: '25%' }}>
                <FormInput
                  disabled={true}
                  label="Transfer Settlement Batch"
                  type="text"
                  value="N/A"
                />
              </div> */}
            </Row>
            <Row align="flex-start" style={{ marginTop: '5px' }}>
              <div style={{ flex: '0 0 24%', marginRight: '5px', maxWidth: '25%' }}>
                <FormInput
                  disabled={true}
                  label="Receive Amount"
                  type="text"
                  value={model.receiveAmount}
                />
              </div>
              <div style={{ flex: '0 0 24%', marginRight: '5px', maxWidth: '25%' }}>
                <FormInput
                  disabled={true}
                  label="Receive Currency"
                  type="text"
                  value={model.receiveCurrency}
                />
              </div>
              <div
                style={{
                  flex: '0 0 24%',
                  marginRight: '5px',
                  maxWidth: '25%',
                  color: model.needFx ? 'initial' : 'rgba(128, 128, 128, 0.5)',
                }}
                title={
                  !model.needFx
                    ? 'This Option is only available when FX conversions are present'
                    : ''
                }
              >
                <FormInput
                  disabled={true}
                  label="Conversion Submitted"
                  type="text"
                  value={model.needFx ? model.conversionAcceptedDate : ''}
                />
              </div>
            </Row>
            <Row align="flex-start" style={{ marginTop: '5px' }}>
              <div style={{ flex: '0 0 24%', marginRight: '5px', maxWidth: '25%' }}>
                <FormInput
                  disabled={true}
                  label="Sender Details"
                  type="text"
                  value={`${model.senderDetails.idType} ${model.senderDetails.idValue}`}
                />
              </div>
              <div style={{ flex: '0 0 24%', marginRight: '5px', maxWidth: '25%' }}>
                <FormInput
                  id="transfer-details-basic-modal__recipient-details"
                  disabled={true}
                  label="Recipient Details"
                  type="text"
                  value={`${model.recipientDetails.idType} ${model.recipientDetails.idValue}`}
                />
              </div>
              <div style={{ flex: '0 0 24%', marginRight: '5px', maxWidth: '25%' }}>
                <FormInput
                  disabled={true}
                  label="Recipient Currencies"
                  type="text"
                  value={model.recipientCurrencies}
                />
              </div>
              <div style={{ flex: '0 0 24%', marginRight: '5px', maxWidth: '25%' }}>
                <FormInput
                  disabled={true}
                  label="Recipient Institution"
                  type="text"
                  value={model.recipientInstitution}
                />
              </div>
            </Row>
            <Row align="flex-start" style={{ marginTop: '5px' }}>
              <div
                style={{
                  flex: '0 0 24%',
                  marginRight: '5px',
                  maxWidth: '25%',
                  color: model.needFx ? 'initial' : 'rgba(128, 128, 128, 0.5)',
                }}
                title={
                  !model.needFx
                    ? 'This Option is only available when FX conversions are present'
                    : ''
                }
              >
                <FormInput
                  disabled={true}
                  label="Conversion Type"
                  type="text"
                  value={model.needFx ? model.conversionType : ''}
                />
              </div>
              <div
                style={{
                  flex: '0 0 24%',
                  marginRight: '5px',
                  maxWidth: '25%',
                  color: model.needFx ? 'initial' : 'rgba(128, 128, 128, 0.5)',
                }}
                title={
                  !model.needFx
                    ? 'This Option is only available when FX conversions are present'
                    : ''
                }
              >
                <FormInput
                  disabled={true}
                  label="Conversion Institution"
                  type="text"
                  value={model.needFx ? model.conversionInstitution : ''}
                />
              </div>

              <div
                style={{
                  flex: '0 0 24%',
                  marginRight: '5px',
                  maxWidth: '25%',
                  color: model.needFx ? 'initial' : 'rgba(128, 128, 128, 0.5)',
                }}
                title={
                  !model.needFx
                    ? 'This Option is only available when FX conversions are present'
                    : ''
                }
              >
                <FormInput
                  disabled={true}
                  label="Conversion State"
                  type="text"
                  value={model.needFx ? model.technicalDetails.conversionState : ''}
                />
              </div>
            </Row>
          </TabPanel>
          <TabPanel>
            <Row align="flex-start" style={{ marginTop: '5px' }}>
              <div
                style={{
                  flex: '0 0 24%',
                  marginRight: '5px',
                  maxWidth: '20%',
                  position: 'relative',
                }}
              >
                <FormInput
                  disabled={true}
                  label="Transfer ID"
                  type="text"
                  value={trimTt(model.transferTerms.transferId)}
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  onClick={() => copyTransferId(model.transferTerms.transferId)}
                >
                  {isCopiedTransferId ? (
                    <span style={{ color: '#acacac', fontWeight: 'normal', marginTop: '20px' }}>
                      ✓Copied
                    </span>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="22"
                      viewBox="0 0 24 24"
                      width="22"
                      fill="#acacac"
                      style={{ marginLeft: '8px', marginTop: '16px' }}
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                    </svg>
                  )}
                </span>
              </div>

              <div style={{ flex: '0 0 24%', marginRight: '5px', maxWidth: '18%' }}>
                <FormInput
                  disabled={true}
                  label="Transfer State"
                  type="text"
                  value={model.transferState}
                />
              </div>
              <div style={{ flex: '0 0 24%', marginRight: '5px', maxWidth: '18%' }}>
                <FormInput
                  disabled={true}
                  label="Quote Amount"
                  type="text"
                  value={model.transferTerms.quoteAmount.amount}
                />
              </div>
              <div style={{ flex: '0 0 24%', marginRight: '5px', maxWidth: '20%' }}>
                <FormInput
                  disabled={true}
                  label="Quote Currency"
                  type="text"
                  value={model.transferTerms.quoteAmount.currency}
                />
              </div>
              <div style={{ flex: '0 0 24%', marginRight: '5px', maxWidth: '20%' }}>
                <FormInput
                  disabled={true}
                  label="Quote Amount Type"
                  type="text"
                  value={model.transferTerms.quoteAmountType}
                />
              </div>
            </Row>
            <Row align="flex-start stretch">
              <div
                style={{
                  width: '50%',
                  marginRight: '10px',
                  marginTop: '10px',
                  border: '1px solid #ccc',
                  padding: '10px',
                  borderRadius: '5px',
                }}
              >
                <Row align="center" style={{ marginTop: '5px', justifyContent: 'center' }}>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label style={{ padding: '5px' }}>Transfer Terms</label>
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label style={{ padding: '5px', marginRight: '5px', minWidth: '30%' }}>
                    Transfer Amount
                  </label>
                  <div style={{ marginRight: '5px', minWidth: '15%' }}>
                    <FormInput
                      disabled={true}
                      type="text"
                      value={model.transferTerms.transferAmount.amount}
                    />
                  </div>
                  <div style={{ marginRight: '5px', minWidth: '15%' }}>
                    <FormInput
                      disabled={true}
                      type="text"
                      value={model.transferTerms.transferAmount.currency}
                    />
                  </div>
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label style={{ padding: '5px', marginRight: '5px', minWidth: '30%' }}>
                    Payee Receive Amount
                  </label>
                  <div style={{ marginRight: '5px', minWidth: '15%' }}>
                    <FormInput
                      disabled={true}
                      type="text"
                      value={model.transferTerms.payeeReceiveAmount.amount}
                    />
                  </div>
                  <div style={{ marginRight: '5px', minWidth: '15%' }}>
                    <FormInput
                      disabled={true}
                      type="text"
                      value={model.transferTerms.payeeReceiveAmount.currency}
                    />
                  </div>
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label style={{ padding: '5px', marginRight: '5px', minWidth: '30%' }}>
                    Payee DFSP Fee
                  </label>
                  <div style={{ marginRight: '5px', minWidth: '15%' }}>
                    <FormInput
                      disabled={true}
                      type="text"
                      value={model.transferTerms.payeeDfspFee.amount}
                    />
                  </div>
                  <div style={{ marginRight: '5px', minWidth: '15%' }}>
                    <FormInput
                      disabled={true}
                      type="text"
                      value={model.transferTerms.payeeDfspFee.currency}
                    />
                  </div>
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label style={{ padding: '5px', marginRight: '5px', minWidth: '30%' }}>
                    Payee DFSP Commission
                  </label>
                  <div style={{ marginRight: '5px', minWidth: '15%' }}>
                    <FormInput
                      disabled={true}
                      type="text"
                      value={model.transferTerms.payeeDfspCommision.amount}
                    />
                  </div>
                  <div style={{ marginRight: '5px', minWidth: '15%' }}>
                    <FormInput
                      disabled={true}
                      type="text"
                      value={model.transferTerms.payeeDfspCommision.currency}
                    />
                  </div>
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label style={{ padding: '5px', marginRight: '5px', minWidth: '30%' }}>
                    Expiry Date Time
                  </label>
                  <div style={{ marginRight: '5px', minWidth: '60%' }}>
                    <FormInput disabled={true} type="text" value={model.transferTerms.expiryDate} />
                  </div>
                </Row>
              </div>
              <div
                style={{
                  width: '50%',
                  marginRight: '10px',
                  marginTop: '10px',
                  border: '1px solid #ccc',
                  padding: '10px',
                  borderRadius: '5px',
                  opacity: model.needFx ? 1 : 0,
                  borderBlockColor: model.needFx ? '#ccc' : 'gray',
                }}
              >
                <Row align="center" style={{ marginTop: '5px', justifyContent: 'center' }}>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label style={{ paddingTop: '5px', paddingBottom: '5px' }}>
                    Conversion Terms
                  </label>
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label style={{ padding: '5px', marginRight: '5px', minWidth: '30%' }}>
                    Source Amount
                  </label>
                  <div style={{ marginRight: '5px', minWidth: '15%' }}>
                    <FormInput
                      disabled={true}
                      type="text"
                      value={model.transferTerms.conversionTerms.transferAmount.sourceAmount.amount}
                    />
                  </div>
                  <div style={{ marginRight: '5px', minWidth: '15%' }}>
                    <FormInput
                      disabled={true}
                      type="text"
                      value={
                        model.transferTerms.conversionTerms.transferAmount.sourceAmount.currency
                      }
                    />
                  </div>
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label style={{ padding: '5px', marginRight: '5px', minWidth: '30%' }}>
                    Target Amount
                  </label>
                  <div style={{ marginRight: '5px', minWidth: '15%' }}>
                    <FormInput
                      disabled={true}
                      type="text"
                      value={model.transferTerms.conversionTerms.transferAmount.targetAmount.amount}
                    />
                  </div>
                  <div style={{ marginRight: '5px', minWidth: '15%' }}>
                    <FormInput
                      disabled={true}
                      type="text"
                      value={
                        model.transferTerms.conversionTerms.transferAmount.targetAmount.currency
                      }
                    />
                  </div>
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label style={{ padding: '5px', marginRight: '5px', minWidth: '30%' }}>
                    Source Charges
                  </label>
                  <div style={{ marginRight: '5px', minWidth: '15%' }}>
                    <FormInput
                      disabled={true}
                      type="text"
                      value={
                        model.transferTerms.conversionTerms.charges.totalSourceCurrencyCharges
                          .amount
                      }
                    />
                  </div>
                  <div style={{ marginRight: '5px', minWidth: '15%' }}>
                    <FormInput
                      disabled={true}
                      type="text"
                      value={
                        model.transferTerms.conversionTerms.charges.totalSourceCurrencyCharges
                          .currency
                      }
                    />
                  </div>
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label style={{ padding: '5px', marginRight: '5px', minWidth: '30%' }}>
                    Target Charges
                  </label>
                  <div style={{ marginRight: '5px', minWidth: '15%' }}>
                    <FormInput
                      disabled={true}
                      type="text"
                      value={
                        model.transferTerms.conversionTerms.charges.totalTargetCurrencyCharges
                          .amount
                      }
                    />
                  </div>
                  <div style={{ marginRight: '5px', minWidth: '15%' }}>
                    <FormInput
                      disabled={true}
                      type="text"
                      value={
                        model.transferTerms.conversionTerms.charges.totalTargetCurrencyCharges
                          .currency
                      }
                    />
                  </div>
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label style={{ padding: '5px', marginRight: '5px', minWidth: '30%' }}>
                    Exchange Rate
                  </label>
                  <div style={{ marginRight: '0', maxWidth: '30%' }}>
                    <FormInput
                      disabled={true}
                      type="text"
                      value={model.transferTerms.conversionTerms.exchangeRate}
                    />
                  </div>
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label style={{ padding: '5px', marginRight: '5px', minWidth: '30%' }}>
                    Expiry Date Time
                  </label>
                  <div style={{ marginRight: '0', minWidth: '15%' }}>
                    <FormInput
                      disabled={true}
                      type="text"
                      value={model.transferTerms.conversionTerms.expiryDate}
                    />
                  </div>
                </Row>
              </div>
            </Row>
          </TabPanel>
          <TabPanel>
            <Row align="flex-start" style={{ marginTop: '5px' }}>
              <div
                style={{
                  flex: '0 0 20%',
                  marginRight: '5px',
                  maxWidth: '25%',
                  position: 'relative',
                }}
              >
                <FormInput
                  disabled={true}
                  label="Transfer ID"
                  type="text"
                  value={trim(model.transferParties.transferId)}
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  onClick={() => copyTransferId(model.transferParties.transferId)}
                >
                  {isCopiedTransferId ? (
                    <span style={{ color: '#acacac', fontWeight: 'normal', marginTop: '20px' }}>
                      ✓Copied
                    </span>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="22"
                      viewBox="0 0 24 24"
                      width="22"
                      fill="#acacac"
                      style={{ marginLeft: '8px', marginTop: '16px' }}
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                    </svg>
                  )}
                </span>
              </div>
              <div
                style={{ flex: '0 0 20%', marginLeft: '50px', marginRight: '5px', maxWidth: '25%' }}
              >
                <FormInput
                  disabled={true}
                  label="Transfer State"
                  type="text"
                  value={model.transferParties.transferState}
                />
              </div>
              <div style={{ flex: '0 0 20%', marginRight: '5px', maxWidth: '25%' }}>
                <FormInput
                  disabled={true}
                  label="Transfer Type"
                  type="text"
                  value={model.transactionType}
                />
              </div>
            </Row>
            <Row align="flex-start stretch">
              <div
                style={{
                  width: '50%',
                  marginRight: '10px',
                  marginTop: '10px',
                  border: '1px solid #ccc',
                  padding: '10px',
                  borderRadius: '5px',
                }}
              >
                <Row align="center" style={{ marginTop: '5px', justifyContent: 'center' }}>
                  <label style={{ padding: '5px' }}>Payer Details</label>
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  <label style={{ marginRight: '5px', minWidth: '40%' }}>Payee Identifier</label>
                  <div style={{ marginRight: '5px', minWidth: '50%' }}>
                    <FormInput
                      disabled={true}
                      type="text"
                      value={model.transferParties.payerParty.idValue}
                    />
                  </div>
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  <label style={{ marginRight: '5px', minWidth: '40%' }}>
                    Payee Identifier Type
                  </label>
                  <div style={{ marginRight: '5px', minWidth: '50%' }}>
                    <FormInput disabled={true} value={model.transferParties.payerParty.idType} />
                  </div>
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  <label style={{ marginRight: '5px', minWidth: '40%' }}>First Name</label>
                  <div style={{ marginRight: '5px', minWidth: '50%' }}>
                    <FormInput disabled={true} value={model.transferParties.payerParty.firstName} />
                  </div>
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  <label style={{ marginRight: '5px', minWidth: '40%' }}>Middle Name</label>
                  <div style={{ marginRight: '5px', minWidth: '50%' }}>
                    <FormInput
                      id="transfer-details-modal__home-transfer-id"
                      disabled={true}
                      value={model.transferParties.payerParty.middleName}
                    />
                  </div>
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  <label style={{ marginRight: '5px', minWidth: '40%' }}>Last Name</label>
                  <div style={{ marginRight: '5px', minWidth: '50%' }}>
                    <FormInput disabled={true} value={model.transferParties.payerParty.lastName} />
                  </div>
                </Row>
              </div>
              <div
                style={{
                  width: '50%',
                  marginRight: '10px',
                  marginTop: '10px',
                  border: '1px solid #ccc',
                  padding: '10px',
                  borderRadius: '5px',
                }}
              >
                <Row align="center" style={{ marginTop: '5px', justifyContent: 'center' }}>
                  <label style={{ paddingTop: '5px', paddingBottom: '5px' }}>Payee Details</label>
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  <label style={{ marginRight: '5px', minWidth: '40%' }}>Payee Identifier</label>
                  <div style={{ marginRight: '5px', minWidth: '50%' }}>
                    <FormInput
                      disabled={true}
                      type="text"
                      value={model.transferParties.payeeParty.idValue}
                    />
                  </div>
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  <label style={{ marginRight: '5px', minWidth: '40%' }}>
                    Payee Identifier Type
                  </label>
                  <div style={{ marginRight: '5px', minWidth: '50%' }}>
                    <FormInput disabled={true} value={model.transferParties.payeeParty.idType} />
                  </div>
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  <label style={{ marginRight: '5px', minWidth: '40%' }}>First Name</label>
                  <div style={{ marginRight: '5px', minWidth: '50%' }}>
                    <FormInput disabled={true} value={model.transferParties.payeeParty.firstName} />
                  </div>
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  <label style={{ marginRight: '5px', minWidth: '40%' }}>Middle Name</label>
                  <div style={{ marginRight: '5px', minWidth: '50%' }}>
                    <FormInput
                      id="transfer-details-modal__home-transfer-id"
                      disabled={true}
                      value={model.transferParties.payeeParty.middleName}
                    />
                  </div>
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  <label style={{ marginRight: '5px', minWidth: '40%' }}>Last Name</label>
                  <div style={{ marginRight: '5px', minWidth: '50%' }}>
                    <FormInput disabled={true} value={model.transferParties.payeeParty.lastName} />
                  </div>
                </Row>
              </div>
            </Row>
          </TabPanel>
          <TabPanel>
            <Row align="flex-start stretch">
              <div style={{ flex: '0 0 50%', marginRight: '10px' }}>
                <div style={{ width: '100%', position: 'relative' }}>
                  <Row align="flex-start" style={{ marginTop: '5px' }}>
                    <FormInput
                      disabled={true}
                      label="Scheme Transfer ID"
                      value={model.technicalDetails.schemeTransferId}
                      style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      onClick={() => copySchemeTransferId(model.technicalDetails.schemeTransferId)}
                    >
                      {isCopiedSchemeTransferId ? (
                        <span style={{ color: '#acacac', fontWeight: 'normal', marginTop: '20px' }}>
                          ✓Copied
                        </span>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="22"
                          viewBox="0 0 24 24"
                          width="22"
                          fill="#acacac"
                          style={{ marginLeft: '8px', marginTop: '16px' }}
                        >
                          <path d="M0 0h24v24H0z" fill="none" />
                          <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                        </svg>
                      )}
                    </span>
                  </Row>
                </div>

                <div style={{ width: '100%', position: 'relative' }}>
                  <Row align="flex-start" style={{ marginTop: '5px' }}>
                    <FormInput
                      disabled={true}
                      label="Transaction ID"
                      value={model.technicalDetails.transactionId}
                      style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      onClick={() => copyTransferId(model.transferTerms.transferId)}
                    >
                      {isCopiedTransferId ? (
                        <span style={{ color: '#acacac', fontWeight: 'normal', marginTop: '20px' }}>
                          ✓Copied
                        </span>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="22"
                          viewBox="0 0 24 24"
                          width="22"
                          fill="#acacac"
                          style={{ marginLeft: '8px', marginTop: '16px' }}
                        >
                          <path d="M0 0h24v24H0z" fill="none" />
                          <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                        </svg>
                      )}
                    </span>
                  </Row>
                </div>

                <div style={{ width: '100%', position: 'relative' }}>
                  <Row align="flex-start" style={{ marginTop: '5px' }}>
                    <FormInput
                      disabled={true}
                      label="Quote ID"
                      value={model.technicalDetails.quoteId}
                      style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      onClick={() => copyQuoteId(model.technicalDetails.quoteId)}
                    >
                      {isCopiedQuoteId ? (
                        <span style={{ color: '#acacac', fontWeight: 'normal', marginTop: '20px' }}>
                          ✓Copied
                        </span>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="22"
                          viewBox="0 0 24 24"
                          width="22"
                          fill="#acacac"
                          style={{ marginLeft: '8px', marginTop: '16px' }}
                        >
                          <path d="M0 0h24v24H0z" fill="none" />
                          <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                        </svg>
                      )}
                    </span>
                  </Row>
                </div>

                <div style={{ width: '100%', position: 'relative' }}>
                  <Row align="flex-start" style={{ marginTop: '5px' }}>
                    <FormInput
                      id="transfer-details-modal__home-transfer-id"
                      disabled={true}
                      label="Home Transfer ID"
                      value={model.technicalDetails.homeTransferId}
                      style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      onClick={() => copyHomeTId(model.technicalDetails.homeTransferId)}
                    >
                      {isCopiedHomeTId ? (
                        <span style={{ color: '#acacac', fontWeight: 'normal', marginTop: '20px' }}>
                          ✓Copied
                        </span>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="22"
                          viewBox="0 0 24 24"
                          width="22"
                          fill="#acacac"
                          style={{ marginLeft: '8px', marginTop: '16px' }}
                        >
                          <path d="M0 0h24v24H0z" fill="none" />
                          <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                        </svg>
                      )}
                    </span>
                  </Row>
                </div>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  {transferStateInput}
                </Row>

                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  <div
                    style={{
                      width: '100%',
                      position: 'relative',
                      color: model.needFx ? 'initial' : 'rgba(128, 128, 128, 0.5)',
                    }}
                    title={
                      !model.needFx
                        ? 'This Option is only available when FX conversions are present'
                        : ''
                    }
                  >
                    <FormInput
                      id="transfer-details-modal__home-transfer-id"
                      disabled={true}
                      label="Conversion Request ID"
                      value={model.needFx ? model.technicalDetails.conversionQuoteId : ''}
                      style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        cursor: model.needFx ? 'pointer' : 'disabled',
                        display: 'flex',
                        alignItems: 'center',
                        opacity: model.needFx ? 1 : 0,
                      }}
                      onClick={() => {
                        if (model.needFx) {
                          copyConversionRId(model.technicalDetails.conversionQuoteId); // Only execute if needfx is true
                        }
                      }}
                    >
                      {isCopiedConversionRId ? (
                        <span style={{ color: '#acacac', fontWeight: 'normal', marginTop: '20px' }}>
                          ✓Copied
                        </span>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="22"
                          viewBox="0 0 24 24"
                          width="22"
                          fill="#acacac"
                          style={{ marginLeft: '8px', marginTop: '16px' }}
                        >
                          <path d="M0 0h24v24H0z" fill="none" />
                          <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                        </svg>
                      )}
                    </span>
                  </div>
                </Row>

                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  {conversionStateInput}
                </Row>

                <Row style={{ flex: '0 0 50%', marginRight: '10px' }}>
                  <div
                    style={{
                      width: '100%',
                      position: 'relative',
                      color: model.needFx ? 'initial' : 'rgba(128, 128, 128, 0.5)',
                    }}
                    title={
                      !model.needFx
                        ? 'This Option is only available when FX conversions are present'
                        : ''
                    }
                  >
                    <FormInput
                      id="transfer-details-modal__home-transfer-id"
                      disabled={true}
                      label="Commit Request ID"
                      // Commit Id to be replaced with actual mapping
                      value={model.needFx ? model.technicalDetails.commitRequestId : ''}
                      style={{ flex: 1 }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        cursor: model.needFx ? 'pointer' : 'disabled',
                        display: 'flex',
                        alignItems: 'center',
                        opacity: model.needFx ? 1 : 0,
                      }}
                      onClick={() => {
                        if (model.needFx) {
                          copyCommitRId(model.technicalDetails.commitRequestId);
                        }
                      }}
                    >
                      {isCopiedCommitRId ? (
                        <span style={{ color: '#acacac', fontWeight: 'normal', marginTop: '20px' }}>
                          ✓Copied
                        </span>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="22"
                          viewBox="0 0 24 24"
                          width="22"
                          fill="#acacac"
                          style={{ marginLeft: '8px', marginTop: '16px' }}
                        >
                          <path d="M0 0h24v24H0z" fill="none" />
                          <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                        </svg>
                      )}
                    </span>
                  </div>
                </Row>
              </div>
              <div style={{ alignItems: 'flex-start', flex: '0 0 50%', marginRight: '5px' }}>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label style={{ paddingTop: '5px', paddingBottom: '5px' }}>
                    Party Information
                  </label>
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px', marginRight: '5px' }}>
                  <div style={{ flex: '0 0 50%', marginRight: '5px' }}>
                    <Button
                      kind="secondary"
                      style={{ width: '100%' }}
                      noFill={true}
                      label="Payer Information"
                      onClick={() => showPayerParty(model.technicalDetails.payerParty)}
                    />
                  </div>
                  <div style={{ flex: '0 0 50%', paddingRight: '5px', marginRight: '5px' }}>
                    <Button
                      kind="secondary"
                      style={{ width: '100%' }}
                      noFill={true}
                      label="Payee Information"
                      onClick={() => showPayeeParty(model.technicalDetails.payeeParty)}
                    />
                  </div>
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label style={{ paddingTop: '5px', paddingBottom: '5px' }}>
                    View Message Details
                  </label>
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  <div style={{ width: '100%' }}>
                    <Button
                      kind="secondary"
                      style={{ width: '100%' }}
                      disabled={
                        !(
                          model.technicalDetails.getPartiesResponse &&
                          model.technicalDetails.getPartiesResponse.body
                        )
                      }
                      tooltip={
                        !(
                          model.technicalDetails.getPartiesResponse &&
                          model.technicalDetails.getPartiesResponse.body
                        ) &&
                        'This option is only available when a GET /parties response can be found for the transfer'
                      }
                      noFill={true}
                      label="Party Lookup Response"
                      onClick={() => {
                        showPartyLookupResponse(model.technicalDetails.getPartiesResponse);
                      }}
                    />
                  </div>
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  <div style={{ width: '100%' }}>
                    <Button
                      kind="secondary"
                      style={{ width: '100%' }}
                      disabled={
                        !(
                          model.technicalDetails.quoteRequest &&
                          model.technicalDetails.quoteRequest.body
                        )
                      }
                      tooltip={
                        !(
                          model.technicalDetails.quoteRequest &&
                          model.technicalDetails.quoteRequest.body
                        ) &&
                        'This option is only available when a POST /quotes request can be found for the transfer'
                      }
                      noFill={true}
                      label="Quote Request"
                      onClick={() => showQuoteRequest(model.technicalDetails.quoteRequest)}
                    />
                  </div>
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  <div style={{ width: '100%' }}>
                    <Button
                      kind="secondary"
                      style={{ width: '100%' }}
                      disabled={
                        !(
                          model.technicalDetails.quoteResponse &&
                          model.technicalDetails.quoteResponse.body
                        )
                      }
                      tooltip={
                        !(
                          model.technicalDetails.quoteResponse &&
                          model.technicalDetails.quoteResponse.body
                        ) &&
                        'This option is only available when a POST /quotes response can be found for the transfer'
                      }
                      noFill={true}
                      label="Quote Response"
                      onClick={() => showQuoteResponse(model.technicalDetails.quoteResponse)}
                    />
                  </div>
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  <div style={{ width: '100%' }}>
                    <Button
                      kind="secondary"
                      style={{ width: '100%' }}
                      disabled={
                        !(
                          model.technicalDetails.transferPrepare &&
                          model.technicalDetails.transferPrepare.body
                        )
                      }
                      tooltip={
                        !(
                          model.technicalDetails.transferPrepare &&
                          model.technicalDetails.transferPrepare.body
                        ) &&
                        'This option is only available when a POST /transfers response can be found for the transfer'
                      }
                      noFill={true}
                      label="Transfer Prepare"
                      onClick={() => showTransferPrepare(model.technicalDetails.transferPrepare)}
                    />
                  </div>
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  <div style={{ width: '100%' }}>
                    <Button
                      kind="secondary"
                      style={{ width: '100%' }}
                      disabled={
                        !(
                          model.technicalDetails.transferFulfilment &&
                          model.technicalDetails.transferFulfilment.body
                        )
                      }
                      tooltip={
                        !(
                          model.technicalDetails.transferFulfilment &&
                          model.technicalDetails.transferFulfilment.body
                        ) &&
                        'This option is only available when a POST /transfers response can be found for the transfer'
                      }
                      noFill={true}
                      label="Transfer Fulfil"
                      onClick={() => showTransferFulfil(model.technicalDetails.transferFulfilment)}
                    />
                  </div>
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  <div style={{ width: '100%' }}>
                    <Button
                      kind="secondary"
                      style={{ width: '100%' }}
                      disabled={
                        !(
                          model.technicalDetails.fxQuoteRequest &&
                          model.technicalDetails.fxQuoteRequest.body
                        )
                      }
                      tooltip={
                        !(
                          model.technicalDetails.fxQuoteRequest &&
                          model.technicalDetails.fxQuoteRequest.body
                        ) &&
                        'This option is only available when an Fx POST /quote request can be found for the transfer'
                      }
                      noFill={true}
                      label={
                        <span>
                          <span> FX Quote Request</span>
                        </span>
                      }
                      onClick={() => showFxQuoteRequest(model.technicalDetails.fxQuoteRequest)}
                    />
                  </div>
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  <div style={{ width: '100%' }}>
                    <Button
                      kind="secondary"
                      style={{ width: '100%' }}
                      disabled={
                        !(
                          model.technicalDetails.fxQuoteResponse &&
                          model.technicalDetails.fxQuoteResponse
                        )
                      }
                      tooltip={
                        !(
                          model.technicalDetails.fxQuoteResponse &&
                          model.technicalDetails.fxQuoteResponse
                        ) &&
                        'This option is only available when an fx POST /fxquote response can be found for the transfer'
                      }
                      noFill={true}
                      label={
                        <span>
                          <span> FX Quote Response</span>
                        </span>
                      }
                      onClick={() => showFxQuoteResponse(model.technicalDetails.fxQuoteResponse)}
                    />
                  </div>
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  <div style={{ width: '100%' }}>
                    <Button
                      kind="secondary"
                      style={{ width: '100%' }}
                      disabled={
                        !(
                          model.technicalDetails.fxTransferPrepare &&
                          model.technicalDetails.fxTransferPrepare.body
                        )
                      }
                      tooltip={
                        !(
                          model.technicalDetails.fxTransferPrepare &&
                          model.technicalDetails.fxTransferPrepare.body
                        ) &&
                        'This option is only available when an fx POST /transfers prepare can be found for the transfer'
                      }
                      noFill={true}
                      label={
                        <span>
                          <span> FX Transfer Prepare</span>
                        </span>
                      }
                      onClick={() =>
                        showFxTransferPrepare(model.technicalDetails.fxTransferPrepare)
                      }
                    />
                  </div>
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  <div style={{ width: '100%' }}>
                    <Button
                      kind="secondary"
                      style={{ width: '100%' }}
                      disabled={
                        !(
                          model.technicalDetails.fxTransferFulfilment &&
                          model.technicalDetails.fxTransferFulfilment
                        )
                      }
                      tooltip={
                        !(
                          model.technicalDetails.fxTransferFulfilment &&
                          model.technicalDetails.fxTransferFulfilment
                        ) &&
                        'This option is only available when a POST /transfers fulfilment can be found for the transfer'
                      }
                      noFill={true}
                      label={
                        <span>
                          <span> FX Transfer Fulfil</span>
                        </span>
                      }
                      onClick={() =>
                        showFxTransferFulfil(model.technicalDetails.fxTransferFulfilment)
                      }
                    />
                  </div>
                </Row>
              </div>
            </Row>
          </TabPanel>
        </TabPanels>
      </Tabs>
      {isRequestDetailsVisible && (
        <TransferRequestDetailsModal
          model={requestModel}
          title={requestModalTitle}
          onCloseClick={() => {
            setIsRequestDetailsVisible(!isRequestDetailsVisible);
          }}
        />
      )}
      {isRequestPartyDetailsVisible && (
        <TransferPartyDetailsModal
          model={partyModel}
          title={partyModalTitle}
          onCloseClick={() => {
            setIsRequestPartyDetailsVisible(!isRequestPartyDetailsVisible);
          }}
        />
      )}
    </div>
  );
};

export default connect(stateProps, dispatchProps)(TransferDetailsModal);
