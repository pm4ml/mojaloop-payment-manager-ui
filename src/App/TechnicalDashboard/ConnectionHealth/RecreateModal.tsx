import React, { FC, useState, useEffect } from "react";
import { Modal, FormInput } from "components";

interface RecreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  securityType: "JWS" | "outboundTLS";
  onSubmit: (securityType: "JWS" | "outboundTLS", reason: string) => void;
}

const RecreateModal: FC<RecreateModalProps> = ({ isOpen, onClose, onSubmit, securityType }) => {
  const [reason, setReason] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      setReason("");
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (reason.trim()) {
      onSubmit(securityType, reason);
    }
  };

  return (
    <Modal
      title={`Recreate ${securityType} Certificates/Keys`}
      width="1200px"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      allowSubmit
      isSubmitEnabled={!!reason?.trim()}
      primaryAction={`Recreate ${securityType} Certificates/Keys`}
    >
      <FormInput
        type="text"
        label="Reason"
        id="cert-recreate-reason"
        value={reason}
        onChange={(value: string) => setReason(value)}
        placeholder="Enter reason"
        required
      />
    </Modal>
  );
};

export default RecreateModal;
