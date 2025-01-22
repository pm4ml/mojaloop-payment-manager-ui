import React, { FC } from 'react';
import { ChartLayout, ErrorBox, Spinner } from 'components';
import { ErrorMessage, XYCoordinate } from 'App/types';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { getUiConfig } from '../../../selectors';

interface TransfersChartsProps {
  isPending: boolean | undefined;
  data?: XYCoordinate[];
  error: ErrorMessage;
}

const TransfersCharts: FC<TransfersChartsProps> = ({ isPending, data, error }) => {
  const uiConfig = useSelector(getUiConfig);
  let primaryColor = uiConfig.primaryColor;
  let content = null;
  if (isPending || !data) {
    content = (
      <div className="transfers__avg-time__graph-loader">
        <Spinner size={20} />
      </div>
    );
  } else if (error) {
    content = <ErrorBox>Transfers average time: Unable to load data</ErrorBox>;
  } else {
    content = (
      <ChartLayout
        title="Average Transfer Time (E2E)"
        legend={[{ label: 'Avg. Transfer Time in ms / Min', color: primaryColor }]}
        Graph={() => <AverageTransferTimeGraph data={data} />}
      />
    );
  }
  return <div className="transfers__avg-time__section">{content}</div>;
};

interface AverageTransferTimeGraphProps {
  data: XYCoordinate[];
}

const AverageTransferTimeGraph: FC<AverageTransferTimeGraphProps> = ({ data }) => {
  const uiConfig = useSelector(getUiConfig);
  let primaryColor = uiConfig.primaryColor;
  const series = {
    name: 'Average Response Time',
    data,
  };

  const opts = {
    chart: {
      id: 'transfer-avg-time-chart',
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      labels: {
        formatter: (val: string | number) => {
          return `${Number(val).toFixed(0)}`;
        },
      },
    },
    grid: {
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
      strokeDashArray: 2,
      strokeWidth: 2,
      strokeLineCap: 'round',
    },
    stroke: {
      width: [2],
      curve: 'smooth',
    },
    colors: [primaryColor],
    tooltip: {
      x: {
        formatter: (val: string | number) => {
          return new Date(val).toISOString();
        },
      },
    },
  };

  return <Chart options={opts} series={[series]} type="line" width="100%" height={300} />;
};

export default TransfersCharts;
