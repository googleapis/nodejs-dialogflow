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

function main(parent) {
  // [START dialogflow_v2_generated_Agents_SearchAgents_async]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The project to list agents from.
   *  Format: `projects/<Project ID or '-'>`.
   */
  // const parent = 'abc123'
  /**
   *  Optional. The maximum number of items to return in a single page. By
   *  default 100 and at most 1000.
   */
  // const pageSize = 1234
  /**
   *  The next_page_token value returned from a previous list request.
   */
  // const pageToken = 'abc123'

  // Imports the Dialogflow library
  const {AgentsClient} = require('@google-cloud/dialogflow').v2;

  // Instantiates a client
  const dialogflowClient = new AgentsClient();

  async function searchAgents() {
    // Construct request
    const request = {
      parent,
    };

    // Run request
    const iterable = await dialogflowClient.searchAgentsAsync(request);
    for await (const response of iterable) {
        console.log(response);
    }
  }

  searchAgents();
  // [END dialogflow_v2_generated_Agents_SearchAgents_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
