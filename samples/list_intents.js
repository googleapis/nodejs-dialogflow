// Copyright 2017 Google LLC
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

// [START dialogflow_list_intents]

/**
 * List of all intents in the specified project.
 * @param {string} projectId The project to be used
 */
async function listIntents(projectId) {
  // Imports the Dialogflow library
  const dialogflow = require('@google-cloud/dialogflow');

  // Instantiates clients
  const intentsClient = new dialogflow.IntentsClient();

  // The path to identify the agent that owns the intents.
  const projectAgentPath = intentsClient.agentPath(projectId);

  const request = {
    parent: projectAgentPath,
  };

  console.log(projectAgentPath);

  // Send the request for listing intents.
  const [response] = await intentsClient.listIntents(request);
  response.forEach(intent => {
    console.log('====================');
    console.log(`Intent name: ${intent.name}`);
    console.log(`Intent display name: ${intent.displayName}`);
    console.log(`Action: ${intent.action}`);
    console.log(`Root folowup intent: ${intent.rootFollowupIntentName}`);
    console.log(`Parent followup intent: ${intent.parentFollowupIntentName}`);

    console.log('Input contexts:');
    intent.inputContextNames.forEach(inputContextName => {
      console.log(`\tName: ${inputContextName}`);
    });

    console.log('Output contexts:');
    intent.outputContexts.forEach(outputContext => {
      console.log(`\tName: ${outputContext.name}`);
    });
  });
  // [END dialogflow_list_intents]
}

const args = process.argv.slice(2);
if (args.length !== 1) {
  console.error(`
    USAGE:
       node list_intents.js <projectId>

     EXAMPLE:
       node list_intents.js my-project-id

    You can find your project ID in your Dialogflow agent settings:  https://dialogflow.com/docs/agents#settings.
  `);
  process.exit(1);
}

listIntents(...args).catch(console.error);
