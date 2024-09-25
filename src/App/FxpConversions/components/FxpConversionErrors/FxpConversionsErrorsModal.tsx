import React, { FC } from 'react';
import { connect } from 'react-redux';
import { State, Dispatch } from 'store/types';
import { DataList, Modal, Spinner, Link } from 'components';
import * as actions from '../../actions';
import * as selectors from '../../selectors';
import { FxpConversionError } from '../../types';
import * as helpers from '../../helpers';

const stateProps = (state: State) => ({
  fxpConversionsErrors: selectors.getFilteredByStatusFxpConversionsErrors(state),
  fxpConversionsErrorsError: selectors.getFxpConversionsErrorsError(state),
  isFxpConversionsErrorsViewAllActive: selectors.getIsFxpConversionsErrorsViewAllActive(state),
  isFxpConversionsErrorsPending: selectors.getIsFxpConversionsErrorsPending(state),
});

const dispatchProps = (dispatch: Dispatch) => ({
  onModalCloseClick: () => dispatch(actions.toggleFxpConversionsErrorsViewAll()),
  onFxpConversionRowClick: (fxpConversionError: FxpConversionError) => {
    dispatch(actions.requestFxpConversionDetails({ conversionId: fxpConversionError.conversionId }));
  },
});

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
  { label: 'Type', key: 'type', className: 'col-100' },
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
    key: 'receiveAmount',
  },
  {
    label: 'Receive Currency',
    key: 'receiveCurrency',
  },
  { label: 'Error Type', key: 'errorType', func: helpers.toSpacedPascalCase },
  {
    label: 'Date',
    key: 'initiatedTimestamp',
    func: helpers.toFxpConversionsDate,
  },
];

interface FxpConversionsErrorsModalProps {
  fxpConversionsErrors: FxpConversionError[];
  fxpConversionsErrorsError: string | null;
  isFxpConversionsErrorsViewAllActive: boolean;
  isFxpConversionsErrorsPending?: boolean;
  onModalCloseClick: () => void;
  onFxpConversionRowClick: (fxpConversionError: FxpConversionError) => void;
}

const FxpConversionsErrorsModal: FC<FxpConversionsErrorsModalProps> = ({
  fxpConversionsErrors,
  fxpConversionsErrorsError,
  isFxpConversionsErrorsViewAllActive,
  isFxpConversionsErrorsPending,
  onModalCloseClick,
  onFxpConversionRowClick,
}) => (
  <Modal title="FxpConversions Errors" width="1200px" onClose={onModalCloseClick}>
    {isFxpConversionsErrorsPending ? (
      <div className="fxpConversions__errors__loader">
        <Spinner size={20} />
      </div>
    ) : (
      <div className="fxpConversions__errors__list">
        <DataList
          columns={fxpConversionsErrorsColumns}
          list={fxpConversionsErrors}
          onSelect={onFxpConversionRowClick}
        />
      </div>
    )}
  </Modal>
);

export default connect(stateProps, dispatchProps)(FxpConversionsErrorsModal);
