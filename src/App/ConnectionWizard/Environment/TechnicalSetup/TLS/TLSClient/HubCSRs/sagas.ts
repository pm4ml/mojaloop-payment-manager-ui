import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import apis from 'utils/apis';
import { downloadFile, loadFile } from 'utils/html';
import { is20x } from 'utils/http';
import { isCertificate } from 'utils/certificate';
import { showToast, showErrorModal } from 'App/actions';
import { getEnvironmentId, getEnvironmentName } from 'App/ConnectionWizard/selectors';
import {
  SUBMIT_DFSP_HUB_CSRS_CERTIFICATE,
  AUTOGENERATE_DFSP_HUB_CSRS_CERTIFICATE,
  DOWNLOAD_DFSP_HUB_CSRS_CERTIFICATE,
  REQUEST_DFSP_HUB_CSRS_CERTIFICATES,
  SubmitDfspHubCsrsCertificateAction,
  AutogenerateDfspHubCsrsCertificateAction,
  DownloadDfspHubCsrsCertificateAction,
  RequestDfspHubCsrCertificatesAction,
} from './types';
import { setDfspHubCsrsCertificates, setDfspHubCsrsCertificatesError } from './actions';

export function* downloadDfspHubCsrCertificate(action: DownloadDfspHubCsrsCertificateAction) {
  const state = yield select();
  const environmentName = getEnvironmentName(state);
  const filename = `${environmentName}-${action.cn}${action.extension}`;
  yield call(downloadFile, action.certificate, filename);
}

export function* DownloadHubCSRsCertificateSaga() {
  yield takeLatest(DOWNLOAD_DFSP_HUB_CSRS_CERTIFICATE, downloadDfspHubCsrCertificate);
}

function* fetchDfspHubCSRs(
  action:
    | RequestDfspHubCsrCertificatesAction
    | SubmitDfspHubCsrsCertificateAction
    | AutogenerateDfspHubCsrsCertificateAction
) {
  try {
    const state = yield select();
    const environmentId = getEnvironmentId(state);
    const response = yield call(apis.outboundEnrollments.read, { environmentId });

    if (is20x(response.status)) {
      yield put(setDfspHubCsrsCertificates({ certificates: response.data }));
    } else {
      yield put(setDfspHubCsrsCertificatesError({ error: 'Error in fetching DFSP HUB CSRs' }));
    }
  } catch (e) {
    yield put(setDfspHubCsrsCertificatesError({ error: e.message }));
  }
}

export function* RequestHubCSRSSaga() {
  yield takeLatest(REQUEST_DFSP_HUB_CSRS_CERTIFICATES, fetchDfspHubCSRs);
}

function* submitDfspHubCSRCertificate(action: SubmitDfspHubCsrsCertificateAction) {
  let certificate = null;
  let invalid = true;
  try {
    certificate = yield call(loadFile, '.cer');
    invalid = !isCertificate(certificate);
  } catch (e) {
    invalid = true;
  }

  if (invalid) {
    yield put(showErrorModal('The file selected is not a valid certificate'));
    return;
  }

  const state = yield select();
  const environmentId = getEnvironmentId(state);
  const body = { certificate };
  try {
    const response = yield call(apis.outboundEnrollmentCertificate.create, {
      environmentId,
      enrollmentId: action.enrollmentId,
      body,
    });
    if (!is20x(response.status)) {
      yield put(showErrorModal('Error Submitting HUB CSR'));
    } else {
      yield put(showToast());
    }
    yield call(fetchDfspHubCSRs, action);
  } catch (e) {
    yield put(showErrorModal(e.message));
  }
}

export function* SubmitCSRSSaga() {
  yield takeLatest(SUBMIT_DFSP_HUB_CSRS_CERTIFICATE, submitDfspHubCSRCertificate);
}

function* autogenerateDfspHubCSRCertificate(action: AutogenerateDfspHubCsrsCertificateAction) {
  const state = yield select();
  const environmentId = getEnvironmentId(state);
  try {
    const response = yield call(apis.outboundEnrollmentCertificate.create, {
      environmentId,
      enrollmentId: action.enrollmentId,
    });
    if (!is20x(response.status)) {
      yield put(showErrorModal('Error Auto Generating HUB CSR'));
    } else {
      yield put(showToast());
    }
    yield call(fetchDfspHubCSRs, action);
  } catch (e) {
    yield put(showErrorModal(e.message));
  }
}

export function* AutogenerateCSRSSaga() {
  yield takeLatest(AUTOGENERATE_DFSP_HUB_CSRS_CERTIFICATE, autogenerateDfspHubCSRCertificate);
}

export default function* rootSaga() {
  yield all([DownloadHubCSRsCertificateSaga(), RequestHubCSRSSaga(), AutogenerateCSRSSaga()]);
}
