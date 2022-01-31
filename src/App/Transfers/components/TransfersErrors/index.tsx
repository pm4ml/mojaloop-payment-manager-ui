import React, { FC } from 'react';
import { Button, DataList, ErrorBox, Spinner, Link } from 'components';
import { getCurrencySymbol } from 'utils/currencies';
import { ErrorMessage } from 'App/types';
import xlsx from 'xlsx';
import { saveAsWriteFile } from 'utils/fs';
import { TransferError } from '../../types';
import * as helpers from '../../helpers';
import TransfersErrorsModal from './TransfersErrorsModal';

const transfersErrorsColumns = [
  {
    label: 'Transfer ID',
    key: 'id',
    func: (value: string, item: TransferError) => (
      <Link>
        <span style={{ textDecoration: 'underline' }}>{item.id}</span>
      </Link>
    ),
  },
  { label: 'Direction', key: 'direction', func: helpers.toSpacedPascalCase },
  { label: 'Type', key: 'type' },
  {
    label: 'Value',
    key: 'amount',
    func: (amount: string, item: TransferError) => `${getCurrencySymbol(item.currency)} ${amount}`,
  },
  { label: 'Error Type', key: 'errorType', func: helpers.toSpacedPascalCase },
  {
    label: 'Date',
    key: 'initiatedTimestamp',
    func: helpers.toTransfersDate,
  },
];

interface TransfersErrorsProps {
  isPending: boolean | undefined;
  items: TransferError[];
  isViewAllActive: boolean;
  error: ErrorMessage;
  onViewAllClick: () => void;
  onTransferRowClick: (transferError: TransferError) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function downloadErrorsToExcel(errors: any): Promise<void> {
  const ws = xlsx.utils.json_to_sheet(errors);
  const wscols = [{ wch: 20 }];
  ws['!cols'] = wscols;
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, 'Errors');
  const wbBuffer: ArrayBuffer = xlsx.write(wb, { type: 'array', bookType: 'xlsx' });
  const fileName: string = `Payment_Manager_Errors_${new Date().toISOString()}.xlsx`;

  try {
    await saveAsWriteFile(fileName, new Blob([wbBuffer]));
  } catch (e) {
    xlsx.writeFile(wb, fileName);
  }
}

const TransfersErrors: FC<TransfersErrorsProps> = ({
  isPending,
  items,
  error,
  onViewAllClick,
  isViewAllActive,
  onTransferRowClick,
}) => {
  let content = null;
  if (isPending) {
    content = (
      <div className="transfers__errors__loader">
        <Spinner size={20} />
      </div>
    );
  } else if (error) {
    content = <ErrorBox>Transfers errors: Unable to load data</ErrorBox>;
  } else {
    content = (
      <>
        <ErrorsList items={items.slice(0, 4)} onTransferRowClick={onTransferRowClick} />
        <Button
          label="Download Errors"
          kind="secondary"
          size="m"
          noFill
          className="transfers__errors__download__button"
          onClick={() => downloadErrorsToExcel(items)}
        />
        {items.length > 4 && (
          <Button
            label="View All Errors"
            noFill
            kind="secondary"
            size="m"
            className="transfers__errors__button"
            onClick={onViewAllClick}
          />
        )}
        {isViewAllActive && <TransfersErrorsModal />}
      </>
    );
  }
  return <div className="transfers__errors__section">{content}</div>;
};

interface ErrorsListProps {
  items: TransferError[];
  onTransferRowClick: (transferError: TransferError) => void;
}

const ErrorsList: FC<ErrorsListProps> = ({ items, onTransferRowClick }) => {
  return (
    <div className="transfers__errors__list-container">
      <DataList columns={transfersErrorsColumns} list={items} onSelect={onTransferRowClick} />
    </div>
  );
};

export default TransfersErrors;
