// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

function main(projectId, sessionId, entityTypeDisplayName) {
  // Imports the Dialogflow library
  const dialogflow = require('@google-cloud/dialogflow');

  // Instantiates clients
  const sessionEntityTypesClient = new dialogflow.SessionEntityTypesClient();

  async function deleteSessionEntityType() {
    // Construct request

    // The path to identify the sessionEntityType to be deleted.
    const sessionEntityTypePath = sessionEntityTypesClient.projectAgentSessionEntityTypePath(
      projectId,
      sessionId,
      entityTypeDisplayName
    );

    const request = {
      name: sessionEntityTypePath,
    };

    // Send the request for retrieving the sessionEntityType.
    const result = await sessionEntityTypesClient.deleteSessionEntityType(
      request
    );
    console.log(`Session entity type ${entityTypeDisplayName} deleted`);
    return result;
  }
  const result = deleteSessionEntityType();
  return result;
}

main(...process.argv.slice(2));
