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
import { FxpConversionRequestDetailsModal } from './RequestDetailModal';
import * as actions from '../../actions';
import * as selectors from '../../selectors';
import { FxpConversionDetails } from '../../types';
import { trim } from 'lodash';

const stateProps = (state: State) => ({
  model: selectors.getFxpConversionDetails(state),
  fxpConversionDetailsError: selectors.getFxpConversionDetailsError(state),
  isFxpConversionDetailsPending: selectors.getIsFxpConversionDetailsPending(state),
});

const dispatchProps = (dispatch: Dispatch) => ({
  onModalCloseClick: () => dispatch(actions.toggleFxpConversionDetailsModal()),
});

interface FxpConversionDetailsModalProps {
  model?: FxpConversionDetails;
  fxpConversionDetailsError: string | null;
  isFxpConversionDetailsPending: boolean;
  onModalCloseClick: () => void;
}

const FxpConversionDetailsModal: FC<FxpConversionDetailsModalProps> = ({
  model,
  fxpConversionDetailsError,
  isFxpConversionDetailsPending,
  onModalCloseClick,
}) => {
  let content = null;

  if (fxpConversionDetailsError || !model) {
    content = <ErrorBox>FxpConversion: Unable to load fxpConversion details</ErrorBox>;
  } else if (isFxpConversionDetailsPending) {
    content = (
      <div className="fxpConversions__fxpConversions__loader">
        <Spinner size={20} />
      </div>
    );
  } else if (model) {
    content = (
      <div className="fxpConversions__fxpConversion__details">
        <FxpConversionDetailsView model={model} />
      </div>
    );
  }

  return (
    <Modal
      id="ConversionDetails"
      title="Conversion Details"
      width="1000px"
      onClose={onModalCloseClick}
      isSubmitEnabled={false}
    >
      {content}
    </Modal>
  );
};

interface FxpConversionDetailsProps {
  model: FxpConversionDetails;
}

const FxpConversionDetailsView: FC<FxpConversionDetailsProps> = ({ model }) => {
  const [isRequestDetailsVisible, setIsRequestDetailsVisible] = useState(false);
  const [requestModel, setRequestModel] = useState(null);
  const [requestModalTitle, setRequestModalTitle] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showFxpConversionError = (aModel: any) => {
    setRequestModel(aModel);
    setRequestModalTitle('FxpConversion Error');
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

  let conversionStateInput = (
    <FormInput
      disabled={true}
      label="Conversion State"
      value={model.technicalDetails.conversionState}
    />
  );

  if (model.technicalDetails.lastError) {
    conversionStateInput = (
      <div className="forminput__row">
        <div className="forminput-input">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label>Conversion State</label>
          <TextField
            disabled={false}
            label="Conversion State"
            value={model.technicalDetails.conversionState}
            onButtonClick={() => showFxpConversionError(model.technicalDetails.lastError)}
            buttonText="View Error"
            buttonKind="secondary"
          />
        </div>
      </div>
    );
  }

  const [isCopiedConversionRequestId, setIsCopiedConversionRequestId] = useState(false);
  const [isCopiedDeterminingTransferId, setIsCopiedDeterminingTransferId] = useState(false);
  const [isCopiedCommittedRequestId, setIsCopiedCommittedRequestId] = useState(false);
  const [isCopiedConversionId, setIsCopiedConversionId] = useState(false);

  // Functions to copy the Ids to the clipboard
  const copyDeterminingTransferId = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopiedDeterminingTransferId(true);
    setTimeout(() => setIsCopiedDeterminingTransferId(false), 2000);
  };

  const copyConversionRequestId = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopiedConversionRequestId(true);
    setTimeout(() => setIsCopiedConversionRequestId(false), 2000);
  };

  const copyCommittedRequestId = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopiedCommittedRequestId(true);
    setTimeout(() => setIsCopiedCommittedRequestId(false), 2000);
  };

  const copyConversionId = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopiedConversionId(true);
    setTimeout(() => setIsCopiedConversionId(false), 2000);
  };

  const trim = (id: string) => {
    const maxLength = 21;
    if (id.length > maxLength) {
      return id.substring(0, maxLength) + '...';
    }
    return id;
  };

  return (
    <div>
      <Tabs>
        <TabList>
          <Tab>Conversion Details</Tab>
          <Tab>Conversion Terms</Tab>
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
                  label="Determining Transfer ID"
                  type="text"
                  readOnly={true}
                  value={trim(model.conversionDetails.determiningTransferId)}
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
                  onClick={() =>
                    copyDeterminingTransferId(model.conversionDetails.determiningTransferId)
                  }
                >
                  {isCopiedDeterminingTransferId ? (
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
                style={{
                  flex: '0 0 24%',
                  marginRight: '5px',
                  maxWidth: '25%',
                  position: 'relative',
                }}
              >
                <FormInput
                  disabled={true}
                  label="Conversion ID"
                  type="text"
                  value={trim(model.conversionTerms.conversionId)}
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
                  onClick={() => copyConversionId(model.conversionTerms.conversionId)}
                >
                  {isCopiedConversionId ? (
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
                  label="Conversion State"
                  type="text"
                  value={model.conversionDetails.conversionState}
                />
              </div>

              {/* needs proper mapping for commited request Id */}
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
                  label="Committed Request ID"
                  type="text"
                  value={trim(model.technicalDetails.conversionRequestId)}
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
                  onClick={() =>
                    copyConversionRequestId(model.conversionDetails.conversionRequestId)
                  }
                >
                  {isCopiedConversionRequestId ? (
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
              <div style={{ flex: '0 0 24%', marginRight: '5px', maxWidth: '25%' }}>
                <FormInput
                  disabled={true}
                  label="Source Amount"
                  type="text"
                  value={model.conversionDetails.sourceAmount.amount}
                />
              </div>
              <div style={{ flex: '0 0 24%', marginRight: '5px', maxWidth: '25%' }}>
                <FormInput
                  disabled={true}
                  label="Source Currency"
                  type="text"
                  value={model.conversionDetails.sourceAmount.currency}
                />
              </div>
            </Row>
            <Row align="flex-start" style={{ marginTop: '5px' }}>
              <div style={{ flex: '0 0 24%', marginRight: '5px', maxWidth: '25%' }}>
                <FormInput
                  disabled={true}
                  label="Target Amount"
                  type="text"
                  value={model.conversionDetails.targetAmount.amount}
                />
              </div>
              <div style={{ flex: '0 0 24%', marginRight: '5px', maxWidth: '25%' }}>
                <FormInput
                  disabled={true}
                  label="Target Currency"
                  type="text"
                  value={model.conversionDetails.targetAmount.currency}
                />
              </div>
              <div style={{ flex: '0 0 24%', marginRight: '5px', maxWidth: '25%' }}>
                <FormInput
                  disabled={true}
                  label="Conversion Submitted"
                  type="text"
                  value={model.conversionDetails.conversionAcceptedDate}
                />
              </div>
              {/* <div style={{ flex: '0 0 24%', marginRight: '5px', maxWidth: '25%' }}>
                <FormInput
                  disabled={true}
                  label="Transfer Settlement Batch"
                  type="text"
                  value={model.conversionDetails.conversionSettlementBatch}
                />
              </div> */}
            </Row>
            <Row align="flex-start" style={{ marginTop: '5px' }}>
              <div style={{ flex: '0 0 24%', marginRight: '5px', maxWidth: '25%' }}>
                <FormInput
                  disabled={true}
                  label="Conversion Type"
                  type="text"
                  value="Payer DFSP Conversion"
                />
              </div>
              <div style={{ flex: '0 0 24%', marginRight: '5px', maxWidth: '25%' }}>
                <FormInput
                  disabled={true}
                  label="Conversion Institution"
                  type="text"
                  value={model.conversionDetails.dfspInstitution}
                />
              </div>
            </Row>
          </TabPanel>
          <TabPanel>
            <Row align="flex-start" style={{ marginTop: '5px' }}>
              <div style={{ flex: '0 0 24%', marginRight: '5px', maxWidth: '20%' }}>
                <FormInput
                  disabled={true}
                  label="Determining Transfer ID"
                  type="text"
                  value={trim(model.conversionTerms.determiningTransferId)}
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                />
              </div>
              <div style={{ flex: '0 0 24%', marginRight: '5px', maxWidth: '20%' }}>
                <FormInput
                  disabled={true}
                  label="Conversion State"
                  type="text"
                  value={model.conversionTerms.conversionState}
                />
              </div>
              <div style={{ flex: '0 0 12%', marginRight: '0', maxWidth: '15%' }}>
                <FormInput
                  disabled={true}
                  label="Quote Amount"
                  type="text"
                  value={model.conversionTerms.quoteAmount.amount}
                />
              </div>
              <div style={{ flex: '0 0 12%', marginRight: '5px', maxWidth: '10%' }}>
                <FormInput
                  disabled={true}
                  label=" "
                  type="text"
                  value={model.conversionTerms.quoteAmount.currency}
                />
              </div>
              <div style={{ flex: '0 0 20%', marginRight: '5px', maxWidth: '20%' }}>
                <FormInput
                  disabled={true}
                  label="Quote Amount Type"
                  type="text"
                  value={model.conversionTerms.quoteAmountType}
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
                      value={
                        model.conversionTerms.conversionTerms.transferAmount.sourceAmount.amount
                      }
                    />
                  </div>
                  <div style={{ marginRight: '5px', minWidth: '15%' }}>
                    <FormInput
                      disabled={true}
                      type="text"
                      value={
                        model.conversionTerms.conversionTerms.transferAmount.sourceAmount.currency
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
                      value={
                        model.conversionTerms.conversionTerms.transferAmount.targetAmount.amount
                      }
                    />
                  </div>
                  <div style={{ marginRight: '5px', minWidth: '15%' }}>
                    <FormInput
                      disabled={true}
                      type="text"
                      value={
                        model.conversionTerms.conversionTerms.transferAmount.targetAmount.currency
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
                        model.conversionTerms.conversionTerms.charges.totalSourceCurrencyCharges
                          .amount
                      }
                    />
                  </div>
                  <div style={{ marginRight: '5px', minWidth: '15%' }}>
                    <FormInput
                      disabled={true}
                      type="text"
                      value={
                        model.conversionTerms.conversionTerms.charges.totalSourceCurrencyCharges
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
                        model.conversionTerms.conversionTerms.charges?.totalTargetCurrencyCharges
                          .amount
                      }
                    />
                  </div>
                  <div style={{ marginRight: '5px', minWidth: '15%' }}>
                    <FormInput
                      disabled={true}
                      type="text"
                      value={
                        model.conversionTerms.conversionTerms.charges?.totalTargetCurrencyCharges
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
                      value={model.conversionTerms.conversionTerms.exchangeRate}
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
                      value={model.conversionTerms.conversionTerms.expiryDate}
                    />
                  </div>
                </Row>
              </div>
            </Row>
          </TabPanel>
          <TabPanel>
            <Row align="flex-start stretch">
              <div style={{ flex: '0 0 50%', marginRight: '10px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    position: 'relative',
                  }}
                >
                  <Row align="flex-start" style={{ marginTop: '5px' }}>
                    <FormInput
                      disabled={true}
                      label="Determining Transfer ID"
                      value={model.technicalDetails.determiningTransferId}
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
                      onClick={() =>
                        copyDeterminingTransferId(model.technicalDetails.determiningTransferId)
                      }
                    >
                      {isCopiedDeterminingTransferId ? (
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

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    position: 'relative',
                  }}
                >
                  <Row align="flex-start" style={{ marginTop: '5px' }}>
                    <FormInput
                      id="fxpConversion-details-modal__conversion-id"
                      disabled={true}
                      label="Conversion ID"
                      value={model.technicalDetails.conversionId}
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
                      onClick={() => copyConversionId(model.technicalDetails.conversionId)}
                    >
                      {isCopiedConversionId ? (
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

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    position: 'relative',
                  }}
                >
                  <FormInput
                    id="fxpConversion-details-modal__home-fxpConversion-request-id"
                    disabled={true}
                    label="Conversion Request ID"
                    value={model.technicalDetails.conversionRequestId}
                    style={{ flex: 1 }}
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
                    onClick={() =>
                      copyConversionRequestId(model.technicalDetails.conversionRequestId)
                    }
                  >
                    {isCopiedConversionRequestId ? (
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

                {/* Conversion State */}
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  {conversionStateInput}
                </Row>

                {/* Commited REquest Id needs proper mapping */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    position: 'relative',
                  }}
                >
                  <FormInput
                    id="transfer-details-modal__home-transfer-id"
                    disabled={true}
                    label="Commited Request ID"
                    value={model ? 'CommitedId' : ''}
                    style={{ flex: 1 }}
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
                    onClick={() => (model ? 'CommitedId' : '')}
                  >
                    {isCopiedCommittedRequestId ? (
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
              </div>
              <div style={{ alignItems: 'flex-start', flex: '0 0 50%', marginRight: '5px' }}>
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
                          model.technicalDetails.fxQuoteRequest &&
                          model.technicalDetails.fxQuoteRequest.headers &&
                          model.technicalDetails.fxQuoteRequest.body
                        )
                      }
                      tooltip={
                        !(
                          model.technicalDetails.fxQuoteRequest &&
                          model.technicalDetails.fxQuoteRequest.headers &&
                          model.technicalDetails.fxQuoteRequest.body
                        ) &&
                        'This option is only available when an Fx POST /quote request can be found for the fxpConversion'
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
                          model.technicalDetails.fxQuoteResponse.headers &&
                          model.technicalDetails.fxQuoteResponse.body
                        )
                      }
                      tooltip={
                        !(
                          model.technicalDetails.fxQuoteResponse &&
                          model.technicalDetails.fxQuoteResponse.headers &&
                          model.technicalDetails.fxQuoteResponse.body
                        ) &&
                        'This option is only available when an fx POST /fxquote response can be found for the fxpConversion'
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
                          model.technicalDetails.fxTransferPrepare.headers &&
                          model.technicalDetails.fxTransferPrepare.body
                        )
                      }
                      tooltip={
                        !(
                          model.technicalDetails.fxTransferPrepare &&
                          model.technicalDetails.fxTransferPrepare.headers &&
                          model.technicalDetails.fxTransferPrepare.body
                        ) &&
                        'This option is only available when an fx POST /fxpConversions prepare can be found for the fxpConversion'
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
                      disabled={!model.technicalDetails.fxTransferFulfil}
                      tooltip={
                        !model.technicalDetails.fxTransferFulfil &&
                        'This option is only available when a POST /fxpConversions fulfilment can be found for the fxpConversion'
                      }
                      noFill={true}
                      label={
                        <span>
                          <span> FX Transfer Fulfil</span>
                        </span>
                      }
                      onClick={() => showFxTransferFulfil(model.technicalDetails.fxTransferFulfil)}
                    />
                  </div>
                </Row>
              </div>
            </Row>
          </TabPanel>
        </TabPanels>
      </Tabs>
      {isRequestDetailsVisible && (
        <FxpConversionRequestDetailsModal
          model={requestModel}
          title={requestModalTitle}
          onCloseClick={() => {
            setIsRequestDetailsVisible(!isRequestDetailsVisible);
          }}
        />
      )}
    </div>
  );
};

export default connect(stateProps, dispatchProps)(FxpConversionDetailsModal);
