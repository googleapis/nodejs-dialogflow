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
const testQuery = `Where is my data stored?`;

const testKnowledgeBaseName = 'TestKnowledgeBase';

let documentFullPath;
const testDocName = `TestDoc`;
const testDocumentPath = `https://cloud.google.com/storage/docs/faq`;

test.before(`It should create a knowledge base`, async t => {
  // Check that the knowledge base does not yet exist
  let output = await runAsync(`${cmd} listKnowledgeBases`);
  t.false(output.includes(testKnowledgeBaseName));

  // Creates a knowledge base
  output = await runAsync(
    `${cmd} createKnowledgeBase -k ${testKnowledgeBaseName}`
  );
  t.true(output.includes(`displayName: ${testKnowledgeBaseName}`));
  const knowbaseFullName = output
    .split(`\n`)[0]
    .split(`:`)[1]
    .trim();
  const knowbaseId = output
    .split(`\n`)[0]
    .split(`knowledgeBases/`)[1]
    .trim();

  // List the knowledge base
  output = await runAsync(`${cmd} listKnowledgeBases`);
  t.true(output.includes(testKnowledgeBaseName));

  // Get the knowledge base
  output = await runAsync(`${cmd} getKnowledgeBase -b "${knowbaseId}"`);
  t.true(output.includes(`displayName: ${testKnowledgeBaseName}`));
  t.true(output.includes(`name: ${knowbaseFullName}`));

  // Create a document
  output = await runAsync(
    `${cmd} createDocument -n "${knowbaseFullName}" -z "${testDocumentPath}" -m "${testDocName}"`
  );
  t.true(output.includes(`Document created`));

  // List the Document
  output = await runAsync(`${cmd} listDocuments -n "${knowbaseFullName}"`);
  const parsedOut = output.split(`\n`);
  documentFullPath = parsedOut[parsedOut.length - 1].split(`:`)[1];
  t.true(output.includes(`There are 1 documents in ${knowbaseFullName}`));

  // Get the Document
  // output = await runAsync(`${cmd} getDocument -d "${documentFullPath}"`);
  // t.true(output.includes(`${testDocName}`));

  // Detect intent with Knowledge Base
  output = await runAsync(
    `${cmd} detectIntentKnowledge -q "${testQuery}" -n "${knowbaseId}"`
  );
  t.true(output.includes(`Detected Intent:`));

  // Delete the Document
  output = await runAsync(`${cmd} deleteDocument -d ${documentFullPath}`);
  t.true(output.includes(`document deleted`));

  // List the Document
  output = await runAsync(`${cmd} listDocuments -n "${knowbaseFullName}"`);
  t.false(output.includes(documentFullPath));

  // Delete the Knowledge Base
  output = await runAsync(
    `${cmd} deleteKnowledgeBase -n "${knowbaseFullName}"`
  );
  //t.true(output.includes(`Knowledge Base deleted`));

  // List the Knowledge Base
  output = await runAsync(`${cmd} listKnowledgeBases`);
  t.false(output.includes(testKnowledgeBaseName));
});

test(`It should detect Intent with Model Selection`, async t => {
  await runAsync(`node resource.js restore-room-agent -f`);
  const output = await runAsync(`${cmd} detectIntentwithModelSelection`);
  t.true(
    output.includes(
      `Response: I can help with that. Where would you like to reserve a room?`
    )
  );
});

// test.serial(
//   `It should register newly created knowledge base with getKnowledgeBase`,
//   async t => {
//     const output = await runAsync(
//       `${cmd} getKnowledgeBase -n "${knowbaseFullName}"`
//     );
//     t.true(
//       output.includes(knowbaseFullName) && output.includes(knowbaseDisplayName)
//     );
//   }
// );

// test.serial(
//   `It should locate knowledge base with listKnowledgeBases`,

// );

// test.serial(`It should create a document in Knowledge Base`, async t => {
//   const output = await runAsync(
//     `${cmd} createDocument -n "${knowbaseFullName}" -z "${testDocumentPath}" -m "${testDocName}"`
//   );
//   t.true(output.includes(`Document created`));
// });

// test.serial(`It should list documents`, async t => {
//   const output = await runAsync(
//     `${cmd} listDocuments -n "${knowbaseFullName}"`
//   );
//   const parsedOut = output.split(`\n`);
//   documentFullPath = parsedOut[parsedOut.length - 1].split(`:`)[1];
//   t.true(output.includes(`There are 1 documents in ${knowbaseFullName}`));
// });

test(`It should detect Intent with Text to Speech Response`, async t => {
  const output = await runAsync(
    `${cmd} detectIntentwithTexttoSpeechResponse -q "${testQuery}"`
  );
  t.true(
    output.includes(`Audio content written to file: ./resources/output.wav`)
  );
});

// test.serial(`It should detect Intent Knowledge`, async t => {
//   const knowBaseId = knowbaseFullName.split(`/`);
//   const output = await runAsync(
//     `${cmd} detectIntentKnowledge -q "${testQuery}" -n "${
//       knowBaseId[knowBaseId.length - 1]
//     }"`
//   );
//   t.true(output.includes(`Detected Intent:`));
// });

test(`It should detect sentiment with intent`, async t => {
  const output = await runAsync(
    `${cmd} detectIntentandSentiment -q "${testQuery}"`
  );
  t.true(output.includes(`Detected sentiment`));
});

// test.serial(
//   `It should delete document just created with deleteDocument`,
//   async t => {
//     const output = await runAsync(
//       `${cmd} deleteDocument -d ${documentFullPath}`
//     );
//     t.true(output.includes(`document deleted`));
//   }
// );

// test.after(
//   `It should delete this knowledge base with deleteKnowledgeBase`,
//   async t => {
//     const output = await runAsync(
//       `${cmd} deleteKnowledgeBase -n "${knowbaseFullName}"`
//     );
//     t.true(output.includes(`Knowledge Base deleted`));
//   }
// );
