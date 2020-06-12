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

function main(
  projectId,
  sessionId,
  entityValues,
  entityTypeDisplayName,
  entityOverrideMode
) {
  // Imports the Dialogflow library
  const dialogflow = require('@google-cloud/dialogflow');

  // Instantiates clients
  const sessionEntityTypesClient = new dialogflow.SessionEntityTypesClient();

  async function createSessionEntityType() {
    // Construct request
    const sessionPath = sessionEntityTypesClient.projectAgentSessionPath(
      projectId,
      sessionId
    );
    const sessionEntityTypePath = sessionEntityTypesClient.projectAgentSessionEntityTypePath(
      projectId,
      sessionId,
      entityTypeDisplayName
    );

    // Here we use the entity value as the only synonym.
    const entities = [];
    entityValues.forEach(entityValue => {
      entities.push({
        value: entityValue,
        synonyms: [entityValue],
      });
    });

    const sessionEntityTypeRequest = {
      parent: sessionPath,
      sessionEntityType: {
        name: sessionEntityTypePath,
        entityOverrideMode: entityOverrideMode,
        entities: entities,
      },
    };

    const [response] = await sessionEntityTypesClient.createSessionEntityType(
      sessionEntityTypeRequest
    );
    console.log('SessionEntityType created:');
    console.log(response);
  }

  createSessionEntityType().catch(err => {
    console.error(err);
  });
}

main(...process.argv.slice(2));
