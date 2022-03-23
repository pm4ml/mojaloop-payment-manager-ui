import { Selector } from 'testcafe';
import { config } from '../config';
import { LoginPage } from '../page-objects/pages/LoginPage';
import { ErrorRow, Transfer, TransferDashboardPage, TransferRow, Error } from '../page-objects/pages/TransferDashboardPage';
import fs from 'fs';
import xlsx from 'xlsx';

fixture `Transfer Dashboard Feature`
  .page`${config.pm4mlEndpoint}/transfer`
  .beforeEach(async (t) => {
    // Login if not logged in
    if(Selector('.login-pf-header')) {
      await t.typeText(LoginPage.usernameField, config.credentials.test.username)
      await t.typeText(LoginPage.passwordField, config.credentials.test.password)
      await t.click(LoginPage.loginButton)
    }
  });

test.meta({
  ID: '',
  STORY: '',
  description: '',
})('Can download excel spreadsheet of transfers in basic search', async (t) => {
  const expectedFilePath = `${process.env.HOME}` + '/Downloads/' + `Payment_Manager_Transfers_${new Date().toDateString()}.xlsx`;

  await t.click(TransferDashboardPage.findATransferButton);
  await t.click(TransferDashboardPage.findATransferModalSubmit);
  // Adding `.wait` just as a precaution since this downloads a file.
  await t.click(TransferDashboardPage.findATransferModalTransferDownloadTransfersButton).wait(5000);
  await t.expect(fs.existsSync(expectedFilePath)).ok();
  const wb = xlsx.readFile(expectedFilePath);

  const transfers = xlsx.utils.sheet_to_json(wb.Sheets['Transfers']) as Transfer[];
  console.log(transfers);
  await t.expect(transfers.length).gt(0)

  // Check transfer in spreadsheet exists in table
  const rows = await TransferDashboardPage.getFindATransferRows()
  const transferExists = await Promise.all(rows.map((r: TransferRow) => r.transferId.innerText));
  await t.expect(transferExists).contains(transfers[0].id);

  const expectedTransfer = transfers.find( t => t.id === '61797537-a05a-469f-b2f3-059a9cd5bd8d');
  await t.expect(expectedTransfer?.senderIdType).eql('MSISDN');
  await t.expect(expectedTransfer?.senderIdValue).eql('44123456789');
  await t.expect(expectedTransfer?.recipientIdType).eql('MSISDN');
  await t.expect(expectedTransfer?.recipientIdValue).eql('27713803912');
  await t.expect(expectedTransfer?.homeTransferId).eql('5105');

  // Delete file
  fs.unlinkSync(expectedFilePath);
});


test.meta({
  ID: '',
  STORY: '',
  description: '',
})('Can download excel spreadsheet of transfers in advanced', async (t) => {
  const expectedFilePath = `${process.env.HOME}/Downloads/Payment_Manager_Transfers_${new Date().toDateString()}.xlsx`;

  await t.click(TransferDashboardPage.findATransferButton);
  await t.click(TransferDashboardPage.findATransferModalAdvancedFiltering);
  await t.click(TransferDashboardPage.findATransferModalSubmit);

  // Adding `.wait` just as a precaution since this downloads a file.
  await t.click(TransferDashboardPage.findATransferModalTransferDownloadTransfersButton).wait(5000);
  await t.expect(fs.existsSync(expectedFilePath)).ok();
  const wb = xlsx.readFile(expectedFilePath);

  const transfers = xlsx.utils.sheet_to_json(wb.Sheets['Transfers']) as Transfer[];
  console.log(transfers);
  await t.expect(transfers.length).gt(0);

  // Check transfer in spreadsheet exists in table
  const rows = await TransferDashboardPage.getFindATransferRows();
  const transferExists = await Promise.all(rows.map((r: TransferRow) => r.transferId.innerText));
  await t.expect(transferExists).contains(transfers[0].id);

  const expectedTransfer = transfers.find( t => t.id === '61797537-a05a-469f-b2f3-059a9cd5bd8d');
  await t.expect(expectedTransfer?.senderIdType).eql('MSISDN');
  await t.expect(expectedTransfer?.senderIdValue).eql('44123456789');
  await t.expect(expectedTransfer?.recipientIdType).eql('MSISDN');
  await t.expect(expectedTransfer?.recipientIdValue).eql('27713803912');
  await t.expect(expectedTransfer?.homeTransferId).eql('5105');

  // Delete file
  fs.unlinkSync(expectedFilePath);
});


test.meta({
  ID: '',
  STORY: '',
  description: '',
})('Can download excel spreadsheet of errors', async (t) => {
    const expectedFilePath = `${process.env.HOME}/Downloads/Payment_Manager_Errors_${new Date().toDateString()}.xlsx`;

    // Adding `.wait` just as a precaution since this downloads a file.
    await t.click(TransferDashboardPage.downloadErrorsButton).wait(2000);
    await t.expect(fs.existsSync(expectedFilePath)).ok();
    const wb = xlsx.readFile(expectedFilePath);

    const errors = xlsx.utils.sheet_to_json(wb.Sheets['Errors']) as Error[];
    console.log(errors);
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
  await t.click(TransferDashboardPage.findATransferButton);
  await t.click(TransferDashboardPage.findATransferModalSubmit);

  // Check transfer in spreadsheet exists in table
  const transferRow = await TransferDashboardPage.getTransferRowById('61797537-a05a-469f-b2f3-059a9cd5bd8d');

  // Open Details Modal
  await t.click(transferRow);
  await t.click(TransferDashboardPage.transferDetailsModalTechnicalDetailsTab);
  await t.expect(await TransferDashboardPage.homeTransferIdField().value).eql('5105')
});

test.meta({
  ID: '',
  STORY: 'MMD-2093',
  description: 'Recipient Name should not have "undefined"',
})('Recipient Name should NOT have undefined when first name is not provided', async (t) => {
  await t.click(TransferDashboardPage.findATransferButton);
  await t.click(TransferDashboardPage.findATransferModalSubmit);

  // Check transfer in spreadsheet exists in table
  const transferRow = await TransferDashboardPage.getTransferRowById('aeac1d9f-2b60-4013-a6e0-a5cfa316a4f6');

  // Open Details Modal
  await t.click(transferRow);
  await t.expect(await TransferDashboardPage.recipientField().value).eql('PayeeMiddle PayeeLast')
});

test.meta({
  ID: '',
  STORY: 'MMD-2093',
  description: 'Recipient Name should not have "undefined"',
})('Recipient Name should NOT have undefined when middle name is not provided', async (t) => {
  await t.click(TransferDashboardPage.findATransferButton);
  await t.click(TransferDashboardPage.findATransferModalSubmit);

  // Check transfer in spreadsheet exists in table
  const transferRow = await TransferDashboardPage.getTransferRowById('61797537-a05a-469f-b2f3-059a9cd5bd4b');

  // Open Details Modal
  await t.click(transferRow);
  await t.expect(await TransferDashboardPage.recipientField().value).eql('PayeeFirst PayeeLast')
});


test.meta({
  ID: '',
  STORY: 'MMD-2093',
  description: 'Recipient Name should not have "undefined"',
})('Recipient Name should NOT have undefined when last name is not provided', async (t) => {
  await t.click(TransferDashboardPage.findATransferButton);
  await t.click(TransferDashboardPage.findATransferModalSubmit);

  // Check transfer in spreadsheet exists in table
  const transferRow = await TransferDashboardPage.getTransferRowById('61797537-a05a-469f-b2f3-059a9cd5bd5f');

  // Open Details Modal
  await t.click(transferRow);
  await t.expect(await TransferDashboardPage.recipientField().value).eql('PayeeFirst PayeeMiddle')
});

test.meta({
  ID: '',
  STORY: 'MMD-2093',
  description: 'Recipient Name should not have "undefined"',
})('Recipient Name should NOT have undefined when first and middle name is not provided', async (t) => {
  await t.click(TransferDashboardPage.findATransferButton);
  await t.click(TransferDashboardPage.findATransferModalSubmit);

  // Check transfer in spreadsheet exists in table
  const transferRow = await TransferDashboardPage.getTransferRowById('dba4255b-bc34-4e1b-9018-7f4c745915b2');

  // Open Details Modal
  await t.click(transferRow);
  await t.expect(await TransferDashboardPage.recipientField().value).eql('PayeeLast')
});

test.meta({
  ID: '',
  STORY: 'MMD-1463',
  description: 'Improved filtering of transactions in advanced filtering screen',
})('Advanced Filtering by direction of funds and payee alias', async (t) => {

  await t.click(TransferDashboardPage.findATransferButton);
  await t.click(TransferDashboardPage.findATransferModalAdvancedFiltering).wait(5000);

  // Set direction of funds and payee alias
  await t.typeText(TransferDashboardPage.findATransferModalPayeeAliasField, '27713803912');
  await t.click(TransferDashboardPage.findATransferModalAliasTypeOption.withText('MSISDN').parent()).wait(1000);
  // await t.click(TransferDashboardPage.findATransferModalAliasTypeField).click(TransferDashboardPage.findATransferModalAliasTypeOption.withText('MSISDN'));
  await t.click(TransferDashboardPage.findATransferModalDirectionOfFundsOption.withText('OUTBOUND').parent()).wait(1000);
  // await t.click(TransferDashboardPage.findATransferModalDirectionOfFundsField).click(TransferDashboardPage.findATransferModalDirectionOfFundsOption.withText('OUTBOUND'));

  await t.click(TransferDashboardPage.findATransferModalSubmit);

  // '61797537-a05a-469f-b2f3-059a9cd5bd8d');
  // recipientIdType = 'MSISDN'
  // recipientIdValue = '27713803912'

  const transferRow = await TransferDashboardPage.getTransferRowById('dba4255b-bc34-4e1b-9018-7f4c745915b2');

  // Open Details Modal
  await t.click(transferRow);
  await t.expect(await TransferDashboardPage.transferDetailsModalTechnicalDetailsRecipientDetailsField().value).eql('MSISDN 27713803912');
  await t.expect(await TransferDashboardPage.transferDetailsModalTechnicalDetailsDirection().value).eql('OUTBOUND');

});
