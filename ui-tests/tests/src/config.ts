/**************************************************************************
 *  (C) Copyright ModusBox Inc. 2020 - All rights reserved.               *
 *                                                                        *
 *  This file is made available under the terms of the license agreement  *
 *  specified in the corresponding source code repository.                *
 *                                                                        *
 *  ORIGINAL AUTHOR:                                                      *
 *       Sridevi Miriyala - sridevi.miriyala@modusbox.com                   *
 **************************************************************************/

import * as dotenv from 'dotenv';
import * as assert from 'assert';

//dotenv.config();

function ensureEnv(e: string): string {
  const result = process.env[e];
  assert.notStrictEqual(typeof result, 'undefined', `Required ${e} to be set in the environment`);
  return result as string;
}

let tmpConfig;
// TODO: ajv
if (process.env.ENV === 'local') {
  tmpConfig = {
    //pm4mlEndpoint: ensureEnv('PM4ML_ENDPOINT'),
    //simCoreConnectorEndpoint: ensureEnv('SIM_CORE_CONNECTOR_ENDPOINT'),
    pm4mlEndpoint: 'http://localhost:8081',
    simCoreConnectorEndpoint: 'http://localhost:3003',
    senderpartyID: '22507008181',
    receiverpartyID: '22556999125',
    simcurrency: 'USD',

    credentials: {
      test: {
        username: 'test',
        password: 'test',
      },
      nofirstlastname: {
        username: 'nofirstlastname',
        password: 'test',
      },
      nofirstname: {
        username: 'nofirstname',
        password: 'test',
      },
      nolastname: {
        username: 'nolastname',
        password: 'test',
      },
    },
    voodooTimeoutMs: 30000,
  };
} else if (process.env.ENV === 'other') {
  tmpConfig = {
    // pm4mlEndpoint: "https://portal.pm4mlsenderfsp.productdevk3s.dev.product.mbox-dev.io",
    // simCoreConnectorEndpoint: "http://test.pm4mlsenderfsp.productdevk3s.dev.product.mbox-dev.io/cc-send",
    pm4mlEndpoint: ensureEnv('PM4ML_ENDPOINT'),
    simCoreConnectorEndpoint: ensureEnv('SIM_CORE_CONNECTOR_ENDPOINT'),
    senderpartyID: '25644444444',
    receiverpartyID: '25633333333',
    simcurrency: 'USD',
    credentials: {
      test: {
        username: 'test',
        password: 'test',
      },
      nofirstlastname: {
        username: 'nofirstlastname',
        password: 'test',
      },
      nofirstname: {
        username: 'nofirstname',
        password: 'test',
      },
      nolastname: {
        username: 'nolastname',
        password: 'test',
      },
    },
    voodooTimeoutMs: 30000,
  };
}
const config = Object.assign({}, tmpConfig);
export { config };
