// Copyright 2022 Google LLC
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



'use strict';

function main(parent, conversation) {
  // [START dialogflow_v2_generated_Conversations_CreateConversation_async]
  /**
   * This snippet has been automatically generated and should be regarded as a code template only.
   * It will require modifications to work.
   * It may require correct/in-range values for request initialization.
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. Resource identifier of the project creating the conversation.
   *  Format: `projects/<Project ID>/locations/<Location ID>`.
   */
  // const parent = 'abc123'
  /**
   *  Required. The conversation to create.
   */
  // const conversation = {}
  /**
   *  Optional. Identifier of the conversation. Generally it's auto generated by Google.
   *  Only set it if you cannot wait for the response to return a
   *  auto-generated one to you.
   *  The conversation ID must be compliant with the regression fomula
   *  "a-zA-Z a-zA-Z0-9_-*" with the characters length in range of 3,64.
   *  If the field is provided, the caller is resposible for
   *  1. the uniqueness of the ID, otherwise the request will be rejected.
   *  2. the consistency for whether to use custom ID or not under a project to
   *  better ensure uniqueness.
   */
  // const conversationId = 'abc123'

  // Imports the Dialogflow library
  const {ConversationsClient} = require('@google-cloud/dialogflow').v2;

  // Instantiates a client
  const dialogflowClient = new ConversationsClient();

  async function callCreateConversation() {
    // Construct request
    const request = {
      parent,
      conversation,
    };

    // Run request
    const response = await dialogflowClient.createConversation(request);
    console.log(response);
  }

  callCreateConversation();
  // [END dialogflow_v2_generated_Conversations_CreateConversation_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
