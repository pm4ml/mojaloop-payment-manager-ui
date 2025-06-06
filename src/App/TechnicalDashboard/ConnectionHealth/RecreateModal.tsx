import React, { FC, useState, useEffect } from 'react';
import { Modal, FormInput } from 'components';
import { RecreateSecurtityType } from './helpers';

interface RecreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  securityType: RecreateSecurtityType;
  onSubmit: (securityType: RecreateSecurtityType, reason: string) => void;
}

const RecreateModal: FC<RecreateModalProps> = ({ isOpen, onClose, onSubmit, securityType }) => {
  const [reason, setReason] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setReason('');
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (reason.trim()) {
      onSubmit(securityType, reason);
    }
  };

  const getModalTitle = () => {
    if (securityType === RecreateSecurtityType.REONBOARD) {
      return 'Reonboard Connection';
    }
    return `Recreate ${securityType} Certificates/Keys`;
  };

  const getPrimaryActionLabel = () => {
    if (securityType === RecreateSecurtityType.REONBOARD) {
      return 'Reonboard';
    }
    return `Recreate ${securityType} Certificates/Keys`;
  };

  return (
    <Modal
      title={getModalTitle()}
      width="1200px"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      allowSubmit
      isSubmitEnabled={!!reason?.trim()}
      primaryAction={getPrimaryActionLabel()}
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
