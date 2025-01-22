import React, { FC } from 'react';
import { ChartLayout, ErrorBox, Spinner } from 'components';
import { ErrorMessage, XYCoordinate } from 'App/types';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { getUiConfig } from '../../../selectors';
interface FxpConversionsChartsProps {
  isPending: boolean | undefined;
  data?: XYCoordinate[];
  error: ErrorMessage;
}

const FxpConversionsCharts: FC<FxpConversionsChartsProps> = ({ isPending, data, error }) => {
  const uiConfig = useSelector(getUiConfig);
  let primaryColor = uiConfig.primaryColor;
  let content = null;
  if (isPending || !data) {
    content = (
      <div className="fxpConversions__avg-time__graph-loader">
        <Spinner size={20} />
      </div>
    );
  } else if (error) {
    content = <ErrorBox>FxpConversions average time: Unable to load data</ErrorBox>;
  } else {
    content = (
      <ChartLayout
        title="Average FxpConversion Time (E2E)"
        legend={[{ label: 'Avg. FxpConversion Time in ms / Min', color: primaryColor }]}
        Graph={() => <AverageFxpConversionTimeGraph data={data} />}
      />
    );
  }
  return <div className="fxpConversions__avg-time__section">{content}</div>;
};

interface AverageFxpConversionTimeGraphProps {
  data: XYCoordinate[];
}

const AverageFxpConversionTimeGraph: FC<AverageFxpConversionTimeGraphProps> = ({ data }) => {
  const uiConfig = useSelector(getUiConfig);
  let primaryColor = uiConfig.primaryColor;
  const series = {
    name: 'Average Response Time',
    data,
  };

  const opts = {
    chart: {
      id: 'fxpConversion-avg-time-chart',
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

export default FxpConversionsCharts;
