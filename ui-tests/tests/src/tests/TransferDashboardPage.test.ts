import { Selector } from 'testcafe';
import { config } from '../config';
import { LoginPage } from '../page-objects/pages/LoginPage';
import { ErrorRow, Transfer, TransferDashboardPage, TransferRow, Error } from '../page-objects/pages/TransferDashboardPage';
import fs from 'fs';
import xlsx from 'xlsx';
const apiHelper = require('../helpers/api-helper');
const { v4: uuidv4 } = require('uuid');



fixture`Transfer Dashboard Feature`
  .page`${config.pm4mlEndpoint}/transfer`
  .beforeEach(async (t) => {
    // Login if not logged in
    if (Selector('.login-pf-header')) {
      await t.typeText(LoginPage.usernameField, config.credentials.test.username)
      await t.typeText(LoginPage.passwordField, config.credentials.test.password)
      await t.click(LoginPage.loginButton)
    }
  });

test
  .meta({
    ID: 'MP-T287',
    STORY: 'MP-2610'
  })
  ('Click Transfers, validate Total Transfer Statuses label, Record counts transfers Overview and other labels', async t => {

    await t
      .expect(TransferDashboardPage.transfersOverview.exists).ok()
      .expect(TransferDashboardPage.successfulTransfers.exists).ok()
      .expect(TransferDashboardPage.averageTransferTime.exists).ok()
      .expect(TransferDashboardPage.totalTransferStatuses.exists).ok()
      .expect(TransferDashboardPage.successfulChart.exists).ok()
      .expect(TransferDashboardPage.averageTransferTimeChart.exists).ok()
      .expect(TransferDashboardPage.successfulCount.exists).ok()
      .expect(TransferDashboardPage.pendingCount.exists).ok()
      .expect(TransferDashboardPage.failedCount.exists).ok()
      .expect(TransferDashboardPage.totalErrorsCount.exists).ok()
  });

test
  .meta({
    ID: 'MP-T288',
    STORY: 'MP-2512'
  })
  ('Click Transfers, Find a Transfer, Advanced Filtering, Basic Transfer submit back to filter then close', async t => {

    await t
      .maximizeWindow()
      .click(TransferDashboardPage.findATransferButton)
      .expect(TransferDashboardPage.ftTitle.exists).ok()
      .click(TransferDashboardPage.findATransferModalAdvancedFiltering)
      .click(TransferDashboardPage.findATransferModalBasicFindTransferTab)
      .click(TransferDashboardPage.findATransferModalSubmit)
      .click(TransferDashboardPage.backtoFilteringSubmitButton)
      .click(TransferDashboardPage.findATransferModalCloseButton)
      .click(TransferDashboardPage.findATransferButton)
      .click(TransferDashboardPage.ftClosesmall)
  });

test
  .meta({
    ID: 'MP-T291',
    STORY: 'MP-2512'
  })
  ('Click_Transfers_Find_a_Transfer_with_invalid_transfer_id_no_item_expected', async t => {
    await t
      .maximizeWindow()
      .click(TransferDashboardPage.findATransferButton)
      .click(TransferDashboardPage.findATransferModalBasicFindTransferTab)
      .typeText(TransferDashboardPage.transferIDTextBox, 'abc123', { replace: true })
      .click(TransferDashboardPage.findATransferModalSubmit)
      .expect(TransferDashboardPage.noresults).ok()
      .click(TransferDashboardPage.findATransferModalCloseButton)
  });

test
  .meta({
    ID: 'MP-T290',
    STORY: 'MP-2512'
  })
  ('Click_Transfers_Find_a_Transfer_with_valid_transfer_ID', async t => {

    var transferRequest = {
      from: {
        displayName: 'PayerFirst PayerLast',
        idType: 'MSISDN',
        idValue: `${config.senderpartyID}`,
        extensionList:
          [
            {
              key: 4,
              value: 2
            }
          ]
      },
      to: {
        displayName: 'PartyFirst PartyLast',
        idType: 'MSISDN',
        idValue: `${config.receiverpartyID}`
      },
      amountType: 'SEND',
      currency: `${config.simcurrency}`,
      amount: 10.123,
      transactionType: 'TRANSFER',
      note: 'test payment - Success transfer initiated by Automation',
      homeTransactionId: uuidv4()
    }
    var payloadHeaders = { 'Content-Type': 'application/json' };
    var transferResponse = await apiHelper.getResponseBody('POST', `${config.simCoreConnectorEndpoint}/sendmoney`, JSON.stringify(transferRequest), payloadHeaders);
    //console.log(transferResponse);
    let transfer_id = transferResponse.transferId;

    await apiHelper.getResponseBody('PUT', `${config.simCoreConnectorEndpoint}/sendmoney/${transfer_id}`, JSON.stringify({ acceptParty: true }), payloadHeaders);

    await apiHelper.getResponseBody('PUT', `${config.simCoreConnectorEndpoint}/sendmoney/${transfer_id}`, JSON.stringify({ acceptQuote: true }), payloadHeaders);

    await t
      .maximizeWindow()
      .click(TransferDashboardPage.findATransferButton)
      .click(TransferDashboardPage.findATransferModalBasicFindTransferTab)
      .wait(20000)
      .typeText(TransferDashboardPage.transferIDTextBox, transfer_id, { replace: true })
      .click(TransferDashboardPage.findATransferModalSubmit)
      .click(TransferDashboardPage.findATransferModalCloseButton)
  });

test
  .meta({
    ID: 'MP-T292',
    STORY: 'MP-2512'
  })
  ('Click Transfers with Valid transfer, validate all labels and textboxes in Basic information', async t => {
    var transferRequest = {
      from: {
        displayName: 'PayerFirst PayerLast',
        idType: 'MSISDN',
        idValue: `${config.senderpartyID}`,
        extensionList:
          [
            {
              key: 4,
              value: 2
            }
          ]
      },
      to: {
        displayName: 'PartyFirst PartyLast',
        idType: 'MSISDN',
        idValue: `${config.receiverpartyID}`
      },
      amountType: 'SEND',
      currency: `${config.simcurrency}`,
      amount: 10.123,
      transactionType: 'TRANSFER',
      note: 'test payment - Success transfer initiated by Automation',
      homeTransactionId: uuidv4()
    }
    var payloadHeaders = { 'Content-Type': 'application/json' };
    var transferResponse = await apiHelper.getResponseBody('POST', `${config.simCoreConnectorEndpoint}/sendmoney`, JSON.stringify(transferRequest), payloadHeaders);

    await apiHelper.getResponseBody('PUT', `${config.simCoreConnectorEndpoint}/sendmoney/${transferResponse.transferId}`, JSON.stringify({ acceptParty: true }), payloadHeaders);

    await apiHelper.getResponseBody('PUT', `${config.simCoreConnectorEndpoint}/sendmoney/${transferResponse.transferId}`, JSON.stringify({ acceptQuote: true }), payloadHeaders);

    await t
      .maximizeWindow()
      .click(TransferDashboardPage.findATransferButton)
      .click(TransferDashboardPage.findATransferModalBasicFindTransferTab)
      .wait(18000)
      .typeText(TransferDashboardPage.transferIDTextBox, transferResponse.transferId, { paste: true, replace: false }).wait(10000)
      .click(TransferDashboardPage.findATransferModalSubmit)
      .click(TransferDashboardPage.transferIdList.withText(transferResponse.transferId))
      .expect(TransferDashboardPage.transferStateLabel.exists).ok()
      .expect(TransferDashboardPage.transferAmountLabel.exists).ok()
      .expect(TransferDashboardPage.transferDateLabel.exists).ok()
      .expect(TransferDashboardPage.transferBatchLabel.exists).ok()
      .expect(TransferDashboardPage.transferCurrencyLabel.exists).ok()
      .expect(TransferDashboardPage.transferSenderLabel.exists).ok()
      .expect(TransferDashboardPage.transferSenderDetailsLabel.exists).ok()
      .expect(TransferDashboardPage.transferRecipientLabel.exists).ok()
      .expect(TransferDashboardPage.transferRecipientDetailsLabel.exists).ok()
      .expect(TransferDashboardPage.transferInstitutionLabel.exists).ok()
      .expect(TransferDashboardPage.transferDirectionLabel.exists).ok()
      .expect(TransferDashboardPage.transferState.value).contains('succeeded')
      .expect(TransferDashboardPage.transferBatch.value).contains('N/A')
      .expect(TransferDashboardPage.transferDateSubmitted.value).contains(transferResponse.initiatedTimestamp)
      .expect(TransferDashboardPage.transferAmount.value).contains(transferResponse.amount)
      .expect(TransferDashboardPage.transferCurrency.value).contains(transferResponse.currency)
      .expect(TransferDashboardPage.transferSender.value).contains(transferResponse.from.displayName)
      .expect(TransferDashboardPage.transferSenderDetails.value).contains(transferResponse.from.idType)
      .expect(TransferDashboardPage.transferSenderDetails.value).contains(transferResponse.from.idValue)
      .expect(TransferDashboardPage.transferRecipient.value).contains(transferResponse.to.displayName)
      .expect(TransferDashboardPage.transferRecipientDetails.value).contains(transferResponse.to.idType)
      .expect(TransferDashboardPage.transferRecipientDetails.value).contains(transferResponse.to.idValue)
      .expect(TransferDashboardPage.transferInstitution.value).contains(transferResponse.to.fspId)
      .expect(TransferDashboardPage.transferDirection.value).contains('OUTBOUND')
      .click(TransferDashboardPage.closeTransferDetailsButton)
      .click(TransferDashboardPage.ftPopupCloseButton)
  });

test
  .meta({
    ID: 'MP-T293',
    STORY: 'MP-2512'
  })
  ('Click Transfers, with Valid transfer, validate all labels & textboxes in Techinical Details', async t => {
    var homeTransactionId = uuidv4();
    var transferRequest = {
      from: {
        displayName: 'PayerFirst PayerLast',
        idType: 'MSISDN',
        idValue: `${config.senderpartyID}`,
        extensionList:
          [
            {
              key: 4,
              value: 2
            }
          ]
      },
      to: {
        displayName: 'PartyFirst PartyLast',
        idType: 'MSISDN',
        idValue: `${config.receiverpartyID}`
      },
      amountType: 'SEND',
      currency: `${config.simcurrency}`,
      amount: 10.123,
      transactionType: 'TRANSFER',
      note: 'test payment - Success transfer initiated by Automation',
      homeTransactionId: homeTransactionId
    }
    var payloadHeaders = { 'Content-Type': 'application/json' };
    var transferResponse = await apiHelper.getResponseBody('POST', `${config.simCoreConnectorEndpoint}/sendmoney`, JSON.stringify(transferRequest), payloadHeaders);
    //console.log(transferResponse);
    await apiHelper.getResponseBody('PUT', `${config.simCoreConnectorEndpoint}/sendmoney/${transferResponse.transferId}`, JSON.stringify({ acceptParty: true }), payloadHeaders);
    transferResponse = await apiHelper.getResponseBody('PUT', `${config.simCoreConnectorEndpoint}/sendmoney/${transferResponse.transferId}`, JSON.stringify({ acceptQuote: true }), payloadHeaders);

    await t
      .maximizeWindow()
      .click(TransferDashboardPage.findATransferButton)
      .click(TransferDashboardPage.findATransferModalBasicFindTransferTab)
      .wait(20000)
      .typeText(TransferDashboardPage.transferIDTextBox, transferResponse.transferId, { paste: true, replace: false }).wait(10000)
      .click(TransferDashboardPage.findATransferModalSubmit)
      .click(TransferDashboardPage.transferIdList.withText(transferResponse.transferId))
      .click(TransferDashboardPage.transferDetailsModalTechnicalDetailsTab)
      .expect(TransferDashboardPage.techSchemeTransferIDLabel.exists).ok()
      .expect(TransferDashboardPage.techTransactionIDLabel.exists).ok()
      .expect(TransferDashboardPage.techQuoteID.exists).ok()
      .expect(TransferDashboardPage.techHomeTransferIDLabel.exists).ok()
      .expect(TransferDashboardPage.techtransferStateLabel.exists).ok()
      .expect(TransferDashboardPage.techViewMessageDetailsLabel.exists).ok()
      .expect(TransferDashboardPage.techPartyInformationLabel.exists).ok()
      .expect(TransferDashboardPage.techSchemeTransferID.value).contains(transferResponse.transferId)
      .expect(TransferDashboardPage.techHomeTransferID.value).contains(homeTransactionId)
      .expect(TransferDashboardPage.techQuoteID.value).contains(transferResponse.quoteId)
      .expect(TransferDashboardPage.techTransactionID.value).contains(transferResponse.transferId)
      .expect(TransferDashboardPage.techTransferState.value).eql('succeeded')
      .click(TransferDashboardPage.closeTransferDetailsButton)
      .click(TransferDashboardPage.ftPopupCloseButton)
  });

test
  .meta({
    ID: 'MP-T294',
    STORY: 'MP-2512'
  })
  ('Click Transfers, with Valid transfer, validate party info including Payer and Payee', async t => {
    // console.log('ExtensionList Key',transferResponse.from.extensionList[0].key)
    // console.log('ExtensionList Value',transferResponse.from.extensionList[0].value)
    // console.log('ExtensionList',transferResponse.from.extensionList)
    var homeTransactionId = uuidv4();
    var transferRequest = {
      from: {
        displayName: 'PayerFirst PayerLast',
        idType: 'MSISDN',
        idValue: `${config.senderpartyID}`,
        extensionList:
          [
            {
              key: 4,
              value: 2
            }
          ]
      },
      to: {
        displayName: 'PartyFirst PartyLast',
        idType: 'MSISDN',
        idValue: `${config.receiverpartyID}`
      },
      amountType: 'SEND',
      currency: `${config.simcurrency}`,
      amount: 10.123,
      transactionType: 'TRANSFER',
      note: 'test payment - Success transfer initiated by Automation',
      homeTransactionId: homeTransactionId
    }
    var payloadHeaders = { 'Content-Type': 'application/json' };
    var transferResponse = await apiHelper.getResponseBody('POST', `${config.simCoreConnectorEndpoint}/sendmoney`, JSON.stringify(transferRequest), payloadHeaders);
    await apiHelper.getResponseBody('PUT', `${config.simCoreConnectorEndpoint}/sendmoney/${transferResponse.transferId}`, JSON.stringify({ acceptParty: true }), payloadHeaders);
    transferResponse = await apiHelper.getResponseBody('PUT', `${config.simCoreConnectorEndpoint}/sendmoney/${transferResponse.transferId}`, JSON.stringify({ acceptQuote: true }), payloadHeaders);

    await t
      .maximizeWindow()
      .click(TransferDashboardPage.findATransferButton)
      .click(TransferDashboardPage.findATransferModalBasicFindTransferTab)
      .wait(18000)
      .typeText(TransferDashboardPage.transferIDTextBox, transferResponse.transferId, { paste: true, replace: false }).wait(10000)
      .click(TransferDashboardPage.findATransferModalSubmit)
      .click(TransferDashboardPage.transferIdList.withText(transferResponse.transferId))
      .click(TransferDashboardPage.transferDetailsModalTechnicalDetailsTab)
      //Checking Payer Details
      .click(TransferDashboardPage.payerInfoButton)
      .expect(TransferDashboardPage.partyIDTypeLabel.exists).ok()
      .expect(TransferDashboardPage.partyValueLabel.exists).ok()
      .expect(TransferDashboardPage.partyDisplayNameLabel.exists).ok()
      .expect(TransferDashboardPage.partyFirstNameLabel.exists).ok()
      .expect(TransferDashboardPage.partyMiddleNameLabel.exists).ok()
      .expect(TransferDashboardPage.partyLastNameLabel.exists).ok()
      .expect(TransferDashboardPage.partyDOBLabel.exists).ok()
      .expect(TransferDashboardPage.partyMerchantCodeLabel.exists).ok()
      .expect(TransferDashboardPage.partyFSPIdLabel.exists).ok()
      .expect(TransferDashboardPage.partyIdType.value).contains(transferResponse.from.idType)
      .expect(TransferDashboardPage.partyIdValue.value).contains(transferResponse.from.idValue)
      .expect(TransferDashboardPage.partyDisplayName.value).contains(transferResponse.from.displayName)
      // .click(TransferDashboardPage.partyExtensionListButton)
      // .expect(TransferDashboardPage.partyExtLstTitle.exists).ok()
      // .expect(TransferDashboardPage.keyLabelInExtLst.exists).ok()
      // .expect(TransferDashboardPage.valueLabelInExtLst.exists).ok()
      // .expect(TransferDashboardPage.keyTextInExtLst.innerText).contains(transferResponse.from.extensionList[0].key)
      // .expect(TransferDashboardPage.valueTextInExtLst.innerText).contains(transferResponse.from.extensionList[0].value)
      // .click(TransferDashboardPage.closePartyExtensionPopupButton)
      .click(TransferDashboardPage.closePartyWithExtensionList)

      //Checking Payee Details
      // This is failing. Need to double check the logic for finding payee details
      .click(TransferDashboardPage.payeeInfoButton)
      .expect(TransferDashboardPage.partyIDTypeLabel.exists).ok()
      .expect(TransferDashboardPage.partyValueLabel.exists).ok()
      .expect(TransferDashboardPage.partyDisplayNameLabel.exists).ok()
      .expect(TransferDashboardPage.partyFirstNameLabel.exists).ok()
      .expect(TransferDashboardPage.partyMiddleNameLabel.exists).ok()
      .expect(TransferDashboardPage.partyLastNameLabel.exists).ok()
      .expect(TransferDashboardPage.partyDOBLabel.exists).ok()
      .expect(TransferDashboardPage.partyMerchantCodeLabel.exists).ok()
      .expect(TransferDashboardPage.partyFSPIdLabel.exists).ok()
      .expect(TransferDashboardPage.partyIdType.value).contains(transferResponse.to.idType)
      .expect(TransferDashboardPage.partyIdValue.value).contains(transferResponse.to.idValue)
      .expect(TransferDashboardPage.partyDisplayName.value).contains(transferResponse.to.displayName)
      .expect(TransferDashboardPage.partyFirstName.value).contains(transferResponse.to.firstName)
      .expect(TransferDashboardPage.partyMiddleName.value).contains(transferResponse.to.middleName)
      .expect(TransferDashboardPage.partyLastName.value).contains(transferResponse.to.lastName)
      .expect(TransferDashboardPage.partyDOB.value).contains(transferResponse.to.dateOfBirth)
      .expect(TransferDashboardPage.partyFSPId.value).contains(transferResponse.to.fspId)
      .click(TransferDashboardPage.closePartyWithExtensionList)

      .click(TransferDashboardPage.closeTransferDetailsButton)
      .click(TransferDashboardPage.ftPopupCloseButton)
  });

test
  .meta({
    ID: 'MP-T295',
    STORY: 'MP-2667'
  })
  ('Click Transfers, with Valid transfer, validate view Msg details for Party Lookup, Quote Request and Quote Response', async t => {

    var homeTransactionId = uuidv4();
    var transferRequest = {
      from: {
        displayName: 'PayerFirst PayerLast',
        idType: 'MSISDN',
        idValue: `${config.senderpartyID}`,
        extensionList:
          [
            {
              key: 4,
              value: 2
            }
          ]
      },
      to: {
        displayName: 'PartyFirst PartyLast',
        idType: 'MSISDN',
        idValue: `${config.receiverpartyID}`
      },
      amountType: 'SEND',
      currency: `${config.simcurrency}`,
      amount: 10.123,
      transactionType: 'TRANSFER',
      note: 'test payment - Success transfer initiated by Automation',
      homeTransactionId: homeTransactionId
    }
    var payloadHeaders = { 'Content-Type': 'application/json' };
    var transferResponse = await apiHelper.getResponseBody('POST', `${config.simCoreConnectorEndpoint}/sendmoney`, JSON.stringify(transferRequest), payloadHeaders);
    await apiHelper.getResponseBody('PUT', `${config.simCoreConnectorEndpoint}/sendmoney/${transferResponse.transferId}`, JSON.stringify({ acceptParty: true }), payloadHeaders);
    transferResponse = await apiHelper.getResponseBody('PUT', `${config.simCoreConnectorEndpoint}/sendmoney/${transferResponse.transferId}`, JSON.stringify({ acceptQuote: true }), payloadHeaders);

    await t
      .maximizeWindow()
      .click(TransferDashboardPage.findATransferButton)
      .click(TransferDashboardPage.findATransferModalBasicFindTransferTab)
      .wait(10000)
      .typeText(TransferDashboardPage.transferIDTextBox, transferResponse.transferId, { paste: true, replace: false }).wait(10000)
      .click(TransferDashboardPage.findATransferModalSubmit)
      .click(TransferDashboardPage.transferIdList.withText(transferResponse.transferId))
      .click(TransferDashboardPage.transferDetailsModalTechnicalDetailsTab)
      //Checking Details for Party Lookup Response button
      .click(TransferDashboardPage.partyLookupResponseButton)
      .expect(TransferDashboardPage.plrpartyIdType.exists).ok()
      .expect(TransferDashboardPage.plrpartyIdentifier.exists).ok()
      .expect(TransferDashboardPage.plrfspId.exists).ok()
      .expect(TransferDashboardPage.plrdateOfBirth.exists).ok()
      .expect(TransferDashboardPage.plrfirstName.exists).ok()
      .expect(TransferDashboardPage.plrlastName.exists).ok()
      .expect(TransferDashboardPage.plrpartyIdTypeValue.innerText).contains(transferResponse.to.idType)
      .expect(TransferDashboardPage.plrpartyIdentifierValue.innerText).contains(transferResponse.to.idValue)
      .expect(TransferDashboardPage.plrfspIdValue.innerText).contains(transferResponse.to.fspId)
      .expect(TransferDashboardPage.plrdateOfBirthValue.innerText).contains(transferResponse.to.dateOfBirth)
      .expect(TransferDashboardPage.plrfirstNameValue.innerText).contains(transferResponse.to.firstName)
      .expect(TransferDashboardPage.plrlastNameValue.innerText).contains(transferResponse.to.lastName)
      .click(TransferDashboardPage.closeTechDetailsButtonPopupButton)
      //Checking details for Quote Request button
      .click(TransferDashboardPage.quoteRequestButton)
      .expect(TransferDashboardPage.qrquoteId.exists).ok()
      .expect(TransferDashboardPage.qrquoteIdValue.innerText).contains(transferResponse.quoteId)
      .expect(TransferDashboardPage.qrpayerpartyIdType.exists).ok()
      .expect(TransferDashboardPage.qrpayerpartyIdTypeValue.innerText).contains(transferResponse.from.idType)
      .expect(TransferDashboardPage.qrpayerpartyIdentifier.exists).ok()
      .expect(TransferDashboardPage.qrpayerpartyIdentifierValue.innerText).contains(transferResponse.from.idValue)
      .expect(TransferDashboardPage.qramountTypeId.exists).ok()
      .expect(TransferDashboardPage.qramountTypeValue.innerText).contains(transferResponse.amountType)
      .expect(TransferDashboardPage.qrcurrency.exists).ok()
      .expect(TransferDashboardPage.qrcurrencyValue.innerText).contains(transferResponse.currency)
      .expect(TransferDashboardPage.qramount.exists).ok()
      .expect(TransferDashboardPage.qramountValue.innerText).contains(transferResponse.amount)
      .expect(TransferDashboardPage.qrpayeepartyIdType.exists).ok()
      .expect(TransferDashboardPage.qrpayeepartyIdTypeValue.innerText).contains(transferResponse.to.idType)
      .expect(TransferDashboardPage.qrpayeepartyIdentifier.exists).ok()
      .expect(TransferDashboardPage.qrpayeepartyIdentifierValue.innerText).contains(transferResponse.to.idValue)
      .expect(TransferDashboardPage.qrpayeefspId.exists).ok()
      .expect(TransferDashboardPage.qrpayeefspIdValue.innerText).contains(transferResponse.to.fspId)
      .click(TransferDashboardPage.closeTechDetailsButtonPopupButton)
      //Checking details for Quote Response button
      .click(TransferDashboardPage.quoteResponseButton)
      .expect(TransferDashboardPage.expiration.exists).ok()
      .expect(TransferDashboardPage.expirationValue.innerText).contains(transferResponse.quoteResponse.body.expiration)
      .expect(TransferDashboardPage.ilpPacket.exists).ok()
      .expect(TransferDashboardPage.ilpPacketValue.innerText).contains(transferResponse.quoteResponse.body.ilpPacket)
      .expect(TransferDashboardPage.condition.exists).ok()
      .expect(TransferDashboardPage.conditionValue.innerText).contains(transferResponse.quoteResponse.body.condition)
      .click(TransferDashboardPage.closeTechDetailsButtonPopupButton)
      .click(TransferDashboardPage.closeTransferDetailsButton)
      .click(TransferDashboardPage.ftPopupCloseButton)
  });

test
  .meta({
    ID: 'MP-T310',
    STORY: 'MP-2667'
  })
  // ('test1', async t => {
  ('Click Transfers, with Valid transfer, validate view msg details with Transfer Prepare and Transfer fulfil', async t => {

    var homeTransactionId = uuidv4();
    var transferRequest = {
      from: {
        displayName: 'PayerFirst PayerLast',
        idType: 'MSISDN',
        idValue: `${config.senderpartyID}`,
        extensionList:
          [
            {
              key: 4,
              value: 2
            }
          ]
      },
      to: {
        displayName: 'PartyFirst PartyLast',
        idType: 'MSISDN',
        idValue: `${config.receiverpartyID}`
      },
      amountType: 'SEND',
      currency: `${config.simcurrency}`,
      amount: 10.123,
      transactionType: 'TRANSFER',
      note: 'test payment - Success transfer initiated by Automation',
      homeTransactionId: homeTransactionId
    }
    var payloadHeaders = { 'Content-Type': 'application/json' };
    var transferResponse = await apiHelper.getResponseBody('POST', `${config.simCoreConnectorEndpoint}/sendmoney`, JSON.stringify(transferRequest), payloadHeaders);
   //console.log(transferResponse);
    await apiHelper.getResponseBody('PUT', `${config.simCoreConnectorEndpoint}/sendmoney/${transferResponse.transferId}`, JSON.stringify({ acceptParty: true }), payloadHeaders);
    transferResponse = await apiHelper.getResponseBody('PUT', `${config.simCoreConnectorEndpoint}/sendmoney/${transferResponse.transferId}`, JSON.stringify({ acceptQuote: true }), payloadHeaders);

    await t
      .maximizeWindow()
      .click(TransferDashboardPage.findATransferButton)
      .click(TransferDashboardPage.findATransferModalBasicFindTransferTab)
      .wait(10000)
      .typeText(TransferDashboardPage.transferIDTextBox, transferResponse.transferId, { paste: true, replace: false }).wait(10000)
      .click(TransferDashboardPage.findATransferModalSubmit)
      .click(TransferDashboardPage.transferIdList.withText(transferResponse.transferId))
      .click(TransferDashboardPage.transferDetailsModalTechnicalDetailsTab)
      .click(TransferDashboardPage.transferPrepareButton)
      .expect(TransferDashboardPage.tpilpPacket.exists).ok()
      .expect(TransferDashboardPage.tpilpPacketValue.innerText).contains(JSON.parse(transferResponse.prepare.body).ilpPacket)
      .expect(TransferDashboardPage.tpcondition.exists).ok()
      .expect(TransferDashboardPage.tpconditionValue.innerText).contains(JSON.parse(transferResponse.prepare.body).condition)
      .expect(TransferDashboardPage.tpexpiration.exists).ok()
      .expect(TransferDashboardPage.tpexpirationValue.innerText).contains(JSON.parse(transferResponse.prepare.body).expiration)
      .click(TransferDashboardPage.closeTechDetailsButtonPopupButton)
      .click(TransferDashboardPage.transferFulfilButton)
      .expect(TransferDashboardPage.tfcompletedTimestamp.exists).ok()
      .expect(TransferDashboardPage.tftimeStampValue.innerText).contains(transferResponse.fulfil.body.completedTimestamp)
      .expect(TransferDashboardPage.tftransferState.exists).ok()
      .expect(TransferDashboardPage.tftransferStateValue.innerText).contains(transferResponse.fulfil.body.transferState)
      .expect(TransferDashboardPage.tffulfilment.exists).ok()
      .expect(TransferDashboardPage.tffulfilmentValue.innerText).contains(transferResponse.fulfil.body.fulfilment)
      .click(TransferDashboardPage.closeTechDetailsButtonPopupButton)
      .click(TransferDashboardPage.closeTransferDetailsButton)
      .click(TransferDashboardPage.ftPopupCloseButton)
  });

test.meta({
  ID: '',
  STORY: '',
  description: '',
})
  ('Can download excel spreadsheet of transfers in basic search', async (t) => {
  const expectedFilePath = `${process.env.HOME}` + '/Downloads/' + `Payment_Manager_Transfers_${new Date().toDateString()}.xlsx`;
  await t.maximizeWindow()
  await t.click(TransferDashboardPage.findATransferButton);
  await t.click(TransferDashboardPage.findATransferModalSubmit);
  // Adding `.wait` just as a precaution since this downloads a file.
  await t.click(TransferDashboardPage.findATransferModalTransferDownloadTransfersButton).wait(5000);
  await t.expect(fs.existsSync(expectedFilePath)).ok();
  const wb = xlsx.readFile(expectedFilePath);

  const transfers = xlsx.utils.sheet_to_json(wb.Sheets['Transfers']) as Transfer[];
  await t.expect(transfers.length).gt(0)

  // Check transfer in spreadsheet exists in table
  const rows = await TransferDashboardPage.getFindATransferRows()
  const transferExists = await Promise.all(rows.map((r: TransferRow) => r.transferId.innerText));
  await t.expect(transferExists).contains(transfers[0].id);

  //const expectedTransfer = transfers.find( t => t.id === '61797537-a05a-469f-b2f3-059a9cd5bd8d');
  const expectedTransfer = transfers.find( t => t.id[0]);
  //console.log(expectedTransfer);
  await t.expect(expectedTransfer?.senderIdType).ok();
  //await t.expect(expectedTransfer?.senderIdSubValue).ok();
  await t.expect(expectedTransfer?.senderIdValue).ok();
  await t.expect(expectedTransfer?.recipientIdType).ok();
  await t.expect(expectedTransfer?.recipientIdValue).ok();
  //await t.expect(expectedTransfer?.homeTransferId).eql('5105');

  // Delete file
  fs.unlinkSync(expectedFilePath);
});


test.meta({
  ID: '',
  STORY: '',
  description: '',
})('Can download excel spreadsheet of transfers in advanced', async (t) => {
  const expectedFilePath = `${process.env.HOME}/Downloads/Payment_Manager_Transfers_${new Date().toDateString()}.xlsx`;
  await t.maximizeWindow()
  await t.click(TransferDashboardPage.findATransferButton);
  await t.click(TransferDashboardPage.findATransferModalAdvancedFiltering);
  await t.click(TransferDashboardPage.findATransferModalSubmit);

  // Adding `.wait` just as a precaution since this downloads a file.
  await t.click(TransferDashboardPage.findATransferModalTransferDownloadTransfersButton).wait(5000);
  await t.expect(fs.existsSync(expectedFilePath)).ok();
  const wb = xlsx.readFile(expectedFilePath);

  const transfers = xlsx.utils.sheet_to_json(wb.Sheets['Transfers']) as Transfer[];
  await t.expect(transfers.length).gt(0);

  // Check transfer in spreadsheet exists in table
  const rows = await TransferDashboardPage.getFindATransferRows();
  const transferExists = await Promise.all(rows.map((r: TransferRow) => r.transferId.innerText));
  await t.expect(transferExists).contains(transfers[0].id);

  const expectedTransfer = transfers.find( t => t.id[0]);
  //console.log(expectedTransfer);
  await t.expect(expectedTransfer?.senderIdType).ok();
  //await t.expect(expectedTransfer?.senderIdSubValue).ok();
  await t.expect(expectedTransfer?.senderIdValue).ok();
  await t.expect(expectedTransfer?.recipientIdType).ok();
  await t.expect(expectedTransfer?.recipientIdValue).ok();
  //await t.expect(expectedTransfer?.homeTransferId).eql('5105');
  // Delete file
  fs.unlinkSync(expectedFilePath);
});


test.meta({
  ID: '',
  STORY: '',
  description: '',
})('Can download excel spreadsheet of errors', async (t) => {
  const expectedFilePath = `${process.env.HOME}/Downloads/Payment_Manager_Errors_${new Date().toDateString()}.xlsx`;

  var homeTransactionId = uuidv4();
    var transferRequest = {
      from: {
        displayName: 'PayerFirst PayerLast',
        idType: 'MSISDN',
        idValue: `${config.senderpartyID}`,
        extensionList:
          [
            {
              key: 4,
              value: 2
            }
          ]
      },
      to: {
        displayName: 'PartyFirst PartyLast',
        idType: 'MSISDN',
        idValue: `${config.receiverpartyID}`
      },
      amountType: 'SEND',
      currency: `${config.simcurrency}`,
      amount: 1234,
      transactionType: 'TRANSFER',
      note: 'test payment - Success transfer initiated by Automation',
      homeTransactionId: homeTransactionId
    }
    var payloadHeaders = { 'Content-Type': 'application/json' };
    var transferResponse = await apiHelper.getResponseBody('POST', `${config.simCoreConnectorEndpoint}/sendmoney`, JSON.stringify(transferRequest), payloadHeaders);
    await apiHelper.getResponseBody('PUT', `${config.simCoreConnectorEndpoint}/sendmoney/${transferResponse.transferId}`, JSON.stringify({ acceptParty: true }), payloadHeaders);
    transferResponse = await apiHelper.getResponseBody('PUT', `${config.simCoreConnectorEndpoint}/sendmoney/${transferResponse.transferId}`, JSON.stringify({ acceptQuote: true }), payloadHeaders);
   // console.log(transferResponse);


  // Adding `.wait` just as a precaution since this downloads a file.
  await t.maximizeWindow();
  await t.wait(20000);
  var current_url = await t.eval(() => window.location.href);
  await t.navigateTo(current_url);

  await t.click(TransferDashboardPage.downloadErrorsButton).wait(2000);
  await t.expect(fs.existsSync(expectedFilePath)).ok();
  const wb = xlsx.readFile(expectedFilePath);

  const errors = xlsx.utils.sheet_to_json(wb.Sheets['Errors']) as Error[];
  await t.expect(errors.length).gt(0)

  // Check error in spreadsheet exists in table
  const rows = await TransferDashboardPage.getErrorRows();
  const errorExists = await Promise.all(rows.map((r: ErrorRow) => r.transferId.innerText));
  await t.expect(errorExists).contains(errors[0].id);

  // Delete file
  fs.unlinkSync(expectedFilePath);
});

// NOTE: Test harness uses `mojaloop-simulator` so this transaction is hardcoded
//       in the simulator's rules.
// TODO: Update simulator to TTK so we can run more dynamic rules with templating.
test.meta({
  ID: '',
  STORY: '',
  description: '',
})('Will display homeTransactionId in Technical Details if given by Payee DFSP', async (t) => {
  var precision = 100; // 2 decimals
  var randomnum = Math.floor(Math.random() * (10 * precision - 1 * precision) + 1 * precision) / (1*precision);
  var homeTransactionId = "5105";
  var transferRequest = {
    from: {
      displayName: 'PayerFirst PayerLast',
      idType: 'MSISDN',
      idValue: `${config.senderpartyID}`,
      extensionList:
        [
          {
            key: 4,
            value: 2
          }
        ]
    },
    to: {
      displayName: 'PartyFirst PartyLast',
      idType: 'MSISDN',
      idValue: `${config.receiverpartyID}`
    },
    amountType: 'SEND',
    currency: `${config.simcurrency}`,
    amount: randomnum,
    transactionType: 'TRANSFER',
    note: 'test payment - Success transfer initiated by Automation',
    homeTransactionId: homeTransactionId
  }
  var payloadHeaders = { 'Content-Type': 'application/json' };
  var transferResponse = await apiHelper.getResponseBody('POST', `${config.simCoreConnectorEndpoint}/sendmoney`, JSON.stringify(transferRequest), payloadHeaders);
  //console.log(transferResponse);
  await apiHelper.getResponseBody('PUT', `${config.simCoreConnectorEndpoint}/sendmoney/${transferResponse.transferId}`, JSON.stringify({ acceptParty: true }), payloadHeaders);
  transferResponse = await apiHelper.getResponseBody('PUT', `${config.simCoreConnectorEndpoint}/sendmoney/${transferResponse.transferId}`, JSON.stringify({ acceptQuote: true }), payloadHeaders);

 
 
  await t.maximizeWindow()
  await t.wait(5000);
  await t.click(TransferDashboardPage.findATransferButton);
  await t.wait(18000);
  /*await t.click(TransferDashboardPage.findATransferModalSubmit);
  await t.wait(3000);
  console.log(`${transferResponse.transferId}`);
  console.log(randomnum.toString());*/

  // Check transfer in spreadsheet exists in table
  //const transferRow = await TransferDashboardPage.getTransferByAmount(randomnum.toString());//getTransferRowById(`${transferResponse.transferId}`);//.getTransferByAmount(randomnum.toString());//getFirstTransferRow();//getTransferRowById('61797537-a05a-469f-b2f3-059a9cd5bd8d');
  //console.log(transferRow);
  // Open Details Modal
 // await t.click(transferRow);
  await t.typeText(TransferDashboardPage.transferIDTextBox, transferResponse.transferId, { paste: true, replace: false }).wait(10000)
      .click(TransferDashboardPage.findATransferModalSubmit)
      .click(TransferDashboardPage.transferIdList.withText(transferResponse.transferId))
  await t.click(TransferDashboardPage.transferDetailsModalTechnicalDetailsTab);
  await t.expect(await TransferDashboardPage.homeTransferIdField().value).eql('5105')
});

test.meta({
  ID: '',
  STORY: 'MMD-2093',
  description: 'Recipient Name should not have "undefined"',
})
('Recipient Name should NOT have undefined when first name is not provided', async (t) => {

  var precision = 100; // 2 decimals
  var randomnum = Math.floor(Math.random() * (10 * precision - 1 * precision) + 1 * precision) / (1*precision);
  var homeTransactionId = uuidv4();
  var transferRequest = {
    from: {
      firstName: "PayerFirst",
      middleName: "PayerMiddle",
      lastName: "PayerLast",
      idType: 'MSISDN',
      idValue: `${config.senderpartyID}`,
      extensionList:
        [
          {
            key: 4,
            value: 2
          }
        ]
    },
    to: {
      displayName: 'Payeemiddle Payeelast',
      idType: 'MSISDN',
      idValue: `${config.receiverpartyID}`
    },

    amountType: 'SEND',
    currency: `${config.simcurrency}`,
    amount: randomnum,
    transactionType: 'TRANSFER',
    note: 'test payment - Success transfer initiated by Automation',
    homeTransactionId: homeTransactionId
  }
  var payloadHeaders = { 'Content-Type': 'application/json' };
  var transferResponse = await apiHelper.getResponseBody('POST', `${config.simCoreConnectorEndpoint}/sendmoney`, JSON.stringify(transferRequest), payloadHeaders);
  await apiHelper.getResponseBody('PUT', `${config.simCoreConnectorEndpoint}/sendmoney/${transferResponse.transferId}`, JSON.stringify({ acceptParty: true }), payloadHeaders);
  transferResponse = await apiHelper.getResponseBody('PUT', `${config.simCoreConnectorEndpoint}/sendmoney/${transferResponse.transferId}`, JSON.stringify({ acceptQuote: true }), payloadHeaders);

  
  
  await t.maximizeWindow()
  await t.click(TransferDashboardPage.findATransferButton);
  await t.wait(18000);
  /*await t.click(TransferDashboardPage.findATransferModalSubmit);

  // Check transfer in spreadsheet exists in table
  const transferRow = await TransferDashboardPage.getTransferRowById(`${transferResponse.transferId}`);//getTransferByAmount(randomnum.toString());//getTransferRowById('aeac1d9f-2b60-4013-a6e0-a5cfa316a4f6');

  // Open Details Modal
  await t.click(transferRow);*/
  await t.typeText(TransferDashboardPage.transferIDTextBox, transferResponse.transferId, { paste: true, replace: false }).wait(10000)
      .click(TransferDashboardPage.findATransferModalSubmit)
      .click(TransferDashboardPage.transferIdList.withText(transferResponse.transferId))
  
  await t.expect(await TransferDashboardPage.recipientField().value).eql('Payeemiddle Payeelast')
});

test.meta({
  ID: '',
  STORY: 'MMD-2093',
  description: 'Recipient Name should not have "undefined"',
})('Recipient Name should NOT have undefined when middle name is not provided', async (t) => {
  var precision = 100; // 2 decimals
  var randomnum = Math.floor(Math.random() * (10 * precision - 1 * precision) + 1 * precision) / (1*precision);
  var homeTransactionId = uuidv4();
  var transferRequest = {
    from: {
      firstName: "PayerFirst",
      middleName: "PayerMiddle",
      lastName: "PayerLast",
      idType: 'MSISDN',
      idValue: `${config.senderpartyID}`,
      extensionList:
        [
          {
            key: 4,
            value: 2
          }
        ]
    },
    to: {
      displayName: 'Payeefirst Payeelast',
      idType: 'MSISDN',
      idValue: `${config.receiverpartyID}`
    },

    amountType: 'SEND',
    currency: `${config.simcurrency}`,
    amount: randomnum,
    transactionType: 'TRANSFER',
    note: 'test payment - Success transfer initiated by Automation',
    homeTransactionId: homeTransactionId
  }
  var payloadHeaders = { 'Content-Type': 'application/json' };
  var transferResponse = await apiHelper.getResponseBody('POST', `${config.simCoreConnectorEndpoint}/sendmoney`, JSON.stringify(transferRequest), payloadHeaders);
  await apiHelper.getResponseBody('PUT', `${config.simCoreConnectorEndpoint}/sendmoney/${transferResponse.transferId}`, JSON.stringify({ acceptParty: true }), payloadHeaders);
  transferResponse = await apiHelper.getResponseBody('PUT', `${config.simCoreConnectorEndpoint}/sendmoney/${transferResponse.transferId}`, JSON.stringify({ acceptQuote: true }), payloadHeaders);

  await t.maximizeWindow()
  await t.click(TransferDashboardPage.findATransferButton);
  await t.wait(18000);
  /*await t.click(TransferDashboardPage.findATransferModalSubmit);

  // Check transfer in spreadsheet exists in table
  const transferRow = await TransferDashboardPage.getTransferRowById(`${transferResponse.transferId}`);//getTransferByAmount(randomnum.toString());//getTransferRowById('61797537-a05a-469f-b2f3-059a9cd5bd4b');

  // Open Details Modal
  await t.click(transferRow);*/
  await t.typeText(TransferDashboardPage.transferIDTextBox, transferResponse.transferId, { paste: true, replace: false }).wait(10000)
      .click(TransferDashboardPage.findATransferModalSubmit)
      .click(TransferDashboardPage.transferIdList.withText(transferResponse.transferId))
  await t.expect(await TransferDashboardPage.recipientField().value).eql('Payeefirst Payeelast')
});


test.meta({
  ID: '',
  STORY: 'MMD-2093',
  description: 'Recipient Name should not have "undefined"',
})('Recipient Name should NOT have undefined when last name is not provided', async (t) => {
  var precision = 100; // 2 decimals
  var randomnum = Math.floor(Math.random() * (10 * precision - 1 * precision) + 1 * precision) / (1*precision);
  var homeTransactionId = uuidv4();
  var transferRequest = {
    from: {
      firstName: "PayerFirst",
      middleName: "PayerMiddle",
      lastName: "PayerLast",
      idType: 'MSISDN',
      idValue: `${config.senderpartyID}`,
      extensionList:
        [
          {
            key: 4,
            value: 2
          }
        ]
    },
    to: {
      displayName: 'Payeefirst Payeemiddle',
      idType: 'MSISDN',
      idValue: `${config.receiverpartyID}`
    },

    amountType: 'SEND',
    currency: `${config.simcurrency}`,
    amount: randomnum,
    transactionType: 'TRANSFER',
    note: 'test payment - Success transfer initiated by Automation',
    homeTransactionId: homeTransactionId
  }
  var payloadHeaders = { 'Content-Type': 'application/json' };
  var transferResponse = await apiHelper.getResponseBody('POST', `${config.simCoreConnectorEndpoint}/sendmoney`, JSON.stringify(transferRequest), payloadHeaders);
  await apiHelper.getResponseBody('PUT', `${config.simCoreConnectorEndpoint}/sendmoney/${transferResponse.transferId}`, JSON.stringify({ acceptParty: true }), payloadHeaders);
  transferResponse = await apiHelper.getResponseBody('PUT', `${config.simCoreConnectorEndpoint}/sendmoney/${transferResponse.transferId}`, JSON.stringify({ acceptQuote: true }), payloadHeaders);

  
  
  await t.maximizeWindow()
  await t.click(TransferDashboardPage.findATransferButton);
  await t.wait(18000);
  /*await t.click(TransferDashboardPage.findATransferModalSubmit);

  // Check transfer in spreadsheet exists in table
  const transferRow = await TransferDashboardPage.getTransferRowById(`${transferResponse.transferId}`);//.getTransferByAmount(randomnum.toString());//getTransferRowById('61797537-a05a-469f-b2f3-059a9cd5bd5f');

  // Open Details Modal
  await t.click(transferRow);*/
  await t.typeText(TransferDashboardPage.transferIDTextBox, transferResponse.transferId, { paste: true, replace: false }).wait(10000)
      .click(TransferDashboardPage.findATransferModalSubmit)
      .click(TransferDashboardPage.transferIdList.withText(transferResponse.transferId))
  await t.expect(await TransferDashboardPage.recipientField().value).eql('Payeefirst Payeemiddle')
});

test.meta({
  ID: '',
  STORY: 'MMD-2093',
  description: 'Recipient Name should not have "undefined"',
})('Recipient Name should NOT have undefined when first and middle name is not provided', async (t) => {
  var precision = 100; // 2 decimals
  var randomnum = Math.floor(Math.random() * (10 * precision - 1 * precision) + 1 * precision) / (1*precision);
  var homeTransactionId = uuidv4();
  var transferRequest = {
    from: {
      firstName: "PayerFirst",
      middleName: "PayerMiddle",
      lastName: "PayerLast",
      idType: 'MSISDN',
      idValue: `${config.senderpartyID}`,
      extensionList:
        [
          {
            key: 4,
            value: 2
          }
        ]
    },
    to: {
      displayName: 'Payeelast',
      idType: 'MSISDN',
      idValue: `${config.receiverpartyID}`
    },

    amountType: 'SEND',
    currency: `${config.simcurrency}`,
    amount: randomnum,
    transactionType: 'TRANSFER',
    note: 'test payment - Success transfer initiated by Automation',
    homeTransactionId: homeTransactionId
  }
  var payloadHeaders = { 'Content-Type': 'application/json' };
  var transferResponse = await apiHelper.getResponseBody('POST', `${config.simCoreConnectorEndpoint}/sendmoney`, JSON.stringify(transferRequest), payloadHeaders);
  await apiHelper.getResponseBody('PUT', `${config.simCoreConnectorEndpoint}/sendmoney/${transferResponse.transferId}`, JSON.stringify({ acceptParty: true }), payloadHeaders);
  transferResponse = await apiHelper.getResponseBody('PUT', `${config.simCoreConnectorEndpoint}/sendmoney/${transferResponse.transferId}`, JSON.stringify({ acceptQuote: true }), payloadHeaders);

  await t.maximizeWindow()
  await t.click(TransferDashboardPage.findATransferButton);
  await t.wait(18000);
  /*await t.click(TransferDashboardPage.findATransferModalSubmit);

  // Check transfer in spreadsheet exists in table
  const transferRow = await TransferDashboardPage.getTransferRowById(`${transferResponse.transferId}`);//.getTransferByAmount(randomnum.toString());//getTransferRowById('dba4255b-bc34-4e1b-9018-7f4c745915b2');

  // Open Details Modal
  await t.click(transferRow);*/
  await t.typeText(TransferDashboardPage.transferIDTextBox, transferResponse.transferId, { paste: true, replace: false }).wait(10000)
      .click(TransferDashboardPage.findATransferModalSubmit)
      .click(TransferDashboardPage.transferIdList.withText(transferResponse.transferId))
  await t.expect(await TransferDashboardPage.recipientField().value).eql('Payeelast')
});

test.only.meta({
  ID: '',
  STORY: 'MMD-1463',
  description: 'Improved filtering of transactions in advanced filtering screen',
})('Advanced Filtering by direction of funds and payee alias', async (t) => {
  await t.maximizeWindow()
  await t.click(TransferDashboardPage.findATransferButton);
  await t.click(TransferDashboardPage.findATransferModalAdvancedFiltering);

  // Set direction of funds and payee alias
  await t.click(TransferDashboardPage.findATransferModalDirectionOfFundsField);
  await t.click(TransferDashboardPage.findATransferModalDirectionOfFundsOption.withText('Outbound').parent());
  await t.typeText(TransferDashboardPage.findATransferModalPayeeAliasField, `${config.receiverpartyID}`);
  await t.click(TransferDashboardPage.findATransferModalAliasTypeField);
  await t.click(TransferDashboardPage.findATransferModalAliasTypeOption.withText('Msisdn').parent());

  await t.click(TransferDashboardPage.findATransferModalSubmit);

  const transferRows: TransferRow[] = await TransferDashboardPage.getFindATransferRows();

  // Open Details Modal
  for (let i = 0 ; i < transferRows.length; i++) {
    await t.click(transferRows[i].transferId);
    await t.expect(await TransferDashboardPage.transferDetailsModalTechnicalDetailsRecipientDetailsField().value).eql('MSISDN '+`${config.receiverpartyID}`);
    await t.expect(await TransferDashboardPage.transferDetailsModalTechnicalDetailsDirection().value).eql('OUTBOUND');
    await t.click(TransferDashboardPage.findATransferModalCloseButton);
  }

});
