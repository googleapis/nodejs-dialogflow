/**
 * Copyright 2018, Google, LLC.
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

const {assert} = require('chai');
const cp = require('child_process');
const uuid = require('uuid/v4');

const execSync = cmd => cp.execSync(cmd, {encoding: 'utf-8'});

const cmd = 'node detect.v2beta1.js';
const testQuery = 'Where is my data stored?';
const testKnowledgeBaseName = `${uuid().split('-')[0]}-TestKnowledgeBase`;
const testDocName = 'TestDoc';
const testDocumentPath = 'https://cloud.google.com/storage/docs/faq';

describe('v2beta1 detection', () => {
  let knowbaseFullName;
  let knowbaseId;
  let documentFullPath;

  it('should create a knowledge base', () => {
    // Check that the knowledge base does not yet exist
    let output = execSync(`${cmd} listKnowledgeBases`);
    assert.notInclude(output, testKnowledgeBaseName);

    // Creates a knowledge base
    output = execSync(`${cmd} createKnowledgeBase -k ${testKnowledgeBaseName}`);
    assert.include(output, `displayName: ${testKnowledgeBaseName}`);

    knowbaseFullName = output
      .split('\n')[0]
      .split(':')[1]
      .trim();
    knowbaseId = output
      .split('\n')[0]
      .split('knowledgeBases/')[1]
      .trim();
  });

  it('should list the knowledge bases', () => {
    const output = execSync(`${cmd} listKnowledgeBases`);
    assert.include(output, testKnowledgeBaseName);
  });

  it('should get a knowledge base', () => {
    const output = execSync(`${cmd} getKnowledgeBase -b "${knowbaseId}"`);
    assert.include(output, `displayName: ${testKnowledgeBaseName}`);
    assert.include(output, `name: ${knowbaseFullName}`);
  });

  it('should create a document', () => {
    const output = execSync(
      `${cmd} createDocument -n "${knowbaseFullName}" -z "${testDocumentPath}" -m "${testDocName}"`
    );
    assert.include(output, 'Document created');
  });

  it('should list documents', () => {
    const output = execSync(`${cmd} listDocuments -n "${knowbaseFullName}"`);
    const parsedOut = output.split('\n');
    documentFullPath = parsedOut[parsedOut.length - 1].split(':')[1];
    assert.include(output, `There are 1 documents in ${knowbaseFullName}`);
  });

  it('should detect intent with a knowledge base', async () => {
    const output = execSync(
      `${cmd} detectIntentKnowledge -q "${testQuery}" -n "${knowbaseId}"`
    );
    assert.include(output, 'Detected Intent:');
  });

  it('should delete a document', () => {
    const output = execSync(`${cmd} deleteDocument -d ${documentFullPath}`);
    assert.include(output, 'document deleted');
  });

  it('should list the document', () => {
    const output = execSync(`${cmd} listDocuments -n "${knowbaseFullName}"`);
    assert.notInclude(output, documentFullPath);
  });

  it('should delete the Knowledge Base', () => {
    execSync(`${cmd} deleteKnowledgeBase -n "${knowbaseFullName}"`);
  });

  it('should list the Knowledge Base', () => {
    const output = execSync(`${cmd} listKnowledgeBases`);
    assert.notInclude(output, testKnowledgeBaseName);
  });

  it('should detect Intent with Model Selection', () => {
    const output = execSync(`${cmd} detectIntentwithModelSelection`);
    assert.include(
      output,
      'Response: I can help with that. Where would you like to reserve a room?'
    );
  });

  it('should detect Intent with Text to Speech Response', () => {
    const output = execSync(
      `${cmd} detectIntentwithTexttoSpeechResponse -q "${testQuery}"`
    );
    assert.include(
      output,
      'Audio content written to file: ./resources/output.wav'
    );
  });

  it('should detect sentiment with intent', () => {
    const output = execSync(
      `${cmd} detectIntentandSentiment -q "${testQuery}"`
    );
    assert.include(output, 'Detected sentiment');
  });
});
