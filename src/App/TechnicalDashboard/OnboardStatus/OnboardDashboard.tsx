import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
import {
    Heading,
    MetricsChart,
    Row,
    Column,
    Select,
    Tabs,
    Tab,
    TabList,
    TabPanels,
    TabPanel,
} from 'components';
import { State, Dispatch } from 'store/types';
import { MetricDataWrapper, XYCoordinate } from 'App/types';
import { loadTechnicalDashboard } from '../hocs';
import * as selectors from '../selectors';
import * as actions from '../actions';
import { TechnicalDashboardFilters } from '../types';
import './OnboardDashboard.css';
import ConnectionHealthDropdown from './ConnectionHealthDropdown';

const stateProps = (state: State) => ({
    filters: selectors.getTechnicalDashboardFilters(state),
    partyLookupRateData: selectors.getMetricData(
        state,
        'mojaloop_connector_outbound_party_lookup_request_count'
    ),
    quoteRequestRateData: selectors.getMetricData(
        state,
        'mojaloop_connector_outbound_quote_request_count'
    ),
    prepareRateData: selectors.getMetricData(
        state,
        'mojaloop_connector_outbound_transfer_prepare_count'
    ),
    partyLookupLatencyData: selectors.getMetricData(
        state,
        'mojaloop_connector_outbound_party_lookup_latency'
    ),
    quoteRequestLatencyData: selectors.getMetricData(
        state,
        'mojaloop_connector_outbound_quote_request_latency'
    ),
    transferLatencyData: selectors.getMetricData(
        state,
        'mojaloop_connector_outbound_transfer_latency'
    ),
});

const dispatchProps = (dispatch: Dispatch) => ({
    onFilterChange: ({ field, value }: { field: string; value: string | number }) => {
        dispatch(actions.setTechnicalDashboardFilters({ field, value }));
    },
});

type TechnicalDashboardProps = {
    partyLookupRateData?: MetricDataWrapper<XYCoordinate>;
    quoteRequestRateData?: MetricDataWrapper<XYCoordinate>;
    prepareRateData?: MetricDataWrapper<XYCoordinate>;
    partyLookupLatencyData?: MetricDataWrapper<XYCoordinate>;
    quoteRequestLatencyData?: MetricDataWrapper<XYCoordinate>;
    transferLatencyData?: MetricDataWrapper<XYCoordinate>;
    filters: TechnicalDashboardFilters;
    onFilterChange: ({ field, value }: { field: string; value: string | number }) => void;
};


enum indicatorColor {
    Completed = '#12d670',
    InProgress = '#ff9933',
    Pending = '#DDDDDD',
    Error = '#f44336',
    Unknown = '#000000',
}

const TechnicalDashboard: FC<TechnicalDashboardProps> = ({
    partyLookupRateData,
    quoteRequestRateData,
    prepareRateData,
    partyLookupLatencyData,
    quoteRequestLatencyData,
    transferLatencyData,
    filters,
    onFilterChange,
}) => {
    const partyLookupData = [];
    if (partyLookupRateData) {
        partyLookupData.push({
            chartType: 'line',
            color: '#4fc7e7',
            legendText: 'Requests/sec',
            data: partyLookupRateData.data,
        });
    }
    if (partyLookupLatencyData) {
        partyLookupData.push({
            chartType: 'line',
            color: indicatorColor.Completed,
            legendText: 'Latency ms',
            data: partyLookupLatencyData.data.map((d) => ({ x: d.x, y: d.y * 1000 })),
        });
    }

    const quoteRequestData = [];
    if (quoteRequestRateData) {
        quoteRequestData.push({
            chartType: 'line',
            color: '#4fc7e7',
            legendText: 'Requests/sec',
            data: quoteRequestRateData.data,
        });
    }
    if (quoteRequestLatencyData) {
        quoteRequestData.push({
            chartType: 'line',
            color: indicatorColor.Completed,
            legendText: 'Latency ms',
            data: quoteRequestLatencyData.data.map((d) => ({ x: d.x, y: d.y * 1000 })),
        });
    }

    const transferRequestData = [];
    if (prepareRateData) {
        transferRequestData.push({
            chartType: 'line',
            color: '#4fc7e7',
            legendText: 'Requests/sec',
            data: prepareRateData.data,
        });
    }
    if (transferLatencyData) {
        transferRequestData.push({
            chartType: 'line',
            color: indicatorColor.Completed,
            legendText: 'Latency ms',
            data: transferLatencyData.data.map((d) => ({ x: d.x, y: d.y * 1000 })),
        });
    }

    const [showDropDown, setShowDropDown] = useState<boolean>(false);

    const toggleDropdown = () => {
        setShowDropDown((prevState: boolean) => !prevState);
    };


    const connectionStates = {
        pending: {
            color: indicatorColor.Pending,
            message: 'Connecting ...',
        },
        error: {
            color: indicatorColor.Error,
            message: 'Connection Error: Error writing JWS key to vault - Access Denied',
        },
        completed: {
            color: indicatorColor.Completed,
            message: 'Connected',
        },
        inProgress: {
            color: indicatorColor.InProgress,
            message: 'Connecting ...',
        },
    };

    const connectionStatus = 'error';
    const { color: connectionIndicatorColor, message: connectionMessage } = connectionStates[connectionStatus] || {
        color: indicatorColor.Unknown,
        message: 'Unknown Status',
    };

    let lastUpdated = new Date().toISOString();

    const connectionStateList = [
        { label: 'Fetching Hub CA', value: 'Fetching_Hub_CA', color: indicatorColor.Completed, description: `Completed (Last Updated: ${lastUpdated})` },
        { label: 'Creating DFSP CA', value: 'Creating_DFSP_CA', color: indicatorColor.Completed, description: `Completed (Last Updated: ${lastUpdated})` },
        { label: 'Creating DFSP Client Cert', value: 'Creating_DFSP_Client_Cert', color: indicatorColor.Completed, description: `Completed (Last Updated: ${lastUpdated})` },
        { label: 'Creating DFSP Server Cert', value: 'Creating_DFSP_Server_Cert', color: indicatorColor.Completed, description: `Completed (Last Updated: ${lastUpdated})` },
        { label: 'Creating Hub Client Cert', value: 'Creating_Hub_Client_Cert', color: indicatorColor.Completed, description: `Completed (Last Updated: ${lastUpdated})` },
        { label: 'Pulling Peer JWS', value: 'Pulling_Peer_JWS', color: indicatorColor.Completed, description: `In Progress (Last Updated: ${lastUpdated})` },
        { label: 'Uploading Peer JWS', value: 'Uploading_Peer_JWS', color: indicatorColor.InProgress, description: `In Progress (Last Updated: ${lastUpdated})` },
        { label: 'Creating JWS', value: 'Creating_JWS', color: indicatorColor.Error, description: `Connection Error: Error writing JWS key to vault - Access Denied (Last Updated: ${lastUpdated})` },
        { label: 'Endpoint Config', value: 'Endpoint_Config', color: indicatorColor.Pending, description: `Pending (Last Updated: ${lastUpdated})` },
        { label: 'Connector Config', value: 'Connector_Config', color: indicatorColor.Pending, description: `Pending (Last Updated: ${lastUpdated})` },
        { label: 'Progress Monitor', value: 'Progress_Monitor', color: indicatorColor.Completed, description: `Completed (Last Updated: ${lastUpdated})` },
    ];
    let splitTextArray = connectionMessage.split(':');
    const connectionMessageTitle = splitTextArray[0];
    const connectionMessageDescription = splitTextArray[1];
    const arrowDownUrl = "https://img.icons8.com/?size=100&id=ZOUx9tGqWHny&format=png&color=000000";
    const arrowUpUrl = "https://img.icons8.com/?size=100&id=60662&format=png&color=000000";
    return (
        <div className="dashboard">
            <Heading size="3">Technical Dashboard</Heading>
            <Row style={{ marginBottom: '10px' }}>
                <div>Connection Health</div>
            </Row>
            <Row align="left top" style={{ marginBottom: '20px' }}>
                <div className="accordion__indicator__color" style={{ background: connectionIndicatorColor }} />
                <div><span style={{ marginBottom: '20px', fontWeight: 'bold' }}>{connectionMessageTitle} :</span><span>{connectionMessageDescription}</span></div>
                <button onClick={toggleDropdown} style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: '10px' }}>
                    <img src={showDropDown ? arrowDownUrl : arrowUpUrl} alt="Dropdown Arrow" style={{ width: '12px', height: '12px' }} />
                </button>
            </Row>
            <div style={{ marginBottom: '20px' }}>
                {showDropDown && <ConnectionHealthDropdown connectionStateList={connectionStateList} />}
            </div>
            <Row style={{ marginBottom: '5px' }}>
                <div>Select Monitoring Time</div>
            </Row>
            <Row style={{ marginBottom: '20px' }}>
                <Select
                    options={[
                        {
                            label: '1 Hour',
                            value: 3600,
                        },
                        {
                            label: '2 Hours',
                            value: 7200,
                        },
                        {
                            label: '4 Hours',
                            value: 14400,
                        },
                        {
                            label: '8 Hours',
                            value: 28800,
                        },
                        {
                            label: '12 Hours',
                            value: 43200,
                        },
                        {
                            label: '24 Hours',
                            value: 86400,
                        },
                        {
                            label: '48 Hours',
                            value: 172800,
                        },
                        {
                            label: '1 Week',
                            value: 604800,
                        },
                    ]}
                    selected={filters.selectedTimeFrame}
                    onChange={
                        (value: string | number) => onFilterChange({ field: 'selectedTimeFrame', value })
                        // stupid prettier and eslint fighting each other!
                        // eslint-disable-next-line react/jsx-curly-newline
                    }
                />
            </Row>
            <Row>
                <Tabs>
                    <TabList>
                        <Tab>Outbound</Tab>
                        <Tab>Inbound</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel flex={true}>
                            <Row>
                                <Column
                                    align="center center"
                                    grow={0}
                                    shrink={0}
                                    basis="33%"
                                    style={{ padding: '20px' }}
                                >
                                    <MetricsChart
                                        height={300}
                                        isPending={false}
                                        error={null}
                                        title="Party Lookup Service"
                                        data={partyLookupData}
                                    />
                                </Column>
                                <Column
                                    align="center center"
                                    grow={0}
                                    shrink={0}
                                    basis="33%"
                                    style={{ padding: '20px' }}
                                >
                                    <MetricsChart
                                        height={300}
                                        isPending={false}
                                        error={null}
                                        title="Quote Service"
                                        data={quoteRequestData}
                                    />
                                </Column>
                                <Column
                                    align="center center"
                                    grow={0}
                                    shrink={0}
                                    basis="33%"
                                    style={{ padding: '20px' }}
                                >
                                    <MetricsChart
                                        height={300}
                                        isPending={false}
                                        error={null}
                                        title="Transfer Service"
                                        data={transferRequestData}
                                    />
                                </Column>
                            </Row>
                            {/* <Row>
                <Column align={'center center'} grow={0} shrink={0} basis={'33%'} style={{ padding: '20px'}}>
                  <MetricsChart
                    height={300}
                    isPending={false}
                    error={null}
                    title={'Party Lookup Service'}
                    data={partyLookupData}
                  />
                </Column>
                <Column align={'center center'} grow={0} shrink={0} basis={'33%'} style={{ padding: '20px'}}>
                  <MetricsChart
                    height={300}
                    isPending={false}
                    error={null}
                    title={'Party Lookup Service'}
                    data={partyLookupData}
                  />
                </Column>
                <Column align={'center center'} grow={0} shrink={0} basis={'33%'} style={{ padding: '20px'}}>
                  <MetricsChart
                    height={300}
                    isPending={false}
                    error={null}
                    title={'Party Lookup Service'}
                    data={partyLookupData}
                  />
                </Column>
              </Row> */}
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Row>
        </div>
    );
};

export default loadTechnicalDashboard(connect(stateProps, dispatchProps)(TechnicalDashboard));
