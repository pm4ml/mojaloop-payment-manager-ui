import React, { useState, useEffect, useMemo } from "react";
import { Row, Button } from "components";
import { useDispatch, useSelector } from "react-redux";
import { fetchStatesRequest, recreateCertRequest, setConnectionStatus } from "./actions";
import { getConnectionStateData, connectionStates, formatDescription, RecreateSecurtityType } from "./helpers";
import RecreateModal from "./RecreateModal";
import "./ConnectionHealthDropdown.css";

const arrowDownUrl = "https://img.icons8.com/?size=100&id=ZOUx9tGqWHny&format=png&color=000000";
const arrowUpUrl = "https://img.icons8.com/?size=100&id=60662&format=png&color=000000";

const ConnectionHealthDropdown: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [modalState, setModalState] = useState<{ isOpen: boolean; securityType: RecreateSecurtityType | null }>({
    isOpen: false,
    securityType: null,
  });

  const dispatch = useDispatch();
  const connectionStateData = useSelector((state: any) => state.states.data?.data);
  const storedConnectionStatus = useSelector((state: any) => state.states.connectionStatus);

  useEffect(() => {
    dispatch(fetchStatesRequest());
  }, [dispatch]);

  const { connectionStateList, connectionStatus, errorsList } = useMemo(() => {
    return getConnectionStateData(connectionStateData);
  }, [connectionStateData]);

  useEffect(() => {
    if (storedConnectionStatus !== connectionStatus) {
      dispatch(setConnectionStatus(connectionStatus));
    }
  }, [connectionStatus, storedConnectionStatus, dispatch]);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const openModal = (securityType: RecreateSecurtityType) => {
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
    connectionStates[connectionStatus]

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
            <Button onClick={() => openModal(RecreateSecurtityType.OUTBOUND_TLS)} label="Recreate Outbound TLS" kind="secondary" />
            <Button onClick={() => openModal(RecreateSecurtityType.JWS)} label="Recreate JWS" kind="secondary" />
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
