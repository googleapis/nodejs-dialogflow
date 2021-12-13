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

function main(name) {
  // [START dialogflow_v2beta1_generated_Conversations_CompleteConversation_async]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. Resource identifier of the conversation to close.
   *  Format: `projects/<Project ID>/locations/<Location
   *  ID>/conversations/<Conversation ID>`.
   */
  // const name = 'abc123'

  // Imports the Dialogflow library
  const {ConversationsClient} = require('@google-cloud/dialogflow').v2beta1;

  // Instantiates a client
  const dialogflowClient = new ConversationsClient();

  async function callCompleteConversation() {
    // Construct request
    const request = {
      name,
    };

    // Run request
    const response = await dialogflowClient.completeConversation(request);
    console.log(response);
  }

  callCompleteConversation();
  // [END dialogflow_v2beta1_generated_Conversations_CompleteConversation_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
