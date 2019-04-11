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

const execSync = cmd => cp.execSync(cmd, {encoding: 'utf-8'});
const cmd = 'node detect.js';
const audioFilepathBookARoom = path
  .join(__dirname, '../resources/book_a_room.wav')
  .replace(/(\s+)/g, '\\$1');

describe('basic detection', () => {
  it('should detect text queries', () => {
    const stdout = execSync(`${cmd} text -q "hello"`);
    assert.include(stdout, 'Detected intent');
  });

  it('should detect event query', () => {
    const stdout = execSync(`${cmd} event WELCOME`);
    assert.include(stdout, 'Query: WELCOME');
  });

  it('should detect audio query', () => {
    const stdout = execSync(`${cmd} audio ${audioFilepathBookARoom} -r 16000`);
    assert.include(stdout, 'Detected intent');
  });

  it('should detect audio query in streaming fashion', () => {
    const stdout = execSync(`${cmd} stream ${audioFilepathBookARoom} -r 16000`);
    assert.include(stdout, 'Detected intent');
  });
});
