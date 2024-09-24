import React, { FC } from 'react';
import { connect } from 'react-redux';
import { State, Dispatch } from 'store/types';
import { AliasType, TransferDirection, TransferStatus } from 'App/types';
import {
  DataLabel,
  DataList,
  DatePicker,
  Link,
  ErrorBox,
  Modal,
  FormInput,
  Row,
  Column,
  Select,
  Spinner,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Button,
} from 'components';
import xlsx from 'xlsx';
import * as actions from '../../actions';
import * as selectors from '../../selectors';
import {
  FxpConversion,
  TransferError,
  DateRange,
  FxpConversionFilter,
  Transfer,
} from '../../types';
import * as helpers from '../../helpers';

type FilterChangeValue = string | number;

const stateProps = (state: State) => ({
  model: selectors.getFxpConversionFinderFilter(state),
  // transfers: selectors.getTransfers(state),
  fxpConversions: selectors.getFxpConversions(state),
  transfersError: selectors.getTransfersError(state),
  isTransfersPending: selectors.getIsTransfersPending(state),
  isTransfersRequested: selectors.getIsTransfersRequested(state),
});

const dispatchProps = (dispatch: Dispatch) => ({
  onModalCloseClick: () => dispatch(actions.toggleTransferFinderModal()),
  onFiltersSubmitClick: (filters: FxpConversionFilter) =>
    dispatch(actions.requestFxpConversions({ filters })),
  onTransfersSubmitClick: () => dispatch(actions.UnrequestFxpConversions()),
  onFilterChange: ({ field, value }: { field: string; value: FilterChangeValue }) =>
    dispatch(actions.setFxpConversionFinderFilter({ field, value })),
  onTransferRowClick: (transferError: TransferError) => {
    dispatch(actions.requestFxpConversionDetails({ conversionId: transferError.id }));
  },
});

interface FxpConversionFinderModalProps {
  model: FxpConversionFilter;
  fxpConversions: FxpConversion[];
  transfersError: string | null;
  isTransfersPending: boolean;
  isTransfersRequested: boolean;
  onFiltersSubmitClick: (filters: FxpConversionFilter) => void;
  onTransfersSubmitClick: () => void;
  onModalCloseClick: () => void;
  onFilterChange: ({ field, value }: { field: string; value: FilterChangeValue }) => void;
  onTransferRowClick: (transferError: TransferError) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function downloadTransfersToExcel(transfers: any): Promise<void> {
  const ws = xlsx.utils.json_to_sheet(transfers);
  const wscols = [{ wch: 20 }];
  ws['!cols'] = wscols;
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, 'Transfers');
  const fileName: string = `Payment_Manager_Transfers_${new Date().toDateString()}.xlsx`;
  xlsx.writeFile(wb, fileName);
}

const FxpConversionFinderModal: FC<FxpConversionFinderModalProps> = ({
  model,
  fxpConversions,
  transfersError,
  isTransfersPending,
  isTransfersRequested,
  onFiltersSubmitClick,
  onTransfersSubmitClick,
  onModalCloseClick,
  onFilterChange,
  onTransferRowClick,
}) => {
  let content = null;
  let onSubmit: (() => void) | undefined;
  let submitLabel: string | undefined;

  const transfersColumns = [
    {
      label: 'Conversion ID',
      key: 'id',
      func: (value: string, item: FxpConversion) => (
        <Link>
          <span style={{ textDecoration: 'underline' }}>{item.conversionId}</span>
        </Link>
      ),
    },
    {
      label: 'Amount',
      key: 'amount',
      func: (value: string, item: FxpConversion) => `${item.current} ${item.amount}`,
    },
    {
      label: 'Direction',
      key: 'direction',
      func: helpers.toSpacedPascalCase,
    },
    {
      label: 'Status',
      key: 'status',
      func: helpers.toSpacedPascalCase,
    },
    {
      label: 'Batch ID',
      key: 'batchId',
    },
    {
      label: 'Institution',
      key: 'institution',
    },
    {
      label: 'Date',
      key: 'initiatedTimestamp',
      func: helpers.toTransfersDate,
    },
  ];

  console.log('isTransfersRequested:', isTransfersRequested); // Debugging log
  console.log('isTransfersPending:', isTransfersPending); // Debugging log
  console.log('transfersError:', transfersError); // Debugging log

  if (!isTransfersRequested) {
    content = <FxpConversionFilters model={model} onFilterChange={onFilterChange} />;
    onSubmit = () => {
      console.log('Submitting filters:', model); // Debugging log
      onFiltersSubmitClick(model);
    };
    submitLabel = 'Find Conversions';
  } else if (transfersError) {
    content = <ErrorBox>Transfer: Unable to load Conversions</ErrorBox>;
  } else if (isTransfersPending) {
    content = (
      <div className="transfers__transfers__loader">
        <Spinner size={20} />
      </div>
    );
  } else {
    console.log('fxpConversions:', fxpConversions); // Debugging log
    content = (
      <div className="transfers__transfers__list">
        {fxpConversions.length > 0 && (
          <Button
            label="Download Transfers"
            noFill
            onClick={() => downloadTransfersToExcel(fxpConversions)}
          />
        )}
        <DataList columns={transfersColumns} list={fxpConversions} onSelect={onTransferRowClick} />
      </div>
    );
    onSubmit = () => {
      console.log('Returning to filtering'); // Debugging log
      onTransfersSubmitClick();
    };
    submitLabel = 'Back to filtering';
  }

  console.log('submitLabel:', submitLabel); // Debugging log

  return (
    <Modal
      title="Find a Conversion"
      width="1200px"
      onClose={onModalCloseClick}
      onSubmit={onSubmit}
      allowSubmit
      isSubmitEnabled={onSubmit !== undefined}
      primaryAction={submitLabel}
    >
      {content}
    </Modal>
  );
};

const dateRanges = [
  { label: 'Custom', value: 'CUSTOM' },
  { label: helpers.toSpacedPascalCase(DateRange.Today), value: DateRange.Today },
  { label: helpers.toSpacedPascalCase(DateRange.Past48Hours), value: DateRange.Past48Hours },
  { label: helpers.toSpacedPascalCase(DateRange.OneWeek), value: DateRange.OneWeek },
  { label: helpers.toSpacedPascalCase(DateRange.OneMonth), value: DateRange.OneMonth },
];

const transferStatuses = [
  { label: helpers.toSpacedPascalCase(TransferStatus.Success), value: TransferStatus.Success },
  { label: helpers.toSpacedPascalCase(TransferStatus.Pending), value: TransferStatus.Pending },
  { label: helpers.toSpacedPascalCase(TransferStatus.Error), value: TransferStatus.Error },
];

const aliasType = [
  { label: 'All', value: null },
  { label: helpers.toSpacedPascalCase(AliasType.MSISDN), value: AliasType.MSISDN },
  { label: helpers.toSpacedPascalCase(AliasType.Account), value: AliasType.Account },
  { label: helpers.toSpacedPascalCase(AliasType.Email), value: AliasType.Email },
  { label: helpers.toSpacedPascalCase(AliasType.Personal), value: AliasType.Personal },
  { label: helpers.toSpacedPascalCase(AliasType.Business), value: AliasType.Business },
  { label: helpers.toSpacedPascalCase(AliasType.Device), value: AliasType.Device },
  { label: helpers.toSpacedPascalCase(AliasType.IBAN), value: AliasType.IBAN },
  { label: helpers.toSpacedPascalCase(AliasType.Alias), value: AliasType.Alias },
];

const transferDirectionOfFunds = [
  {
    label: helpers.toSpacedPascalCase(TransferDirection.Inbound),
    value: TransferDirection.Inbound,
  },
  {
    label: helpers.toSpacedPascalCase(TransferDirection.Outbound),
    value: TransferDirection.Outbound,
  },
  {
    label: helpers.toSpacedPascalCase(TransferDirection.All),
    value: TransferDirection.All,
  },
];

interface FxpConversionFiltersProps {
  model: FxpConversionFilter;
  onFilterChange: ({ field, value }: { field: string; value: FilterChangeValue }) => void;
}

const FxpConversionFilters: FC<FxpConversionFiltersProps> = ({ model, onFilterChange }) => (
  <Tabs>
    <TabList>
      <Tab>Basic Find a Conversion</Tab>
      <Tab>Advanced Filtering</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>
        <DataLabel size="l">Find an exact Conversion by entering the ID:</DataLabel>
        <br />
        <br />
        <FormInput
          id="find-transfer-modal__transfer-id"
          label="Conversion ID"
          type="text"
          value={model.conversionId || ''}
          onChange={(value: FilterChangeValue) => onFilterChange({ field: 'conversionId', value })}
        />
      </TabPanel>
      <TabPanel>
        <DataLabel size="l">Filter Conversions:</DataLabel>
        <br />
        <br />
        <Row>
          <Column>
            <DataLabel size="m">Approximate time of Conversion</DataLabel>
            <Row>
              <Column>
                <Select
                  id="find-transfer-modal__date"
                  placeholder="Date"
                  type="select"
                  style={{ width: '200px' }}
                  options={dateRanges}
                  selected={model.dates || ''}
                  onChange={(value: FilterChangeValue) => onFilterChange({ field: 'dates', value })}
                />
              </Column>
              <Column>
                <DatePicker
                  id="find-transfer-modal__from-date"
                  placeholder="From"
                  style={{ width: '250px' }}
                  withTime
                  value={model.from || ''}
                  onSelect={(value: FilterChangeValue) => onFilterChange({ field: 'from', value })}
                  format="x"
                />
              </Column>
              <Column>
                <DatePicker
                  id="find-transfer-modal__to-date"
                  placeholder="To"
                  style={{ width: '250px' }}
                  withTime
                  value={model.to || ''}
                  onSelect={(value: FilterChangeValue) => onFilterChange({ field: 'to', value })}
                  format="x"
                />
              </Column>
            </Row>
          </Column>
          <Column style={{ paddingLeft: '20px' }}>
            <FormInput
              id="find-transfer-modal__directionOfFunds"
              label="Direction of Funds"
              style={{ width: '250px' }}
              type="select"
              options={transferDirectionOfFunds}
              value={model.direction || TransferDirection.All}
              onChange={(value: FilterChangeValue) => onFilterChange({ field: 'direction', value })}
            />
          </Column>
        </Row>
        <br />
        <Row>
          <Column>
            <FormInput
              id="find-transfer-modal__aliasType"
              label="Payee Alias Type"
              type="select"
              style={{ width: '200px' }}
              options={aliasType}
              value={model.aliasType || null}
              onChange={(value: FilterChangeValue) => onFilterChange({ field: 'aliasType', value })}
            />
          </Column>
          <Column>
            <FormInput
              id="find-transfer-modal__payeeAlias"
              label="Payee Alias"
              type="text"
              style={{ width: '250px' }}
              value={model.payeeAlias || ''}
              onChange={(value: FilterChangeValue) => {
                onFilterChange({ field: 'payeeAlias', value });
              }}
            />
          </Column>
          <Column>
            <FormInput
              id="find-transfer-modal__aliasSubValue"
              label="Payee Alias Sub Value"
              type="text"
              style={{ width: '250px' }}
              value={model.aliasSubValue || ''}
              onChange={(value: FilterChangeValue) => {
                onFilterChange({ field: 'aliasSubValue', value });
              }}
            />
          </Column>
          <Column style={{ paddingLeft: '20px' }}>
            <span style={{ width: '250px' }}>&nbsp;</span>
          </Column>
        </Row>
        {/* <Row>
          <Column>
            <FormInput
              id="find-transfer-modal__aliasType"
              label="Payee Alias Type"
              type="select"
              options={aliasType}
              value={model.aliasType || null}
              onChange={(value: FilterChangeValue) => onFilterChange({ field: 'aliasType', value })}
            />
          </Column>
          <Column style={{ marginLeft: '10px' }}>
            <FormInput
              id="find-transfer-modal__payeeAlias"
              label="Payee Alias"
              type="text"
              value={model.payeeAlias || ''}
              onChange={(value: FilterChangeValue) => onFilterChange({ field: 'payeeAlias', value })}
            />
          </Column>
          <Column style={{ marginLeft: '10px' }}>
            <FormInput
              id="find-transfer-modal__aliasSubValue"
              label="Payee Alias Sub Value"
              type="text"
              value={model.aliasSubValue || ''}
              onChange={(value: FilterChangeValue) => onFilterChange({ field: 'aliasSubValue', value })}
            />
          </Column>
        </Row> */}
        <br />
        <FormInput
          id="find-transfer-modal__institution"
          label="Contains Institution"
          type="text"
          value={model.institution || ''}
          onChange={(value: FilterChangeValue) => onFilterChange({ field: 'institution', value })}
        />
        <FormInput
          id="find-transfer-modal__transfer-status"
          label="Conversion Status"
          type="select"
          options={transferStatuses}
          value={model.status || ''}
          onChange={(value: FilterChangeValue) => onFilterChange({ field: 'status', value })}
        />
      </TabPanel>
    </TabPanels>
  </Tabs>
);

export default connect(stateProps, dispatchProps)(FxpConversionFinderModal);
