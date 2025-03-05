import React, { useState, useEffect, useMemo } from "react";
import { Row, Button } from "components";
import { useDispatch, useSelector } from "react-redux";
import { fetchStatesRequest, recreateCertRequest, setConnectionStatus } from "./actions";
import { indicatorColor, connectionStates, ConnectionStatus, formatTitleCase, formatDescription } from "./helpers";
import RecreateModal from "./RecreateModal";
import "./ConnectionHealthDropdown.css";

const arrowDownUrl = "https://img.icons8.com/?size=100&id=ZOUx9tGqWHny&format=png&color=000000";
const arrowUpUrl = "https://img.icons8.com/?size=100&id=60662&format=png&color=000000";

interface ConnectionStateOption {
  state: string;
  color: string;
  description: string;
}

const ConnectionHealthDropdown: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [modalState, setModalState] = useState<{ isOpen: boolean; securityType: "JWS" | "outboundTLS" | null }>({
    isOpen: false,
    securityType: null,
  });

  const dispatch = useDispatch();
  const connectionStateListApiResponse = useSelector((state: any) => state.states.data?.data);
  const connectionStatusFromRedux = useSelector((state: any) => state.states.connectionStatus);

  useEffect(() => {
    dispatch(fetchStatesRequest());
  }, [dispatch]);


  const { connectionStateList, connectionStatus, errorsList } = useMemo(() => {
    let status: ConnectionStatus = "pending";
    const statuses = new Set<keyof typeof indicatorColor>();
    const errors: string[] = [];
    const stateList: ConnectionStateOption[] = [];

    if (connectionStateListApiResponse) {
      for (const key in connectionStateListApiResponse) {
        if (Object.prototype.hasOwnProperty.call(connectionStateListApiResponse, key)) {
          const stateData = connectionStateListApiResponse[key] as {
            status: keyof typeof indicatorColor;
            errorDescription: string;
            stateDescription: string;
          };
          statuses.add(stateData.status);
          if (stateData.status === "inError") {
            errors.push(stateData.errorDescription);
          }
          stateList.push({
            state: formatTitleCase(key),
            color: indicatorColor[stateData.status] ?? indicatorColor.unknown,
            description: stateData.errorDescription
              ? `${stateData.stateDescription} : ${stateData.errorDescription}`
              : stateData.stateDescription,
          });
        }
      }

      if (statuses.has("inError")) {
        status = "inError";
      } else if (statuses.size === 1 && statuses.has("completed")) {
        status = "completed";
      } else if (statuses.size === 1 && statuses.has("pending")) {
        status = "pending";
      } else {
        status = "inProgress";
      }
    }

    return { connectionStateList: stateList, connectionStatus: status, errorsList: errors };
  }, [connectionStateListApiResponse]);

  // Dispatch connection status update only when necessary
  useEffect(() => {
    if (connectionStatusFromRedux !== connectionStatus) {
      dispatch(setConnectionStatus(connectionStatus));
    }
  }, [connectionStatus, connectionStatusFromRedux, dispatch]);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const openModal = (securityType: "JWS" | "outboundTLS") => {
    setModalState({ isOpen: true, securityType });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, securityType: null });
  };

  const handleRecreate = (securityType: "JWS" | "outboundTLS", reason: string) => {
    dispatch(recreateCertRequest(securityType, reason));
    closeModal();
  };

  let { color: connectionIndicatorColor, message: connectionMessage } =
    connectionStates[connectionStatus] ?? {
      color: indicatorColor.unknown,
      message: "Unknown Status",
    };

  if (connectionStatus === "inError") {
    connectionMessage = connectionMessage + errorsList.at(0);
  }

  return (
    <div>
      <Row align="left top" className="connection-status-container">
        <div className="accordion__indicator__color" style={{ background: connectionIndicatorColor }} />
        <div>
          <span className="connection-status-message">
            {connectionMessage.split(":")[0]}
            {connectionMessage.includes(":") && " :"}
          </span>
          {connectionMessage.includes(":") && <span>{connectionMessage.split(":")[1]}</span>}
        </div>
        <button onClick={toggleDropdown} className="connection-status-button">
          <img src={showDropdown ? arrowDownUrl : arrowUpUrl} alt="Dropdown Arrow" style={{ width: "12px", height: "12px" }} />
        </button>
      </Row>

      {showDropdown && (
        <>
          <Row align="left top" padding="8px" style={{ marginLeft: "20px", marginBottom: "10px", display: "flex", gap: "50px" }}>
            <Button onClick={() => openModal("outboundTLS")} label="Recreate Outbound TLS" kind="secondary" />
            <Button onClick={() => openModal("JWS")} label="Recreate JWS" kind="secondary" />
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

      {/* Recreate Modal */}
      {modalState.isOpen && modalState.securityType && (
        <RecreateModal
          isOpen={modalState.isOpen}
          onClose={closeModal}
          onSubmit={handleRecreate}
          securityType={modalState.securityType}
        />
      )}
    </div>
  );
};

export default ConnectionHealthDropdown;
