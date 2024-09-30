import React, { FC } from 'react';
import { Button, DataList, ErrorBox, Spinner, Link } from 'components';
import { getCurrencySymbol } from 'utils/currencies';
import { ErrorMessage } from 'App/types';
import xlsx from 'xlsx';
import { FxpConversionDetails, FxpConversionError } from '../../types';
import * as helpers from '../../helpers';
import FxpConversionsErrorsModal from './FxpConversionsErrorsModal';

const fxpConversionsErrorsColumns = [
  {
    label: 'Conversion ID',
    key: 'id',
    func: (value: string, item: FxpConversionError) => (
      <Link>
        <span style={{ textDecoration: 'underline' }}>{item.conversionId}</span>
      </Link>
    ),
  },
  { label: 'Direction', key: 'direction', func: helpers.toSpacedPascalCase },
  { label: 'Type', key: 'type' },
  {
    label: 'Send Value',
    key: 'amount',
  },
  {
    label: 'Send Currency',
    key: 'currency',
  },
  {
    label: 'Receive Value',
    key: 'amount',
  },
  {
    label: 'Receive Currency',
    key: 'currency',
  },
  { label: 'Error Type', key: 'errorType', func: helpers.toSpacedPascalCase },
  {
    label: 'Date',
    key: 'initiatedTimestamp',
    func: helpers.toFxpConversionsDate,
  },
];

interface FxpConversionsErrorsProps {
  isPending: boolean | undefined;
  items: FxpConversionError[];
  isViewAllActive: boolean;
  error: ErrorMessage;
  onViewAllClick: () => void;
  onFxpConversionRowClick: (fxpConversionError: FxpConversionError) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function downloadErrorsToExcel(errors: any): Promise<void> {
  const ws = xlsx.utils.json_to_sheet(errors);
  const wscols = [{ wch: 20 }];
  ws['!cols'] = wscols;
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, 'Errors');
  const fileName: string = `Payment_Manager_Errors_${new Date().toDateString()}.xlsx`;
  xlsx.writeFile(wb, fileName);
}

const FxpConversionsErrors: FC<FxpConversionsErrorsProps> = ({
  isPending,
  items,
  error,
  onViewAllClick,
  isViewAllActive,
  onFxpConversionRowClick,
}) => {
  let content = null;
  if (isPending) {
    content = (
      <div className="fxpConversions__errors__loader">
        <Spinner size={20} />
      </div>
    );
  } else if (error) {
    content = <ErrorBox>FxpConversions errors: Unable to load data</ErrorBox>;
  } else {
    content = (
      <>
        <ErrorsList items={items.slice(0, 4)} onFxpConversionRowClick={onFxpConversionRowClick} />
        {items.length > 0 && (
          <Button
            label="Download Errors"
            kind="secondary"
            size="m"
            noFill
            className="fxpConversions__errors__download__button"
            onClick={() => downloadErrorsToExcel(items)}
          />
        )}
        {items.length > 4 && (
          <Button
            label="View All Errors"
            noFill
            kind="secondary"
            size="m"
            className="fxpConversions__errors__button"
            onClick={onViewAllClick}
          />
        )}
        {isViewAllActive && <FxpConversionsErrorsModal />}
      </>
    );
  }
  return <div className="fxpConversions__errors__section">{content}</div>;
};

interface ErrorsListProps {
  items: FxpConversionError[];
  onFxpConversionRowClick: (fxpConversionError: FxpConversionError) => void;
}

const ErrorsList: FC<ErrorsListProps> = ({ items, onFxpConversionRowClick }) => {
  return (
    <div className="fxpConversions__errors__list-container">
      <DataList
        columns={fxpConversionsErrorsColumns}
        list={items}
        onSelect={onFxpConversionRowClick}
      />
    </div>
  );
};

export default FxpConversionsErrors;
