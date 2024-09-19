import { State } from 'store/types';
import { buildApis } from './api';
import { Config } from './api/types';

const services = {
  localNode: {
    baseUrl: (state: State) => state.app.config.apiBaseUrl,
  },
};

// const mockServices = {
//   localNode: {
//     baseUrl: 'http://localhost:4040/exp',
//   },
// };
interface Todo {
  title: string;
}

const dfsps: Config<Todo, State> = {
  service: services.localNode,
  // eslint-disable-next-line
  url: (_: State) => `/dfsps`,
};

const environmentStatus: Config<Todo, State> = {
  service: services.localNode,
  // eslint-disable-next-line
  url: (_: State) => `/status`,
};

const monetaryZones: Config<Todo, State> = {
  service: services.localNode,
  // eslint-disable-next-line
  url: () => `/monetaryzones`,
};

const batches: Config<Todo, State> = {
  service: services.localNode,
  // eslint-disable-next-line
  url: () => `/batches`,
};

const batchTransfers: Config<Todo, State> = {
  service: services.localNode,
  // eslint-disable-next-line
  url: (_: State, { batchId }: any) => `/batches/${batchId}/transfers`,
};

const transferDetails: Config<Todo, State> = {
  service: services.localNode,
  url: (_: State, { transferId }: { transferId: string }) => `/transfers/${transferId}/details`,
};

const fxpConversionDetails: Config<Todo, State> = {
  service: services.localNode,
  url: (_: State, { conversionId }: { conversionId: string }) => `/fxpConversions/${conversionId}/details`,
};

const transfersErrors: Config<Todo, State> = {
  service: services.localNode,
  url: () => '/errors',
};

const fxpErrors: Config<Todo, State> = {
  service: services.localNode,
  url: () => '/fxperrors',
};

const fxpConversions: Config<Todo, State> = {
  service: services.localNode,
  url: () => '/fxpConversions',
};

const transfers: Config<Todo, State> = {
  service: services.localNode,
  url: () => '/transfers',
};

const transfersStatuses: Config<Todo, State> = {
  service: services.localNode,
  url: () => '/transferStatusSummary',
};

const transfersSuccessPerc: Config<Todo, State> = {
  service: services.localNode,
  url: () => '/minuteSuccessfulTransferPerc',
};

const transfersAvgTime: Config<Todo, State> = {
  service: services.localNode,
  url: () => '/minuteAverageTransferResponseTime',
};

const weeklyPositions: Config<Todo, State> = {
  service: services.localNode,
  url: () => '/hourlyPosition',
};

const weeklyFlows: Config<Todo, State> = {
  service: services.localNode,
  url: () => '/hourlyFlow',
};

const dfsp: Config<Todo, State> = {
  service: services.localNode,
  url: (_: State) => `/dfsp/details`,
};

const dfspCA: Config<Todo, State> = {
  service: services.localNode,
  url: (_: State) => `/dfsp/ca`,
};

const dfspHubCA: Config<Todo, State> = {
  service: services.localNode,
  url: (_: State) => `/hub/ca`,
};

const dfspAutoCA: Config<Todo, State> = {
  service: services.localNode,
  url: (_: State) => `/dfsp/ca`,
};

const dfspServerCerts: Config<Todo, State> = {
  service: services.localNode,
  url: (_: State) => `/dfsp/serverCerts`,
};

const hubServerCerts: Config<Todo, State> = {
  service: services.localNode,
  url: (_: State) => `/hub/serverCerts`,
};

const dfspJWSCerts: Config<Todo, State> = {
  service: services.localNode,
  url: (_: State) => `/dfsp/jwscerts`,
};

const otherDfspJWSCerts: Config<Todo, State> = {
  service: services.localNode,
  url: (_: State) => `/dfsp/alljwscerts`,
};

const ingressUrls: Config<Todo, State> = {
  service: services.localNode,
  url: (_: State) => `/dfsp/endpoints/ingress/urls`,
};

const ingressIps: Config<Todo, State> = {
  service: services.localNode,
  url: (_: State) => `/dfsp/endpoints/ingress/ips`,
};

const ingressUrl: Config<Todo, State> = {
  service: services.localNode,
  url: (_: State, { urlId, environmentId }: { urlId: string; environmentId: string }) =>
    `/dfsp/endpoints/ingress/urls/${urlId}`,
};

const ingressIp: Config<Todo, State> = {
  service: services.localNode,
  url: (_: State, { ipId, environmentId }: { ipId: string; environmentId: string }) =>
    `/dfsp/endpoints/ingress/ips/${ipId}`,
};

const egressIps: Config<Todo, State> = {
  service: services.localNode,
  url: (_: State) => `/dfsp/endpoints/egress/ips`,
};

const egressIp: Config<Todo, State> = {
  service: services.localNode,
  url: (_: State, { ipId, environmentId }: { ipId: string; environmentId: string }) =>
    `/dfsp/endpoints/egress/ips/${ipId}`,
};

const ingressHubEndpoints: Config<Todo, State> = {
  service: services.localNode,
  url: (_: State) => `/hub/endpoints/ingress`,
};

const egressHubEndpoints: Config<Todo, State> = {
  service: services.localNode,
  url: (_: State) => `/hub/endpoints/egress`,
};

const inboundEnrollments: Config<Todo, State> = {
  service: services.localNode,
  url: (_: State) => `/dfsp/clientCerts`,
};

const inboundEnrollmentsCsr: Config<Todo, State> = {
  service: services.localNode,
  url: (_: State) => `/dfsp/clientCerts/csr`,
};

const outboundEnrollments: Config<Todo, State> = {
  service: services.localNode,
  url: (_: State) => `/hub/clientCerts`,
};

const outboundEnrollmentCertificate: Config<Todo, State> = {
  service: services.localNode,
  url: (_: State) => `/hub/clientCerts`,
};

const outboundEnrollmentAutoCertificate: Config<Todo, State> = {
  service: services.localNode,
  url: (_: State) => `/hub/clientCerts`,
};

const metric: Config<Todo, State> = {
  service: services.localNode,
  url: (_: State, { metricName }: { metricName: string }) => `/metrics/${metricName}`,
};

const endpoints = {
  dfsps,
  // mockServices,
  environmentStatus,
  monetaryZones,
  batches,
  batchTransfers,
  dfsp,
  dfspCA,
  dfspAutoCA,
  dfspHubCA,
  dfspServerCerts,
  hubServerCerts,
  dfspJWSCerts,
  otherDfspJWSCerts,
  transferDetails,
  transfersErrors,
  transfers,
  transfersStatuses,
  transfersSuccessPerc,
  transfersAvgTime,
  weeklyPositions,
  weeklyFlows,
  ingressUrls,
  ingressIps,
  ingressUrl,
  ingressIp,
  egressIps,
  egressIp,
  ingressHubEndpoints,
  egressHubEndpoints,
  inboundEnrollments,
  inboundEnrollmentsCsr,
  outboundEnrollments,
  outboundEnrollmentCertificate,
  outboundEnrollmentAutoCertificate,
  metric,
};

type MyMap = typeof endpoints;
/* or, maybe:
type MyMap = {
  [key: string]: Config<Todo, State>;
}
*/

export default buildApis<MyMap, State>(endpoints);
