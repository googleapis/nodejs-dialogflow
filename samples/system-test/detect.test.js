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
const {assert} = require('chai');
const cp = require('child_process');
const cmd = 'node detect.js';
const cmd_tts = 'node detect-intent-TTS-response.v2.js';
const cmd_sentiment = 'node detect-intent-sentiment.v2.js';
const cwd = path.join(__dirname, '..');
cp.cwd = cwd;
const projectId =
  process.env.GCLOUD_PROJECT || process.env.GOOGLE_CLOUD_PROJECT;
const testQuery = 'Where is my data stored?';

const audioFilepathBookARoom = path
  .join(__dirname, '../resources/book_a_room.wav')
  .replace(/(\s+)/g, '\\$1');

describe('basic detection', () => {
  it('should detect text queries', async () => {
    const stdout = cp.execSync(`${cmd} text -q "hello"`, {stdio: 'pipe'});
    assert.include(stdout, 'Detected intent');
  });

  it('should detect event query', async () => {
    const stdout = cp.execSync(`${cmd} event WELCOME`, {stdio: 'pipe'});
    assert.include(stdout, 'Query: WELCOME');
  });

  it('should detect audio query', async () => {
    const stdout = cp.execSync(
      `${cmd} audio ${audioFilepathBookARoom} -r 16000`,
      {cwd}
    );
    assert.include(stdout, 'Detected intent');
  });

  it('should detect audio query in streaming fashion', async () => {
    const stdout = cp.execSync(
      `${cmd} stream ${audioFilepathBookARoom} -r 16000`,
      {cwd}
    );
    assert.include(stdout, 'Detected intent');
  });

  it('should detect Intent with Text to Speech Response', async () => {
    const stdout = cp.execSync(
      `${cmd_tts} ${projectId} 'SESSION_ID' '${testQuery}' 'en-US' './resources/output.wav'`,
      {cwd}
    );
    assert.include(
      stdout,
      'Audio content written to file: ./resources/output.wav'
    );
  });

  it('should detect sentiment with intent', async () => {
    const stdout = cp.execSync(
      `${cmd_sentiment} ${projectId} 'SESSION_ID' '${testQuery}' 'en-US'`,
      {cwd}
    );
    assert.include(stdout, 'Detected sentiment');
  });
});