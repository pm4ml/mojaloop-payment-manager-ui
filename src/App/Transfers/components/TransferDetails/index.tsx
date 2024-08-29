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
  let conversionId = 'N/A';

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
  const showFxQuoteRequest = (aModel: any) => {
    setRequestModel(aModel);
    setRequestModalTitle('Fx Quote Request');
    setIsRequestDetailsVisible(!isRequestDetailsVisible);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showQuoteResponse = (aModel: any) => {
    setRequestModel(aModel);
    setRequestModalTitle('Quote Response');
    setIsRequestDetailsVisible(!isRequestDetailsVisible);
  };

   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const showFxQuoteResponse = (aModel: any) => {
    setRequestModel(aModel);
    setRequestModalTitle('Fx Quote Response');
    setIsRequestDetailsVisible(!isRequestDetailsVisible);
  };


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showTransferPrepare = (aModel: any) => {
    setRequestModel(aModel);
    setRequestModalTitle('Transfer Prepare');
    setIsRequestDetailsVisible(!isRequestDetailsVisible);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showFxTransferPrepare = (aModel: any) => {
    setRequestModel(aModel);
    setRequestModalTitle('Fx Transfer Prepare');
    setIsRequestDetailsVisible(!isRequestDetailsVisible);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showTransferFulfil = (aModel: any) => {
    setRequestModel(aModel);
    setRequestModalTitle('Transfer Fulfil');
    setIsRequestDetailsVisible(!isRequestDetailsVisible);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showFxTransferFulfil = (aModel: any) => {
    setRequestModel(aModel);
    setRequestModalTitle('Fx Transfer Fulfil');
    setIsRequestDetailsVisible(!isRequestDetailsVisible);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showTransferError = (aModel: any) => {
    setRequestModel(aModel);
    setRequestModalTitle('Transfer Error');
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
    <FormInput
      disabled={true}
      label="Conversion State"
      //value={model.technicalDetails.conversionState}
      value={model.technicalDetails.fxQuoteResponse?.body}
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
            value={model.technicalDetails.fxQuoteResponse?.body}
            onButtonClick={() => showConversionError(model.technicalDetails.lastError)}
            buttonText="View Error"
            buttonKind="secondary"
          />
        </div>
      </div>
    );
  }

  if (model.technicalDetails.lastError?.originalRequest?.body) {
    try {
      const parsedBody = JSON.parse(model.technicalDetails.lastError.originalRequest.body);
      conversionId = parsedBody.conversionTerms?.conversionId ||'N/A';
    } catch (error) {
      console.error('Failed to parse the body:', error);
      conversionId = 'Error Parsing JSON';
    }
  }
  //  else if(model.technicalDetails.fxQuoteResponse?.body){
  //   try {conversionId = model.technicalDetails.fxQuoteResponse.body?conversionTerms?.conversionId || 'N/A';
  //   } catch (error) {
  //     console.error('Failed to parse fxQuoteResponse body:', error);
  //     conversionId = 'Error Parsing JSON';
  //   }
  // }
  return (
    <div>
      <Tabs>
        <TabList>
          <Tab>Basic Information</Tab>
          <Tab>Technical Details</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Row align="flex-start" style={{ marginTop: '5px' }}>
              <div style={{ flex: '0 0 50%', marginRight: '5px' }}>
                <FormInput disabled={true} label="Transfer ID" type="text" value={model.id} />
              </div>
              <div style={{ flex: '0 0 50%', marginRight: '5px' }}>
                <FormInput
                  disabled={true}
                  label="Transfer State"
                  type="text"
                  value={model.technicalDetails.transferState}
                />
              </div>
            </Row>
            <Row align="flex-start" style={{ marginTop: '5px' }}>
              <div style={{ flex: '0 0 50%', marginRight: '5px' }}>
                <FormInput disabled={true} label="Batch" type="text" value="N/A" />
              </div>
              <div style={{ flex: '0 0 50%', marginRight: '5px' }}>
                <FormInput
                  disabled={true}
                  label="Date Submitted"
                  type="text"
                  value={model.initiatedTimestamp}
                />
              </div>
            </Row>
            <Row align="flex-start" style={{ marginTop: '5px' }}>
              <div style={{ flex: '0 0 50%', marginRight: '5px' }}>
                <FormInput disabled={true} label="Amount" type="text" value={model.amount} />
              </div>
              <div style={{ flex: '0 0 50%', marginRight: '5px' }}>
                <FormInput disabled={true} label="Currency" type="text" value={model.currency} />
              </div>
            </Row>
            <Row align="flex-start" style={{ marginTop: '5px' }}>
              <div style={{ flex: '0 0 50%', marginRight: '5px' }}>
                <FormInput
                  disabled={true}
                  label="Sender"
                  type="text"
                  value={model.technicalDetails.payerParty.displayName}
                />
              </div>
              <div style={{ flex: '0 0 50%', marginRight: '5px' }}>
                <FormInput
                  disabled={true}
                  label="Sender Details"
                  type="text"
                  value={`${model.technicalDetails.payerParty.idType} ${model.technicalDetails.payerParty.idValue}`}
                />
              </div>
            </Row>
            <Row align="flex-start" style={{ marginTop: '5px' }}>
              <div style={{ flex: '0 0 50%', marginRight: '5px' }}>
                <FormInput
                  id="transfer-details-basic-modal__recipient"
                  disabled={true}
                  label="Recipient"
                  type="text"
                  value={model.technicalDetails.payeeParty.displayName}
                />
              </div>
              <div style={{ flex: '0 0 50%', marginRight: '5px' }}>
                <FormInput
                  id="transfer-details-basic-modal__recipient-details"
                  disabled={true}
                  label="Recipient Details"
                  type="text"
                  value={`${model.technicalDetails.payeeParty.idType} ${model.technicalDetails.payeeParty.idValue}`}
                />
              </div>
            </Row>
            <Row align="flex-start" style={{ marginTop: '5px' }}>
              <div style={{ flex: '0 0 50%', marginRight: '5px' }}>
                <FormInput
                  disabled={true}
                  label="Institution"
                  type="text"
                  value={model.institution}
                />
              </div>
              <div style={{ flex: '0 0 50%', marginRight: '5px' }}>
                <FormInput
                  id="transfer-details-basic-modal__direction"
                  disabled={true}
                  label="Direction"
                  type="text"
                  value={model.direction}
                />
              </div>
            </Row>
          </TabPanel>
          <TabPanel>
            <Row align="flex-start stretch">
              <div style={{ flex: '0 0 50%', marginRight: '10px' }}>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  <FormInput
                    disabled={true}
                    label="Scheme Transfer ID"
                    value={model.technicalDetails.schemeTransferId}
                  />
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  <FormInput
                    disabled={true}
                    label="Transaction ID"
                    value={model.technicalDetails.transactionId}
                  />
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  <FormInput
                    disabled={true}
                    label="Quote ID"
                    value={model.technicalDetails.quoteId}
                  />
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  <FormInput
                    id="transfer-details-modal__home-transfer-id"
                    disabled={true}
                    label="Home Transfer ID"
                    value={model.technicalDetails.homeTransferId}
                  />
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  {transferStateInput}
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                <FormInput
                  id="transfer-details-modal__conversion-id"
                  disabled={true}
                  label="Conversion ID"
                  value ={conversionId}
                />
               </Row>
              <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <FormInput
                  id="transfer-details-modal__home-transfer-id"
                  disabled={true}
                  label="Conversion Quote ID"
                  value={model.technicalDetails.conversionQuoteId}
                  style={{ flex: 1 }}                  
                  />
              </div>


               {/* Conversion State */}
               <Row align="flex-start" style={{ marginTop: '5px' }}>
                  {conversionStateInput}
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
                          <span style={{ color: 'black', fontSize: '12px' }}>Fx</span>
                          <span> Quote Request</span>
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
                          model.technicalDetails.fxQuoteResponse.body
                        )
                      }
                      tooltip={
                        !(
                          model.technicalDetails.fxQuoteResponse &&
                          model.technicalDetails.fxQuoteResponse.body
                        ) &&
                        'This option is only available when an fx POST /fxquote response can be found for the transfer'
                      }
                      noFill={true}
                      label={
                        <span>
                          <span style={{ color: 'black', fontSize: '12px' }}>Fx</span>
                          <span> Quote Response</span>
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
                          <span style={{ color: 'black', fontSize: '12px' }}>Fx</span>
                          <span> Transfer Prepare</span>
                        </span>
                      }
                      onClick={() => showFxTransferPrepare(model.technicalDetails.fxTransferPrepare)}
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
                          model.technicalDetails.fxTransferFulfilment.body
                        )
                      }
                      tooltip={
                        !(
                          model.technicalDetails.fxTransferFulfilment &&
                          model.technicalDetails.fxTransferFulfilment.body
                        ) &&
                        'This option is only available when a POST /transfers fulfilment can be found for the transfer'
                      }
                      noFill={true}
                      label={
                        <span>
                          <span style={{ color: 'black', fontSize: '12px' }}>Fx</span>
                          <span> Transfer Fulfil</span>
                        </span>
                      }
                      onClick={() => showFxTransferFulfil(model.technicalDetails.fxTransferFulfilment)}
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
