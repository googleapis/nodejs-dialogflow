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

// const common = require('@google-cloud/common');
// const structjson = require('./structjson.js');
// const pump = require('pump');
// const through2 = require('through2');
const projectId = process.env.GCLOUD_PROJECT;
const sessionId = require('uuid/v1')();

function detectIntentwithTexttoSpeechResponse(
  projectId,
  sessionId,
  query,
  languageCode,
  outputFile
) {
  // [START dialogflow_detect_intent_with_texttospeech_response]
  // Instantiate a DialogFlow client.
  const dialogflow = require('dialogflow').v2beta1;
  const sessionClient = new dialogflow.SessionsClient();
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);
  const fs = require(`fs`);

  // The audio query request
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode: languageCode,
      },
    },
    outputAudioConfig: {
      audioEncoding: `OUTPUT_AUDIO_ENCODING_LINEAR_16`,
    },
  };

  sessionClient
    .detectIntent(request)
    .then(responses => {
      console.log('Detected intent:');
      //console.log(responses);
      const audioFile = responses[0].outputAudio;
      fs.writeFile(outputFile, audioFile, 'binary', err => {
        if (err) {
          console.error('ERROR:', err);
          return;
        }
        console.log(`Audio content written to file: ${outputFile}`);
      });
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  // [END dialogflow_detect_intent_with_texttospeech_response]
}

function detectIntentKnowledge(
  projectId,
  sessionId,
  languageCode,
  knowledgeBaseId,
  query
) {
  // Instantiate a DialogFlow client.
  const dialogflow = require('dialogflow').v2beta1;
  const sessionClient = new dialogflow.SessionsClient();

  // Define session path
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);

  // The audio query request
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode: languageCode,
      },
    },
    queryParams: {
      knowledgeBasesClient: {
        knowledgeBasePath: {
          project: projectId,
          knowledgeBase: knowledgeBaseId,
        },
      },
    },
  };

  console.log(`Query is ${query}`);

  sessionClient
    .detectIntent(request)
    .then(responses => {
      const result = responses[0].queryResult;
      console.log(`Query text: ${result.queryText}`);
      console.log(`Detected Intent: ${result.intent.displayName}`);
      console.log(`Confidence: ${result.intentDetectionConfidence}`);
      console.log(`Query Result: ${result.fulfillmentText}`);
      const answers = result.knowledgeAnswers.answers;
      console.log(`There are ${answers.length} anwser(s);`);
      answers.forEach(a => {
        console.log(`   answer: ${a.answer}`);
        console.log(`   confidence: ${a.matchConfidence}`);
        console.log(`   match confidence level: ${a.matchConfidenceLevel}`);
      });
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}

function detectIntentandSentiment(projectId, sessionId, query, languageCode) {
  // Instantiate a DialogFlow client.
  const dialogflow = require('dialogflow').v2beta1;
  const sessionClient = new dialogflow.SessionsClient();

  // Define session path
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);

  if (!query || !query.length) {
    return;
  }

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode: languageCode,
      },
    },
    queryParams: {
      sentimentAnalysisRequestConfig: {
        analyzeQueryTextSentiment: true,
      },
    },
  };

  // Send request and log result
  sessionClient
    .detectIntent(request)
    .then(responses => {
      console.log('Detected intent');
      const result = responses[0].queryResult;
      // console.log(`result stringified: ${JSON.stringify(result)}`);
      console.log(`  Query: ${result.queryText}`);
      console.log(`  Response: ${result.fulfillmentText}`);
      if (result.intent) {
        console.log(`  Intent: ${result.intent.displayName}`);
      } else {
        console.log(`  No intent matched.`);
      }
      if (result.sentimentAnalysisResult) {
        console.log(`Detected sentiment`);
        console.log(
          `  Score: ${result.sentimentAnalysisResult.queryTextSentiment.score}`
        );
        console.log(
          `  Magnitude: ${
            result.sentimentAnalysisResult.queryTextSentiment.magnitude
          }`
        );
      } else {
        console.log(`No sentiment Analysis Found`);
      }
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  // [END dialogflow_quickstart]
}

function listKnowledgeBases(projectId) {
  // Instantiate a DialogFlow client.
  const dialogflow = require('dialogflow');
  //const sessionClient = new dialogflow.SessionsClient();

  console.log(`Project ID is: ${projectId}`);
  var client = new dialogflow.KnowledgeBasesClient({
    projectPath: projectId,
  });

  // Iterate over all elements.
  var formattedParent = client.projectPath(projectId);

  client
    .listKnowledgeBases({parent: formattedParent})
    .then(responses => {
      var resources = responses[0];
      for (let i = 0; i < resources.length; i += 1) {
        console.log(`  Display name is : ${resources[i].displayName}`);
        console.log(`  Knowledge base is : ${resources[i].name}`);
      }
    })
    .catch(err => {
      console.error(err);
    });
}

function createKnowledgeBase(projectId, displayName) {
  // Instantiate a DialogFlow client.
  const dialogflow = require('dialogflow').v2beta1;

  console.log(`Project ID is: ${projectId}`);
  var client = new dialogflow.KnowledgeBasesClient({
    projectPath: projectId,
  });

  var formattedParent = client.projectPath(projectId);
  var knowledgeBase = {};

  var request = {
    parent: formattedParent,
    knowledgeBase: {
      knowledgeBase: knowledgeBase,
      displayName: displayName,
    },
  };

  console.log(client);
  client
    .createKnowledgeBase(request)
    .then(responses => {
      const result = responses[0];
      console.log(`Name: ${result.name}`);
      console.log(`displayName: ${result.displayName}`);
      return result.name;
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}

//working:
// Name: projects/mlapisamples-cfrater-1/knowledgeBases/NTg3ODYwNDg4ODYwMjA1MDU2MA
// displayName: TestKnowledgeBase2
//createKnowledgeBase(projectId, [`TestKnowledgeBase2`]);

function getKnowledgeBase(projectId, knowledgeBaseId) {
  // Instantiate a DialogFlow client.
  const dialogflow = require('dialogflow').v2beta1;

  console.log(`Project ID is: ${projectId}`);
  console.log(`KnowledgeBaseId is: ${knowledgeBaseId}`);
  var client = new dialogflow.KnowledgeBasesClient();

  const knowledgeBasePath = client.knowledgeBasePath(
    projectId,
    knowledgeBaseId
  );

  console.log(`formattedName is ${knowledgeBasePath}`);
  console.log(`knowlegeBasePath is ${knowledgeBasePath}`);

  client
    .getKnowledgeBase({
      name: `projects/mlapisamples-cfrater-1/knowledgeBases/MTE5NDM4Mjc2ODY3NjMyNjYwNDg`,
    })
    .then(responses => {
      const result = responses[0];
      console.log(`Name: ${result.name}`);
      console.log(`displayName: ${result.displayName}`);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}

//getKnowledgeBase(projectId, `TestKnowledgeBase`);

//also working
// detectIntentandSentiment(
//   projectId,
//   sessionId,
//   [`Hello!  I'd like to book a great room, for a few great folks!`],
//   [`en-us`]
// );

//working
// const outputFile = `/Users/cfrater/DF/dialogflow-nodejs-client-v2/samples/resources/output.wav`;
// detectIntentwithTexttoSpeechResponse(
//   projectId,
//   sessionId,
//   [`Hello!  I'd like to book a great room, for a few great folks!`],
//   `en-us`,
//   outputFile
// );

//working:
// Project ID is: mlapisamples-cfrater-1
//   Display name is : TestKnowledgeBase
//   Knowledge base is : projects/mlapisamples-cfrater-1/knowledgeBases/MTE5NDM4Mjc2ODY3NjMyNjYwNDg
//listKnowledgeBases(projectId);

//working:
// Query text: How do I sign up?
// Detected Intent: Knowledge.KnowledgeBase.MTE5NDM4Mjc2ODY3NjMyNjYwNDg
// Confidence: 1
// Query Result: Sign up for Cloud Storage by turning on the Cloud Storage service in the Google Cloud Platform Console.
// There are 1 anwser(s);
//    answer: Sign up for Cloud Storage by turning on the Cloud Storage service in the Google Cloud Platform Console.
//    confidence: 1
//    match confidence level: HIGH
// detectIntentKnowledge(projectId, sessionId, `en-US`, `TestKnowledgeBase`, [
//   `How do I sign up?`,
// ]);

//getKnowledgeBase(projectId, `TestKnowledgeBase`);
listKnowledgeBases(projectId);
// const cli = require(`yargs`)
//   .demand(1)
//   .options({
//     projectId: {
//       alias: 'p',
//       default: process.env.GCLOUD_PROJECT || process.env.GOOGLE_CLOUD_PROJECT,
//       description:
//         'The Project ID to use. Defaults to the value of the ' +
//         'GCLOUD_PROJECT or GOOGLE_CLOUD_PROJECT environment variables.',
//       requiresArg: true,
//       type: 'string',
//     },
//     queries: {
//       alias: 'q',
//       array: true,
//       string: true,
//       demandOption: true,
//       requiresArg: true,
//       description: 'An array of text queries',
//       default: [`How do I sign up?`],
//     },
//     sessionId: {
//       alias: 's',
//       default: require('uuid/v1')(),
//       type: 'string',
//       requiresArg: true,
//       description:
//         'The identifier of the detect session. Defaults to a random UUID.',
//     },
//     knowledgeBaseName: {
//       alias: `k`,
//       default: `TestKnowledgeBase`,
//       type: `string`,
//       requiresArg: true,
//       description: `The name of the knowledge base to search from`,
//     },
//     languageCode: {
//       alias: 'l',
//       default: 'en-US',
//       type: 'string',
//       requiresArg: true,
//       description: 'The language code of the query. Defaults to "en-US".',
//     },
//     encoding: {
//       alias: 'e',
//       default: 'AUDIO_ENCODING_LINEAR16',
//       choices: [
//         'AUDIO_ENCODING_LINEAR16',
//         'AUDIO_ENCODING_FLAC',
//         'AUDIO_ENCODING_MULAW',
//         'AUDIO_ENCODING_AMR',
//         'AUDIO_ENCODING_AMR_WB',
//         'AUDIO_ENCODING_OGG_OPUS',
//         'AUDIO_ENCODING_SPEEX_WITH_HEADER_BYTE',
//       ],
//       requiresArg: true,
//       description: 'The encoding of the input audio.',
//     },
//     sampleRateHertz: {
//       alias: 'r',
//       type: 'number',
//       default: 16000,
//       description:
//         'The sample rate in Hz of the input audio. Only ' +
//         'required if the input audio is in raw format.',
//     },
//     outputFile: {
//       alias: `f`,
//       default: `./resources/output.wav`,
//       global: true,
//       requiresArg: true,
//       type: `string`,
//     },
//   })
//   .command(
//     `detectIntentwithTexttoSpeechResponse`,
//     `Detects the intent of text input, outputs .wav file to target location`,
//     {},
//     opts =>
//       detectIntentwithTexttoSpeechResponse(
//         opts.projectId,
//         opts.sessionId,
//         opts.queries,
//         opts.languageCode,
//         opts.outputFile
//       )
//   )
//   .command(`createKnowledgeBase`, `Creates a new knowledge base`, {}, opts =>
//     createKnowledgeBase(opts.projectId, opts.displayName)
//   )
//   .command(
//     `detectIntentKnowledge`,
//     `Detects anwsers from knowledge base queries`,
//     {},
//     opts =>
//       detectIntentKnowledge(
//         opts.projectId,
//         opts.sessionId,
//         opts.knowledgeBaseName,
//         opts.languageCode,
//         opts.queries
//       )
//   )
//   .command(
//     `detectIntentandSentiment`,
//     `Detects sentiment with detect Intent query`,
//     {},
//     opts =>
//       detectIntentandSentiment(
//         opts.projectId,
//         opts.sessionId,
//         opts.queries,
//         opts.languageCode
//       )
//   )
//   .example(`node $0 createKnowledgeBase "newTestKnowledgeBase"`)
//   .example(
//     `node $0 detectIntentwithTexttoSpeechResponse "hello" "book a room" "Mountain View" ` +
//       `"today" "230pm" "half an hour" "two people"`
//   )
//   .example(
//     `node $0 detectIntentKnowledge "hello" "book a room" "Mountain View" ` +
//       `"today" "230pm" "half an hour" "two people"`
//   )
//   .example(
//     `node $0 detectIntentandSentiment "hello" "book a Great room" "Mountain View"`
//   )
//   //.example(`node $0 stream resources/mountain_view.wav -r 16000`)
//   .wrap(120)
//   .recommendCommands()
//   .epilogue(
//     `For more information, see https://cloud.google.com/conversation/docs`
//   )
//   .help()
//   .strict();

// if (module === require.main) {
//   cli.parse(process.argv.slice(2));
// }
