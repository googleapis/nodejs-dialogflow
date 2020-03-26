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
const entitytypesModule = require('../src');


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
describe('v2beta1.EntityTypesClient', () => {
    it('has servicePath', () => {
        const servicePath = entitytypesModule.v2beta1.EntityTypesClient.servicePath;
        assert(servicePath);
    });
    it('has apiEndpoint', () => {
        const apiEndpoint = entitytypesModule.v2beta1.EntityTypesClient.apiEndpoint;
        assert(apiEndpoint);
    });
    it('has port', () => {
        const port = entitytypesModule.v2beta1.EntityTypesClient.port;
        assert(port);
        assert(typeof port === 'number');
    });
    it('should create a client with no option', () => {
        const client = new entitytypesModule.v2beta1.EntityTypesClient();
        assert(client);
    });
    it('should create a client with gRPC fallback', () => {
        const client = new entitytypesModule.v2beta1.EntityTypesClient({
            fallback: true,
        });
        assert(client);
    });
    it('has initialize method and supports deferred initialization', async () => {
        const client = new entitytypesModule.v2beta1.EntityTypesClient({
            credentials: { client_email: 'bogus', private_key: 'bogus' },
            projectId: 'bogus',
        });
        assert.strictEqual(client.entityTypesStub, undefined);
        await client.initialize();
        assert(client.entityTypesStub);
    });
    it('has close method', () => {
        const client = new entitytypesModule.v2beta1.EntityTypesClient({
            credentials: { client_email: 'bogus', private_key: 'bogus' },
            projectId: 'bogus',
        });
        client.close();
    });
    describe('getEntityType', () => {
        it('invokes getEntityType without error', done => {
            const client = new entitytypesModule.v2beta1.EntityTypesClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            // Initialize client before mocking
            client.initialize();
            // Mock request
            const request: protosTypes.google.cloud.dialogflow.v2beta1.IGetEntityTypeRequest = {};
            request.name = '';
            // Mock response
            const expectedResponse = {};
            // Mock gRPC layer
            client._innerApiCalls.getEntityType = mockSimpleGrpcMethod(
                request,
                expectedResponse,
                null
            );
            client.getEntityType(request, (err: {}, response: {}) => {
                assert.ifError(err);
                assert.deepStrictEqual(response, expectedResponse);
                done();
            })
        });

        it('invokes getEntityType with error', done => {
            const client = new entitytypesModule.v2beta1.EntityTypesClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            // Initialize client before mocking
            client.initialize();
            // Mock request
            const request: protosTypes.google.cloud.dialogflow.v2beta1.IGetEntityTypeRequest = {};
            request.name = '';
            // Mock gRPC layer
            client._innerApiCalls.getEntityType = mockSimpleGrpcMethod(
                request,
                null,
                error
            );
            client.getEntityType(request, (err: FakeError, response: {}) => {
                assert(err instanceof FakeError);
                assert.strictEqual(err.code, FAKE_STATUS_CODE);
                assert(typeof response === 'undefined');
                done();
            })
        });
    });
    describe('createEntityType', () => {
        it('invokes createEntityType without error', done => {
            const client = new entitytypesModule.v2beta1.EntityTypesClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            // Initialize client before mocking
            client.initialize();
            // Mock request
            const request: protosTypes.google.cloud.dialogflow.v2beta1.ICreateEntityTypeRequest = {};
            request.parent = '';
            // Mock response
            const expectedResponse = {};
            // Mock gRPC layer
            client._innerApiCalls.createEntityType = mockSimpleGrpcMethod(
                request,
                expectedResponse,
                null
            );
            client.createEntityType(request, (err: {}, response: {}) => {
                assert.ifError(err);
                assert.deepStrictEqual(response, expectedResponse);
                done();
            })
        });

        it('invokes createEntityType with error', done => {
            const client = new entitytypesModule.v2beta1.EntityTypesClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            // Initialize client before mocking
            client.initialize();
            // Mock request
            const request: protosTypes.google.cloud.dialogflow.v2beta1.ICreateEntityTypeRequest = {};
            request.parent = '';
            // Mock gRPC layer
            client._innerApiCalls.createEntityType = mockSimpleGrpcMethod(
                request,
                null,
                error
            );
            client.createEntityType(request, (err: FakeError, response: {}) => {
                assert(err instanceof FakeError);
                assert.strictEqual(err.code, FAKE_STATUS_CODE);
                assert(typeof response === 'undefined');
                done();
            })
        });
    });
    describe('updateEntityType', () => {
        it('invokes updateEntityType without error', done => {
            const client = new entitytypesModule.v2beta1.EntityTypesClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            // Initialize client before mocking
            client.initialize();
            // Mock request
            const request: protosTypes.google.cloud.dialogflow.v2beta1.IUpdateEntityTypeRequest = {};
            request.entityType = {};
            request.entityType.name = '';
            // Mock response
            const expectedResponse = {};
            // Mock gRPC layer
            client._innerApiCalls.updateEntityType = mockSimpleGrpcMethod(
                request,
                expectedResponse,
                null
            );
            client.updateEntityType(request, (err: {}, response: {}) => {
                assert.ifError(err);
                assert.deepStrictEqual(response, expectedResponse);
                done();
            })
        });

        it('invokes updateEntityType with error', done => {
            const client = new entitytypesModule.v2beta1.EntityTypesClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            // Initialize client before mocking
            client.initialize();
            // Mock request
            const request: protosTypes.google.cloud.dialogflow.v2beta1.IUpdateEntityTypeRequest = {};
            request.entityType = {};
            request.entityType.name = '';
            // Mock gRPC layer
            client._innerApiCalls.updateEntityType = mockSimpleGrpcMethod(
                request,
                null,
                error
            );
            client.updateEntityType(request, (err: FakeError, response: {}) => {
                assert(err instanceof FakeError);
                assert.strictEqual(err.code, FAKE_STATUS_CODE);
                assert(typeof response === 'undefined');
                done();
            })
        });
    });
    describe('deleteEntityType', () => {
        it('invokes deleteEntityType without error', done => {
            const client = new entitytypesModule.v2beta1.EntityTypesClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            // Initialize client before mocking
            client.initialize();
            // Mock request
            const request: protosTypes.google.cloud.dialogflow.v2beta1.IDeleteEntityTypeRequest = {};
            request.name = '';
            // Mock response
            const expectedResponse = {};
            // Mock gRPC layer
            client._innerApiCalls.deleteEntityType = mockSimpleGrpcMethod(
                request,
                expectedResponse,
                null
            );
            client.deleteEntityType(request, (err: {}, response: {}) => {
                assert.ifError(err);
                assert.deepStrictEqual(response, expectedResponse);
                done();
            })
        });

        it('invokes deleteEntityType with error', done => {
            const client = new entitytypesModule.v2beta1.EntityTypesClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            // Initialize client before mocking
            client.initialize();
            // Mock request
            const request: protosTypes.google.cloud.dialogflow.v2beta1.IDeleteEntityTypeRequest = {};
            request.name = '';
            // Mock gRPC layer
            client._innerApiCalls.deleteEntityType = mockSimpleGrpcMethod(
                request,
                null,
                error
            );
            client.deleteEntityType(request, (err: FakeError, response: {}) => {
                assert(err instanceof FakeError);
                assert.strictEqual(err.code, FAKE_STATUS_CODE);
                assert(typeof response === 'undefined');
                done();
            })
        });
    });
    describe('batchUpdateEntityTypes', () => {
        it('invokes batchUpdateEntityTypes without error', done => {
            const client = new entitytypesModule.v2beta1.EntityTypesClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            // Initialize client before mocking
            client.initialize();
            // Mock request
            const request: protosTypes.google.cloud.dialogflow.v2beta1.IBatchUpdateEntityTypesRequest = {};
            request.parent = '';
            // Mock response
            const expectedResponse = {};
            // Mock gRPC layer
            client._innerApiCalls.batchUpdateEntityTypes = mockSimpleGrpcMethod(
                request,
                expectedResponse,
                null
            );
            client.batchUpdateEntityTypes(request, (err: {}, response: {}) => {
                assert.ifError(err);
                assert.deepStrictEqual(response, expectedResponse);
                done();
            })
        });

        it('invokes batchUpdateEntityTypes with error', done => {
            const client = new entitytypesModule.v2beta1.EntityTypesClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            // Initialize client before mocking
            client.initialize();
            // Mock request
            const request: protosTypes.google.cloud.dialogflow.v2beta1.IBatchUpdateEntityTypesRequest = {};
            request.parent = '';
            // Mock gRPC layer
            client._innerApiCalls.batchUpdateEntityTypes = mockSimpleGrpcMethod(
                request,
                null,
                error
            );
            client.batchUpdateEntityTypes(request, (err: FakeError, response: {}) => {
                assert(err instanceof FakeError);
                assert.strictEqual(err.code, FAKE_STATUS_CODE);
                assert(typeof response === 'undefined');
                done();
            })
        });
    });
    describe('batchDeleteEntityTypes', () => {
        it('invokes batchDeleteEntityTypes without error', done => {
            const client = new entitytypesModule.v2beta1.EntityTypesClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            // Initialize client before mocking
            client.initialize();
            // Mock request
            const request: protosTypes.google.cloud.dialogflow.v2beta1.IBatchDeleteEntityTypesRequest = {};
            request.parent = '';
            // Mock response
            const expectedResponse = {};
            // Mock gRPC layer
            client._innerApiCalls.batchDeleteEntityTypes = mockSimpleGrpcMethod(
                request,
                expectedResponse,
                null
            );
            client.batchDeleteEntityTypes(request, (err: {}, response: {}) => {
                assert.ifError(err);
                assert.deepStrictEqual(response, expectedResponse);
                done();
            })
        });

        it('invokes batchDeleteEntityTypes with error', done => {
            const client = new entitytypesModule.v2beta1.EntityTypesClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            // Initialize client before mocking
            client.initialize();
            // Mock request
            const request: protosTypes.google.cloud.dialogflow.v2beta1.IBatchDeleteEntityTypesRequest = {};
            request.parent = '';
            // Mock gRPC layer
            client._innerApiCalls.batchDeleteEntityTypes = mockSimpleGrpcMethod(
                request,
                null,
                error
            );
            client.batchDeleteEntityTypes(request, (err: FakeError, response: {}) => {
                assert(err instanceof FakeError);
                assert.strictEqual(err.code, FAKE_STATUS_CODE);
                assert(typeof response === 'undefined');
                done();
            })
        });
    });
    describe('batchCreateEntities', () => {
        it('invokes batchCreateEntities without error', done => {
            const client = new entitytypesModule.v2beta1.EntityTypesClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            // Initialize client before mocking
            client.initialize();
            // Mock request
            const request: protosTypes.google.cloud.dialogflow.v2beta1.IBatchCreateEntitiesRequest = {};
            request.parent = '';
            // Mock response
            const expectedResponse = {};
            // Mock gRPC layer
            client._innerApiCalls.batchCreateEntities = mockSimpleGrpcMethod(
                request,
                expectedResponse,
                null
            );
            client.batchCreateEntities(request, (err: {}, response: {}) => {
                assert.ifError(err);
                assert.deepStrictEqual(response, expectedResponse);
                done();
            })
        });

        it('invokes batchCreateEntities with error', done => {
            const client = new entitytypesModule.v2beta1.EntityTypesClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            // Initialize client before mocking
            client.initialize();
            // Mock request
            const request: protosTypes.google.cloud.dialogflow.v2beta1.IBatchCreateEntitiesRequest = {};
            request.parent = '';
            // Mock gRPC layer
            client._innerApiCalls.batchCreateEntities = mockSimpleGrpcMethod(
                request,
                null,
                error
            );
            client.batchCreateEntities(request, (err: FakeError, response: {}) => {
                assert(err instanceof FakeError);
                assert.strictEqual(err.code, FAKE_STATUS_CODE);
                assert(typeof response === 'undefined');
                done();
            })
        });
    });
    describe('batchUpdateEntities', () => {
        it('invokes batchUpdateEntities without error', done => {
            const client = new entitytypesModule.v2beta1.EntityTypesClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            // Initialize client before mocking
            client.initialize();
            // Mock request
            const request: protosTypes.google.cloud.dialogflow.v2beta1.IBatchUpdateEntitiesRequest = {};
            request.parent = '';
            // Mock response
            const expectedResponse = {};
            // Mock gRPC layer
            client._innerApiCalls.batchUpdateEntities = mockSimpleGrpcMethod(
                request,
                expectedResponse,
                null
            );
            client.batchUpdateEntities(request, (err: {}, response: {}) => {
                assert.ifError(err);
                assert.deepStrictEqual(response, expectedResponse);
                done();
            })
        });

        it('invokes batchUpdateEntities with error', done => {
            const client = new entitytypesModule.v2beta1.EntityTypesClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            // Initialize client before mocking
            client.initialize();
            // Mock request
            const request: protosTypes.google.cloud.dialogflow.v2beta1.IBatchUpdateEntitiesRequest = {};
            request.parent = '';
            // Mock gRPC layer
            client._innerApiCalls.batchUpdateEntities = mockSimpleGrpcMethod(
                request,
                null,
                error
            );
            client.batchUpdateEntities(request, (err: FakeError, response: {}) => {
                assert(err instanceof FakeError);
                assert.strictEqual(err.code, FAKE_STATUS_CODE);
                assert(typeof response === 'undefined');
                done();
            })
        });
    });
    describe('batchDeleteEntities', () => {
        it('invokes batchDeleteEntities without error', done => {
            const client = new entitytypesModule.v2beta1.EntityTypesClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            // Initialize client before mocking
            client.initialize();
            // Mock request
            const request: protosTypes.google.cloud.dialogflow.v2beta1.IBatchDeleteEntitiesRequest = {};
            request.parent = '';
            // Mock response
            const expectedResponse = {};
            // Mock gRPC layer
            client._innerApiCalls.batchDeleteEntities = mockSimpleGrpcMethod(
                request,
                expectedResponse,
                null
            );
            client.batchDeleteEntities(request, (err: {}, response: {}) => {
                assert.ifError(err);
                assert.deepStrictEqual(response, expectedResponse);
                done();
            })
        });

        it('invokes batchDeleteEntities with error', done => {
            const client = new entitytypesModule.v2beta1.EntityTypesClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            // Initialize client before mocking
            client.initialize();
            // Mock request
            const request: protosTypes.google.cloud.dialogflow.v2beta1.IBatchDeleteEntitiesRequest = {};
            request.parent = '';
            // Mock gRPC layer
            client._innerApiCalls.batchDeleteEntities = mockSimpleGrpcMethod(
                request,
                null,
                error
            );
            client.batchDeleteEntities(request, (err: FakeError, response: {}) => {
                assert(err instanceof FakeError);
                assert.strictEqual(err.code, FAKE_STATUS_CODE);
                assert(typeof response === 'undefined');
                done();
            })
        });
    });
    describe('listEntityTypes', () => {
        it('invokes listEntityTypes without error', done => {
            const client = new entitytypesModule.v2beta1.EntityTypesClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            // Initialize client before mocking
            client.initialize();
            // Mock request
            const request: protosTypes.google.cloud.dialogflow.v2beta1.IListEntityTypesRequest = {};
            request.parent = '';
            // Mock response
            const expectedResponse = {};
            // Mock Grpc layer
            client._innerApiCalls.listEntityTypes = (actualRequest: {}, options: {}, callback: Callback) => {
                assert.deepStrictEqual(actualRequest, request);
                callback(null, expectedResponse);
            };
            client.listEntityTypes(request, (err: FakeError, response: {}) => {
                assert.ifError(err);
                assert.deepStrictEqual(response, expectedResponse);
                done();
            });
        });
    });
    describe('listEntityTypesStream', () => {
        it('invokes listEntityTypesStream without error', done => {
            const client = new entitytypesModule.v2beta1.EntityTypesClient({
                credentials: {client_email: 'bogus', private_key: 'bogus'},
                projectId: 'bogus',
            });
            // Initialize client before mocking
            client.initialize();
            // Mock request
            const request: protosTypes.google.cloud.dialogflow.v2beta1.IListEntityTypesRequest = {};
            request.parent = '';
            // Mock response
            const expectedResponse = {response: 'data'};
            // Mock Grpc layer
            client._innerApiCalls.listEntityTypes = (actualRequest: {}, options: {}, callback: Callback) => {
                assert.deepStrictEqual(actualRequest, request);
                callback(null, expectedResponse);
            };
            const stream = client.listEntityTypesStream(request, {}).on('data', (response: {}) =>{
                assert.deepStrictEqual(response, expectedResponse);
                done();
            }).on('error', (err: FakeError) => {
                done(err);
            });
            stream.write(expectedResponse);
        });
    });
});
