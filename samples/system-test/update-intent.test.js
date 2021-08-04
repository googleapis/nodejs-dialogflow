// Copyright 2021 Google LLC
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

'use strict';
const {
  IntentsClient,
} = require('@google-cloud/dialogflow');
const {assert} = require('chai');
const {describe, it} = require('mocha');
const execSync = require('child_process').execSync;
const uuid = require('uuid');
const projectId =
  process.env.GCLOUD_PROJECT || process.env.GOOGLE_CLOUD_PROJECT;

const exec = cmd => execSync(cmd, {encoding: 'utf8'});
let intentID = '';

describe('update intent', () => {
  const cmd = 'node update-intent.js';
  const displayName = `fake_display_name_${uuid.v4().split('-')[0]}`;

  before('setup agent and get intent ID', () => {
    // The path to identify the agent that owns the intents.

    const intentClient = new IntentsClient();
    const projectAgentPath = intentClient.projectAgentPath(projectId);

    const intentRequest = {
      parent: projectAgentPath,
    };

    const [response] = intentClient.listIntents(intentRequest);
    intentID = response[0].name.split('/')[4];
  });

  it('should update an intent using fieldmasks', async () => {
    const output = exec(`${cmd} ${projectId} ${intentID} ${displayName}`);
    assert.include(output, displayName);
  });

});
