import * as React from 'react';

export enum ConnectionStatusEnum {
  COMPLETED = 'completed',
  IN_PROGRESS = 'inProgress',
  IN_ERROR = 'inError',
  PENDING = 'pending',
}
export enum RecreateSecurtityType {
  JWS = 'JWS',
  OUTBOUND_TLS = 'outboundTLS',
}

export const indicatorColor: Record<ConnectionStatusEnum, string> = {
  [ConnectionStatusEnum.COMPLETED]: '#12d670',
  [ConnectionStatusEnum.IN_PROGRESS]: '#ff9933',
  [ConnectionStatusEnum.IN_ERROR]: '#f44336',
  [ConnectionStatusEnum.PENDING]: '#DDDDDD',
};

export const connectionStates: Record<ConnectionStatusEnum, { color: string; message: string }> = {
  [ConnectionStatusEnum.COMPLETED]: {
    color: indicatorColor[ConnectionStatusEnum.COMPLETED],
    message: 'Connected',
  },
  [ConnectionStatusEnum.IN_PROGRESS]: {
    color: indicatorColor[ConnectionStatusEnum.IN_PROGRESS],
    message: 'Connecting ...',
  },
  [ConnectionStatusEnum.IN_ERROR]: {
    color: indicatorColor[ConnectionStatusEnum.IN_ERROR],
    message: 'Connection Error : ',
  },
  [ConnectionStatusEnum.PENDING]: {
    color: indicatorColor[ConnectionStatusEnum.PENDING],
    message: 'Pending',
  },
};

export function getNavbarConnectionStatus(
  status: ConnectionStatusEnum,
  activeConnectionName: string
): string {
  const messages: Record<ConnectionStatusEnum, string> = {
    [ConnectionStatusEnum.COMPLETED]: `Connected to: ${activeConnectionName}`,
    [ConnectionStatusEnum.IN_PROGRESS]: `Connecting to: ${activeConnectionName}...`,
    [ConnectionStatusEnum.IN_ERROR]: `Error connecting to: ${activeConnectionName}`,
    [ConnectionStatusEnum.PENDING]: `Pending connection to: ${activeConnectionName}`,
  };

  return messages[status] ?? `Connecting to: ${activeConnectionName}...`;
}

export function formatDescription(description: string): JSX.Element {
  const match = description.match(/\(Last Updated: .*?\)/);
  if (match) {
    const mainText = description.replace(match[0], '').trim();
    const splitTextArray = mainText.split(':');
    if (splitTextArray.length > 1) {
      return (
        <>
          <span style={{ fontWeight: 'bold' }}>{splitTextArray[0]} :</span>{' '}
          <span style={{ fontWeight: 'normal' }}>{splitTextArray[1]}</span>
          <span style={{ fontWeight: 'normal' }}> {match[0]}</span>
        </>
      );
    }
    return (
      <>
        <span style={{ fontWeight: 'bold' }}>{mainText}</span>{' '}
        <span style={{ fontWeight: 'normal' }}>{match[0]}</span>
      </>
    );
  }
  return <span style={{ fontWeight: 'bold' }}>{description}</span>;
}

export type ConnectionStatus = keyof typeof connectionStates;

interface ConnectionStateOption {
  state: string;
  color: string;
  description: string;
}

export type ConnectionStateApiResponse = {
  status: ConnectionStatusEnum;
  errorDescription: string;
  stateDescription: string;
  lastUpdated: string;
};

export type ConnectionStateDataResponse = {
  fetchingHubCA: ConnectionStateApiResponse;
  creatingDFSPCA: ConnectionStateApiResponse;
  creatingDfspClientCert: ConnectionStateApiResponse;
  creatingDfspServerCert: ConnectionStateApiResponse;
  creatingHubClientCert: ConnectionStateApiResponse;
  pullingPeerJWS: ConnectionStateApiResponse;
  uploadingPeerJWS: ConnectionStateApiResponse;
  creatingJWS: ConnectionStateApiResponse;
  endpointConfig: ConnectionStateApiResponse;
  connectorConfig: ConnectionStateApiResponse;
  progressMonitor: ConnectionStateApiResponse;
};

export function getConnectionStateData(
  connectionStateListApiResponse: ConnectionStateDataResponse
) {
  let status: ConnectionStatusEnum = ConnectionStatusEnum.PENDING;
  const statuses = new Set<ConnectionStatusEnum>();
  const errors: string[] = [];
  const stateList: ConnectionStateOption[] = [];

  if (connectionStateListApiResponse) {
    for (const key of Object.keys(connectionStateListApiResponse) as Array<
      keyof ConnectionStateDataResponse
    >) {
      const stateData = connectionStateListApiResponse[key];

      statuses.add(stateData.status);
      if (stateData.status === ConnectionStatusEnum.IN_ERROR) {
        errors.push(stateData.errorDescription);
      }
      stateList.push({
        state: key,
        color: indicatorColor[stateData.status],
        description: stateData.errorDescription
          ? `${stateData.stateDescription} : ${stateData.errorDescription}`
          : `${stateData.stateDescription} (Last Updated: ${new Date(
              stateData.lastUpdated
            ).toLocaleString()})`,
      });
    }

    if (statuses.has(ConnectionStatusEnum.IN_ERROR)) {
      status = ConnectionStatusEnum.IN_ERROR;
    } else if (statuses.size === 1 && statuses.has(ConnectionStatusEnum.COMPLETED)) {
      status = ConnectionStatusEnum.COMPLETED;
    } else if (statuses.size === 1 && statuses.has(ConnectionStatusEnum.PENDING)) {
      status = ConnectionStatusEnum.PENDING;
    } else {
      status = ConnectionStatusEnum.IN_PROGRESS;
    }
  }

  return { connectionStateList: stateList, connectionStatus: status, errorsList: errors };
}
