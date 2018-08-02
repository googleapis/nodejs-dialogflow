/**
 * Copyright 2017, Google, LLC.
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
// const sessionId = require('uuid/v1')();
// const projectId = process.env.GCLOUD_PROJECT;
const testQuery = [`How do I sign up?`];

const testKnowledgeBaseName = 'TestKnowBase';

let knowbaseDisplayName;
let knowbaseFullName;

let documentFullPath;
const testDocName = `TestDoc`;
const testDocumentPath = `https://dialogflow.com/docs/concepts/google-projects-faq`;

test.serial(`It should create a knowledge base`, async t => {
  console.log(`displayname should be: ${testKnowledgeBaseName}`);
  const output = await runAsync(
    `${cmd} createKnowledgeBase -k ${testKnowledgeBaseName}`
  );
  const parsedOut = output.split(`\n`);
  console.log(`parsedOut[0] is: ${parsedOut[0]}`);
  console.log(`parsedOut[1] is: ${parsedOut[1]}`);
  const confirmName = parsedOut[1].split(`:`)[1].trim();
  console.log(`Confirm Name is: ${confirmName}`);
  t.true(confirmName === testKnowledgeBaseName);
  knowbaseDisplayName = confirmName;
  knowbaseFullName = parsedOut[0].split(`:`)[1].trim();
  console.log(`Full Name is: ${knowbaseFullName}`);
  console.log(`Output is: ${output}`);
});

test.serial(
  `It should register newly created knowledge base with getKnowledgeBase`,
  async t => {
    const output = await runAsync(
      `${cmd} getKnowledgeBase -n "${knowbaseFullName}"`
    );
    console.log(`getKnowledgeBase: input is ${knowbaseFullName}`);
    const parsedOut = output.split(`\n`);
    console.log(`getKnowledgeBase: output is ${output}`);
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
    const parsedOut = output.split(`\n`);
    parsedOut.forEach(p => {
      if (p.includes(testKnowledgeBaseName)) t.pass();
    });
    console.log(output);
  }
);

test.serial(`It should create a document in Knowledge Base`, async t => {
  const output = await runAsync(
    `${cmd} createDocument -n "${knowbaseFullName}" -z "${testDocumentPath}" -m "${testDocName}"`
  );
  t.true(output.includes(`Document created`));
  console.log(`Document created successfully`);
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
    console.log(`Confirming documentID: ${documentFullPath}`);
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
  console.log(`confirm audio file generated: ${parsedOut[1]}`);
});

test.serial(`It should detect Intent Knowledge`, async t => {
  const output = await runAsync(
    `${cmd} detectIntentKnowledge -q "${testQuery}"`
  );
  const parsedOut = output.split(`\n`);
  // documentFullPath = parsedOut[parsedOut.length - 1].split(`:`)[1];
  t.true(parsedOut[parsedOut.length - 3] !== null);
  console.log(`confirm query result: ${parsedOut[parsedOut.length - 5]}`);
});

test.serial(`It should detect sentiment with intent`, async t => {
  const output = await runAsync(
    `${cmd} detectIntentandSentiment -q "${testQuery}"`
  );
  const parsedOut = output.split(`\n`);
  t.true(parsedOut[parsedOut.length - 3].includes(`Detected sentiment`));
  console.log(`confirm sentiment result: ${parsedOut[parsedOut.length - 2]}`);
  console.log(`confirm sentiment result: ${parsedOut[parsedOut.length - 1]}`);
});

test.serial(`It should detect Intent with Model Selection`, async t => {
  const output = await runAsync(`${cmd} detectIntentwithModelSelection`);
  const parsedOut = output.split(`\n`);
  t.true(parsedOut[1] !== null);
  console.log(`ParsedOut[1] is: ${parsedOut[1]}`);
});

test.serial(
  `It should delete document just created with deleteDocument`,
  async t => {
    console.log(`Deleting document: ${documentFullPath}`);
    const output = await runAsync(
      `${cmd} deleteDocument -d "${documentFullPath}"`
    );
    t.true(output.includes(`document deleted`));
  }
);

// test.serial(
//   `It should confirm document is deleted with listDocuments`,
//   async t => {
//     //knowbaseFullName = `projects/mlapisamples-cfrater-1/knowledgeBases/NzAyNjQ1OTg0MzYyODEwNTcyOA`;
//     const output = await runAsync(
//       `${cmd} listDocuments -n "${knowbaseFullName}"`
//     );
//     const parsedOut = output.split(`\n`);
//     const howManyDocs = parsedOut[0].split(`/`)[0];
//     console.log(`confirming document deleted:`);
//     console.log(`${parsedOut[0]}`);
//     t.true(howManyDocs.includes(`There are 0 documents in projects`));
//   }
// );

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
