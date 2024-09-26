import {
  ErrorMessage,
  LinesConfig,
  FxpConversionType,
  FxpConversionStatus,
  FxpConversionDirection,
} from 'App/types';

export const REQUEST_FXPCONVERSIONS_PAGE_DATA = 'FxpConversions / Request Page Data';
export const REQUEST_FXPCONVERSIONS_ERRORS = 'FxpConversions / Request FxpConversions Errors';
export const SET_FXPCONVERSIONS_ERRORS = 'FxpConversions / Set FxpConversions Errors';
export const SET_FXPCONVERSIONS_ERRORS_ERROR = 'FxpConversions / Set FxpConversions Errors Error';
export const TOGGLE_FXPCONVERSIONS_ERRORS_VIEW_ALL =
  'FxpConversions / Select FxpConversions Errors View All';
export const SET_FXPCONVERSIONS_ERRORS_TYPE_FILTER =
  'FxpConversions / Set FxpConversions Errors Type Filter';
export const TOGGLE_FXPCONVERSION_FINDER_MODAL = 'FxpConversions / Open FxpConversion Finder Modal';
export const SET_FXPCONVERSION_FINDER_FILTER = 'FxpConversions / Set FxpConversion Finder Filter';
export const REQUEST_FXPCONVERSIONS = 'FxpConversions / Request FxpConversions';
export const UNREQUEST_FXPCONVERSIONS = 'FxpConversions / Unrequest FxpConversions';
export const SET_FXPCONVERSIONS = 'FxpConversions / Set FxpConversions';

export const SET_FXPCONVERSIONS_ERROR = 'FxpConversions / Set FxpConversions Error';
export const REQUEST_FXPCONVERSIONS_STATUSES = 'FxpConversions / Request FxpConversions Statuses';
export const SET_FXPCONVERSIONS_STATUSES = 'FxpConversions / Set FxpConversions Statuses';
export const SET_FXPCONVERSIONS_STATUSES_ERROR =
  'FxpConversions / Set FxpConversions Statuses Error';

export const REQUEST_FXPCONVERSIONS_SUCCESS_PERC =
  'FxpConversions / Request FxpConversions Success Perc';
export const SET_FXPCONVERSIONS_SUCCESS_PERC = 'FxpConversions / Set FxpConversions Success Perc';
export const SET_FXPCONVERSIONS_SUCCESS_PERC_ERROR =
  'FxpConversions / Set FxpConversions Success Perc Error';
export const REQUEST_FXPCONVERSIONS_AVG_TIME =
  'FxpConversions / Request FxpConversions Average Time';
export const SET_FXPCONVERSIONS_AVG_TIME = 'FxpConversions / Set FxpConversions Average Time';
export const SET_FXPCONVERSIONS_AVG_TIME_ERROR =
  'FxpConversions / Set FxpConversions Average Time Error';

export const REQUEST_FXPCONVERSION_DETAILS = 'FxpConversions / Request FxpConversion Details';
export const TOGGLE_FXPCONVERSION_DETAILS_MODAL =
  'FxpConversions / Select FxpConversions Detail View';
export const SET_FXPCONVERSION_DETAILS_ERROR = 'FxpConversions / Set FxpConversion Details Error';

// FXp Types
export const SET_FXPCONVERSION_DETAILS = 'FxpConversion / Set FxpConversion Details';
export const REQUEST_FXPCONVERSION = 'FxpConversion / Request FxpConversion';
export const UNREQUEST_FXPCONVERSION = 'FxpConversion / UnRequest FxpConversion';
// export interface FxpConversionError {
//   id: string;
//   institution: string;
//   direction: ErrorDirection;
//   type: FxpConversionType;
//   currency: string;
//   value: string;
//   errorType: ErrorType;
//   committedDate: string;
//   receiveAmount?: string;
//   receiveCurrency?: string;
// }

export interface FxpConversionError {
  conversionId: string;
  institution: string;
  direction: ErrorDirection;
  type: FxpConversionType;
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

// export interface FxpConversionFilter {
//   fxpConversionId: string | number | undefined;
//   dates: string | number | undefined;
//   from: string | number | undefined;
//   to: string | number | undefined;
//   aliasType: string | undefined;
//   payeeAlias: string | undefined;
//   aliasSubValue: string | undefined;
//   direction: string | number | undefined;
//   institution: string | number | undefined;
//   status: string | number | undefined;
// }

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

export interface FxpConversion {
  id: string;
  institution: string;
  direction: FxpConversionDirection;
  type: FxpConversionType;
  currency: string;
  amount: string;
  status: FxpConversionStatus;
  initiatedTimestamp: string;
}

export interface FxpConversion {
  conversionId: string;
  institution: string;
  direction: FxpConversionDirection;
  type: FxpConversionType;
  current: string;
  amount: string;
  status: FxpConversionStatus;
  initiatedTimestamp: string;
}

export interface ExtensionListItem {
  key: string;
  value: string;
}

export interface FxpConversionParty {
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

export interface FxpConversionDetailsError {
  httpStatusCode: number;
  mojaloopError?: MojaloopError;
}
// FxpConversionDetailsError
export interface FxpConversionDetailsError {
  httpStatusCode: number;
  mojaloopError?: MojaloopError;
}

export interface FxpConversionTechnicalDetailsApiMessage {
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

export interface SourceAmount {
  amount: string;
  currency: string;
}
export interface TargetAmount {
  amount: string;
  currency: string;
}
export interface FxpConversionAmount {
  amount: string;
  currency: string;
}
export interface totalSourceCurrencyCharges {
  amount: string;
  currency: string;
}
export interface totalTargetCurrencyCharges {
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



export interface FxpConversionTechnicalDetails {
  schemeFxpConversionId: string;
  homeFxpConversionId: string;
  transactionId: string;
  payerParty: FxpConversionParty;
  payeeParty: FxpConversionParty;
  quoteId: string;
  fxpConversionState: string;
  getPartiesRequest?: FxpConversionTechnicalDetailsApiMessage;
  getPartiesResponse?: FxpConversionTechnicalDetailsApiMessage;
  quoteRequest?: FxpConversionTechnicalDetailsApiMessage;
  quoteResponse?: FxpConversionTechnicalDetailsApiMessage;
  fxpConversionPrepare?: FxpConversionTechnicalDetailsApiMessage;
  fxpConversionFulfilment?: FxpConversionTechnicalDetailsApiMessage;
  lastError?: FxpConversionDetailsError;
  conversionId: string;
  conversionState?: string;
  conversionQuoteId: string;
  fxQuoteRequest?: FxpConversionTechnicalDetailsApiMessage;
  fxQuoteResponse?: FxQuoteResponse;
  fxFxpConversionPrepare?: FxpConversionTechnicalDetailsApiMessage;
  fxFxpConversionFulfilment?: FxFxpConversionFulfilment;
}

export interface FxQuoteResponse {
  condition: {};
  conversionTerms: {};
}

export interface FxFxpConversionFulfilment {
  body: {};
}

// export interface FxpConversionTerms {
//   fxpConversionId: string;
//   homeFxpConversionId: string;
//   quoteAmount: QuoteAmount;
//   quoteAmountType: string;
//   fxpConversionAmount: FxpConversionAmount;
//   payeeReceiveAmount: PayeeReceiveAmount;
//   payeeDfspFee: PayeeDfspFee;
//   payeeDfspCommision: PayeeDfspCommision;
//   expiryDate: string;
//   conversionTerms: ConversionTerms;
// }

export interface FxpConversionParties {
  conversionId: string;
  fxpConversionState: string;
  fxpConversionType: string;
  payerParty: FxpConversionParty;
  payeeParty: FxpConversionParty;
  quoteId: string;
  getPartiesRequest?: FxpConversionTechnicalDetailsApiMessage;
  getPartiesResponse?: FxpConversionTechnicalDetailsApiMessage;
  quoteRequest?: FxpConversionTechnicalDetailsApiMessage;
  quoteResponse?: FxpConversionTechnicalDetailsApiMessage;
  fxpConversionPrepare?: FxpConversionTechnicalDetailsApiMessage;
  fxpConversionFulfilment?: FxpConversionTechnicalDetailsApiMessage;
  lastError?: FxpConversionDetailsError;
  fxProviders: string[];
}
// Includes the type property to the FxpConversionDetails Interface.
// export interface FxpConversionsDetails {
//   fxpConversionId: string;
//   fxpConversionState: string;
//   confirmationNumber: number;
//   transactionType: string;
//   sendAmount: string;
//   sendCurrency: string;
//   conversionSubmitted: string;
//   conversionInstitution: string;
//   direction: string;
//   receiveAmount: string;
//   receiveCurrency: string;
//   recipientCurrencies: string;
//   senderDetails: SenderDetails;
//   recipientDetails: RecipientDetails;
//   recipientInstitution: string;
//   initiatedTimestamp: string;
//   dateSubmitted: string;
//   technicalDetails: FxpConversionTechnicalDetails;
//   fxpConversionParties: FxpConversionParties;
//   fxpConversionTerms: FxpConversionTerms;
// }


// Includes the type property to the fxpConversionDetails Interface.
export interface FxpConversionDetails {

  conversionDetails: FxpDetails;
  conversionTerms: FxpConversionTerms;
  technicalDetails: FxpTechnicalDetails;
}

export interface FxpDetails {
  determiningTransferId: string;
  conversionRequestId: string;
  conversionState: string;
  sourceAmount: SourceAmount;
  targetAmount: TargetAmount;
  conversionAcceptedDate: string;
  conversionSettlementBatch: string;
  dfspInstitution: string;
}
export interface FxpConversionTerms {
  determiningTransferId: string;
  conversionId: string;
  conversionState: string;
  quoteAmount: QuoteAmount;
  quoteAmountType: string;
  conversionTerms: ConversionTerms;
}

export interface FxpTechnicalDetails {
  determiningTransferId: string;
  conversionRequestId: string;
  conversionId: string;
  conversionQuoteId: string;
  conversionState: string;
  fxQuoteRequest: FxpConversionTechnicalDetailsApiMessage;
  fxQuoteResponse: FxQuoteResponse;
  fxFxpConversionPrepare?: FxpConversionTechnicalDetailsApiMessage;
  fxFxpConversionFulfil: {
    fxpConversionState: string;
    fulfilment: string;
    completedTimeStamp: string;
  };
  lastError?: FxpConversionDetailsError;
}

export interface ConversionTerms {
  charges:
    {
      totalSourceCurrencyCharges: totalSourceCurrencyCharges;
      totalTargetCurrencyCharges: totalTargetCurrencyCharges;
    }
  ;
  transferAmount:
    {
      sourceAmount: SourceAmount;
      targetAmount: QuoteAmount;
    }
  ;
  exchangeRate: string;
  expiryDate: string;
}

export enum DateRange {
  Today = 'TODAY',
  Past48Hours = 'PAST_48_HOURS',
  OneWeek = '1_WEEK',
  OneMonth = '1_MONTH',
}

export interface FxpConversionsStatus {
  status: FxpConversionStatus;
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

export interface FxpConversionsState {
  fxpConversionsErrors: FxpConversionError[];
  fxpConversionsErrorsError: ErrorMessage;
  isFxpConversionsErrorsViewAllActive: boolean;
  fxpConversionsErrorsTypeFilter?: string;
  isFxpConversionFinderModalVisible: boolean;
  fxpConversionFinderFilter: FxpConversionFilter;
  isFxpConversionsRequested: boolean;
  fxpConversions: FxpConversion[];
  fxpConversionsError: ErrorMessage;
  fxpConversionsStatuses: FxpConversionsStatus[];
  fxpConversionsStatusesError: ErrorMessage;
  fxpConversionsSuccessPerc?: SuccessPerc;
  fxpConversionsSuccessPercError: ErrorMessage;
  fxpConversionsAvgTime?: AvgTime;
  fxpConversionsAvgTimeError: ErrorMessage;
  // fxpConversionDetails?: FxpConversionsDetails;
  fxpConversionDetails?: FxpConversionDetails;
  isFxpConversionDetailsModalVisible: boolean;
  fxpConversionDetailsError: ErrorMessage;
}

// export interface FxpConversionsState {
//   fxpConversionsErrors: FxpConversionError[];
//   fxpConversionsErrorsError: ErrorMessage;
//   isFxpConversionsErrorsViewAllActive: boolean;
//   fxpConversionsErrorsTypeFilter?: string;
//   isFxpConversionFinderModalVisible: boolean;
//   fxpConversionFinderFilter: FxpConversionFilter;
//   isFxpConversionsRequested: boolean;
//   fxpConversion: FxpConversion[];
//   fxpConversions: FxpConversion[];
//   fxpConversionsError: ErrorMessage;
//   fxpConversionsStatuses: FxpConversionsStatus[];
//   fxpConversionsStatusesError: ErrorMessage;
//   fxpConversionsSuccessPerc?: SuccessPerc;
//   fxpConversionsSuccessPercError: ErrorMessage;
//   fxpConversionsAvgTime?: AvgTime;
//   fxpConversionsAvgTimeError: ErrorMessage;
//   fxpConversionDetails?: FxpConversionDetails;

//   isFxpConversionDetailsModalVisible: boolean;
//   fxpConversionDetailsError: ErrorMessage;
// }

export interface RequestFxpConversionsPageDataAction {
  type: typeof REQUEST_FXPCONVERSIONS_PAGE_DATA;
}

export interface RequestFxpConversionsErrorsAction {
  type: typeof REQUEST_FXPCONVERSIONS_ERRORS;
}
// RequestFxpConversionsErrorsAction
export interface RequestFxpConversionsErrorsAction {
  type: typeof REQUEST_FXPCONVERSIONS_ERRORS;
}

export interface SetFxpConversionsErrorsAction {
  type: typeof SET_FXPCONVERSIONS_ERRORS;
  data: FxpConversionError[];
}

// SetFxpConversionErrorsAction
export interface SetFxpConversionErrorsAction {
  type: typeof SET_FXPCONVERSIONS_ERRORS;
  data: FxpConversionError[];
}

export interface SetFxpConversionsErrorsErrorAction {
  type: typeof SET_FXPCONVERSIONS_ERRORS_ERROR;
  error: string;
}

// SetFxpConversionsErrorsErrorAction
export interface SetFxpConversionsErrorsErrorAction {
  type: typeof SET_FXPCONVERSIONS_ERRORS_ERROR;
  error: string;
}

export interface ToggleFxpConversionsErrorsViewAllAction {
  type: typeof TOGGLE_FXPCONVERSIONS_ERRORS_VIEW_ALL;
}

// ToggleFxpConversionsErrorsViewAllAction
export interface ToggleFxpConversionsErrorsViewAllAction {
  type: typeof TOGGLE_FXPCONVERSIONS_ERRORS_VIEW_ALL;
}

export interface SetFxpConversionsErrorsTypeFilterAction {
  type: typeof SET_FXPCONVERSIONS_ERRORS_TYPE_FILTER;
  filter: string;
}

// SetFxpConversionsErrorsTypeFilterAction
export interface SetFxpConversionsErrorsTypeFilterAction {
  type: typeof SET_FXPCONVERSIONS_ERRORS_TYPE_FILTER;
  filter: string;
}

export interface ToggleFxpConversionFinderModalAction {
  type: typeof TOGGLE_FXPCONVERSION_FINDER_MODAL;
}

// ToggleFxpConversionFinderModalAction
export interface ToggleFxpConversionFinderModalAction {
  type: typeof TOGGLE_FXPCONVERSION_FINDER_MODAL;
}

export interface SetFxpConversionFinderFilterAction {
  type: typeof SET_FXPCONVERSION_FINDER_FILTER;
  value: string | number;
  field: string;
}

export interface SetFxpConversionFinderFilterAction {
  type: typeof SET_FXPCONVERSION_FINDER_FILTER;
  value: string | number;
  field: string;
}

// export interface RequestFxpConversionsAction {
//   type: typeof REQUEST_FXPCONVERSIONS;
//   filters: FxpConversionFilter;
// }

// export interface UnrequestFxpConversionsAction {
//   type: typeof UNREQUEST_FXPCONVERSIONS;
// }

export interface SetFxpConversionsAction {
  type: typeof SET_FXPCONVERSIONS;
  data: FxpConversion[];
}

export interface SetFxpConversionsErrorAction {
  type: typeof SET_FXPCONVERSIONS_ERROR;
  error: string;
}

// SetFxpConversionsErrorAction
export interface SetFxpConversionsErrorAction {
  type: typeof SET_FXPCONVERSIONS_ERROR;
  error: string;
}

export interface RequestFxpConversionsStatusesAction {
  type: typeof REQUEST_FXPCONVERSIONS_STATUSES;
}

export interface SetFxpConversionsStatusesAction {
  type: typeof SET_FXPCONVERSIONS_STATUSES;
  data: FxpConversionsStatus[];
}

export interface SetFxpConversionsStatusesErrorAction {
  type: typeof SET_FXPCONVERSIONS_STATUSES_ERROR;
  error: string;
}

export interface RequestFxpConversionsSuccessPercAction {
  type: typeof REQUEST_FXPCONVERSIONS_SUCCESS_PERC;
}

export interface SetFxpConversionsSuccessPercAction {
  type: typeof SET_FXPCONVERSIONS_SUCCESS_PERC;
  data: SuccessPerc;
}

export interface SetFxpConversionsSuccessPercErrorAction {
  type: typeof SET_FXPCONVERSIONS_SUCCESS_PERC_ERROR;
  error: string;
}

export interface RequestFxpConversionsAvgTimeAction {
  type: typeof REQUEST_FXPCONVERSIONS_AVG_TIME;
}

export interface SetFxpConversionsAvgTimeAction {
  type: typeof SET_FXPCONVERSIONS_AVG_TIME;
  data: AvgTime;
}

export interface SetFxpConversionsAvgTimeErrorAction {
  type: typeof SET_FXPCONVERSIONS_AVG_TIME_ERROR;
  error: string;
}

export interface RequestFxpConversionDetailsAction {
  type: typeof REQUEST_FXPCONVERSION_DETAILS;
  conversionId: string;
}
// fxp
export interface RequestFxpConversionDetailsAction {
  type: typeof REQUEST_FXPCONVERSION_DETAILS;
  conversionId: string;
}

// fxp
export interface SetFxpConversionDetailsAction {
  type: typeof SET_FXPCONVERSION_DETAILS;
  data: FxpConversionDetails;
}

export interface ToggleFxpConversionDetailsModalAction {
  type: typeof TOGGLE_FXPCONVERSION_DETAILS_MODAL;
}

export interface SetFxpConversionDetailsErrorAction {
  type: typeof SET_FXPCONVERSION_DETAILS_ERROR;
  error: string;
}

export interface SetFxpConversionDetailsErrorAction {
  // fxp
  type: typeof SET_FXPCONVERSION_DETAILS_ERROR;
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

export type FxpConversionsActionTypes =
  | RequestFxpConversionsPageDataAction
  | RequestFxpConversionsErrorsAction
  | SetFxpConversionsErrorsAction
  | SetFxpConversionsErrorsErrorAction
  | ToggleFxpConversionsErrorsViewAllAction
  | SetFxpConversionsErrorsTypeFilterAction
  | ToggleFxpConversionFinderModalAction
  | ToggleFxpConversionFinderModalAction
  | SetFxpConversionFinderFilterAction
  | RequestFxpConversionsAction
  | UnrequestFxpConversionsAction
  | SetFxpConversionsAction
  | SetFxpConversionsErrorAction
  | RequestFxpConversionsStatusesAction
  | SetFxpConversionsStatusesAction
  | SetFxpConversionsStatusesErrorAction
  | RequestFxpConversionsSuccessPercAction
  | SetFxpConversionsSuccessPercAction
  | SetFxpConversionsSuccessPercErrorAction
  | RequestFxpConversionsAvgTimeAction
  | SetFxpConversionsAvgTimeAction
  | SetFxpConversionsAvgTimeErrorAction
  | RequestFxpConversionDetailsAction
  | SetFxpConversionDetailsAction
  | SetFxpConversionsAction
  | SetFxpConversionDetailsErrorAction
  | UnrequestFxpConversionsAction
  | RequestFxpConversionsAction
  | SetFxpConversionFinderFilterAction
  | SetFxpConversionsAction
  | SetFxpConversionErrorsAction
  | SetFxpConversionsErrorsErrorAction
  | RequestFxpConversionsErrorsAction
  | ToggleFxpConversionsErrorsViewAllAction
  | SetFxpConversionsErrorsTypeFilterAction
  | SetFxpConversionsErrorAction
  | ToggleFxpConversionDetailsModalAction;
