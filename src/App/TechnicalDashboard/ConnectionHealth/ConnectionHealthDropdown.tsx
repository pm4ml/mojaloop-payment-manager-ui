import React, { useState } from 'react';
import { Row, Button } from 'components';
import { indicatorColor, connectionStates, ConnectionStatus } from './helpers';
import './ConnectionHealthDropdown.css';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStatesRequest } from './actions';

const arrowDownUrl = 'https://img.icons8.com/?size=100&id=ZOUx9tGqWHny&format=png&color=000000';
const arrowUpUrl = 'https://img.icons8.com/?size=100&id=60662&format=png&color=000000';

interface ConnectionStateOption {
  state: string;
  color: string;
  description: string;
}

const ConnectionHealthDropdown: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const dispatch = useDispatch();
  const connectionStateListApiResponse = useSelector((state: any) => state.states.data);

  useEffect(() => {
    dispatch(fetchStatesRequest());
  }, [dispatch]);

  const connectionStatus: ConnectionStatus = 'inError';
  const connectionStateList: ConnectionStateOption[] = [];

  if (connectionStateListApiResponse) {
    for (const key in connectionStateListApiResponse) {
      if (Object.prototype.hasOwnProperty.call(connectionStateListApiResponse, key)) {
        const stateData: { status: keyof typeof indicatorColor; errorDescription: string; stateDescription: string } = connectionStateListApiResponse[key];
        connectionStateList.push({
          state: key,
          color: indicatorColor[stateData.status] ?? indicatorColor.unknown,
          description: stateData.errorDescription
            ? `${stateData.stateDescription} : ${stateData.errorDescription}`
            : stateData.stateDescription,
        });
      }
    }
  }

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  let { color: connectionIndicatorColor, message: connectionMessage } =
    connectionStates[connectionStatus] ?? {
      color: indicatorColor.unknown,
      message: 'Unknown Status',
    };


  const handleRecreateOutboundTLS = () => {
    console.log('Recreate Outbound TLS Button Clicked');
  };
  const handleRecreateJWS = () => {
    console.log('Recreate JWS Button Clicked');
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
            <Button onClick={() => handleRecreateOutboundTLS()} label="Recreate Outbound TLS" kind="secondary" />
            <Button onClick={() => handleRecreateJWS()} label="Recreate JWS" kind="secondary" />
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
