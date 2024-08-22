import { Selector } from "testcafe";


export type Error = {
  id: string,
  direction: string,
  type: string,
  value: string,
  errorType: string,
  date: string,
}

export type ErrorRow = {
  transferId: Selector,
  direction: Selector,
  type: Selector,
  value: Selector,
  errorType: Selector,
  date: Selector,
}

export type Transfer = {
  id: string,
  amount: string,
  direction: string,
  status: string,
  batchId: string,
  institution: string,
  date: string,
  senderIdType: string,
  senderIdSubValue: string,
  senderIdValue: string,
  recipientIdType: string,
  recipientIdValue: string,
  homeTransferId: string
}

export type TransferRow = {
  transferId: Selector,
  amount: Selector,
  direction: Selector,
  status: Selector,
  batchId: Selector,
  institution: Selector,
  date: Selector,
}

export const TransferDashboardPage = {

  //Transfers Overview
  transfersOverview: Selector('span').withText('Successful Transfers'),
  successfulTransfers:  Selector('span').withText('Successful Transfers'),
  averageTransferTime: Selector('span').withText('Average Transfer Time (E2E)'),
  successfulChart: Selector('#apexchartstransferxsuccessxpercxchart'),
  averageTransferTimeChart: Selector('#apexchartstransferxavgxtimexchart'),
  viewAllErrorsButton: Selector('span.input-button__label').withText('View All Errors'),
  idFilterLabel: Selector('div').withText('ID'),
  directionFilterLabel: Selector('div').withText('Direction'),
  typeFilterLabel: Selector('div').withText('Type'),
  valueFilterLabel: Selector('div').withText('Send Value'),
  currencyFilterLabel: Selector('div').withText('Send Currency'),
  receiveValueFilterLabel: Selector('div').withText('Receive Value'),
  receiveCurrencyFilterLabel: Selector('div').withText('Receive Currency'),
  errorTypeFilterLabel: Selector('div').withText('Error Type'),
  DateFilterLabel: Selector('div').withText('Date'),

  findATransferButton: Selector('.mb-input').withText('Find a Transfer'),
  downloadErrorsButton: Selector('div.transfers__errors__section').nth(1).child('button').withAttribute('label','Download Errors'),// Selector('.transfers__errors__download__button'),

  // viewAllErrorsButton: Selector('.transfers__errors__button'),

  //Find a Transfer Popup window Page Objects
  ftTitle: Selector('div.el-modal__header-title'),
  ftClosesmall: Selector('#close-small'),
  transferIDTextBox: Selector('div.input-textfield__value__tokens').child(0),

  findATransferModal: () => Selector('.el-modal__header-title')
    .withText(`Find a Transfer`)
    .parent().parent('.el-modal__container'),

  findATransferModalBasicFindTransferTab: Selector('.el-tabs__tab-items').child(0),//.withText('Basic Find a Transfer'),XPathSelector('//input[@type="checkbox"]').nth(1);
  findATransferModalAdvancedFiltering: Selector('.el-tabs__tab-items').child('div').withText('Advanced Filtering'),
  backtoFilteringSubmitButton: Selector('span.input-button__label').withText('Back to filtering'),
  ftPopupCloseButton: Selector('span.input-button__label').nth(3),
  findATransferModalTransferDownloadTransfersButton: Selector('.mb-input').withText('Download Transfers'),
  findATransferModalTransferIdField: Selector('.find-transfer-modal__transfer-id input'),
  findATransferModalDateField: Selector('.find-transfer-modal__date input'),
  findATransferModalFromDateField: Selector('.find-transfer-modal__from-date input'),
  findATransferModalToDateField: Selector('.find-transfer-modal__to-date input'),
  findATransferModalDirectionOfFundsField: Selector('#find-transfer-modal__directionOfFunds'),
  findATransferModalDirectionOfFundsOption: Selector('.input-select__options-item__label'),
  findATransferModalAliasTypeField: Selector('#find-transfer-modal__aliasType'),
  findATransferModalAliasTypeOption: Selector('.input-select__options-item__label'),
  findATransferModalPayeeAliasField: Selector('input#find-transfer-modal__payeeAlias'),
  findATransferModalAliasSubValueField: Selector('.find-transfer-modal__aliasSubValue input'),
  findATransferModalInstitutionField: Selector('.find-transfer-modal__institution input'),
  findATransferModalTransferStatusField: Selector('.find-transfer-modal__transfer-status input'),
  findATransferModalSubmit: Selector('button').withAttribute('label', 'Find Transfers'), //Selector('div.el-modal__footer-right').child(1),Selector('.el-modal__submit'),
  findATransferModalCloseButton: Selector('.input-button__content').child('span').withText('Close'),

  //Find a Transfer results Page objects
  noresults: Selector('span').withText('No items'),
  transferDetailsModalBasicInformationTab: Selector('.el-tabs__tab-item').withText('Basic Information'),
  transferDetailsModalTechnicalDetailsTab: Selector('.el-tabs__tab-item').withText('Technical Details'),
  homeTransferIdField: Selector('#transfer-details-modal__home-transfer-id'),
  recipientField: Selector('#transfer-details-basic-modal__recipient'),
  transferIdList : Selector('span.el-datalist__link__content'),

  //Find a transfer batch results page objects
  transferResults: Selector('.el-modal__body .el-scrollbox__content .el-datalist__rows .el-datalist__row'),

  //Individual Transfer Details Page objects
  transferDetailTitle : Selector('div.el-modal__header-title').withText('Transfer Details'),
  basicInfomationTab : Selector('div.el-tabs__tab-items').child(0),


  //Basic Information Page Objects - Labels
  transferIDLabel : Selector('div').withText('Transfer ID'),
  transferStateLabel : Selector('div').withText('Transfer State'),
  transferAmountLabel : Selector('div').withText('Amount'),
  transferDateLabel : Selector('div').withText('Date Submitted'),
  transferBatchLabel : Selector('div').withText('Batch'),
  transferCurrencyLabel : Selector('div').withText('Currency'),
  transferSenderLabel : Selector('div').withText('Sender'),
  transferSenderDetailsLabel : Selector('div').withText('Sender Details'),
  transferRecipientLabel : Selector('div').withText('Recipient'),
  transferRecipientDetailsLabel : Selector('div').withText('Recipient Details'),
  transferInstitutionLabel : Selector('div').withText('Institution'),
  transferDirectionLabel : Selector('div').withText('Direction'),

  //Basic Information Page Objects - TextBoxes
  transferID : Selector('div.input-textfield__value__tokens').nth(0).child(0),
  transferState : Selector('div.input-textfield__value__tokens').nth(1).child(0),
  transferBatch : Selector('div.input-textfield__value__tokens').nth(2).child(0),
  transferDateSubmitted : Selector('div.input-textfield__value__tokens').nth(3).child(0),
  transferAmount : Selector('div.input-textfield__value__tokens').nth(4).child(0),
  transferCurrency : Selector('div.input-textfield__value__tokens').nth(5).child(0),
  transferSender : Selector('div.input-textfield__value__tokens').nth(6).child(0),
  transferSenderDetails : Selector('div.input-textfield__value__tokens').nth(7).child(0),
  transferRecipient : Selector('div.input-textfield__value__tokens').nth(8).child(0),
  transferRecipientDetails : Selector('div.input-textfield__value__tokens').nth(9).child(0),
  transferInstitution : Selector('div.input-textfield__value__tokens').nth(10).child(0),
  transferDirection : Selector('div.input-textfield__value__tokens').nth(11).child(0),

  // closeTransferDetailsButton : Selector('span.input-button__label').nth(4),
  closeTransferDetailsButton : Selector('#transferDetails span.input-button__label').withText('Close'),

  //Technical Details Page Objects - Labels
  techSchemeTransferIDLabel : Selector('div').withText('Scheme Transfer ID'),
  techTransactionIDLabel : Selector('div').withText('Transaction ID'),
  techQuoteIDLabel : Selector('div').withText('Scheme Transfer ID'),
  techHomeTransferIDLabel : Selector('div').withText('Home Transfer ID'),
  techtransferStateLabel : Selector('div').withText('Transfer State'),
  techViewMessageDetailsLabel : Selector('div').withText('View Message Details'),
  techPartyInformationLabel : Selector('div').withText('Party Information'),

  //Technical Details Textbox Values
  techSchemeTransferID : Selector('div.input-textfield__value__tokens').nth(0).child(0),
  techTransactionID : Selector('div.input-textfield__value__tokens').nth(1).child(0),
  techQuoteID : Selector('div.input-textfield__value__tokens').nth(2).child(0),
  techHomeTransferID : Selector('div.input-textfield__value__tokens').nth(3).child(0),
  techTransferState : Selector('div.input-textfield__value__tokens').nth(4).child(0),

  //Technical Details Page Objects - Buttons
  payerInfoButton : Selector('span.input-button__label').withText('Payer Information'),
  payeeInfoButton : Selector('span.input-button__label').withText('Payee Information'),
  partyLookupResponseButton : Selector('span.input-button__label').withText('Party Lookup Response'),
  quoteRequestButton : Selector('span.input-button__label').withText('Quote Request'),
  quoteResponseButton : Selector('span.input-button__label').withText('Quote Response'),
  transferPrepareButton : Selector('span.input-button__label').withText('Transfer Prepare'),
  transferFulfilButton : Selector('span.input-button__label').withText('Transfer Fulfil'),
  transferviewErrorButton : Selector('span.input-button__label').nth(4),
  closeViewErrorPopupButton : Selector('span.input-button__label').nth(13),
  closeErroredTechnicalDetailsButton : Selector('span.input-button__label').nth(12),

  //This page object closes the Transfer Details when technical details is open
  closeTechnicalDetailsButton : Selector('span.input-button__label').nth(11),
  // closeTechDetailsButtonPopupButton : Selector('span.input-button__label').nth(12),
  closeTechDetailsButtonPopupButton : Selector('#transferRequestDetailsModal span.input-button__label').withText('Close'),

  //Extension List Objects
  partyExtensionListButton : Selector('span.input-button__label').withText('View Extension List'),
  partyDisabledExtensionListButton : Selector('button').withAttribute('disabled label','View Extension List'),
  // closePartyExtensionPopupButton : Selector('span.input-button__label').nth(14),
  closePartyExtensionPopupButton : Selector('span.input-button__label').withText('Close'),
  partyExtLstTitle : Selector('div.el-modal__header-title').withText('Party Extension List'),
  keyLabelInExtLst : Selector('.el-datalist__header-cell__label').withText('Key'),
  valueLabelInExtLst : Selector('.el-datalist__header-cell__label').withText('Value'),
  keyTextInExtLst : Selector('div.el-datalist__item-cell').nth(-2).child(0),
  valueTextInExtLst : Selector('div.el-datalist__item-cell').nth(-1).child(0),


  //This Page object can be used for any Close Button which pops from Party Information or View Message Details
  // closePartyWithExtensionList : Selector('span.input-button__label').nth(13),
  closePartyWithExtensionList : Selector('#partydetailsmodal span.input-button__label').withText('Close'),

  //Party objects - the Labels are common between Payee and Payer information
  partyIDTypeLabel : Selector('div').withText('Id Type'),
  partyValueLabel : Selector('div').withText('Id Value'),
  partyDisplayNameLabel : Selector('div').withText('Display Name'),
  partyFirstNameLabel : Selector('div').withText('First Name'),
  partyMiddleNameLabel : Selector('div').withText('Middle Name'),
  partyLastNameLabel : Selector('div').withText('Last Name'),
  partyDOBLabel : Selector('div').withText('Date Of Birth'),
  partyMerchantCodeLabel : Selector('div').withText('Merchant Classification Code'),
  partyFSPIdLabel : Selector('div').withText('FSP Id'),


  //Party Objects Text boxes - use this for both Payye and and Payer information
  partyIdType : Selector('div.input-textfield__value__tokens').nth(5).child(0),
  partyIdValue : Selector('div.input-textfield__value__tokens').nth(6).child(0),
  partyDisplayName : Selector('div.input-textfield__value__tokens').nth(7).child(0),
  partyFirstName : Selector('div.input-textfield__value__tokens').nth(8).child(0),
  partyMiddleName : Selector('div.input-textfield__value__tokens').nth(9).child(0),
  partyLastName : Selector('div.input-textfield__value__tokens').nth(10).child(0),
  partyDOB : Selector('div.input-textfield__value__tokens').nth(11).child(0),
  partyMerchantCode : Selector('div.input-textfield__value__tokens').nth(12).child(0),
  partyFSPId : Selector('div.input-textfield__value__tokens').nth(13).child(0),

  //Transfer Prepare Objects
  tpilpPacket : Selector('span').withText('"ilpPacket"'),
  tpilpPacketValue : Selector('span').withText('"ilpPacket"').nextSibling(0),
  tpcondition : Selector('span').withText('"condition"'),
  tpconditionValue : Selector('span').withText('"condition"').nextSibling(0),
  tpexpiration : Selector('span').withText('"expiration"'),
  tpexpirationValue : Selector('span').withText('"expiration"').nextSibling(0),

  //Transfer Fulfil Objects
  tfcompletedTimestamp : Selector('span').withText('"completedTimestamp"'),
  tftimeStampValue : Selector('span').withText('"completedTimestamp"').nextSibling(0),
  tftransferState : Selector('span').withText('"transferState"'),
  tftransferStateValue : Selector('span').withText('"transferState"').nextSibling(0),
  tffulfilment : Selector('span').withText('"fulfilment"'),
  tffulfilmentValue : Selector('span').withText('"fulfilment"').nextSibling(0),

  //Quote Request Objects
  qrquoteId : Selector('#transferRequestDetailsModal span').withText('"quoteId"'),
  qrquoteIdValue : Selector('span').withText('"quoteId"').nextSibling(0),
  qrpayerpartyIdType : Selector('span').withText('"partyIdType"'),
  qrpayerpartyIdTypeValue : Selector('span').withText('"partyIdType"').nextSibling(0),
  qrpayerpartyIdentifier : Selector('span').withText('"partyIdentifier"'),
  qrpayerpartyIdentifierValue : Selector('span').withText('"partyIdentifier"').nextSibling(0),
  qramountTypeId : Selector('span').withText('"amountType"'),
  qramountTypeValue : Selector('span').withText('"amountType"').nextSibling(0),
  qrcurrency : Selector('span').withText('"currency"'),
  qrcurrencyValue : Selector('span').withText('"currency"').nextSibling(0),
  qramount : Selector('span').withText('"amount"').nth(1),
  qramountValue : Selector('span').withText('"amount"').nth(1).nextSibling(0),
  qrpayeepartyIdType : Selector('span').withText('"partyIdType"').nth(1),
  qrpayeepartyIdTypeValue : Selector('span').withText('"partyIdType"').nth(1).nextSibling(0),
  qrpayeepartyIdentifier : Selector('span').withText('"partyIdentifier"').nth(1),
  qrpayeepartyIdentifierValue : Selector('span').withText('"partyIdentifier"').nth(1).nextSibling(0),
  qrpayeefspId : Selector('span').withText('"fspId"').nth(1),
  qrpayeefspIdValue : Selector('span').withText('"fspId"').nth(1).nextSibling(0),

  //Quote Response Objects
  expiration : Selector('span').withText('"expiration"'),
  expirationValue : Selector('span').withText('"expiration"').nextSibling(0),
  ilpPacket : Selector('span').withText('"ilpPacket"'),
  ilpPacketValue : Selector('span').withText('"ilpPacket"').nextSibling(0),
  condition : Selector('span').withText('"condition"'),
  conditionValue : Selector('span').withText('"condition"').nextSibling(0),

  //Party Lookup Response Objects
  plrpartyIdType : Selector('span').withText('"partyIdType"'),
  plrpartyIdTypeValue : Selector('span').withText('"partyIdType"').nextSibling(0),
  plrpartyIdentifier : Selector('span').withText('"partyIdentifier"'),
  plrpartyIdentifierValue : Selector('span').withText('"partyIdentifier"').nextSibling(0),
  plrfspId : Selector('span').withText('"fspId"'),
  plrfspIdValue : Selector('span').withText('"fspId"').nextSibling(0),
  plrdateOfBirth : Selector('span').withText('"dateOfBirth"'),
  plrdateOfBirthValue : Selector('span').withText('"dateOfBirth"').nextSibling(0),
  plrfirstName : Selector('span').withText('"firstName"'),
  plrfirstNameValue : Selector('span').withText('"firstName"').nextSibling(0),
  plrlastName : Selector('span').withText('"lastName"'),
  plrlastNameValue : Selector('span').withText('"lastName"').nextSibling(0),

  //Transfer Status count
  successfulCount : Selector('span.el-pill__label').nth(0),
  pendingCount : Selector('span.el-pill__label').nth(1),
  failedCount : Selector('span.el-pill__label').nth(2),
  totalErrorsCount : Selector('span').withText('Total Errors').nextSibling(0),
  totalTransferStatuses : Selector('span').withText('Total Transfer Statuses'),
  transferDetailsModalTechnicalDetailsRecipientDetailsField: Selector('#transfer-details-basic-modal__recipient-details'),
  transferDetailsModalTechnicalDetailsDirection: Selector('#transfer-details-basic-modal__direction'),

  async getTransferRowById(innerText: string): Promise<Selector> {
    return Selector('.transfers__transfers__list .el-datalist__row').withText(innerText.substring(0, 22));
  },

  async getFirstTransferRow(): Promise<Selector> {
    return Selector('.transfers__transfers__list .el-datalist__row').nth(0);
  },

  async getTransferByAmount(innerText: string): Promise<Selector> {
    return Selector('.transfers__transfers__list .el-datalist__item-cell').child("div").withText(innerText);
  },
  async getFindATransferRows(): Promise<TransferRow[]> {
    const rows = Selector('.transfers__transfers__list .el-datalist__row');
    const length = await rows.count;
    return Array
      .from({ length })
      .map((_, i) => ({
        row: rows.nth(i),
        transferId: rows.nth(i).find('.el-datalist__item-cell').nth(0),
        amount: rows.nth(i).find('.el-datalist__item-cell').nth(1),
        direction: rows.nth(i).find('.el-datalist__item-cell').nth(2),
        status: rows.nth(i).find('.el-datalist__item-cell').nth(3),
        batchId: rows.nth(i).find('.el-datalist__item-cell').nth(4),
        institution: rows.nth(i).find('.el-datalist__item-cell').nth(5),
        date: rows.nth(i).find('.el-datalist__item-cell').nth(6),
      }));
  },

  async getErrorRows(): Promise<ErrorRow[]> {
    const rows = Selector('.transfers__errors__list-container .el-datalist__row');
    const length = await rows.count;
    return Array
      .from({ length })
      .map((_, i) => ({
        row: rows.nth(i),
        transferId: rows.nth(i).find('.el-datalist__item-cell').nth(0),
        direction: rows.nth(i).find('.el-datalist__item-cell').nth(1),
        type: rows.nth(i).find('.el-datalist__item-cell').nth(2),
        value: rows.nth(i).find('.el-datalist__item-cell').nth(3),
        errorType: rows.nth(i).find('.el-datalist__item-cell').nth(4),
        date: rows.nth(i).find('.el-datalist__item-cell').nth(5),
      }));
  },

  async getAllErrorModalRows(): Promise<ErrorRow[]> {
    const rows = Selector('.el-modal__body__content .el-datalist__row');
    const length = await rows.count;
    return Array
      .from({ length })
      .map((_, i) => ({
        row: rows.nth(i),
        transferId: rows.nth(i).find('.el-datalist__item-cell').nth(0),
        direction: rows.nth(i).find('.el-datalist__item-cell').nth(1),
        type: rows.nth(i).find('.el-datalist__item-cell').nth(2),
        value: rows.nth(i).find('.el-datalist__item-cell').nth(3),
        errorType: rows.nth(i).find('.el-datalist__item-cell').nth(4),
        date: rows.nth(i).find('.el-datalist__item-cell').nth(5),
      }));
  },
};
