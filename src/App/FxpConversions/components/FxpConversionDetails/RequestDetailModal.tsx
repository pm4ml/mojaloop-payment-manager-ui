import React, { FC } from 'react';
import { ContentReader, Modal } from 'components';

interface FxpConversionRequestDetailModalProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  model: any | null;
  title: string;
  onCloseClick: () => void;
}

export const FxpConversionRequestDetailsModal: FC<FxpConversionRequestDetailModalProps> = ({
  model,
  title,
  onCloseClick,
}) => {
  return (
    <Modal
      id="fxpConversionRequestDetailsModal"
      title={title}
      width="1000px"
      onClose={onCloseClick}
      isSubmitEnabled={false}
    >
      <div style={{ height: '400px', padding: '20px', display: 'flex' }}>
        <ContentReader data={JSON.stringify(model)} />
      </div>
    </Modal>
  );
};
