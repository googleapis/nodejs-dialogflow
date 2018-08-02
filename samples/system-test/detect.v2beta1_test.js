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

const test = require(`ava`);
const {runAsync} = require('@google-cloud/nodejs-repo-tools');

const cmd = 'node detect.v2beta1.js';
const testQuery = [`How do I sign up?`];

const testKnowledgeBaseName = 'TestKnowBase';

let knowbaseDisplayName;
let knowbaseFullName;

let documentFullPath;
const testDocName = `TestDoc`;
const testDocumentPath = `https://dialogflow.com/docs/concepts/google-projects-faq`;

test.serial(`It should create a knowledge base`, async t => {
  const output = await runAsync(
    `${cmd} createKnowledgeBase -k ${testKnowledgeBaseName}`
  );
  const parsedOut = output.split(`\n`);
  const confirmName = parsedOut[1].split(`:`)[1].trim();
  t.true(confirmName === testKnowledgeBaseName);
  knowbaseDisplayName = confirmName;
  knowbaseFullName = parsedOut[0].split(`:`)[1].trim();
});

test.serial(
  `It should register newly created knowledge base with getKnowledgeBase`,
  async t => {
    const output = await runAsync(
      `${cmd} getKnowledgeBase -n "${knowbaseFullName}"`
    );
    const parsedOut = output.split(`\n`);
    t.true(
      parsedOut[0].includes(knowbaseFullName) &&
        parsedOut[1].includes(knowbaseDisplayName)
    );
  }
);

test.serial(
  `It should locate knowledge base with listKnowledgeBases`,
  async t => {
    const output = await runAsync(`${cmd} listKnowledgeBases`);
    t.true(output.includes(testKnowledgeBaseName));
    const parsedOut = output.split(`\n`);
    parsedOut.forEach(p => {
      if (p.includes(testKnowledgeBaseName)) t.pass();
    });
  }
);

test.serial(`It should create a document in Knowledge Base`, async t => {
  const output = await runAsync(
    `${cmd} createDocument -n "${knowbaseFullName}" -z "${testDocumentPath}" -m "${testDocName}"`
  );
  t.true(output.includes(`Document created`));
});

test.serial(
  `It should list document just created with listDocuments`,
  async t => {
    const output = await runAsync(
      `${cmd} listDocuments -n "${knowbaseFullName}"`
    );
    const parsedOut = output.split(`\n`);
    documentFullPath = parsedOut[parsedOut.length - 1].split(`:`)[1];
    t.true(documentFullPath !== ``);
  }
);

test.serial(`It should detect Intent with Text to Speech Response`, async t => {
  const output = await runAsync(
    `${cmd} detectIntentwithTexttoSpeechResponse -q "${testQuery}"`
  );
  const parsedOut = output.split(`\n`);
  t.true(
    parsedOut[1].includes(
      `Audio content written to file: ./resources/output.wav`
    )
  );
});

test.serial(`It should detect Intent Knowledge`, async t => {
  const output = await runAsync(
    `${cmd} detectIntentKnowledge -q "${testQuery}"`
  );
  const parsedOut = output.split(`\n`);
  t.true(parsedOut[parsedOut.length - 3] !== null);
});

test.serial(`It should detect sentiment with intent`, async t => {
  const output = await runAsync(
    `${cmd} detectIntentandSentiment -q "${testQuery}"`
  );
  const parsedOut = output.split(`\n`);
  t.true(parsedOut[parsedOut.length - 3].includes(`Detected sentiment`));
});

test.serial(`It should detect Intent with Model Selection`, async t => {
  const output = await runAsync(`${cmd} detectIntentwithModelSelection`);
  const parsedOut = output.split(`\n`);
  t.true(parsedOut[1] !== null);
});

test.serial(
  `It should delete document just created with deleteDocument`,
  async t => {
    const output = await runAsync(
      `${cmd} deleteDocument -d "${documentFullPath}"`
    );
    t.true(output.includes(`document deleted`));
  }
);

test.serial(
  `It should delete this knowledge base with deleteKnowledgeBase`,
  async t => {
    const output = await runAsync(
      `${cmd} deleteKnowledgeBase -n "${knowbaseFullName}"`
    );
    const parsedOut = output.split(`\n`);
    t.true(
      parsedOut[0].includes(`Name: undefined`) &&
        parsedOut[1].includes(`displayName: undefined`)
    );
  }
);
