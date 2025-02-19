import React, { useState } from 'react';
import { Row, Button } from 'components';

interface ConnectionStateOption {
  label: string;
  value: string;
  color: string;
  description: string;
}

const indicatorColor = {
  Completed: '#12d670',
  InProgress: '#ff9933',
  Pending: '#DDDDDD',
  Error: '#f44336',
  Unknown: '#000000',
};

const connectionStates = {
  pending: {
    color: indicatorColor.Pending,
    message: 'Connecting ...',
  },
  error: {
    color: indicatorColor.Error,
    message: 'Connection Error: Error writing JWS key to vault - Access Denied',
  },
  completed: {
    color: indicatorColor.Completed,
    message: 'Connected',
  },
  inProgress: {
    color: indicatorColor.InProgress,
    message: 'Connecting ...',
  },
} as const;

type ConnectionStatus = keyof typeof connectionStates;
let lastUpdated = new Date().toISOString();

const ConnectionHealthDropdown: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const connectionStateList: ConnectionStateOption[] = [
    { label: 'Fetching Hub CA', value: 'Fetching_Hub_CA', color: indicatorColor.Completed, description: `Completed (Last Updated: ${lastUpdated})` },
    { label: 'Creating DFSP CA', value: 'Creating_DFSP_CA', color: indicatorColor.Completed, description: `Completed (Last Updated: ${lastUpdated})` },
    { label: 'Creating DFSP Client Cert', value: 'Creating_DFSP_Client_Cert', color: indicatorColor.Completed, description: `Completed (Last Updated: ${lastUpdated})` },
    { label: 'Creating DFSP Server Cert', value: 'Creating_DFSP_Server_Cert', color: indicatorColor.Completed, description: `Completed (Last Updated: ${lastUpdated})` },
    { label: 'Creating Hub Client Cert', value: 'Creating_Hub_Client_Cert', color: indicatorColor.Completed, description: `Completed (Last Updated: ${lastUpdated})` },
    { label: 'Pulling Peer JWS', value: 'Pulling_Peer_JWS', color: indicatorColor.Completed, description: `In Progress (Last Updated: ${lastUpdated})` },
    { label: 'Uploading Peer JWS', value: 'Uploading_Peer_JWS', color: indicatorColor.InProgress, description: `In Progress (Last Updated: ${lastUpdated})` },
    { label: 'Creating JWS', value: 'Creating_JWS', color: indicatorColor.Error, description: `Connection Error: Error writing JWS key to vault - Access Denied (Last Updated: ${lastUpdated})` },
    { label: 'Endpoint Config', value: 'Endpoint_Config', color: indicatorColor.Pending, description: `Pending (Last Updated: ${lastUpdated})` },
    { label: 'Connector Config', value: 'Connector_Config', color: indicatorColor.Pending, description: `Pending (Last Updated: ${lastUpdated})` },
    { label: 'Progress Monitor', value: 'Progress_Monitor', color: indicatorColor.Completed, description: `Completed (Last Updated: ${lastUpdated})` },
  ];

  const connectionStatus: ConnectionStatus = 'error';

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const { color: connectionIndicatorColor, message: connectionMessage } =
    connectionStates[connectionStatus] ?? {
      color: indicatorColor.Unknown,
      message: 'Unknown Status',
    };

  const formatDescription = (description: string) => {
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
  };

  const arrowDownUrl = 'https://img.icons8.com/?size=100&id=ZOUx9tGqWHny&format=png&color=000000';
  const arrowUpUrl = 'https://img.icons8.com/?size=100&id=60662&format=png&color=000000';

  return (
    <div>

      <Row align="left top" style={{ marginBottom: '20px' }}>
        <div className="accordion__indicator__color" style={{ background: connectionIndicatorColor }} />
        <div>
          <span style={{ marginBottom: '20px', fontWeight: 'bold' }}>
            {connectionMessage.split(':')[0]}
            {connectionMessage.includes(':') && ' :'}
          </span>
          {connectionMessage.includes(':') && (
            <span>{connectionMessage.split(':')[1]}</span>
          )}
        </div>
        <button onClick={toggleDropdown} style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: '10px' }}>
          <img src={showDropdown ? arrowDownUrl : arrowUpUrl} alt="Dropdown Arrow" style={{ width: '12px', height: '12px' }} />
        </button>
      </Row>

      {showDropdown && (
        <>
          <Row align="left top" padding="8px" style={{ marginLeft: '20px', marginBottom: '10px', display: 'flex', gap: '50px' }}>
            <Button onClick={() => console.log('Recreate Outbound TLS')} label="Recreate Outbound TLS" kind="secondary" />
            <Button onClick={() => console.log('Recreate JWS')} label="Recreate JWS" kind="secondary" />
          </Row>
          <div className="state-dropdown" style={{ width: '100%' , marginBottom : '20px'}}>
            <div
              className="dropdown-options"
              style={{
                border: 'none',
                maxWidth: '100%',
                marginTop: '8px',
                backgroundColor: 'white',
                padding: '8px',
              }}
            >
              {connectionStateList.map((option) => (
                <div key={option.value} style={{ padding: '8px', display: 'flex', alignItems: 'center' }}>
                  <div
                    className="accordion__indicator__color"
                    style={{ background: option.color, width: '12px', height: '12px', borderRadius: '50%', marginRight: '10px' }}
                  />
                  <span style={{ minWidth: '180px', display: 'inline-block' }}>{option.label}</span>
                  <span>:</span>
                  <span style={{ marginLeft: '20px' }}>{formatDescription(option.description)}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ConnectionHealthDropdown;
