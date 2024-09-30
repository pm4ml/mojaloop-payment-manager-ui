import React, { FC } from 'react';
import { ChartLayout, ErrorBox, Spinner } from 'components';
import { ErrorMessage, XYCoordinate } from 'App/types';
import Chart from 'react-apexcharts';

interface FxpConversionsSuccessPercProps {
  isPending: boolean | undefined;
  data?: XYCoordinate[];
  error: ErrorMessage;
}

const FxpConversionsSuccessPerc: FC<FxpConversionsSuccessPercProps> = ({
  isPending,
  data,
  error,
}) => {
  let content = null;
  if (isPending || !data) {
    content = (
      <div className="fxpConversions__successful-perc__graph-loader">
        <Spinner size={20} />
      </div>
    );
  } else if (error) {
    content = <ErrorBox>FxpConversions Successful Percentage: Unable to load data</ErrorBox>;
  } else {
    content = (
      <ChartLayout
        title="Successful FxpConversions"
        legend={[{ label: 'Percent / Min', color: '#4fc7e7' }]}
        Graph={() => <SuccessfulFxpConversionGraph data={data} />}
      />
    );
  }
  return <div className="fxpConversions__successful-perc__section">{content}</div>;
};

interface SuccessfulFxpConversionGraphProps {
  data: XYCoordinate[];
}

const SuccessfulFxpConversionGraph: FC<SuccessfulFxpConversionGraphProps> = ({ data }) => {
  const series = {
    name: 'Success Percentage',
    data,
  };

  const opts = {
    chart: {
      id: 'fxpConversion-success-perc-chart',
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
    colors: ['#4fc7e7'],
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

export default FxpConversionsSuccessPerc;
