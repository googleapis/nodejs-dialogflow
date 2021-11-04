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

function main(parent, conversationProfile) {
  // [START dialogflow_v2_generated_ConversationProfiles_CreateConversationProfile_async]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The project to create a conversation profile for.
   *  Format: `projects/<Project ID>/locations/<Location ID>`.
   */
  // const parent = 'abc123'
  /**
   *  Required. The conversation profile to create.
   */
  // const conversationProfile = ''

  // Imports the Dialogflow library
  const {ConversationProfilesClient} = require('@google-cloud/dialogflow').v2;

  // Instantiates a client
  const dialogflowClient = new ConversationProfilesClient();

  async function createConversationProfile() {
    // Construct request
    const request = {
      parent,
      conversationProfile,
    };

    // Run request
    const response = await dialogflowClient.createConversationProfile(request);
    console.log(response);
  }

  createConversationProfile();
  // [END dialogflow_v2_generated_ConversationProfiles_CreateConversationProfile_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
