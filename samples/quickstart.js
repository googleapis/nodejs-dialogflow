/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

// [START dialogflow_quickstart]

const dialogflow = require('dialogflow');

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} sessionId A unique identifier for the given session
 * @param {string} query The query to send to the dialogflow agent
 * @param {string} languageCode The language used by the client (en-US)
 * @param {string} projectId The project to be used
 */
async function main(sessionId, query, languageCode, projectId) {
  // Create a new session
  const sessionClient = new dialogflow.SessionsClient();
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode: languageCode,
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log('Detected intent');
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log(`  No intent matched.`);
  }
}
// [END dialogflow_quickstart]

const args = process.argv.slice(2);
if (args.length !== 4) {
  console.error(`
    USAGE:
       node quickstart.js <sessionId> <query> <languageCode> <projectId>

     EXAMPLE:
       node quickstart.js quickstart-session-id hello en-US my-project-id

    You can find your project ID in your Dialogflow agent settings:  https://dialogflow.com/docs/agents#settings.
  `);
  process.exit(1);
}

main(...args).catch(console.error);
