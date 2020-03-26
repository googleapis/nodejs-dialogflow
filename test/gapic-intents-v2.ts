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
import { describe, it } from 'mocha';
/* eslint-disable @typescript-eslint/no-var-requires */
const intentsModule = require('../src');


const FAKE_STATUS_CODE = 1;
class FakeError{
    name: string;
    message: string;
    code: number;
    constructor(n: number){
        this.name = 'fakeName';
        this.message = 'fake message';
        this.code = n;
    }
}
const error = new FakeError(FAKE_STATUS_CODE);
export interface Callback {
  (err: FakeError|null, response?: {} | null): void;
}

export class Operation{
    constructor(){};
    promise() {};
}
function mockSimpleGrpcMethod(expectedRequest: {}, response: {} | null, error: FakeError | null) {
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
function mockLongRunningGrpcMethod(expectedRequest: {}, response: {} | null, error?: {} | null) {
    return (request: {}) => {
        assert.deepStrictEqual(request, expectedRequest);
        const mockOperation = {
          promise: function() {
            return new Promise((resolve, reject) => {
              if (error) {
                reject(error);
              }
              else {
                resolve([response]);
              }
            });
          }
        };
        return Promise.resolve([mockOperation]);
    };
}
describe('v2.IntentsClient', () => {
    it('has servicePath', () => {
        const servicePath = intentsModule.v2.IntentsClient.servicePath;
        assert(servicePath);
    });
    it('has apiEndpoint', () => {
        const apiEndpoint = intentsModule.v2.IntentsClient.apiEndpoint;
        assert(apiEndpoint);
    });
    it('has port', () => {
        const port = intentsModule.v2.IntentsClient.port;
        assert(port);
        assert(typeof port === 'number');
    });
    it('should create a client with no option', () => {
        const client = new intentsModule.v2.IntentsClient();
        assert(client);
    });
    it('should create a client with gRPC fallback', () => {
        const client = new intentsModule.v2.IntentsClient({
            fallback: true,
        });
        assert(client);
    });
    it('has initialize method and supports deferred initialization', async () => {
        const client = new intentsModule.v2.IntentsClient({
            credentials: { client_email: 'bogus', private_key: 'bogus' },
            projectId: 'bogus',
        });
        assert.strictEqual(client.intentsStub, undefined);
        await client.initialize();
        assert(client.intentsStub);
    });
    it('has close method', () => {
        const client = new intentsModule.v2.IntentsClient({
            credentials: { client_email: 'bogus', private_key: 'bogus' },
            projectId: 'bogus',
        });
        client.close();
    });
    describe('getIntent', () => {
        it('invokes getIntent without error', done => {
            const client = new intentsModule.v2.IntentsClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            // Initialize client before mocking
            client.initialize();
            // Mock request
            const request: protosTypes.google.cloud.dialogflow.v2.IGetIntentRequest = {};
            request.name = '';
            // Mock response
            const expectedResponse = {};
            // Mock gRPC layer
            client._innerApiCalls.getIntent = mockSimpleGrpcMethod(
                request,
                expectedResponse,
                null
            );
            client.getIntent(request, (err: {}, response: {}) => {
                assert.ifError(err);
                assert.deepStrictEqual(response, expectedResponse);
                done();
            })
        });

        it('invokes getIntent with error', done => {
            const client = new intentsModule.v2.IntentsClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            // Initialize client before mocking
            client.initialize();
            // Mock request
            const request: protosTypes.google.cloud.dialogflow.v2.IGetIntentRequest = {};
            request.name = '';
            // Mock gRPC layer
            client._innerApiCalls.getIntent = mockSimpleGrpcMethod(
                request,
                null,
                error
            );
            client.getIntent(request, (err: FakeError, response: {}) => {
                assert(err instanceof FakeError);
                assert.strictEqual(err.code, FAKE_STATUS_CODE);
                assert(typeof response === 'undefined');
                done();
            })
        });
    });
    describe('createIntent', () => {
        it('invokes createIntent without error', done => {
            const client = new intentsModule.v2.IntentsClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            // Initialize client before mocking
            client.initialize();
            // Mock request
            const request: protosTypes.google.cloud.dialogflow.v2.ICreateIntentRequest = {};
            request.parent = '';
            // Mock response
            const expectedResponse = {};
            // Mock gRPC layer
            client._innerApiCalls.createIntent = mockSimpleGrpcMethod(
                request,
                expectedResponse,
                null
            );
            client.createIntent(request, (err: {}, response: {}) => {
                assert.ifError(err);
                assert.deepStrictEqual(response, expectedResponse);
                done();
            })
        });

        it('invokes createIntent with error', done => {
            const client = new intentsModule.v2.IntentsClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            // Initialize client before mocking
            client.initialize();
            // Mock request
            const request: protosTypes.google.cloud.dialogflow.v2.ICreateIntentRequest = {};
            request.parent = '';
            // Mock gRPC layer
            client._innerApiCalls.createIntent = mockSimpleGrpcMethod(
                request,
                null,
                error
            );
            client.createIntent(request, (err: FakeError, response: {}) => {
                assert(err instanceof FakeError);
                assert.strictEqual(err.code, FAKE_STATUS_CODE);
                assert(typeof response === 'undefined');
                done();
            })
        });
    });
    describe('updateIntent', () => {
        it('invokes updateIntent without error', done => {
            const client = new intentsModule.v2.IntentsClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            // Initialize client before mocking
            client.initialize();
            // Mock request
            const request: protosTypes.google.cloud.dialogflow.v2.IUpdateIntentRequest = {};
            request.intent = {};
            request.intent.name = '';
            // Mock response
            const expectedResponse = {};
            // Mock gRPC layer
            client._innerApiCalls.updateIntent = mockSimpleGrpcMethod(
                request,
                expectedResponse,
                null
            );
            client.updateIntent(request, (err: {}, response: {}) => {
                assert.ifError(err);
                assert.deepStrictEqual(response, expectedResponse);
                done();
            })
        });

        it('invokes updateIntent with error', done => {
            const client = new intentsModule.v2.IntentsClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            // Initialize client before mocking
            client.initialize();
            // Mock request
            const request: protosTypes.google.cloud.dialogflow.v2.IUpdateIntentRequest = {};
            request.intent = {};
            request.intent.name = '';
            // Mock gRPC layer
            client._innerApiCalls.updateIntent = mockSimpleGrpcMethod(
                request,
                null,
                error
            );
            client.updateIntent(request, (err: FakeError, response: {}) => {
                assert(err instanceof FakeError);
                assert.strictEqual(err.code, FAKE_STATUS_CODE);
                assert(typeof response === 'undefined');
                done();
            })
        });
    });
    describe('deleteIntent', () => {
        it('invokes deleteIntent without error', done => {
            const client = new intentsModule.v2.IntentsClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            // Initialize client before mocking
            client.initialize();
            // Mock request
            const request: protosTypes.google.cloud.dialogflow.v2.IDeleteIntentRequest = {};
            request.name = '';
            // Mock response
            const expectedResponse = {};
            // Mock gRPC layer
            client._innerApiCalls.deleteIntent = mockSimpleGrpcMethod(
                request,
                expectedResponse,
                null
            );
            client.deleteIntent(request, (err: {}, response: {}) => {
                assert.ifError(err);
                assert.deepStrictEqual(response, expectedResponse);
                done();
            })
        });

        it('invokes deleteIntent with error', done => {
            const client = new intentsModule.v2.IntentsClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            // Initialize client before mocking
            client.initialize();
            // Mock request
            const request: protosTypes.google.cloud.dialogflow.v2.IDeleteIntentRequest = {};
            request.name = '';
            // Mock gRPC layer
            client._innerApiCalls.deleteIntent = mockSimpleGrpcMethod(
                request,
                null,
                error
            );
            client.deleteIntent(request, (err: FakeError, response: {}) => {
                assert(err instanceof FakeError);
                assert.strictEqual(err.code, FAKE_STATUS_CODE);
                assert(typeof response === 'undefined');
                done();
            })
        });
    });
    describe('batchUpdateIntents', () => {
        it('invokes batchUpdateIntents without error', done => {
            const client = new intentsModule.v2.IntentsClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            // Initialize client before mocking
            client.initialize();
            // Mock request
            const request: protosTypes.google.cloud.dialogflow.v2.IBatchUpdateIntentsRequest = {};
            request.parent = '';
            // Mock response
            const expectedResponse = {};
            // Mock gRPC layer
            client._innerApiCalls.batchUpdateIntents = mockLongRunningGrpcMethod(
                request,
                expectedResponse
            );
            client.batchUpdateIntents(request).then((responses: [Operation]) => {
                const operation = responses[0];
                return operation? operation.promise() : {};
            }).then((responses: [Operation]) => {
                assert.deepStrictEqual(responses[0], expectedResponse);
                done();
            }).catch((err: {}) => {
                done(err);
            });
        });

        it('invokes batchUpdateIntents with error', done => {
            const client = new intentsModule.v2.IntentsClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            // Initialize client before mocking
            client.initialize();
            // Mock request
            const request: protosTypes.google.cloud.dialogflow.v2.IBatchUpdateIntentsRequest = {};
            request.parent = '';
            // Mock gRPC layer
            client._innerApiCalls.batchUpdateIntents = mockLongRunningGrpcMethod(
                request,
                null,
                error
            );
            client.batchUpdateIntents(request).then((responses: [Operation]) => {
                const operation = responses[0];
                return operation? operation.promise() : {};
            }).then(() => {
                assert.fail();
            }).catch((err: FakeError) => {
                assert(err instanceof FakeError);
                assert.strictEqual(err.code, FAKE_STATUS_CODE);
                done();
            });
        });
    });
    describe('batchDeleteIntents', () => {
        it('invokes batchDeleteIntents without error', done => {
            const client = new intentsModule.v2.IntentsClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            // Initialize client before mocking
            client.initialize();
            // Mock request
            const request: protosTypes.google.cloud.dialogflow.v2.IBatchDeleteIntentsRequest = {};
            request.parent = '';
            // Mock response
            const expectedResponse = {};
            // Mock gRPC layer
            client._innerApiCalls.batchDeleteIntents = mockLongRunningGrpcMethod(
                request,
                expectedResponse
            );
            client.batchDeleteIntents(request).then((responses: [Operation]) => {
                const operation = responses[0];
                return operation? operation.promise() : {};
            }).then((responses: [Operation]) => {
                assert.deepStrictEqual(responses[0], expectedResponse);
                done();
            }).catch((err: {}) => {
                done(err);
            });
        });

        it('invokes batchDeleteIntents with error', done => {
            const client = new intentsModule.v2.IntentsClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            // Initialize client before mocking
            client.initialize();
            // Mock request
            const request: protosTypes.google.cloud.dialogflow.v2.IBatchDeleteIntentsRequest = {};
            request.parent = '';
            // Mock gRPC layer
            client._innerApiCalls.batchDeleteIntents = mockLongRunningGrpcMethod(
                request,
                null,
                error
            );
            client.batchDeleteIntents(request).then((responses: [Operation]) => {
                const operation = responses[0];
                return operation? operation.promise() : {};
            }).then(() => {
                assert.fail();
            }).catch((err: FakeError) => {
                assert(err instanceof FakeError);
                assert.strictEqual(err.code, FAKE_STATUS_CODE);
                done();
            });
        });
    });
    describe('listIntents', () => {
        it('invokes listIntents without error', done => {
            const client = new intentsModule.v2.IntentsClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            // Initialize client before mocking
            client.initialize();
            // Mock request
            const request: protosTypes.google.cloud.dialogflow.v2.IListIntentsRequest = {};
            request.parent = '';
            // Mock response
            const expectedResponse = {};
            // Mock Grpc layer
            client._innerApiCalls.listIntents = (actualRequest: {}, options: {}, callback: Callback) => {
                assert.deepStrictEqual(actualRequest, request);
                callback(null, expectedResponse);
            };
            client.listIntents(request, (err: FakeError, response: {}) => {
                assert.ifError(err);
                assert.deepStrictEqual(response, expectedResponse);
                done();
            });
        });
    });
    describe('listIntentsStream', () => {
        it('invokes listIntentsStream without error', done => {
            const client = new intentsModule.v2.IntentsClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            // Initialize client before mocking
            client.initialize();
            // Mock request
            const request: protosTypes.google.cloud.dialogflow.v2.IListIntentsRequest = {};
            request.parent = '';
            // Mock response
            const expectedResponse = {response: 'data'};
            // Mock Grpc layer
            client._innerApiCalls.listIntents = (actualRequest: {}, options: {}, callback: Callback) => {
                assert.deepStrictEqual(actualRequest, request);
                callback(null, expectedResponse);
            };
            const stream = client.listIntentsStream(request, {}).on('data', (response: {}) =>{
                assert.deepStrictEqual(response, expectedResponse);
                done();
            }).on('error', (err: FakeError) => {
                done(err);
            });
            stream.write(expectedResponse);
        });
    });
});
