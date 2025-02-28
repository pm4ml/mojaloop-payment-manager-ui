const lastUpdated = new Date().toISOString();

export const mockStateAllErrorResponse = {
  fetchingHubCA: {
    status: 'inError',
    stateDescription: `Connection Error (Last Updated: ${lastUpdated})`,
    errorDescription: 'Failed to fetch Hub CA details - Network Timeout',
  },
  creatingDFSPCA: {
    status: 'inError',
    stateDescription: `Operation Failed (Last Updated: ${lastUpdated})`,
    errorDescription: 'DFSP CA creation failed - Certificate Signing Error',
  },
  creatingDfspClientCert: {
    status: 'inError',
    stateDescription: `Validation Error (Last Updated: ${lastUpdated})`,
    errorDescription: 'Invalid client certificate parameters - Missing Subject Name',
  },
  creatingDfspServerCert: {
    status: 'inError',
    stateDescription: `Configuration Error (Last Updated: ${lastUpdated})`,
    errorDescription: 'Server certificate generation failed - Invalid Key Length',
  },
  creatingHubClientCert: {
    status: 'inError',
    stateDescription: `Access Denied (Last Updated: ${lastUpdated})`,
    errorDescription: 'Hub client certificate storage failed - Permission Denied',
  },
  pullingPeerJWS: {
    status: 'inError',
    stateDescription: `Fetch Error (Last Updated: ${lastUpdated})`,
    errorDescription: 'Error retrieving peer JWS key - API Not Responding',
  },
  uploadingPeerJWS: {
    status: 'inError',
    stateDescription: `Upload Failed (Last Updated: ${lastUpdated})`,
    errorDescription: 'Failed to upload peer JWS key - Storage Quota Exceeded',
  },
  creatingJWS: {
    status: 'inError',
    stateDescription: `Connection Error (Last Updated: ${lastUpdated})`,
    errorDescription: 'Error writing JWS key to vault - Access Denied',
  },
  endpointConfig: {
    status: 'inError',
    stateDescription: `Configuration Error (Last Updated: ${lastUpdated})`,
    errorDescription: 'Endpoint configuration validation failed - Missing Endpoint URL',
  },
  connectorConfig: {
    status: 'inError',
    stateDescription: `Initialization Failed (Last Updated: ${lastUpdated})`,
    errorDescription: 'Connector configuration error - Unrecognized Protocol',
  },
  progressMonitor: {
    status: 'inError',
    stateDescription: `Monitoring Error (Last Updated: ${lastUpdated})`,
    errorDescription: 'Progress monitoring service stopped unexpectedly - Internal Server Error',
  },
};

export const mockStateInErrorResponse = {
  fetchingHubCA: {
    status: 'completed',
    stateDescription: `Completed (Last Updated: ${lastUpdated})`,
    errorDescription: '',
  },
  creatingDFSPCA: {
    status: 'completed',
    stateDescription: `Completed (Last Updated: ${lastUpdated})`,
    errorDescription: '',
  },
  creatingDfspClientCert: {
    status: 'completed',
    stateDescription: `Completed (Last Updated: ${lastUpdated})`,
    errorDescription: '',
  },
  creatingDfspServerCert: {
    status: 'completed',
    stateDescription: `Completed (Last Updated: ${lastUpdated})`,
    errorDescription: '',
  },
  creatingHubClientCert: {
    status: 'completed',
    stateDescription: `Completed (Last Updated: ${lastUpdated})`,
    errorDescription: '',
  },
  pullingPeerJWS: {
    status: 'inProgress',
    stateDescription: `In Progress (Last Updated: ${lastUpdated})`,
    errorDescription: '',
  },
  uploadingPeerJWS: {
    status: 'inProgress',
    stateDescription: `In Progress (Last Updated: ${lastUpdated})`,
    errorDescription: '',
  },
  creatingJWS: {
    status: 'inError',
    stateDescription: `Connection Error (Last Updated: ${lastUpdated})`,
    errorDescription: 'Error writing JWS key to vault - Access Denied',
  },
  endpointConfig: {
    status: 'pending',
    stateDescription: `Pending (Last Updated: ${lastUpdated})`,
    errorDescription: '',
  },
  connectorConfig: {
    status: 'pending',
    stateDescription: `Pending (Last Updated: ${lastUpdated})`,
    errorDescription: '',
  },
  progressMonitor: {
    status: 'completed',
    stateDescription: `Completed (Last Updated: ${lastUpdated})`,
    errorDescription: '',
  },
};

export const mockStateCompletedResponse = {
  fetchingHubCA: {
    status: 'completed',
    stateDescription: `Completed (Last Updated: ${lastUpdated})`,
    errorDescription: '',
  },
  creatingDFSPCA: {
    status: 'completed',
    stateDescription: `Completed (Last Updated: ${lastUpdated})`,
    errorDescription: '',
  },
  creatingDfspClientCert: {
    status: 'completed',
    stateDescription: `Completed (Last Updated: ${lastUpdated})`,
    errorDescription: '',
  },
  creatingDfspServerCert: {
    status: 'completed',
    stateDescription: `Completed (Last Updated: ${lastUpdated})`,
    errorDescription: '',
  },
  creatingHubClientCert: {
    status: 'completed',
    stateDescription: `Completed (Last Updated: ${lastUpdated})`,
    errorDescription: '',
  },
  pullingPeerJWS: {
    status: 'completed',
    stateDescription: `Completed (Last Updated: ${lastUpdated})`,
    errorDescription: '',
  },
  uploadingPeerJWS: {
    status: 'completed',
    stateDescription: `Completed (Last Updated: ${lastUpdated})`,
    errorDescription: '',
  },
  creatingJWS: {
    status: 'completed',
    stateDescription: `Completed (Last Updated: ${lastUpdated})`,
    errorDescription: '',
  },
  endpointConfig: {
    status: 'completed',
    stateDescription: `Completed (Last Updated: ${lastUpdated})`,
    errorDescription: '',
  },
  connectorConfig: {
    status: 'completed',
    stateDescription: `Completed (Last Updated: ${lastUpdated})`,
    errorDescription: '',
  },
  progressMonitor: {
    status: 'completed',
    stateDescription: `Completed (Last Updated: ${lastUpdated})`,
    errorDescription: '',
  },
};

export const mockStatePendingResponse = {
  fetchingHubCA: {
    status: 'pending',
    stateDescription: `Pending (Last Updated: ${lastUpdated})`,
    errorDescription: '',
  },
  creatingDFSPCA: {
    status: 'pending',
    stateDescription: `Pending (Last Updated: ${lastUpdated})`,
    errorDescription: '',
  },
  creatingDfspClientCert: {
    status: 'pending',
    stateDescription: `Pending (Last Updated: ${lastUpdated})`,
    errorDescription: '',
  },
  creatingDfspServerCert: {
    status: 'pending',
    stateDescription: `Pending (Last Updated: ${lastUpdated})`,
    errorDescription: '',
  },
  creatingHubClientCert: {
    status: 'pending',
    stateDescription: `Pending (Last Updated: ${lastUpdated})`,
    errorDescription: '',
  },
  pullingPeerJWS: {
    status: 'pending',
    stateDescription: `Pending (Last Updated: ${lastUpdated})`,
    errorDescription: '',
  },
  uploadingPeerJWS: {
    status: 'pending',
    stateDescription: `Pending (Last Updated: ${lastUpdated})`,
    errorDescription: '',
  },
  creatingJWS: {
    status: 'pending',
    stateDescription: `Pending (Last Updated: ${lastUpdated})`,
    errorDescription: '',
  },
  endpointConfig: {
    status: 'pending',
    stateDescription: `Pending (Last Updated: ${lastUpdated})`,
    errorDescription: '',
  },
  connectorConfig: {
    status: 'pending',
    stateDescription: `Pending (Last Updated: ${lastUpdated})`,
    errorDescription: '',
  },
  progressMonitor: {
    status: 'pending',
    stateDescription: `Pending (Last Updated: ${lastUpdated})`,
    errorDescription: '',
  },
};

export const mockStateOtherResponse = {
  fetchingHubCA: {
    status: 'completed',
    stateDescription: `Completed (Last Updated: ${lastUpdated})`,
    errorDescription: '',
  },
  creatingDFSPCA: {
    status: 'completed',
    stateDescription: `Completed (Last Updated: ${lastUpdated})`,
    errorDescription: '',
  },
  creatingDfspClientCert: {
    status: 'completed',
    stateDescription: `Completed (Last Updated: ${lastUpdated})`,
    errorDescription: '',
  },
  creatingDfspServerCert: {
    status: 'completed',
    stateDescription: `Completed (Last Updated: ${lastUpdated})`,
    errorDescription: '',
  },
  creatingHubClientCert: {
    status: 'completed',
    stateDescription: `Completed (Last Updated: ${lastUpdated})`,
    errorDescription: '',
  },
  pullingPeerJWS: {
    status: 'inProgress',
    stateDescription: `In Progress (Last Updated: ${lastUpdated})`,
    errorDescription: '',
  },
  uploadingPeerJWS: {
    status: 'inProgress',
    stateDescription: `In Progress (Last Updated: ${lastUpdated})`,
    errorDescription: '',
  },
  creatingJWS: {
    status: 'inProgress',
    stateDescription: `In Progress (Last Updated: ${lastUpdated})`,
    errorDescription: '',
  },
  endpointConfig: {
    status: 'pending',
    stateDescription: `Pending (Last Updated: ${lastUpdated})`,
    errorDescription: '',
  },
  connectorConfig: {
    status: 'pending',
    stateDescription: `Pending (Last Updated: ${lastUpdated})`,
    errorDescription: '',
  },
  progressMonitor: {
    status: 'completed',
    stateDescription: `Completed (Last Updated: ${lastUpdated})`,
    errorDescription: '',
  },
};

export const mockRecreateJwsCertSuccessResponse = {
  status: 'SUCCESS',
};
export const mockRecreateJwsCertSecurityTypeErrorResponse = {
  error: 'Security Type Not Found',
};
export const mockRecreateJwsCertUnauthorisedResponse = {
  error: 'Unauthorized',
};
export const mockRecreateJwsCertErrorResponse = {
  error: 'Internal Server Error',
};