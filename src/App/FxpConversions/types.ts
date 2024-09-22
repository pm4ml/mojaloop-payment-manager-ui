import {
  ErrorMessage,
  LinesConfig,
  TransferType,
  TransferStatus,
  TransferDirection,
} from 'App/types';

export const REQUEST_TRANSFERS_PAGE_DATA = 'Transfers / Request Page Data';
export const REQUEST_TRANSFERS_ERRORS = 'Transfers / Request Transfers Errors';
export const SET_TRANSFERS_ERRORS = 'Transfers / Set Transfers Errors';
export const SET_TRANSFERS_ERRORS_ERROR = 'Transfers / Set Transfers Errors Error';
export const TOGGLE_TRANSFERS_ERRORS_VIEW_ALL = 'Transfers / Select Transfers Errors View All';
export const SET_TRANSFERS_ERRORS_TYPE_FILTER = 'Transfers / Set Transfers Errors Type Filter';
export const TOGGLE_TRANSFER_FINDER_MODAL = 'Transfers / Open Transfer Finder Modal';
export const TOGGLE_FXPCONVERSION_FINDER_MODAL = 'FxpConversions / Open FxpConversion Finder Modal';
export const SET_TRANSFER_FINDER_FILTER = 'Transfers / Set Transfer Finder Filter';
export const REQUEST_TRANSFERS = 'Transfers / Request Transfers';
export const UNREQUEST_TRANSFERS = 'Transfers / Unrequest Transfers';
export const SET_TRANSFERS = 'Transfers / Set Transfers';
export const SET_FXPCONVERSIONS = 'FxpConversion / Set FxpConversion';
export const SET_TRANSFERS_ERROR = 'Transfers / Set Transfers Error';
export const REQUEST_TRANSFERS_STATUSES = 'Transfers / Request Transfers Statuses';
export const SET_TRANSFERS_STATUSES = 'Transfers / Set Transfers Statuses';
export const SET_TRANSFERS_STATUSES_ERROR = 'Transfers / Set Transfers Statuses Error';

export const REQUEST_TRANSFERS_SUCCESS_PERC = 'Transfers / Request Transfers Success Perc';
export const SET_TRANSFERS_SUCCESS_PERC = 'Transfers / Set Transfers Success Perc';
export const SET_TRANSFERS_SUCCESS_PERC_ERROR = 'Transfers / Set Transfers Success Perc Error';
export const REQUEST_TRANSFERS_AVG_TIME = 'Transfers / Request Transfers Average Time';
export const SET_TRANSFERS_AVG_TIME = 'Transfers / Set Transfers Average Time';
export const SET_TRANSFERS_AVG_TIME_ERROR = 'Transfers / Set Transfers Average Time Error';

export const REQUEST_TRANSFER_DETAILS = 'Transfers / Request Transfer Details';
//export const SET_TRANSFER_DETAILS = 'Transfers / Set Transfer Details';
export const TOGGLE_TRANSFER_DETAILS_MODAL = 'Transfers / Select Transfers Detail View';
export const SET_TRANSFER_DETAILS_ERROR = 'Transfers / Set Transfer Details Error';

//FXp Types
export const SET_FXPCONVERSION_DETAILS = 'FxpConversion / Set FxpConversion Details';
export const REQUEST_FXPCONVERSION_DETAILS = 'FxpConversion / Request FxpConversion Details';

export const REQUEST_FXPCONVERSION = 'FxpConversion / Request FxpConversion';
export const UNREQUEST_FXPCONVERSION = 'FxpConversion / UnRequest FxpConversion';
export const SET_FXPCONVERSION_FINDER_FILTER = 'FxpConversion / Set FxpConversion Finder Filter';

export interface TransferError {
  id: string;
  institution: string;
  direction: ErrorDirection;
  type: TransferType;
  currency: string;
  value: string;
  errorType: ErrorType;
  committedDate: string;
  receiveAmount?: string;
  receiveCurrency?: string;
}

export enum ErrorDirection {
  Inbound = 'INBOUND',
  Outbound = 'OUTBOUND',
}

export enum ErrorType {
  FromHub = 'FROM HUB',
  FromInstitution = 'FROM INSTITUTION',
  InvalidSignature = 'INVALID SIGNATURE',
  PayerFspInsufficientLiquidity = 'PAYER FSP INSUFFICIENT LIQUIDITY',
  PayerRejection = 'PAYER REJECTION',
  PayerRejectedTxnRequest = 'PAYER REJECTED TXN REQUEST',
  PayerLimitError = 'PAYER LIMIT ERROR',
  PayeeFspInsufficientLiquidity = 'PAYEE FSP INSUFFICIENT LIQUIDITY',
  PayeeRejectedQuote = 'PAYEE REJECTED QUOTE',
  PayeeFspRejectedQuote = 'PAYEE FSP REJECTED QUOTE',
  PayeeRejectedTxn = 'PAYEE REJECTED TXN',
  PayeeFspRejectedTxn = 'PAYEE FSP REJECTED TXN',
  PayeeUnsupportedCurrency = 'PAYEE UNSUPPORTED CURRENCY',
  PayeeLimitError = 'PAYEE LIMIT ERROR',
}

export interface TransferFilter {
  transferId: string | number | undefined;
  dates: string | number | undefined;
  from: string | number | undefined;
  to: string | number | undefined;
  aliasType: string | undefined;
  payeeAlias: string | undefined;
  aliasSubValue: string | undefined;
  direction: string | number | undefined;
  institution: string | number | undefined;
  status: string | number | undefined;
}

export interface FxpConversionFilter {
  conversionId: string | number | undefined;
  dates: string | number | undefined;
  from: string | number | undefined;
  to: string | number | undefined;
  aliasType: string | undefined;
  payeeAlias: string | undefined;
  aliasSubValue: string | undefined;
  direction: string | number | undefined;
  institution: string | number | undefined;
  status: string | number | undefined;
}

export interface Transfer {
  id: string;
  institution: string;
  direction: TransferDirection;
  type: TransferType;
  currency: string;
  amount: string;
  status: TransferStatus;
  initiatedTimestamp: string;
}

export interface FxpConversion {
  id: string;
  institution: string;
  direction: TransferDirection;
  type: TransferType;
  currency: string;
  amount: string;
  status: TransferStatus;
  initiatedTimestamp: string;
}

export interface ExtensionListItem {
  key: string;
  value: string;
}

export interface TransferParty {
  type: string;
  idType: string;
  idValue: string;
  idSubValue?: string;
  displayName: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth?: string;
  merchantClassificationCode?: string;
  fspId: string;
  supportedCurrencies: string[];
  extensionList?: ExtensionListItem[];
}

export interface MojaloopError {
  errorInformation: MojaloopErrorInformation;
}

export interface MojaloopErrorInformation {
  errorCode: string;
  errorDescription: string;
  extensionList?: ExtensionListItem[];
}

export interface TransferDetailsError {
  httpStatusCode: number;
  mojaloopError?: MojaloopError;
}

export interface TransferTechnicalDetailsApiMessage {
  headers?: object;
  body?: object;
}

export interface SenderDetails {
  idType: string;
  idValue: string;
}

export interface RecipientDetails {
  idType: string;
  idValue: string;
}

export interface QuoteAmount {
  amount: string;
  currency: string;
}

export interface TransferAmount {
  amount: string;
  currency: string;
}

export interface PayeeReceiveAmount {
  amount: string;
  currency: string;
}

export interface PayeeDfspFee {
  amount: string;
  currency: string;
}

export interface PayeeDfspCommision {
  amount: string;
  currency: string;
}

export interface ConversionTerms {
  transferAmount: {
    amount: string;
    currency: string;
  };
  charges?: [
    {
      chargeType: string;
      sourceAmount?: {
        amount: string;
        currency: string;
      };
      targetAmount?: {
        amount: string;
        currency: string;
      };
    }
  ];
  exchangeRate: string;
  expiryDate: string;
}

export interface TransferTechnicalDetails {
  schemeTransferId: string;
  homeTransferId: string;
  transactionId: string;
  payerParty: TransferParty;
  payeeParty: TransferParty;
  quoteId: string;
  transferState: string;
  getPartiesRequest?: TransferTechnicalDetailsApiMessage;
  getPartiesResponse?: TransferTechnicalDetailsApiMessage;
  quoteRequest?: TransferTechnicalDetailsApiMessage;
  quoteResponse?: TransferTechnicalDetailsApiMessage;
  transferPrepare?: TransferTechnicalDetailsApiMessage;
  transferFulfilment?: TransferTechnicalDetailsApiMessage;
  lastError?: TransferDetailsError;
  conversionId: string;
  conversionState?: string;
  conversionQuoteId: string;
  fxQuoteRequest?: TransferTechnicalDetailsApiMessage;
  fxQuoteResponse?: FxQuoteResponse;
  fxTransferPrepare?: TransferTechnicalDetailsApiMessage;
  fxTransferFulfilment?: FxTransferFulfilment;
}

export interface FxQuoteResponse {
  condition: {};
  conversionTerms: {};
}

export interface FxTransferFulfilment {
  body: {};
}

export interface TransferTerms {
  transferId: string;
  homeTransferId: string;
  quoteAmount: QuoteAmount;
  quoteAmountType: string;
  transferAmount: TransferAmount;
  payeeReceiveAmount: PayeeReceiveAmount;
  payeeDfspFee: PayeeDfspFee;
  payeeDfspCommision: PayeeDfspCommision;
  expiryDate: string;
  conversionTerms: ConversionTerms;
}

export interface TransferParties {
  transferId: string;
  transferState: string;
  transferType: string;
  payerParty: TransferParty;
  payeeParty: TransferParty;
  quoteId: string;
  getPartiesRequest?: TransferTechnicalDetailsApiMessage;
  getPartiesResponse?: TransferTechnicalDetailsApiMessage;
  quoteRequest?: TransferTechnicalDetailsApiMessage;
  quoteResponse?: TransferTechnicalDetailsApiMessage;
  transferPrepare?: TransferTechnicalDetailsApiMessage;
  transferFulfilment?: TransferTechnicalDetailsApiMessage;
  lastError?: TransferDetailsError;
  fxProviders: string[];
}
// Includes the type property to the TransferDetails Interface.
export interface TransfersDetails {
  transferId: string;
  transferState: string;
  confirmationNumber: number;
  transactionType: string;
  sendAmount: string;
  sendCurrency: string;
  conversionSubmitted: string;
  conversionInstitution: string;
  direction: string;
  receiveAmount: string;
  receiveCurrency: string;
  recipientCurrencies: string;
  senderDetails: SenderDetails;
  recipientDetails: RecipientDetails;
  recipientInstitution: string;
  initiatedTimestamp: string;
  dateSubmitted: string;
  technicalDetails: TransferTechnicalDetails;
  transferParties: TransferParties;
  transferTerms: TransferTerms;
}

// Includes the type property to the fxpConversionDetails Interface.
export interface FxpConversionDetails {
  determiningTransferId: string;
  conversionId: string;
  conversionState: string;
  sourceAmount: number;
  sourceCurrency: string;
  targetAmount: string;
  sendCurrency: string;
  conversionAcceptedDate: string;
  conversionSettlementBatch: string;
  dfspInstitution: string;
  FxpConversionTerms: FxpConversionTerms;
  FxpTechnicalDetails: FxpTechnicalDetails;
}

export interface FxpConversionTerms {
  determiningTransferId: string;
  conversionState: string;
  quoteAmount: number;
  quoteAmountType: string;
  transferAmount: TransferAmount;
  totalSourceCharges: {
    amount: String;
    currency: string;
  };
  totalTargetCharges: {
    amount: String;
    currency: string;
  };
  exchangeRate: number;
  expiryDateTime: string;
}

export interface FxpTechnicalDetails {
  determiningTransferId: string;
  conversionId: string;
  conversionQuoteId: string;
  conversionState: string;
  fxQuoteRequest: TransferTechnicalDetailsApiMessage;
  fxQuoteResponse: FxQuoteResponse;
  fxTransferPrepare?: TransferTechnicalDetailsApiMessage;
  fxTransferFulfil: {
    transferState: string;
    fulfilment: string;
    completedTimeStamp: string;
  };
  lastError?: TransferDetailsError;
}

export enum DateRange {
  Today = 'TODAY',
  Past48Hours = 'PAST_48_HOURS',
  OneWeek = '1_WEEK',
  OneMonth = '1_MONTH',
}

export interface TransfersStatus {
  status: TransferStatus;
  count: number;
}

export interface SuccessPerc extends LinesConfig {}
export interface SuccessPercApi {
  timestamp: number;
  percentage: number;
}

export interface AvgTime extends LinesConfig {}
export interface AvgTimeApi {
  timestamp: number;
  averageResponseTime: number;
}

export interface TransfersState {
  transfersErrors: TransferError[];
  transfersErrorsError: ErrorMessage;
  isTransfersErrorsViewAllActive: boolean;
  transfersErrorsTypeFilter?: string;
  isTransferFinderModalVisible: boolean;
  transferFinderFilter: TransferFilter;
  isTransfersRequested: boolean;
  transfers: Transfer[];
  transfersError: ErrorMessage;
  transfersStatuses: TransfersStatus[];
  transfersStatusesError: ErrorMessage;
  transfersSuccessPerc?: SuccessPerc;
  transfersSuccessPercError: ErrorMessage;
  transfersAvgTime?: AvgTime;
  transfersAvgTimeError: ErrorMessage;
  transferDetails?: TransfersDetails;
  fxpConversionDetails?: FxpConversionDetails;
  isTransferDetailsModalVisible: boolean;
  transferDetailsError: ErrorMessage;
}

export interface FxpConversionsState {
  //fxpConversionFinderFilter: any;
  transfersErrors: TransferError[];
  transfersErrorsError: ErrorMessage;
  isTransfersErrorsViewAllActive: boolean;
  transfersErrorsTypeFilter?: string;
  isTransferFinderModalVisible: boolean;
  transferFinderFilter: TransferFilter;
  fxpConversionFinderFilter: FxpConversionFilter;
  isTransfersRequested: boolean;
  transfers: Transfer[];
  fxpConversions: FxpConversion [];
  transfersError: ErrorMessage;
  transfersStatuses: TransfersStatus[];
  transfersStatusesError: ErrorMessage;
  transfersSuccessPerc?: SuccessPerc;
  transfersSuccessPercError: ErrorMessage;
  transfersAvgTime?: AvgTime;
  transfersAvgTimeError: ErrorMessage;
  fxpConversionDetails?: FxpConversionDetails;
  
  isTransferDetailsModalVisible: boolean;
  transferDetailsError: ErrorMessage;
}

export interface RequestTransfersPageDataAction {
  type: typeof REQUEST_TRANSFERS_PAGE_DATA;
}

export interface RequestTransfersErrorsAction {
  type: typeof REQUEST_TRANSFERS_ERRORS;
}

export interface SetTransfersErrorsAction {
  type: typeof SET_TRANSFERS_ERRORS;
  data: TransferError[];
}

export interface SetTransfersErrorsErrorAction {
  type: typeof SET_TRANSFERS_ERRORS_ERROR;
  error: string;
}

export interface ToggleTransfersErrorsViewAllAction {
  type: typeof TOGGLE_TRANSFERS_ERRORS_VIEW_ALL;
}

export interface SetTransfersErrorsTypeFilterAction {
  type: typeof SET_TRANSFERS_ERRORS_TYPE_FILTER;
  filter: string;
}

export interface ToggleTransferFinderModalAction {
  type: typeof TOGGLE_TRANSFER_FINDER_MODAL;
}

export interface ToggleFxpConversionFinderModalAction {
  type: typeof TOGGLE_FXPCONVERSION_FINDER_MODAL;
}

export interface SetTransferFinderFilterAction {
  type: typeof SET_TRANSFER_FINDER_FILTER;
  value: string | number;
  field: string;
}

export interface SetFxpConversionFinderFilterAction {
  type: typeof SET_FXPCONVERSION_FINDER_FILTER;
  value: string | number;
  field: string;
}


export interface RequestTransfersAction {
  type: typeof REQUEST_TRANSFERS;
  filters: TransferFilter;
}

export interface UnrequestTransfersAction {
  type: typeof UNREQUEST_TRANSFERS;
}

export interface SetTransfersAction {
  type: typeof SET_TRANSFERS;
  data: Transfer[];
}

export interface SetTransfersErrorAction {
  type: typeof SET_TRANSFERS_ERROR;
  error: string;
}

export interface RequestTransfersStatusesAction {
  type: typeof REQUEST_TRANSFERS_STATUSES;
}

export interface SetTransfersStatusesAction {
  type: typeof SET_TRANSFERS_STATUSES;
  data: TransfersStatus[];
}

export interface SetTransfersStatusesErrorAction {
  type: typeof SET_TRANSFERS_STATUSES_ERROR;
  error: string;
}

export interface RequestTransfersSuccessPercAction {
  type: typeof REQUEST_TRANSFERS_SUCCESS_PERC;
}

export interface SetTransfersSuccessPercAction {
  type: typeof SET_TRANSFERS_SUCCESS_PERC;
  data: SuccessPerc;
}

export interface SetTransfersSuccessPercErrorAction {
  type: typeof SET_TRANSFERS_SUCCESS_PERC_ERROR;
  error: string;
}

export interface RequestTransfersAvgTimeAction {
  type: typeof REQUEST_TRANSFERS_AVG_TIME;
}

export interface SetTransfersAvgTimeAction {
  type: typeof SET_TRANSFERS_AVG_TIME;
  data: AvgTime;
}

export interface SetTransfersAvgTimeErrorAction {
  type: typeof SET_TRANSFERS_AVG_TIME_ERROR;
  error: string;
}

export interface RequestTransferDetailsAction {
  type: typeof REQUEST_TRANSFER_DETAILS;
  transferId: string;
}
// fxp
export interface RequestFxpConversionDetailsAction {
  type: typeof REQUEST_FXPCONVERSION_DETAILS;
  conversionId: string;
}

// export interface SetTransferDetailsAction {
//   type: typeof SET_TRANSFER_DETAILS;
//   data: FxpConversionDetails;
// }

//fxp
export interface SetFxpConversionDetailsAction {
  type: typeof SET_FXPCONVERSION_DETAILS;
  data: FxpConversionDetails;
}

export interface ToggleTransferDetailsModalAction {
  type: typeof TOGGLE_TRANSFER_DETAILS_MODAL;
}

export interface SetTransferDetailsErrorAction {
  type: typeof SET_TRANSFER_DETAILS_ERROR;
  error: string;
}

export interface SetFxpConversionDetailsErrorAction { //fxp
  type: typeof SET_TRANSFER_DETAILS_ERROR;
  error: string;
}

export interface SetFxpConversionsAction {
  type: typeof SET_FXPCONVERSIONS;
  data: FxpConversion[];
}

export interface RequestFxpConversionsAction {
  type: typeof REQUEST_FXPCONVERSION;
  filters: FxpConversionFilter;
}

export interface UnrequestFxpConversionsAction {
  type: typeof UNREQUEST_FXPCONVERSION;
}

export type TransfersActionTypes =
  | RequestTransfersPageDataAction
  | RequestTransfersErrorsAction
  | SetTransfersErrorsAction
  | SetTransfersErrorsErrorAction
  | ToggleTransfersErrorsViewAllAction
  | SetTransfersErrorsTypeFilterAction
  | ToggleTransferFinderModalAction
  | ToggleFxpConversionFinderModalAction
  | SetTransferFinderFilterAction
  | RequestTransfersAction
  | UnrequestTransfersAction
  | SetTransfersAction
  | SetTransfersErrorAction
  | RequestTransfersStatusesAction
  | SetTransfersStatusesAction
  | SetTransfersStatusesErrorAction
  | RequestTransfersSuccessPercAction
  | SetTransfersSuccessPercAction
  | SetTransfersSuccessPercErrorAction
  | RequestTransfersAvgTimeAction
  | SetTransfersAvgTimeAction
  | SetTransfersAvgTimeErrorAction
  | RequestTransferDetailsAction
  | SetFxpConversionDetailsAction
  | SetFxpConversionsAction
  | SetFxpConversionDetailsErrorAction
  | UnrequestFxpConversionsAction
  | RequestFxpConversionsAction
  | FxpConversionFilter
  | SetFxpConversionsAction
  | ToggleTransferDetailsModalAction;
