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

const path = require('path');
const test = require('ava');
const {runAsync} = require('@google-cloud/nodejs-repo-tools');

const cmd = 'node detect.js';
const cwd = path.join(__dirname, `..`);
const audioFilename = `pizza_order.wav`;
const audioFilepath = path.join(__dirname, `../resources/${audioFilename}`);

test('Should detect text queries', async (t) => {
  const output = await runAsync(`${cmd} text -q "Hello" "World"`);
  const detectedIntents = output.split('Detected intent');
  detectedIntents.shift();
  t.is(detectedIntents.length, 2);
  t.truthy(detectedIntents[0].includes('Query: Hello'));
  t.true(detectedIntents[1].includes('Query: World'));
});

test('Should detect event query', async (t) => {
  const output = await runAsync(`${cmd} event WELCOME`);
  t.true(output.includes('Detected intent'));
  t.true(output.includes('Query: WELCOME'));
});

test('Should detect audio query', async (t) => {
  const output = await runAsync(`${cmd} audio ${audioFilepath} -r 22050`, cwd);
  t.true(output.includes('Detected intent'));
  t.true(output.toLowerCase().includes(
      `query: i'd like to order a medium pizza with mushrooms`));
});

test('Should detect audio query in streaming fashion', async (t) => {
  const output = await runAsync(`${cmd} stream ${audioFilepath} -r 22050`, cwd);
  t.true(output.toLowerCase().includes(
      `intermediate transcript: i'd like to order a medium pizza with ` +
          `mushrooms`));
  t.true(output.includes('Detected intent'));
  t.true(output.toLowerCase().includes(
      `query: i'd like to order a medium pizza with mushrooms`));
});
