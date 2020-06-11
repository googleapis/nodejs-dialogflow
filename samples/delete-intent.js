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

/**
 * Delete an intent with the given ID.
 * @param {string} projectId The project to be used
 * @param {string} intentId Intent ID
 */
function main(projectId = 'YOUR_PROJECT_ID', intentId = 'YOUR_INTENT_ID') {
  // [START dialogflow_delete_intent]

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const projectId = 'The Project ID to use, e.g. 'YOUR_GCP_ID';
  // const intentId = 'The ID of the intent, e.g. 'YOUR_INTENT_ID';

  // Imports the Dialogflow library
  const dialogflow = require('@google-cloud/dialogflow');

  // Instantiates clients
  const intentsClient = new dialogflow.IntentsClient();

  async function deleteIntent() {
    // Construct request
    const intentPath = intentsClient.intentPath(projectId, intentId);

    const request = {name: intentPath};

    // Send the request for deleting the intent.
    const result = await intentsClient.deleteIntent(request);
    console.log(`Intent ${intentPath} deleted`);
    return result;
  }

  const result = deleteIntent();

  return result;
  // [END dialogflow_delete_intent]
}

main(...process.argv.slice(2));
