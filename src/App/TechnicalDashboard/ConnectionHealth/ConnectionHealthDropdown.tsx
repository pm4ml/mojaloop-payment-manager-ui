import React, { useState } from 'react';
import { Row, Button } from 'components';
import { indicatorColor, connectionStates, ConnectionStatus, formatTitleCase, formatDescription } from './helpers';
import './ConnectionHealthDropdown.css';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStatesRequest, recreateCertRequest } from './actions';

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
  const connectionStateListApiResponse = useSelector((state: any) => state.states.data?.data);
  // const recreateCertResponse = useSelector((state: any) => state.recreateCert.data?.data);


  // Fetch states on mount
  useEffect(() => {
    dispatch(fetchStatesRequest());
  }, [dispatch]);

  let connectionStatus: ConnectionStatus = 'pending';
  const connectionStateList: ConnectionStateOption[] = [];
  let statuses = new Set<keyof typeof indicatorColor>();
  let errorsList = new Array<string>();

  if (connectionStateListApiResponse) {
    for (const key in connectionStateListApiResponse) {
      if (Object.prototype.hasOwnProperty.call(connectionStateListApiResponse, key)) {
        const stateData: { status: keyof typeof indicatorColor; errorDescription: string; stateDescription: string } = connectionStateListApiResponse[key];
        statuses.add(stateData.status);
        let formattedStateTitle = formatTitleCase(key);
        if (stateData.status === 'inError') {
          errorsList.push(stateData.errorDescription);
        }
        connectionStateList.push({
          state: formattedStateTitle,
          color: indicatorColor[stateData.status] ?? indicatorColor.unknown,
          description: stateData.errorDescription
            ? `${stateData.stateDescription} : ${stateData.errorDescription}`
            : stateData.stateDescription,
        });
      }
    }
  }
  if (statuses.has('inError')) {
    connectionStatus = 'inError';
  } else if (statuses.size === 1 && statuses.has('completed')) {
    connectionStatus = 'completed';
  } else if (statuses.size === 1 && statuses.has('pending')) {
    connectionStatus = 'pending';
  } else {
    connectionStatus = 'inProgress';
  }

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleRecreate = (securityType: "JWS" | "outboundTLS") => {
    const reason = 'Dummy reason for recreating cert and keys';
    dispatch(recreateCertRequest(securityType, reason));
  };

  let { color: connectionIndicatorColor, message: connectionMessage } =
    connectionStates[connectionStatus] ?? {
      color: indicatorColor.unknown,
      message: 'Unknown Status',
    };

  if (connectionStatus === 'inError') {
    connectionMessage = connectionMessage + errorsList.at(0);
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
            <Button onClick={() => handleRecreate("outboundTLS")} label="Recreate Outbound TLS" kind="secondary" />
            <Button onClick={() => handleRecreate("JWS")} label="Recreate JWS" kind="secondary" />
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
