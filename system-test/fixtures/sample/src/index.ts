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

import {AgentsClient, ContextsClient, EntityTypesClient, EnvironmentsClient, IntentsClient, SessionEntityTypesClient, SessionsClient} from '@google-cloud/dialogflow';

// check that the client class type name can be used
function doStuffWithAgentsClient(client: AgentsClient) {
  client.close();
}
function doStuffWithContextsClient(client: ContextsClient) {
  client.close();
}
function doStuffWithEntityTypesClient(client: EntityTypesClient) {
  client.close();
}
function doStuffWithEnvironmentsClient(client: EnvironmentsClient) {
  client.close();
}
function doStuffWithIntentsClient(client: IntentsClient) {
  client.close();
}
function doStuffWithSessionEntityTypesClient(client: SessionEntityTypesClient) {
  client.close();
}
function doStuffWithSessionsClient(client: SessionsClient) {
  client.close();
}

function main() {
  // check that the client instance can be created
  const agentsClient = new AgentsClient();
  doStuffWithAgentsClient(agentsClient);
  // check that the client instance can be created
  const contextsClient = new ContextsClient();
  doStuffWithContextsClient(contextsClient);
  // check that the client instance can be created
  const entityTypesClient = new EntityTypesClient();
  doStuffWithEntityTypesClient(entityTypesClient);
  // check that the client instance can be created
  const environmentsClient = new EnvironmentsClient();
  doStuffWithEnvironmentsClient(environmentsClient);
  // check that the client instance can be created
  const intentsClient = new IntentsClient();
  doStuffWithIntentsClient(intentsClient);
  // check that the client instance can be created
  const sessionEntityTypesClient = new SessionEntityTypesClient();
  doStuffWithSessionEntityTypesClient(sessionEntityTypesClient);
  // check that the client instance can be created
  const sessionsClient = new SessionsClient();
  doStuffWithSessionsClient(sessionsClient);
}

main();
