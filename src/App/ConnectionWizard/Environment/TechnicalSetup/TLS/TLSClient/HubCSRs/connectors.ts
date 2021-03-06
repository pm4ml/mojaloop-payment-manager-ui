import { connect } from 'react-redux';
import { State, Dispatch } from 'store/types';
import { getDfspName } from 'App/ConnectionWizard/selectors';
import {
  requestDfspHubCsrsCertificates,
  submitDfspHubCsrsCertificate,
  autogenerateDfspHubCsrsCertificate,
  downloadDfspHubCsrsCertificate,
  showDfspHubCsrsCertificateModal,
  hideDfspHubCsrsCertificateModal,
} from './actions';
import {
  getDfspHubCsrsError,
  getDfspHubCsrsCertificates,
  getDfspHubCsrsCertificateModalContent,
  getDfspHubCsrsCertificateModalTitle,
  getIsDfspHubCsrsCertificateModalVisible,
  getIsDfspHubCsrsPending,
  getIsDfspHubCsrCertificateSigningPendingByEnrollmentId,
  getIsDfspHubCsrCertificateAutoSigningPendingByEnrollmentId,
} from './selectors';

const stateProps = (state: State) => ({
  dfspName: getDfspName(state),
  error: getDfspHubCsrsError(state),
  csrs: getDfspHubCsrsCertificates(state),
  isCertificateModalVisible: getIsDfspHubCsrsCertificateModalVisible(state),
  certificateModalContent: getDfspHubCsrsCertificateModalContent(state),
  certificateModalTitle: getDfspHubCsrsCertificateModalTitle(state),
  isPending: getIsDfspHubCsrsPending(state),
  isCertificateSigningPendingByEnrollmentId: getIsDfspHubCsrCertificateSigningPendingByEnrollmentId(
    state
  ),
  // eslint-disable-next-line max-len
  isCertificateAutoSigningPendingByEnrollmentId: getIsDfspHubCsrCertificateAutoSigningPendingByEnrollmentId(
    state
  ),
});

const actionProps = (dispatch: Dispatch) => ({
  onMount: () => dispatch(requestDfspHubCsrsCertificates()),
  onSignCSRClick: (enrollmentId: number) =>
    dispatch(submitDfspHubCsrsCertificate({ enrollmentId })),
  onCertificateViewClick: (certificate: string, title: string) =>
    dispatch(showDfspHubCsrsCertificateModal({ certificate, title })),
  onCertificateDownloadClick: (certificate: string, cn: string, extension: string) =>
    dispatch(downloadDfspHubCsrsCertificate({ certificate, cn, extension })),
  onCertificateModalCloseClick: () => dispatch(hideDfspHubCsrsCertificateModal()),
  onAutoSignCSRClick: (enrollmentId: number) =>
    dispatch(autogenerateDfspHubCsrsCertificate({ enrollmentId })),
});

export default connect(stateProps, actionProps);
