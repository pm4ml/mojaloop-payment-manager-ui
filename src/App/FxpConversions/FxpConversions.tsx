import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Button, Heading, Row } from 'components';
import { State, Dispatch } from 'store/types';
import { loadFxpConversions } from './hocs';
import * as selectors from './selectors';
import * as actions from './actions';
import { FxpConversionsStatus, FxpConversionError } from './types';
import { XYCoordinate } from '../types';
import FxpConversionFinderModal from './components/FxpConversionFinderModal';
import FxpConversionDetailsModal from './components/FxpConversionDetails';
import FxpConversionsErrors from './components/FxpConversionErrors';
import FxpConversionsErrorsChart from './components/FxpConversionErrorsChart';
import FxpConversionsSuccessPerc from './components/FxpConversionSuccessPerc';
import FxpConversionsAvgTime from './components/FxpConversionAvgTime';
import FxpConversionsStatuses from './components/FxpConversionStatuses';
import './FxpConversions.css';

import { useSelector } from 'react-redux';
import { getUiConfig } from '../selectors';

const stateProps = (state: State) => ({
  fxpConversionsErrors: selectors.getFxpConversionsErrors(state),
  fxpConversionsErrorsError: selectors.getFxpConversionsErrorsError(state),
  isFxpConversionsErrorsViewAllActive: selectors.getIsFxpConversionsErrorsViewAllActive(state),
  isFxpConversionsErrorsPending: selectors.getIsFxpConversionsErrorsPending(state),
  fxpConversionsStatuses: selectors.getFxpConversionsStatuses(state),
  fxpConversionsStatusesError: selectors.getFxpConversionsStatusesError(state),
  isFxpConversionsStatusesPending: selectors.getIsFxpConversionsStatusesPending(state),
  isFxpConversionFinderModalVisible: selectors.getIsFxpConversionFinderModalVisible(state),
  fxpConversionsSuccessPerc: selectors.getFxpConversionsSuccessPercTransformed(state),
  fxpConversionsSuccessPercError: selectors.getFxpConversionsSuccessPercError(state),
  isFxpConversionsSuccessPercPending: selectors.getIsFxpConversionsSuccessPercPending(state),
  fxpConversionsAvgTime: selectors.getFxpConversionsAvgTimeTransformed(state),
  fxpConversionsAvgTimeError: selectors.getFxpConversionsAvgTimeError(state),
  isFxpConversionsAvgTimePending: selectors.getIsFxpConversionsAvgTimePending(state),
  isFxpConversionDetailsModalVisible: selectors.getIsFxpConversionDetailsModalVisible(state),
});

const dispatchProps = (dispatch: Dispatch) => ({
  onViewAllReconcilationErrorsButtonClick: () =>
    dispatch(actions.toggleFxpConversionsErrorsViewAll()),
  onFxpConversionFinderButtonClick: () => dispatch(actions.toggleFxpConversionFinderModal()),
  onModalCloseClick: () => dispatch(actions.toggleFxpConversionFinderModal()),
  onFxpConversionRowClick: (fxpConversionError: FxpConversionError) => {
    dispatch(
      actions.requestFxpConversionDetails({ conversionId: fxpConversionError.conversionId })
    );
  },
});

type FxpFxpConversionsProps = {
  fxpConversionsErrors: FxpConversionError[];
  fxpConversionsErrorsError: string | null;
  isFxpConversionsErrorsViewAllActive: boolean;
  isFxpConversionsErrorsPending?: boolean;
  isFxpConversionFinderModalVisible: boolean;
  isFxpConversionDetailsModalVisible: boolean;
  fxpConversionsStatuses: FxpConversionsStatus[];
  fxpConversionsStatusesError: string | null;
  isFxpConversionsStatusesPending: boolean;
  fxpConversionsSuccessPerc?: XYCoordinate[];
  fxpConversionsSuccessPercError: string | null;
  isFxpConversionsSuccessPercPending: boolean;
  fxpConversionsAvgTime?: XYCoordinate[];
  fxpConversionsAvgTimeError: string | null;
  isFxpConversionsAvgTimePending: boolean;
  onViewAllReconcilationErrorsButtonClick: () => void;
  onFxpConversionFinderButtonClick: () => void;
  onFxpConversionRowClick: (fxpConversionError: FxpConversionError) => void;
};

const FxpFxpConversions: FC<FxpFxpConversionsProps> = ({
  fxpConversionsErrors,
  fxpConversionsErrorsError,
  isFxpConversionsErrorsViewAllActive,
  isFxpConversionsErrorsPending,
  isFxpConversionFinderModalVisible,
  isFxpConversionDetailsModalVisible,
  fxpConversionsStatuses,
  fxpConversionsStatusesError,
  isFxpConversionsStatusesPending,
  fxpConversionsSuccessPerc,
  fxpConversionsSuccessPercError,
  isFxpConversionsSuccessPercPending,
  fxpConversionsAvgTime,
  fxpConversionsAvgTimeError,
  isFxpConversionsAvgTimePending,
  onViewAllReconcilationErrorsButtonClick,
  onFxpConversionFinderButtonClick,
  onFxpConversionRowClick,
}) => {
  const uiConfig = useSelector(getUiConfig);
  let primaryColor = uiConfig.primaryColor;
  return (
    <div className="fxpfxpConversions">
      <Heading size="3">FXP Conversions Overview</Heading>
      <Row style={{ marginBottom: '20px' }}>
        <Button
          onClick={onFxpConversionFinderButtonClick}
          label="Find a Conversion"
          kind="secondary"
        />
      </Row>
      <FxpConversionsSuccessPerc
        data={fxpConversionsSuccessPerc}
        error={fxpConversionsSuccessPercError}
        isPending={isFxpConversionsSuccessPercPending}
        legendColor={primaryColor}
      />
      <FxpConversionsAvgTime
        data={fxpConversionsAvgTime}
        error={fxpConversionsAvgTimeError}
        isPending={isFxpConversionsAvgTimePending}
        legendColor={primaryColor}
      />
      <FxpConversionsStatuses
        isPending={isFxpConversionsStatusesPending}
        items={fxpConversionsStatuses}
        error={fxpConversionsStatusesError}
      />
      <FxpConversionsErrorsChart />
      <FxpConversionsErrors
        isPending={isFxpConversionsErrorsPending}
        items={fxpConversionsErrors}
        error={fxpConversionsErrorsError}
        onViewAllClick={onViewAllReconcilationErrorsButtonClick}
        isViewAllActive={isFxpConversionsErrorsViewAllActive}
        onFxpConversionRowClick={onFxpConversionRowClick}
      />
      {isFxpConversionFinderModalVisible && <FxpConversionFinderModal />}
      {isFxpConversionDetailsModalVisible && <FxpConversionDetailsModal />}
    </div>
  );
};

export default loadFxpConversions(connect(stateProps, dispatchProps)(FxpFxpConversions));
