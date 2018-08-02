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

const projectId = process.env.GCLOUD_PROJECT;
const sessionId = require('uuid/v1')();
const common = require('@google-cloud/common');
const structjson = require('./structjson.js');

function createKnowledgeBase(projectId, displayName) {
  // [START dialogflow_create_knowledge_base]
  // Imports the Dialogflow client library
  const dialogflow = require('dialogflow').v2beta1;

  // Instantiate a DialogFlow client.
  var client = new dialogflow.KnowledgeBasesClient();

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  //const projectId = `your GCLOUD project name, if not specified as env variable e.g. my-Gcloud-Project`;
  //const displayName = `your knowledge base display name, e.g. myKnowledgeBase`;

  var formattedParent = client.projectPath(projectId);
  var knowledgeBase = {
    displayName: displayName,
  };
  var request = {
    parent: formattedParent,
    knowledgeBase: knowledgeBase,
  };

  client
    .createKnowledgeBase(request)
    .then(responses => {
      const result = responses[0];
      console.log(`Name: ${result.name}`);
      console.log(`displayName: ${result.displayName}`);
      return result.displayName;
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  // [END dialogflow_create_knowledge_base]
}

function getKnowledgeBase(projectId, knowledgeBaseFullName) {
  // [START dialogflow_get_knowledge_base]
  // Imports the Dialogflow client library
  const dialogflow = require('dialogflow').v2beta1;

  // Instantiate a DialogFlow client.
  var client = new dialogflow.KnowledgeBasesClient();

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  //const projectId = `your GCLOUD project name, if not specified as env variable e.g. my-Gcloud-Project`;
  //const knowledgeBaseFullName = `the full path of your knowledge base, e.g my-Gcloud-project/myKnowledgeBase`;

  const fullName = knowledgeBaseFullName;

  client
    .getKnowledgeBase({
      name: fullName,
    })
    .then(responses => {
      const result = responses[0];
      console.log(`Name: ${result.name}`);
      console.log(`displayName: ${result.displayName}`);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  // [END dialogflow_get_knowledge_base]
}

function listKnowledgeBases(projectId) {
  // [START dialogflow_list_knowledge_base]
  // Imports the Dialogflow client library
  const dialogflow = require('dialogflow').v2beta1;

  // Instantiate a DialogFlow KnowledgeBasesClient.
  var client = new dialogflow.KnowledgeBasesClient({
    projectPath: projectId,
  });

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  //const projectId = `your GCLOUD project name, if not specified as env variable e.g. my-Gcloud-Project`;

  var formattedParent = client.projectPath(projectId);

  client
    .listKnowledgeBases({parent: formattedParent})
    .then(responses => {
      var resources = responses[0];
      resources.forEach(r => {
        console.log(`  Display name is : ${r.displayName}`);
        console.log(`  Knowledge base is : ${r.name}`);
      });
    })
    .catch(err => {
      console.error(err);
    });
  // [END dialogflow_list_knowledge_base]
}

function deleteKnowledgeBase(projectId, knowledgeBaseFullName) {
  // [START dialogflow_delete_knowledge_base]
  // Instantiate a DialogFlow client.
  const dialogflow = require('dialogflow').v2beta1;

  // Instantiate a DialogFlow KnowledgeBasesClient.
  var client = new dialogflow.KnowledgeBasesClient();

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  //const projectId = `your GCLOUD project name, if not specified as env variable e.g. my-Gcloud-Project`;
  //const knowledgeBaseFullName = `the full path of your knowledge base, e.g my-Gcloud-project/myKnowledgeBase`;

  const fullName = knowledgeBaseFullName;

  client
    .deleteKnowledgeBase({
      name: fullName,
    })
    .then(responses => {
      const result = responses[0];
      console.log(`Name: ${result.name}`);
      console.log(`displayName: ${result.displayName}`);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  // [END dialogflow_delete_knowledge_base]
}

function createDocument(
  projectId,
  knowledgeBaseFullName,
  documentPath,
  documentName
) {
  // [START dialogflow_create_document]
  // Imports the Dialogflow client library
  const dialogflow = require('dialogflow').v2beta1;

  // Instantiate a DialogFlow Documents client.
  var client = new dialogflow.DocumentsClient({
    projectId: projectId,
  });

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  //const projectId = `your GCLOUD project name, if not specified as env variable e.g. my-Gcloud-Project`;
  //const knowledgeBaseFullName = `the full path of your knowledge base, e.g my-Gcloud-project/myKnowledgeBase`;
  //const documentPath = `path of the document you'd like to add, e.g. https://dialogflow.com/docs/knowledge-connectors`;
  //const documentName = `displayed name of your document in knowledge base, e.g. myDoc`;

  var request = {
    parent: knowledgeBaseFullName,
    document: {
      knowledgeTypes: [`FAQ`],
      displayName: documentName,
      contentUri: documentPath,
      source: `contentUri`,
      mimeType: `text/html`,
    },
  };

  client
    .createDocument(request)
    .then(console.log(`Document created`))
    .catch(err => {
      console.error(err);
    });
  // [END dialogflow_create_document]
}

function listDocuments(projectId, knowledgeBaseFullName) {
  // [START dialogflow_list_document]
  // Imports the Dialogflow client library
  const dialogflow = require('dialogflow').v2beta1;

  // Instantiate a DialogFlow Documents client.
  var client = new dialogflow.DocumentsClient({
    projectId: projectId,
  });

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  //const projectId = `your GCLOUD project name, if not specified as env variable e.g. my-Gcloud-Project`;
  //const knowledgeBaseFullName = `the full path of your knowledge base, e.g my-Gcloud-project/myKnowledgeBase`;

  client
    .listDocuments({parent: knowledgeBaseFullName})
    .then(responses => {
      var resources = responses[0];
      console.log(
        `There are ${resources.length} documents in ${knowledgeBaseFullName}`
      );
      resources.forEach(r => {
        console.log(` KnowledgeType: ${r.knowledgeType}`);
        console.log(` displayName: ${r.displayName}`);
        console.log(` mimeType: ${r.mimeType}`);
        console.log(` contentUri: ${r.contentUri}`);
        console.log(` source: ${r.source}`);
        console.log(` name: ${r.name}`);
      });
    })
    .catch(err => {
      console.error(err);
    });
  // [END dialogflow_list_document]
}

function getDocument(documentId) {
  // [START dialogflow_get_document]
  // Imports the Dialogflow client library
  const dialogflow = require('dialogflow').v2beta1;

  // Instantiate a DialogFlow Documents client.
  var client = new dialogflow.DocumentsClient({
    projectId: projectId,
  });

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  //const documentId = `full path to document in knowledge base, e.g. myKnowledgeBase/documents/myDoc`;

  client
    .getDocument({name: documentId})
    .then(responses => {
      var r = responses[0];
      console.log(` KnowledgeType: ${r.knowledgeType}`);
      console.log(` displayName: ${r.displayName}`);
      console.log(` mimeType: ${r.mimeType}`);
      console.log(` contentUri: ${r.contentUri}`);
      console.log(` source: ${r.source}`);
      console.log(` name: ${r.name}`);
    })
    .catch(err => {
      console.error(err);
    });
  // [END dialogflow_get_document]
}

function deleteDocument(projectId, documentId) {
  // [START dialogflow_delete_document]
  // Imports the Dialogflow client library
  const dialogflow = require('dialogflow').v2beta1;

  // Instantiate a DialogFlow Documents client.
  var client = new dialogflow.DocumentsClient({
    projectId: projectId,
  });

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  //const projectId = `your GCLOUD project name, if not specified as env variable e.g. my-Gcloud-Project`;
  //const documentId = `full path to document in knowledge base, e.g. myKnowledgeBase/documents/myDoc`;

  client
    .deleteDocument({name: documentId})
    .then(console.log(`document deleted`))
    .catch(err => {
      console.error(err);
    });
  // [END dialogflow_delete_document]
}

//v2b1 features
function detectIntentandSentiment(projectId, sessionId, query, languageCode) {
  // [START dialogflow_detect_intent_with_sentiment_analysis]
  // Imports the Dialogflow client library
  const dialogflow = require('dialogflow').v2beta1;

  // Instantiate a DialogFlow client.
  const sessionClient = new dialogflow.SessionsClient();

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  //const projectId = `your GCLOUD project name, if not specified as env variable e.g. my-Gcloud-Project`;
  //const sessionId = `user specific ID of session, e.g. 12345`;
  //const query = `phrase(s) to pass to detect, e.g. I'd like to reserve a room for six people`;
  //const languageCode = 'BCP-47 language code, e.g. en-US';

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
  // [END dialogflow_detect_intent_with_sentiment_analysis]
}

function detectIntentwithTexttoSpeechResponse(
  projectId,
  sessionId,
  query,
  languageCode,
  outputFile
) {
  // [START dialogflow_detect_intent_with_texttospeech_response]
  // Imports the Dialogflow client library
  const dialogflow = require('dialogflow').v2beta1;

  // Instantiate a DialogFlow client.
  const sessionClient = new dialogflow.SessionsClient();

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  //const projectId = `your GCLOUD project name, if not specified as env variable e.g. my-Gcloud-Project`;
  //const sessionId = `user specific ID of session, e.g. 12345`;
  //const query = `phrase(s) to pass to detect, e.g. I'd like to reserve a room for six people`;
  //const languageCode = 'BCP-47 language code, e.g. en-US';
  //const outputFile = `path for audio output file, e.g. ./resources/myOutput.wav`;

  // Define session path
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
  // [START dialogflow_detect_intent_knowledge]
  // Imports the Dialogflow client library
  const dialogflow = require('dialogflow').v2beta1;

  // Instantiate a DialogFlow client.
  const sessionClient = new dialogflow.SessionsClient();

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  //const projectId = `your GCLOUD project name, if not specified as env variable e.g. my-Gcloud-Project`;
  //const sessionId = `user specific ID of session, e.g. 12345`;
  //const languageCode = 'BCP-47 language code, e.g. en-US';
  //const knowledgeBaseId = `the full path of your knowledge base, e.g my-Gcloud-project/myKnowledgeBase`;
  //const query = `phrase(s) to pass to detect, e.g. I'd like to reserve a room for six people`;

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
  // [END dialogflow_detect_intent_knowledge]
}

function detectIntentwithModelSelection(
  projectId,
  sessionId,
  audioFilePath,
  languageCode,
  model
) {
  // [START dialogflow_detect_intent_with_model_selection]
  const fs = require('fs');

  // Imports the Dialogflow client library
  const dialogflow = require('dialogflow').v2beta1;

  // Instantiate a DialogFlow client.
  const sessionClient = new dialogflow.SessionsClient();

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  //const projectId = `your GCLOUD project name, if not specified as env variable e.g. my-Gcloud-Project`;
  //const sessionId = `user specific ID of session, e.g. 12345`;
  //const audioFilePath = `path to local audio file, e.g. ./resources/book_a_room.wav`;
  //const languageCode = 'BCP-47 language code, e.g. en-US';
  //const model = `speech mode selected for given request, e.g. video, phone_call, command_and_search, default`;

  // Define session path
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);
  // Read the content of the audio file and send it as part of the request.
  const readFile = common.util.promisify(fs.readFile, {singular: true});
  readFile(audioFilePath)
    .then(inputAudio => {
      // The audio query request
      const request = {
        session: sessionPath,
        queryInput: {
          audioConfig: {
            audioEncoding: `LINEAR16`,
            sampleRateHertz: 16000,
            languageCode: languageCode,
            model: model,
          },
        },
        inputAudio: inputAudio,
      };
      // Recognizes the speech in the audio and detects its intent.
      return sessionClient.detectIntent(request);
    })
    .then(responses => {
      logQueryResult(sessionClient, responses[0].queryResult);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  // [END dialogflow_detect_intent_with_model_selection]
}

function logQueryResult(sessionClient, result) {
  // Imports the Dialogflow library
  const dialogflow = require('dialogflow');

  // Instantiates a context client
  const contextClient = new dialogflow.ContextsClient();

  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log(`  No intent matched.`);
  }
  const parameters = JSON.stringify(
    structjson.structProtoToJson(result.parameters)
  );
  console.log(`  Parameters: ${parameters}`);
  if (result.outputContexts && result.outputContexts.length) {
    console.log(`  Output contexts:`);
    result.outputContexts.forEach(context => {
      const contextId = contextClient.matchContextFromContextName(context.name);
      const contextParameters = JSON.stringify(
        structjson.structProtoToJson(context.parameters)
      );
      console.log(`    ${contextId}`);
      console.log(`      lifespan: ${context.lifespanCount}`);
      console.log(`      parameters: ${contextParameters}`);
    });
  }
}

const cli = require(`yargs`)
  .demand(1)
  .options({
    audioFilePath: {
      alias: `i`,
      type: `string`,
      default: `./resources/book_a_room.wav`,
      requiresArg: true,
      description: `Audio File to send to Detect Intent with Model Selection`,
    },
    documentId: {
      alias: `d`,
      type: `string`,
      requiresArg: true,
      description: `Full path of document in knowledge base`,
    },
    documentName: {
      alias: `m`,
      type: `string`,
      default: `testDoc`,
      requiresArg: true,
      description: `Name of Document to Create`,
    },
    documentPath: {
      alias: `z`,
      type: `string`,
      requiresArg: true,
      description: `uri of document to be added`,
    },
    encoding: {
      alias: 'e',
      default: 'AUDIO_ENCODING_LINEAR16',
      choices: [
        'AUDIO_ENCODING_LINEAR16',
        'AUDIO_ENCODING_FLAC',
        'AUDIO_ENCODING_MULAW',
        'AUDIO_ENCODING_AMR',
        'AUDIO_ENCODING_AMR_WB',
        'AUDIO_ENCODING_OGG_OPUS',
        'AUDIO_ENCODING_SPEEX_WITH_HEADER_BYTE',
      ],
      requiresArg: true,
      description: 'The encoding of the input audio.',
    },
    knowledgeBaseName: {
      alias: `k`,
      default: `TestKnowBase`,
      type: `string`,
      requiresArg: true,
      description: `The name of the knowledge base to search from`,
    },
    knowledgeBaseFullName: {
      alias: `n`,
      type: `string`,
      requiresArg: true,
      description: `full path knowledge base`,
    },
    languageCode: {
      alias: 'l',
      default: 'en-US',
      type: 'string',
      requiresArg: true,
      description: 'The language code of the query. Defaults to "en-US".',
    },
    model: {
      alias: 'o',
      default: `phone_call`,
      type: `string`,
      requiresArg: true,
      description: `The Speech model to return response: possible models- 'video', 'phone_call', 'command_and_search', 'default'`,
    },
    outputFile: {
      alias: `f`,
      default: `./resources/output.wav`,
      global: true,
      requiresArg: true,
      type: `string`,
    },
    projectId: {
      alias: 'p',
      default: process.env.GCLOUD_PROJECT || process.env.GOOGLE_CLOUD_PROJECT,
      description:
        'The Project ID to use. Defaults to the value of the ' +
        'GCLOUD_PROJECT or GOOGLE_CLOUD_PROJECT environment variables.',
      requiresArg: true,
      type: 'string',
    },
    queries: {
      alias: 'q',
      array: true,
      string: true,
      demandOption: true,
      requiresArg: true,
      description: 'An array of text queries',
      default: [`How do I sign up?`],
    },
    sampleRateHertz: {
      alias: 'r',
      type: 'number',
      default: 16000,
      description:
        'The sample rate in Hz of the input audio. Only ' +
        'required if the input audio is in raw format.',
    },
    sessionId: {
      alias: 's',
      default: sessionId,
      type: 'string',
      requiresArg: true,
      description:
        'The identifier of the detect session. Defaults to a random UUID.',
    },
  })
  .command(`createKnowledgeBase`, `Creates a new knowledge base`, {}, opts =>
    createKnowledgeBase(opts.projectId, opts.knowledgeBaseName)
  )
  .command(
    `getKnowledgeBase`,
    `Gets Knowledge base by Knowledge Base Name`,
    {},
    opts => getKnowledgeBase(opts.projectId, opts.knowledgeBaseFullName)
  )
  .command(
    `listKnowledgeBases`,
    `Lists all knowledge bases present by ProjectId`,
    {},
    opts => listKnowledgeBases(opts.projectId)
  )
  .command(`deleteKnowledgeBase`, `Deletes a knowledge base`, {}, opts =>
    deleteKnowledgeBase(opts.projectId, opts.knowledgeBaseFullName)
  )
  .command(
    `createDocument`,
    `Creates a new document for this knowledge base`,
    {},
    opts =>
      createDocument(
        opts.projectId,
        opts.knowledgeBaseFullName,
        opts.documentPath,
        opts.documentName
      )
  )
  .command(
    `getDocument`,
    `Gets a specific document from the knowledge base`,
    {},
    opts => getDocument(opts.documentId)
  )
  .command(
    `listDocuments`,
    `Lists all the documents belonging to a knowledge base`,
    {},
    opts => listDocuments(opts.projectId, opts.knowledgeBaseFullName)
  )
  .command(
    `deleteDocument`,
    `Deletes a specific document from a knowledge base`,
    {},
    opts => deleteDocument(opts.projectId, opts.documentId)
  )
  .command(
    `detectIntentwithTexttoSpeechResponse`,
    `Detects the intent of text input, outputs .wav file to target location`,
    {},
    opts =>
      detectIntentwithTexttoSpeechResponse(
        opts.projectId,
        opts.sessionId,
        opts.queries,
        opts.languageCode,
        opts.outputFile
      )
  )
  .command(
    `detectIntentKnowledge`,
    `Detects anwsers from knowledge base queries`,
    {},
    opts =>
      detectIntentKnowledge(
        opts.projectId,
        opts.sessionId,
        opts.knowledgeBaseName,
        opts.languageCode,
        opts.queries
      )
  )
  .command(
    `detectIntentandSentiment`,
    `Detects sentiment with detect Intent query`,
    {},
    opts =>
      detectIntentandSentiment(
        opts.projectId,
        opts.sessionId,
        opts.queries,
        opts.languageCode
      )
  )
  .command(
    `detectIntentwithModelSelection`,
    `Returns result of detect intent with model selection on an audio file as input`,
    {},
    opts =>
      detectIntentwithModelSelection(
        opts.projectId,
        opts.sessionId,
        opts.audioFilePath,
        opts.languageCode,
        opts.model
      )
  )
  .example(`node $0 createKnowledgeBase -k "newTestKnowledgeBase"`)
  .example(`node $0 getKnowledgeBase -n "KNOWLEDGEBASEFULLNAME"`)
  .example(`node $0 listKnowledgeBases`)
  .example(`node $0 deleteKnowledgeBase -n "KNOWLEDGEBASEFULLNAME"`)
  .example(
    `node $0 createDocument -n "KNOWLEDGEBASEFULLNAME" -p "URIHTMLPATHTODOC"`
  )
  .example(`node $0 getDocument -n "KNOWLEDGEBASEFULLNAME" -d "FULLDOCUMENTID"`)
  .example(`node $0 listDocuments -n "KNOWLEDGEBASEFULLNAME"`)
  .example(`node $0 deleteDocument -d "FULLDOCUMENTID"`)
  .example(`node $0 detectIntentwithTexttoSpeechResponse "How do I sign up?"`)
  .example(`node $0 detectIntentKnowledge "how do i sign up?"`)
  .example(
    `node $0 detectIntentandSentiment "Book a great room for six great folks!"`
  )
  .example(
    `node $0 detectIntentwithModelSelection -i "./resources/book_a_room.wav" -l "en-US" -o "phone_call"`
  )
  .wrap(120)
  .recommendCommands()
  .epilogue(
    `For more information, see https://cloud.google.com/conversation/docs`
  )
  .help()
  .strict();

if (module === require.main) {
  cli.parse(process.argv.slice(2));
}
