// Copyright 2021 Google LLC
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

function main(parent, intents) {
  // [START dialogflow_v2beta1_generated_Intents_BatchDeleteIntents_async]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The name of the agent to delete all entities types for.
   *  Supported formats:
   *  - `projects/<Project ID>/agent`
   *  - `projects/<Project ID>/locations/<Location ID>/agent`
   */
  // const parent = 'abc123'
  /**
   *  Required. The collection of intents to delete. Only intent `name` must be
   *  filled in.
   */
  // const intents = 1234

  // Imports the Dialogflow library
  const {IntentsClient} = require('@google-cloud/dialogflow').v2beta1;

  // Instantiates a client
  const dialogflowClient = new IntentsClient();

  async function batchDeleteIntents() {
    // Construct request
    const request = {
      parent,
      intents,
    };

    // Run request
    const [operation] = await dialogflowClient.batchDeleteIntents(request);
    const [response] = await operation.promise();
    console.log(response);
  }

  batchDeleteIntents();
  // [END dialogflow_v2beta1_generated_Intents_BatchDeleteIntents_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
