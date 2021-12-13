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

function main(participant, updateMask) {
  // [START dialogflow_v2_generated_Participants_UpdateParticipant_async]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The participant to update.
   */
  // const participant = {}
  /**
   *  Required. The mask to specify which fields to update.
   */
  // const updateMask = {}

  // Imports the Dialogflow library
  const {ParticipantsClient} = require('@google-cloud/dialogflow').v2;

  // Instantiates a client
  const dialogflowClient = new ParticipantsClient();

  async function callUpdateParticipant() {
    // Construct request
    const request = {
      participant,
      updateMask,
    };

    // Run request
    const response = await dialogflowClient.updateParticipant(request);
    console.log(response);
  }

  callUpdateParticipant();
  // [END dialogflow_v2_generated_Participants_UpdateParticipant_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
