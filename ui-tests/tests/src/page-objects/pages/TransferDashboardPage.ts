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
  findATransferButton: Selector('.mb-input').withText('Find a Transfer'),
  downloadErrorsButton: Selector('.transfers__errors__download__button'),
  viewAllErrorsButton: Selector('.transfers__errors__button'),

  findATransferModal: () => Selector('.el-modal__header-title')
    .withText(`Find a Transfer`)
    .parent().parent('.el-modal__container'),

  findATransferModalBasicFindTransferTab: Selector('.el-tabs__tab-item').withText('Basic Find a Transfer'),
  findATransferModalAdvancedFiltering: Selector('.el-tabs__tab-item').withText('Advanced Filtering'),

  findATransferModalTransferDownloadTransfersButton: Selector('.mb-input').withText('Download Transfers'),
  findATransferModalTransferIdField: Selector('.find-transfer-modal__transfer-id input'),
  findATransferModalDateField: Selector('.find-transfer-modal__date input'),
  findATransferModalFromDateField: Selector('.find-transfer-modal__from-date input'),
  findATransferModalToDateField: Selector('.find-transfer-modal__to-date input'),
  findATransferModalInstitutionField: Selector('.find-transfer-modal__institution input'),
  findATransferModalTransferStatusField: Selector('.find-transfer-modal__transfer-status input'),
  findATransferModalSubmit: Selector('.el-modal__submit'),
  findATransferModalCloseButton: Selector('.input-button__content').withText('Close'),


  transferDetailsModalBasicInformationTab: Selector('.el-tabs__tab-item').withText('Basic Information'),
  transferDetailsModalTechnicalDetailsTab: Selector('.el-tabs__tab-item').withText('Technical Details'),
  homeTransferIdField: Selector('#transfer-details-modal__home-transfer-id'),

  async getTransferRowById(innerText: string): Promise<Selector> {
    return Selector('.transfers__transfers__list .el-datalist__row').withText(innerText);
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
