import React, { FC } from 'react';
import { connect } from 'react-redux';
import { State, Dispatch } from 'store/types';
import { AliasType, FxpConversionDirection, FxpConversionStatus } from 'App/types';
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
import { FxpConversion, FxpConversionError, DateRange, FxpConversionFilter } from '../../types';
import * as helpers from '../../helpers';

type FilterChangeValue = string | number;

const stateProps = (state: State) => ({
  model: selectors.getFxpConversionFinderFilter(state),
  // fxpConversions: selectors.getFxpConversions(state),
  fxpConversions: selectors.getFxpConversions(state),
  fxpConversionsError: selectors.getFxpConversionsError(state),
  isFxpConversionsPending: selectors.getIsFxpConversionsPending(state),
  isFxpConversionsRequested: selectors.getIsFxpConversionsRequested(state),
});

const dispatchProps = (dispatch: Dispatch) => ({
  onModalCloseClick: () => dispatch(actions.toggleFxpConversionFinderModal()),
  onFiltersSubmitClick: (filters: FxpConversionFilter) =>
    dispatch(actions.requestFxpConversions({ filters })),
  onFxpConversionsSubmitClick: () => dispatch(actions.unrequestFxpConversions()),
  onFilterChange: ({ field, value }: { field: string; value: FilterChangeValue }) =>
    dispatch(actions.setFxpConversionFinderFilter({ field, value })),
  onFxpConversionRowClick: (fxpConversionError: FxpConversionError) => {
    dispatch(
      actions.requestFxpConversionDetails({ conversionId: fxpConversionError.conversionId })
    );
  },
});

interface FxpConversionFinderModalProps {
  model: FxpConversionFilter;
  fxpConversions: FxpConversion[];
  fxpConversionsError: string | null;
  isFxpConversionsPending: boolean;
  isFxpConversionsRequested: boolean;
  onFiltersSubmitClick: (filters: FxpConversionFilter) => void;
  onFxpConversionsSubmitClick: () => void;
  onModalCloseClick: () => void;
  onFilterChange: ({ field, value }: { field: string; value: FilterChangeValue }) => void;
  onFxpConversionRowClick: (fxpConversionError: FxpConversionError) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function downloadFxpConversionsToExcel(fxpConversions: any): Promise<void> {
  const ws = xlsx.utils.json_to_sheet(fxpConversions);
  const wscols = [{ wch: 20 }];
  ws['!cols'] = wscols;
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, 'FxpConversions');
  const fileName: string = `Payment_Manager_FxpConversions_${new Date().toDateString()}.xlsx`;
  xlsx.writeFile(wb, fileName);
}

const FxpConversionFinderModal: FC<FxpConversionFinderModalProps> = ({
  model,
  fxpConversions,
  fxpConversionsError,
  isFxpConversionsPending,
  isFxpConversionsRequested,
  onFiltersSubmitClick,
  onFxpConversionsSubmitClick,
  onModalCloseClick,
  onFilterChange,
  onFxpConversionRowClick,
}) => {
  let content = null;
  let onSubmit: (() => void) | undefined;
  let submitLabel: string | undefined;

  const fxpConversionsColumns = [
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
      func: (value: string, item: FxpConversion) => `${item.currency} ${item.amount}`,
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
      func: helpers.toFxpConversionsDate,
    },
  ];

  console.log('isFxpConversionsRequested:', isFxpConversionsRequested); // Debugging log
  console.log('isFxpConversionsPending:', isFxpConversionsPending); // Debugging log
  console.log('fxpConversionsError:', fxpConversionsError); // Debugging log

  if (!isFxpConversionsRequested) {
    content = <FxpConversionFilters model={model} onFilterChange={onFilterChange} />;
    onSubmit = () => {
      console.log('Submitting filters:', model); // Debugging log
      onFiltersSubmitClick(model);
    };
    submitLabel = 'Find Conversions';
  } else if (fxpConversionsError) {
    content = <ErrorBox>FxpConversion: Unable to load Conversions</ErrorBox>;
  } else if (isFxpConversionsPending) {
    content = (
      <div className="fxpConversions__fxpConversions__loader">
        <Spinner size={20} />
      </div>
    );
  } else {
    console.log('fxpConversions:', fxpConversions); // Debugging log
    content = (
      <div className="fxpConversions__fxpConversions__list">
        {fxpConversions.length > 0 && (
          <Button
            label="Download FxpConversions"
            noFill
            onClick={() => downloadFxpConversionsToExcel(fxpConversions)}
          />
        )}
        <DataList
          columns={fxpConversionsColumns}
          list={fxpConversions}
          onSelect={onFxpConversionRowClick}
        />
      </div>
    );
    onSubmit = () => {
      console.log('Returning to filtering'); // Debugging log
      onFxpConversionsSubmitClick();
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

const fxpConversionStatuses = [
  {
    label: helpers.toSpacedPascalCase(FxpConversionStatus.Success),
    value: FxpConversionStatus.Success,
  },
  {
    label: helpers.toSpacedPascalCase(FxpConversionStatus.Pending),
    value: FxpConversionStatus.Pending,
  },
  {
    label: helpers.toSpacedPascalCase(FxpConversionStatus.Error),
    value: FxpConversionStatus.Error,
  },
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

const fxpConversionDirectionOfFunds = [
  {
    label: helpers.toSpacedPascalCase(FxpConversionDirection.Inbound),
    value: FxpConversionDirection.Inbound,
  },
  {
    label: helpers.toSpacedPascalCase(FxpConversionDirection.Outbound),
    value: FxpConversionDirection.Outbound,
  },
  {
    label: helpers.toSpacedPascalCase(FxpConversionDirection.All),
    value: FxpConversionDirection.All,
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
          id="find-fxpConversion-modal__fxpConversion-id"
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
                  id="find-fxpConversion-modal__date"
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
                  id="find-fxpConversion-modal__from-date"
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
                  id="find-fxpConversion-modal__to-date"
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
              id="find-fxpConversion-modal__directionOfFunds"
              label="Direction of Funds"
              style={{ width: '250px' }}
              type="select"
              options={fxpConversionDirectionOfFunds}
              value={model.direction || FxpConversionDirection.All}
              onChange={(value: FilterChangeValue) => onFilterChange({ field: 'direction', value })}
            />
          </Column>
        </Row>
        <br />
        <Row>
          <Column>
            <FormInput
              id="find-fxpConversion-modal__aliasType"
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
              id="find-fxpConversion-modal__payeeAlias"
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
              id="find-fxpConversion-modal__aliasSubValue"
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
              id="find-fxpConversion-modal__aliasType"
              label="Payee Alias Type"
              type="select"
              options={aliasType}
              value={model.aliasType || null}
              onChange={(value: FilterChangeValue) => onFilterChange({ field: 'aliasType', value })}
            />
          </Column>
          <Column style={{ marginLeft: '10px' }}>
            <FormInput
              id="find-fxpConversion-modal__payeeAlias"
              label="Payee Alias"
              type="text"
              value={model.payeeAlias || ''}
              onChange={(value: FilterChangeValue) => onFilterChange({ field: 'payeeAlias', value })}
            />
          </Column>
          <Column style={{ marginLeft: '10px' }}>
            <FormInput
              id="find-fxpConversion-modal__aliasSubValue"
              label="Payee Alias Sub Value"
              type="text"
              value={model.aliasSubValue || ''}
              onChange={(value: FilterChangeValue) => onFilterChange({ field: 'aliasSubValue', value })}
            />
          </Column>
        </Row> */}
        <br />
        <FormInput
          id="find-fxpConversion-modal__institution"
          label="Contains Institution"
          type="text"
          value={model.institution || ''}
          onChange={(value: FilterChangeValue) => onFilterChange({ field: 'institution', value })}
        />
        <FormInput
          id="find-fxpConversion-modal__fxpConversion-status"
          label="Conversion Status"
          type="select"
          options={fxpConversionStatuses}
          value={model.status || ''}
          onChange={(value: FilterChangeValue) => onFilterChange({ field: 'status', value })}
        />
      </TabPanel>
    </TabPanels>
  </Tabs>
);

export default connect(stateProps, dispatchProps)(FxpConversionFinderModal);
