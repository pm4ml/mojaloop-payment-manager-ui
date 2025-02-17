import React, { FC } from 'react';
import { ChartLayout, ErrorBox, Spinner } from 'components';
import { ErrorMessage, XYCoordinate } from 'App/types';
import Chart from 'react-apexcharts';

interface TransfersSuccessPercProps {
  isPending: boolean | undefined;
  data?: XYCoordinate[];
  error: ErrorMessage;
  legendColor: string;
}

const TransfersSuccessPerc: FC<TransfersSuccessPercProps> = ({
  isPending,
  data,
  error,
  legendColor,
}) => {
  let content = null;
  if (isPending || !data) {
    content = (
      <div className="transfers__successful-perc__graph-loader">
        <Spinner size={20} />
      </div>
    );
  } else if (error) {
    content = <ErrorBox>Transfers Successful Percentage: Unable to load data</ErrorBox>;
  } else {
    content = (
      <ChartLayout
        title="Successful Transfers"
        legend={[{ label: 'Percent / Min', color: legendColor }]}
        Graph={() => <SuccessfulTransferGraph data={data} chartColor={legendColor} />}
      />
    );
  }
  return <div className="transfers__successful-perc__section">{content}</div>;
};

interface SuccessfulTransferGraphProps {
  data: XYCoordinate[];
  chartColor: string;
}

const SuccessfulTransferGraph: FC<SuccessfulTransferGraphProps> = ({ data, chartColor }) => {
  const series = {
    name: 'Success Percentage',
    data,
  };

  const opts = {
    chart: {
      id: 'transfer-success-perc-chart',
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
    colors: [chartColor],
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

export default TransfersSuccessPerc;
