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
