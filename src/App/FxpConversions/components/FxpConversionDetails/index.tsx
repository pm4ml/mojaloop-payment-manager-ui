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
import { FxpConversionPartyDetailsModal } from './PartyDetailsModal';
import * as actions from '../../actions';
import * as selectors from '../../selectors';
import { FxpConversionDetails } from '../../types';

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
  const showFxpConversionPrepare = (aModel: any) => {
    setRequestModel(aModel);
    setRequestModalTitle('FxpConversion Prepare');
    setIsRequestDetailsVisible(!isRequestDetailsVisible);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showFxpConversionFulfil = (aModel: any) => {
    setRequestModel(aModel);
    setRequestModalTitle('FxpConversion Fulfil');
    setIsRequestDetailsVisible(!isRequestDetailsVisible);
  };

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
  const showFxFxpConversionPrepare = (aModel: any) => {
    setRequestModel(aModel);
    setRequestModalTitle('Fx FxpConversion Prepare');
    setIsRequestDetailsVisible(!isRequestDetailsVisible);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showFxFxpConversionFulfil = (aModel: any) => {
    setRequestModel(aModel);
    setRequestModalTitle('Fx FxpConversion Fulfil');
    setIsRequestDetailsVisible(!isRequestDetailsVisible);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showConversionError = (aModel: any) => {
    setRequestModel(aModel);
    setRequestModalTitle('Conversion Error');
    setIsRequestDetailsVisible(!isRequestDetailsVisible);
  };

  // let conversionStateInput = (
  //   <FormInput
  //     disabled={true}
  //     label="FxpConversion State"
  //     value={model.FxpTechnicalDetails.conversionState}
  //   />
  // );

  // if (model.FxpTechnicalDetails.lastError) {
  //   conversionStateInput = (
  //     <div className="forminput__row">
  //       <div className="forminput-input">
  //         {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
  //         <label>Conversion State</label>
  //         <TextField
  //           disabled={false}
  //           label="FxpConversion State"
  //           value={model.FxpTechnicalDetails.conversionState}
  //           onButtonClick={() => showFxpConversionError(model.FxpTechnicalDetails.lastError)}
  //           buttonText="View Error"
  //           buttonKind="secondary"
  //         />
  //       </div>
  //     </div>
  //   );
  // }

  // let conversionStateInput = (
  //   <FormInput
  //     disabled={true}
  //     label="Conversion State"
  //     value={model.FxpTechnicalDetails.conversionState}
  //   />
  // );

  // if (model.FxpTechnicalDetails.lastError) {
  //   conversionStateInput = (
  //     <div className="forminput__row">
  //       <div className="forminput-input">
  //         <label>Conversion State</label>
  //         <TextField
  //           disabled={false}
  //           label="Conversion State"
  //           value={model.FxpTechnicalDetails.conversionState}
  //           onButtonClick={() => showConversionError(model.FxpTechnicalDetails.lastError)}
  //           buttonText="View Error"
  //           buttonKind="secondary"
  //         />
  //       </div>
  //     </div>
  //   );
  // }

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
              <div style={{ flex: '0 0 24%', marginRight: '5px', maxWidth: '25%' }}>
                <FormInput
                  disabled={true}
                  label="FxpConversion ID"
                  type="text"
                  value={model.determiningFxpConversionId}
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                />
              </div>
              <div style={{ flex: '0 0 24%', marginRight: '5px', maxWidth: '25%' }}>
                <FormInput
                  disabled={true}
                  label="Conversion ID"
                  type="text"
                  value={model.conversionId}
                />
              </div>
              <div style={{ flex: '0 0 24%', marginRight: '5px', maxWidth: '25%' }}>
                <FormInput
                  disabled={true}
                  label="Conversion State"
                  type="text"
                  value={model.conversionState}
                />
              </div>
            </Row>

            <Row align="flex-start" style={{ marginTop: '5px' }}>
              <div style={{ flex: '0 0 24%', marginRight: '5px', maxWidth: '25%' }}>
                <FormInput
                  disabled={true}
                  label="Source Amount"
                  type="text"
                  value={model.sourceAmount}
                />
              </div>
              <div style={{ flex: '0 0 24%', marginRight: '5px', maxWidth: '25%' }}>
                <FormInput
                  disabled={true}
                  label="Source Currency"
                  type="text"
                  value={model.sourceCurrency}
                />
              </div>
            </Row>
            <Row align="flex-start" style={{ marginTop: '5px' }}>
              <div style={{ flex: '0 0 24%', marginRight: '5px', maxWidth: '25%' }}>
                <FormInput
                  disabled={true}
                  label="Target Amount"
                  type="text"
                  value={model.targetAmount}
                />
              </div>
              <div style={{ flex: '0 0 24%', marginRight: '5px', maxWidth: '25%' }}>
                <FormInput
                  disabled={true}
                  label="Target Currency"
                  type="text"
                  value={model.sendCurrency}
                />
              </div>
              <div style={{ flex: '0 0 24%', marginRight: '5px', maxWidth: '25%' }}>
                <FormInput
                  disabled={true}
                  label="Conversion Submitted"
                  type="text"
                  value={model.conversionAcceptedDate}
                />
              </div>
              <div style={{ flex: '0 0 24%', marginRight: '5px', maxWidth: '25%' }}>
                <FormInput
                  disabled={true}
                  label="Conversion Settlement Batch"
                  type="text"
                  value={model.conversionSettlementBatch}
                />
              </div>
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
                  value={model.dfspInstitution}
                />
              </div>
              <div style={{ flex: '0 0 24%', marginRight: '5px', maxWidth: '25%' }}>
                <FormInput
                  disabled={true}
                  label="Conversion State"
                  type="text"
                  // value={model.FxpTechnicalDetails.conversionState}
                />
              </div>
            </Row>
          </TabPanel>
          <TabPanel>
            <Row align="flex-start" style={{ marginTop: '5px' }}>
              <div style={{ flex: '0 0 24%', marginRight: '5px', maxWidth: '20%' }}>
                <FormInput
                  disabled={true}
                  label="FxpConversion ID"
                  type="text"
                  // value={model.FxpConversionTerms.determiningFxpConversionId}
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
                  // value={model.FxpConversionTerms.conversionState}
                />
              </div>
              <div style={{ flex: '0 0 12%', marginRight: '0', maxWidth: '15%' }}>
                <FormInput
                  disabled={true}
                  label="Quote Amount"
                  type="text"
                  // value={model.FxpConversionTerms.quoteAmount}
                />
              </div>
              <div style={{ flex: '0 0 1%', marginRight: '5px', maxWidth: '10%' }}>
                <FormInput
                  disabled={true}
                  label=" "
                  type="text"
                  // value={model.FxpConversionTerms.quoteAmount}
                />
              </div>
              <div style={{ flex: '0 0 20%', marginRight: '5px', maxWidth: '20%' }}>
                <FormInput
                  disabled={true}
                  label="Quote Amount Type"
                  type="text"
                  // value={model.FxpConversionTerms.quoteAmountType}
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
                    FxpConversion Amount
                  </label>
                  <div style={{ marginRight: '5px', minWidth: '15%' }}>
                    <FormInput
                      disabled={true}
                      type="text"
                      // value={model.FxpConversionTerms.fxpConversionAmount}
                    />
                  </div>
                  <div style={{ marginRight: '5px', minWidth: '15%' }}>
                    <FormInput
                      disabled={true}
                      type="text"
                      // value={model.fxpConversionTerms.conversionTerms.fxpConversionAmount.currency}
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
                      // value={model.FxpConversionTerms.totalSourceCharges.amount}
                    />
                  </div>
                  <div style={{ marginRight: '5px', minWidth: '15%' }}>
                    <FormInput
                      disabled={true}
                      type="text"
                      // value={model.FxpConversionTerms.totalSourceCharges.currency}
                      value={model.conversionId}
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
                      // value={model.FxpConversionTerms.totalTargetCharges.amount}
                    />
                  </div>
                  <div style={{ marginRight: '5px', minWidth: '15%' }}>
                    <FormInput
                      disabled={true}
                      type="text"
                      // value={model.FxpConversionTerms.totalTargetCharges.currency}
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
                      // value={model.FxpConversionTerms.exchangeRate}
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
                      // value={model.FxpConversionTerms.expiryDateTime}
                    />
                  </div>
                </Row>
              </div>
            </Row>
          </TabPanel>
          <TabPanel>
            <Row align="flex-start stretch">
              <div style={{ flex: '0 0 50%', marginRight: '10px' }}>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  <FormInput
                    disabled={true}
                    label="FxpConversion ID"
                    // value={model.FxpTechnicalDetails.determiningFxpConversionId}
                  />
                </Row>

                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  <FormInput
                    id="fxpConversion-details-modal__conversion-id"
                    disabled={true}
                    label="Conversion ID"
                    // value={model.FxpTechnicalDetails.conversionId}
                  />
                </Row>
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <FormInput
                    id="fxpConversion-details-modal__home-fxpConversion-id"
                    disabled={true}
                    label="Conversion Quote ID"
                    // value={model.FxpTechnicalDetails.conversionQuoteId}
                    style={{ flex: 1 }}
                  />
                </div>

                {/* Conversion State */}
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  {/* {conversionStateInput} */}
                </Row>
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
                          // model.FxpTechnicalDetails.fxQuoteRequest &&
                          // model.FxpTechnicalDetails.fxQuoteRequest.body
                          model.conversionId
                        )
                      }
                      tooltip={
                        !(
                          // model.FxpTechnicalDetails.fxQuoteRequest &&
                          // model.FxpTechnicalDetails.fxQuoteRequest.body
                          model.conversionId
                        ) &&
                        'This option is only available when an Fx POST /quote request can be found for the fxpConversion'
                      }
                      noFill={true}
                      label={
                        <span>
                          <span> FX Quote Request</span>
                        </span>
                      }
                      onClick={() => showFxQuoteRequest(model.conversionId/*model.FxpTechnicalDetails.fxQuoteRequest)*/)}
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
                          // model.FxpTechnicalDetails.fxQuoteResponse &&
                          // model.FxpTechnicalDetails.fxQuoteResponse
                          model.conversionId
                        )
                      }
                      tooltip={
                        !(
                          // model.FxpTechnicalDetails.fxQuoteResponse &&
                          // model.FxpTechnicalDetails.fxQuoteResponse
                          model.conversionId
                        ) &&
                        'This option is only available when an fx POST /fxquote response can be found for the fxpConversion'
                      }
                      noFill={true}
                      label={
                        <span>
                          <span> FX Quote Response</span>
                        </span>
                      }
                      onClick={() => showFxQuoteResponse(model.conversionId/*model.FxpTechnicalDetails.fxQuoteResponse*/)}
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
                          // model.FxpTechnicalDetails.fxFxpConversionPrepare &&
                          // model.FxpTechnicalDetails.fxFxpConversionPrepare.body
                          model.conversionId
                        )
                      }
                      tooltip={
                        !(
                          // model.FxpTechnicalDetails.fxFxpConversionPrepare &&
                          // model.FxpTechnicalDetails.fxFxpConversionPrepare.body
                          model.conversionId
                        ) &&
                        'This option is only available when an fx POST /fxpConversions prepare can be found for the fxpConversion'
                      }
                      noFill={true}
                      label={
                        <span>
                          <span> FX FxpConversion Prepare</span>
                        </span>
                      }
                      onClick={() =>
                        showFxFxpConversionPrepare(model.conversionId/*model.FxpTechnicalDetails.fxFxpConversionPrepare*/)
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
                          // model.FxpTechnicalDetails.fxFxpConversionFulfil &&
                          // model.FxpTechnicalDetails.fxFxpConversionFulfil
                          model.conversionId
                        )
                      }
                      tooltip={
                        !(
                          // model.FxpTechnicalDetails.fxFxpConversionFulfil &&
                          // model.FxpTechnicalDetails.fxFxpConversionFulfil
                          model.conversionId
                        ) &&
                        'This option is only available when a POST /fxpConversions fulfilment can be found for the fxpConversion'
                      }
                      noFill={true}
                      label={
                        <span>
                          <span> FX FxpConversion Fulfil</span>
                        </span>
                      }
                      onClick={() =>
                        showFxFxpConversionFulfil(model.conversionId/*model.FxpTechnicalDetails.fxFxpConversionFulfil*/)
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
        <FxpConversionRequestDetailsModal
          model={requestModel}
          title={requestModalTitle}
          onCloseClick={() => {
            setIsRequestDetailsVisible(!isRequestDetailsVisible);
          }}
        />
      )}
      {isRequestPartyDetailsVisible && (
        <FxpConversionPartyDetailsModal
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

export default connect(stateProps, dispatchProps)(FxpConversionDetailsModal);
