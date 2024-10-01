import React, { FC } from 'react';
import { AnimateFadeIn, Column, DataLabel, ErrorBox, Pill, Row, Spinner } from 'components';
import { ErrorMessage, FxpConversionStatus } from 'App/types';
import { FxpConversionsStatus } from '../../types';

function getCount(items: FxpConversionsStatus[], status: FxpConversionStatus): number | undefined {
  const fxpConversionsStatus = items.find((item) => item.status === status);
  return fxpConversionsStatus?.count;
}

interface FxpConversionsStatusesProps {
  isPending: boolean;
  items: FxpConversionsStatus[];
  error: ErrorMessage;
}
const FxpConversionsStatusesItems: FC<FxpConversionsStatusesProps> = ({
  isPending,
  items,
  error,
}) => {
  let content = null;
  if (isPending) {
    content = (
      <div className="fxpConversions__statuses__loader">
        <Spinner size={20} />
      </div>
    );
  } else if (error) {
    content = <ErrorBox>FxpConversions Status: Unable to load data</ErrorBox>;
  } else {
    const success = getCount(items, FxpConversionStatus.Success);
    const pending = getCount(items, FxpConversionStatus.Pending);
    const failed = getCount(items, FxpConversionStatus.Error);

    content = (
      <Row>
        <Column grow="1">
          <Row align="flex-start">
            <AnimateFadeIn initial={{ x: -10 }} animate={{ x: 0 }}>
              <Pill
                active
                label={`${success} Successful`}
                kind="primary"
                className="fxpConversions__statuses__status fxpConversions__statuses__status--successful"
              />
              <Pill
                active
                label={`${pending} Pending`}
                kind="success"
                className="fxpConversions__statuses__status fxpConversions__statuses__status--pending"
              />
              <Pill
                active
                label={`${failed} Failed`}
                kind="danger"
                className="fxpConversions__statuses__status fxpConversions__statuses__status--has-errors"
              />
            </AnimateFadeIn>
          </Row>
        </Column>
      </Row>
    );
  }

  return (
    <div className="fxpConversions__statuses__section">
      <DataLabel size="m">Total FxpConversion Statuses</DataLabel>
      <br />
      {content}
    </div>
  );
};

export default FxpConversionsStatusesItems;
