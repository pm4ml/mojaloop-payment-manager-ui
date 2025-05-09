import { Selector } from "testcafe";

export const ConnectionHealthDropdownComponent = {
  connectionStatusContainer: Selector(".connection-status-container"),
  dropdownButton: Selector(".connection-status-button"),
  dropdownContent: Selector(".connection-dropdown"),
  recreateJWSButton: Selector("button").withText("Recreate JWS"),
  recreateOutboundTLSButton: Selector("button").withText("Recreate Outbound TLS"),
  recreateJWSSubmitButton: Selector("button").withText("Recreate JWS Certificates/Keys"),
  recreateOutboundTLSSubmitButton: Selector("button").withText("Recreate outboundTLS Certificates/Keys"),
  modalContainer: Selector(".el-modal__container"),
  modalTitleJWS: Selector(".el-modal__header-title").withText("Recreate JWS Certificates/Keys"),
  modalTitleTLS: Selector(".el-modal__header-title").withText("Recreate outboundTLS Certificates/Keys"),
  modalHeaderCloseButton: Selector(".el-modal__header-close"),
  modalFooterCloseButton: Selector(".el-modal__footer .el-modal__close"),
  connectionStatusIndicatorColor: Selector(".connection-status-indicator-color"),
  connectionStatusMessage: Selector(".connection-status-message"),
  recreateReasonInput: Selector("#cert-recreate-reason"),

  ConnectionStatusMessage: Selector(".connection-status-message"),
};
