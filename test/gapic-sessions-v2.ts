// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// ** This file is automatically generated by gapic-generator-typescript. **
// ** https://github.com/googleapis/gapic-generator-typescript **
// ** All changes to this file may be overwritten. **

import * as protosTypes from '../protos/protos';
import * as assert from 'assert';
import {describe, it} from 'mocha';
const sessionsModule = require('../src');

import {PassThrough} from 'stream';

const FAKE_STATUS_CODE = 1;
class FakeError {
  name: string;
  message: string;
  code: number;
  constructor(n: number) {
    this.name = 'fakeName';
    this.message = 'fake message';
    this.code = n;
  }
}
const error = new FakeError(FAKE_STATUS_CODE);
export interface Callback {
  (err: FakeError | null, response?: {} | null): void;
}

export class Operation {
  constructor() {}
  promise() {}
}
function mockSimpleGrpcMethod(
  expectedRequest: {},
  response: {} | null,
  error: FakeError | null
) {
  return (actualRequest: {}, options: {}, callback: Callback) => {
    assert.deepStrictEqual(actualRequest, expectedRequest);
    if (error) {
      callback(error);
    } else if (response) {
      callback(null, response);
    } else {
      callback(null);
    }
  };
}
function mockBidiStreamingGrpcMethod(
  expectedRequest: {},
  response: {} | null,
  error: FakeError | null
) {
  return () => {
    const mockStream = new PassThrough({
      objectMode: true,
      transform: (chunk: {}, enc: {}, callback: Callback) => {
        assert.deepStrictEqual(chunk, expectedRequest);
        if (error) {
          callback(error);
        } else {
          callback(null, response);
        }
      },
    });
    return mockStream;
  };
}
describe('v2.SessionsClient', () => {
  it('has servicePath', () => {
    const servicePath = sessionsModule.v2.SessionsClient.servicePath;
    assert(servicePath);
  });
  it('has apiEndpoint', () => {
    const apiEndpoint = sessionsModule.v2.SessionsClient.apiEndpoint;
    assert(apiEndpoint);
  });
  it('has port', () => {
    const port = sessionsModule.v2.SessionsClient.port;
    assert(port);
    assert(typeof port === 'number');
  });
  it('should create a client with no option', () => {
    const client = new sessionsModule.v2.SessionsClient();
    assert(client);
  });
  it('should create a client with gRPC fallback', () => {
    const client = new sessionsModule.v2.SessionsClient({
      fallback: true,
    });
    assert(client);
  });
  it('has initialize method and supports deferred initialization', async () => {
    const client = new sessionsModule.v2.SessionsClient({
      credentials: {client_email: 'bogus', private_key: 'bogus'},
      projectId: 'bogus',
    });
    assert.strictEqual(client.sessionsStub, undefined);
    await client.initialize();
    assert(client.sessionsStub);
  });
  it('has close method', () => {
    const client = new sessionsModule.v2.SessionsClient({
      credentials: {client_email: 'bogus', private_key: 'bogus'},
      projectId: 'bogus',
    });
    client.close();
  });
  describe('detectIntent', () => {
    it('invokes detectIntent without error', done => {
      const client = new sessionsModule.v2.SessionsClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      // Initialize client before mocking
      client.initialize();
      // Mock request
      const request: protosTypes.google.cloud.dialogflow.v2.IDetectIntentRequest = {};
      request.session = '';
      // Mock response
      const expectedResponse = {};
      // Mock gRPC layer
      client._innerApiCalls.detectIntent = mockSimpleGrpcMethod(
        request,
        expectedResponse,
        null
      );
      client.detectIntent(request, (err: {}, response: {}) => {
        assert.ifError(err);
        assert.deepStrictEqual(response, expectedResponse);
        done();
      });
    });

    it('invokes detectIntent with error', done => {
      const client = new sessionsModule.v2.SessionsClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      // Initialize client before mocking
      client.initialize();
      // Mock request
      const request: protosTypes.google.cloud.dialogflow.v2.IDetectIntentRequest = {};
      request.session = '';
      // Mock response
      const expectedResponse = {};
      // Mock gRPC layer
      client._innerApiCalls.detectIntent = mockSimpleGrpcMethod(
        request,
        null,
        error
      );
      client.detectIntent(request, (err: FakeError, response: {}) => {
        assert(err instanceof FakeError);
        assert.strictEqual(err.code, FAKE_STATUS_CODE);
        assert(typeof response === 'undefined');
        done();
      });
    });
  });
  describe('streamingDetectIntent', () => {
    it('invokes streamingDetectIntent without error', done => {
      const client = new sessionsModule.v2.SessionsClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      // Initialize client before mocking
      client.initialize();
      // Mock request
      const request: protosTypes.google.cloud.dialogflow.v2.IStreamingDetectIntentRequest = {};
      // Mock response
      const expectedResponse = {};
      // Mock gRPC layer
      client._innerApiCalls.streamingDetectIntent = mockBidiStreamingGrpcMethod(
        request,
        expectedResponse,
        null
      );
      const stream = client
        .streamingDetectIntent()
        .on('data', (response: {}) => {
          assert.deepStrictEqual(response, expectedResponse);
          done();
        })
        .on('error', (err: FakeError) => {
          done(err);
        });
      stream.write(request);
    });
    it('invokes streamingDetectIntent with error', done => {
      const client = new sessionsModule.v2.SessionsClient({
        credentials: {client_email: 'bogus', private_key: 'bogus'},
        projectId: 'bogus',
      });
      // Initialize client before mocking
      client.initialize();
      // Mock request
      const request: protosTypes.google.cloud.dialogflow.v2.IStreamingDetectIntentRequest = {};
      // Mock response
      const expectedResponse = {};
      // Mock gRPC layer
      client._innerApiCalls.streamingDetectIntent = mockBidiStreamingGrpcMethod(
        request,
        null,
        error
      );
      const stream = client
        .streamingDetectIntent()
        .on('data', () => {
          assert.fail();
        })
        .on('error', (err: FakeError) => {
          assert(err instanceof FakeError);
          assert.strictEqual(err.code, FAKE_STATUS_CODE);
          done();
        });
      stream.write(request);
    });
  });
});
