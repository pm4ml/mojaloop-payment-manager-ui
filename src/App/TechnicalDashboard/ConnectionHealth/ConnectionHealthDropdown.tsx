import React, { useState } from 'react';
import { Row, Button } from 'components';
import { indicatorColor, connectionStates, ConnectionStatus } from './helpers';
import './ConnectionHealthDropdown.css';

const arrowDownUrl = 'https://img.icons8.com/?size=100&id=ZOUx9tGqWHny&format=png&color=000000';
const arrowUpUrl = 'https://img.icons8.com/?size=100&id=60662&format=png&color=000000';

interface ConnectionStateOption {
  state: string;
  color: string;
  description: string;
}

let lastUpdated = new Date().toISOString();

const ConnectionHealthDropdown: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const connectionStateList: ConnectionStateOption[] = [
    { state: 'Fetching Hub CA', color: indicatorColor.completed, description: `Completed (Last Updated: ${lastUpdated})` },
    { state: 'Creating DFSP CA', color: indicatorColor.completed, description: `Completed (Last Updated: ${lastUpdated})` },
    { state: 'Creating DFSP Client Cert', color: indicatorColor.completed, description: `Completed (Last Updated: ${lastUpdated})` },
    { state: 'Creating DFSP Server Cert', color: indicatorColor.completed, description: `Completed (Last Updated: ${lastUpdated})` },
    { state: 'Creating Hub Client Cert', color: indicatorColor.completed, description: `Completed (Last Updated: ${lastUpdated})` },
    { state: 'Pulling Peer JWS', color: indicatorColor.completed, description: `In Progress (Last Updated: ${lastUpdated})` },
    { state: 'Uploading Peer JWS', color: indicatorColor.inProgress, description: `In Progress (Last Updated: ${lastUpdated})` },
    { state: 'Creating JWS', color: indicatorColor.inError, description: `Connection Error: Error writing JWS key to vault - Access Denied (Last Updated: ${lastUpdated})` },
    { state: 'Endpoint Config', color: indicatorColor.pending, description: `Pending (Last Updated: ${lastUpdated})` },
    { state: 'Connector Config', color: indicatorColor.pending, description: `Pending (Last Updated: ${lastUpdated})` },
    { state: 'Progress Monitor', color: indicatorColor.completed, description: `Completed (Last Updated: ${lastUpdated})` },
  ];

  const connectionStatus: ConnectionStatus = 'inError';

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  let { color: connectionIndicatorColor, message: connectionMessage } =
    connectionStates[connectionStatus] ?? {
      color: indicatorColor.unknown,
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

  if (connectionStatus === 'inError') {
    connectionMessage = connectionMessage + 'Error writing JWS key to vault - Access Denied';
  }
  return (
    <div>
      <Row align="left top" className="connection-status-container">
        <div className="accordion__indicator__color" style={{ background: connectionIndicatorColor }} />
        <div>
          <span className="connection-status-message">
            {connectionMessage.split(':')[0]}
            {connectionMessage.includes(':') && ' :'}
          </span>
          {connectionMessage.includes(':') && <span>{connectionMessage.split(':')[1]}</span>}
        </div>
        <button onClick={toggleDropdown} className="connection-status-button">
          <img src={showDropdown ? arrowDownUrl : arrowUpUrl} alt="Dropdown Arrow" style={{ width: '12px', height: '12px' }} />
        </button>
      </Row>

      {showDropdown && (
        <>
          <Row align="left top" padding="8px" style={{ marginLeft: '20px', marginBottom: '10px', display: 'flex', gap: '50px' }}>
            <Button onClick={() => console.log('Recreate Outbound TLS')} label="Recreate Outbound TLS" kind="secondary" />
            <Button onClick={() => console.log('Recreate JWS')} label="Recreate JWS" kind="secondary" />
          </Row>
          <div className="connection-dropdown">
            <div className="connection-dropdown-content">
              {connectionStateList.map((option) => (
                <div key={option.state} className="connection-state-item">
                  <div className="accordion__indicator__color" style={{ background: option.color }} />
                  <span className="connection-state-text">{option.state}</span>
                  <span>:</span>
                  <span className="connection-state-description">{formatDescription(option.description)}</span>
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
