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

function main(version, updateMask) {
  // [START dialogflow_v2beta1_generated_Versions_UpdateVersion_async]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The version to update.
   *  Supported formats:
   *  - `projects/<Project ID>/agent/versions/<Version ID>`
   *  - `projects/<Project ID>/locations/<Location ID>/agent/versions/<Version
   *    ID>`
   */
  // const version = ''
  /**
   *  Required. The mask to control which fields get updated.
   */
  // const updateMask = ''

  // Imports the Dialogflow library
  const {VersionsClient} = require('@google-cloud/dialogflow').v2beta1;

  // Instantiates a client
  const dialogflowClient = new VersionsClient();

  async function updateVersion() {
    // Construct request
    const request = {
      version,
      updateMask,
    };

    // Run request
    const response = await dialogflowClient.updateVersion(request);
    console.log(response);
  }

  updateVersion();
  // [END dialogflow_v2beta1_generated_Versions_UpdateVersion_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
