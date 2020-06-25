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

function createSessionEntityType(
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

// /////////////////////////////////////////////////////////////////////////////
// Command line interface.
// /////////////////////////////////////////////////////////////////////////////
const cli = require('yargs')
  .demand(1)
  .options({
    projectId: {
      alias: 'p',
      default: process.env.GCLOUD_PROJECT || process.env.GOOGLE_CLOUD_PROJECT,
      description:
        'The Project ID to use. Defaults to the value of the ' +
        'GCLOUD_PROJECT or GOOGLE_CLOUD_PROJECT environment variables.',
      requiresArg: true,
      type: 'string',
    },
  })
  .demandOption(
    'projectId',
    "Please provide your Dialogflow agent's project ID with the -p flag or through the GOOGLE_CLOUD_PROJECT env var"
  )
  .boolean('force')
  .alias('force', ['f'])
  .describe('force', 'force operation without a prompt')
  .command(
    'create-session-entity-type',
    'Create entity type',
    {
      sessionId: {
        alias: 's',
        string: true,
        demandOption: true,
        requiresArg: true,
        description: 'Display Name',
      },
      entityValues: {
        alias: 'e',
        array: true,
        demandOption: true,
        requiresArg: true,
        description: 'The kind of entity. KIND_MAP or KIND_LIST.',
      },
      entityTypeDisplayName: {
        alias: 'd',
        string: true,
        demandOption: true,
        requiresArg: true,
        description: 'Display Name',
      },
      entityOverrideMode: {
        alias: 'o',
        string: true,
        demandOption: true,
        requiresArg: true,
        description: 'Display Name',
      },
    },
    opts =>
      createSessionEntityType(
        opts.projectId,
        opts.sessionId,
        opts.entityValues,
        opts.entityTypeDisplayName,
        opts.entityOverrideMode
      )
  )
  .wrap(120)
  .recommendCommands()
  .epilogue(
    'For more information, see https://cloud.google.com/dialogflow-enterprise/docs'
  )
  .help()
  .strict();

if (module === require.main) {
  cli.parse(process.argv.slice(2));
}
