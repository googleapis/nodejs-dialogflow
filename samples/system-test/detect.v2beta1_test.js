/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const test = require(`ava`);
const tools = require(`@google-cloud/nodejs-repo-tools`);
const {runAsync} = require('@google-cloud/nodejs-repo-tools');

const cmd = 'node detect.v2beta1.js';
const sessionId = require('uuid/v1')();
const projectId = process.env.GCLOUD_PROJECT;
const testQuery = [`How do I sign up?`];

// test.before.serial('Remove all existing resources', async () => {
//   await tools.runAsync(`${cmd} clear-agent -f`);
// });

// test.serial(`Create a knowledge base`, async t => {
//   const output = await runAsync(`${cmd} createKnowledgeBase`);
//   t.true(output.includes('Name:'));
// });
