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

const {assert} = require('chai');
const {describe, it} = require('mocha');
const webhook = require('../webhook');

const request = {
    "queryResult": {
      "queryText": "hi",
      "action": "input.welcome",
      "parameters": {},
      "allRequiredParamsPresent": true,
      "fulfillmentMessages": [
        {
          "text": {
            "text": [
              ""
            ]
          }
        }
      ],
      "outputContexts": [
        {
          "name": "projects/galstarter-316823/agent/sessions/d386891c-b918-1238-21ec-c3b18859b11a/contexts/__system_counters__",
          "parameters": {
            "no-input": 0,
            "no-match": 0
          }
        }
      ],
      "intent": {
        "name": "projects/galstarter-316823/agent/intents/00c2877d-2440-447f-8dc1-045623a55bd4",
        "displayName": "Default Welcome Intent"
      },
      "intentDetectionConfidence": 1,
      "languageCode": "en",
      "sentimentAnalysisResult": {
        "queryTextSentiment": {
          "score": 0.3,
          "magnitude": 0.3
        }
      }
    },
  }

describe('create agent', () => {
  it('should test webhook returns correct response', async () => {
    const temp = JSON.stringify(request);
    let response = '';

    const res = {
      send: function (s) {
        response = JSON.stringify(s);
      },
    };

    webhook.handleWebhook(JSON.parse(temp), res);
    assert.include(response, 'Hello from a GCF Webhook');
  });
});