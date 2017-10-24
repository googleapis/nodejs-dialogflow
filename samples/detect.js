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

const common = require('@google-cloud/common');
const fs = require('fs');
const structjson = require('./structjson.js');
const pump = require('pump');
const through2 = require('through2');

function detectTextIntent (
    projectId, sessionId, queries, languageCode) {
  if (!queries || !queries.length) {
    return;
  }

  // Imports the Google Cloud client library
  const Conversation = require('@google-cloud/conversation');

  // Instantiates a client
  const conversationClient = Conversation.v1alpha();

  // Agent ID must be set to project ID for v1alpha.
  const agentId = projectId;
  // The path to identify the agent that owns the created intent.
  const sessionPath =
      conversationClient.sessionPath(projectId, agentId, sessionId);

  let promise;

  // Detects the intent of the queries.
  for (const query of queries) {
    // The text query request.
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: query,
          languageCode: languageCode
        }
      }
    };

    if (!promise) {
      // First query.
      console.log(`Sending query "${query}"`);
      promise = conversationClient.detectIntent(request);
    } else {
      promise = promise.then((responses) => {
        console.log('Detected intent');
        const response = responses[0];
        logQueryResult(conversationClient, response.queryResult);

        // Use output contexts as input contexts for the next query.
        response.queryResult.outputContexts.forEach((context) => {
          // There is a bug in gRPC that the returned google.protobuf.Struct
          // value contains fields with value of null, which causes error
          // when encoding it back. Converting to JSON and back to proto
          // removes those values.
          context.parameters = structjson.jsonToStructProto(
              structjson.structProtoToJson(context.parameters));
        });
        request.queryParams = {
          contexts: response.queryResult.outputContexts
        };

        console.log(`Sending query "${query}"`);
        return conversationClient.detectIntent(request);
      });
    }
  }

  promise
      .then((responses) => {
        console.log('Detected intent');
        logQueryResult(conversationClient, responses[0].queryResult);
      })
      .catch((err) => {
        console.error('ERRROR:', err);
      });
}

function detectEventIntent (
    projectId, sessionId, eventName, languageCode) {
  // Imports the Google Cloud client library
  const Conversation = require('@google-cloud/conversation');

  // Instantiates a client
  const conversationClient = Conversation.v1alpha();

  // Agent ID must be set to project ID for v1alpha.
  const agentId = projectId;
  // The path to identify the agent that owns the created intent.
  const sessionPath =
      conversationClient.sessionPath(projectId, agentId, sessionId);

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      event: {
        name: eventName,
        parameters: structjson.jsonToStructProto({'foo': 'bar'})
      }
    }
  };
  conversationClient.detectIntent(request)
      .then((responses) => {
        console.log('Detected intent');
        logQueryResult(conversationClient, responses[0].queryResult);
      })
      .catch((err) => {
        console.error('ERRROR:', err);
      });
}

function detectAudioIntent (
    projectId, sessionId, filename, encoding, sampleRateHertz,
    languageCode) {
  // Imports the Google Cloud client library
  const Conversation = require('@google-cloud/conversation');

  // Instantiates a client
  const conversationClient = Conversation.v1alpha();

  // Agent ID must be set to project ID for v1alpha.
  const agentId = projectId;
  // The path to identify the agent that owns the created intent.
  const sessionPath =
      conversationClient.sessionPath(projectId, agentId, sessionId);

  // Read the content of the audio file and send it as part of the request.
  const readFile = common.util.promisify(fs.readFile, {singular: true});
  readFile(filename)
      .then((inputAudio) => {
        // The audio query request
        const request = {
          session: sessionPath,
          queryInput: {
            audioConfig: {
              audioEncoding: encoding,
              sampleRateHertz: sampleRateHertz,
              languageCode: languageCode
            }
          },
          inputAudio: inputAudio
        };
        // Recognizes the speech in the audio and detects its intent.
        return conversationClient.detectIntent(request);
      })
      .then((responses) => {
        console.log('Detected intent:');
        logQueryResult(conversationClient, responses[0].queryResult);
      })
      .catch((err) => {
        console.error('ERRROR:', err);
      });
}

function streamingDetectIntent (
    projectId, sessionId, filename, encoding, sampleRateHertz,
    languageCode) {
  // Imports the Google Cloud client library
  const Conversation = require('@google-cloud/conversation');

  // Instantiates a client
  const conversationClient = Conversation.v1alpha();

  // The path to the local file on which to perform speech recognition, e.g.
  // /path/to/audio.raw const filename = '/path/to/audio.raw';

  // The encoding of the audio file, e.g. 'AUDIO_ENCODING_LINEAR16'
  // const encoding = 'AUDIO_ENCODING_LINEAR16';

  // The sample rate of the audio file in hertz, e.g. 16000
  // const sampleRateHertz = 16000;

  // The BCP-47 language code to use, e.g. 'en-US'
  // const languageCode = 'en-US';

  // Agent ID must be set to project ID for v1alpha.
  const agentId = projectId;

  const initialStreamRequest = {
    queryParams: {
      session: conversationClient.sessionPath(projectId, agentId, sessionId)
    },
    queryInput: {
      audioConfig: {
        config: {
          audioEncoding: encoding,
          sampleRateHertz: sampleRateHertz,
          languageCode: languageCode
        },
        singleUtterance: true
      }
    }
  };

  // Create a stream for the streaming request.
  const detectStream =
      conversationClient.streamingDetectIntent()
          .on('error', console.error)
          .on('data', (data) => {
            if (data.recognitionResult) {
              console.log(`Intermediate transcript: ${data.recognitionResult.transcript}`);
            } else {
              console.log(`Detected intent:`);
              logQueryResult(conversationClient, data.queryResult);
            }
          });

  // Write the initial stream request to config for audio input.
  detectStream.write(initialStreamRequest);

  // Stream an audio file from disk to the Conversation API, e.g.
  // "./resources/audio.raw"
  pump(
      fs.createReadStream(filename),
      // Format the audio stream into the request format.
      through2.obj((obj, _, next) => {
        next(null, {inputAudio: obj});
      }),
      detectStream);
}

function logQueryResult (conversationClient, result) {
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillment.text}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log(`  No intent matched.`);
  }
  const parameters =
      JSON.stringify(structjson.structProtoToJson(result.parameters));
  console.log(`  Parameters: ${parameters}`);
  if (result.outputContexts && result.outputContexts.length) {
    console.log(`  Output contexts:`);
    result.outputContexts.forEach((context) => {
      const contextId =
          conversationClient.matchContextFromContextName(context.name);
      const contextParameters =
          JSON.stringify(structjson.structProtoToJson(context.parameters));
      console.log(`    ${contextId}`);
      console.log(`      lifespan: ${context.lifespanCount}`);
      console.log(`      parameters: ${contextParameters}`);
    });
  }
}

const cli = require(`yargs`)
    .demand(1)
    .options({
      projectId: {
        alias: 'p',
        default: process.env.GCLOUD_PROJECT || process.env.GOOGLE_CLOUD_PROJECT,
        description:
            'The Project ID to use. Defaults to the value of the ' +
                'GCLOUD_PROJECT or GOOGLE_CLOUD_PROJECT environment variables.',
        requiresArg: true,
        type: 'string'
      },
      sessionId: {
        alias: 's',
        default: require('uuid/v1')(),
        type: 'string',
        requiresArg: true,
        description:
            'The identifier of the detect session. Defaults to a random UUID.'
      },
      languageCode: {
        alias: 'l',
        default: 'en-US',
        type: 'string',
        requiresArg: true,
        description: 'The language code of the query. Defaults to "en-US".'
      },
      encoding: {
        alias: 'e',
        default: 'AUDIO_ENCODING_LINEAR16',
        choices: [
          'AUDIO_ENCODING_LINEAR16', 'AUDIO_ENCODING_FLAC',
          'AUDIO_ENCODING_MULAW', 'AUDIO_ENCODING_AMR', 'AUDIO_ENCODING_AMR_WB',
          'AUDIO_ENCODING_OGG_OPUS', 'AUDIO_ENCODING_SPEEX_WITH_HEADER_BYTE'
        ],
        requiresArg: true,
        description: 'The encoding of the input audio.'
      },
      sampleRateHertz: {
        alias: 'r',
        type: 'number',
        description: 'The sample rate in Hz of the input audio. Only ' +
            'required if the input audio is in raw format.'
      }
    })
    .command(
        `text`, `Detects the intent for text queries.`, {
          queries: {
            alias: 'q',
            array: true,
            string: true,
            demandOption: true,
            requiresArg: true,
            description: 'An array of text queries'
          }
        },
        (opts) => detectTextIntent(
            opts.projectId, opts.sessionId, opts.queries,
            opts.languageCode))
    .command(
        `event <eventName>`,
        `Detects the intent for a client-generated event name.`, {},
        (opts) => detectEventIntent(
            opts.projectId, opts.sessionId, opts.eventName))
    .command(
        `audio <filename>`,
        `Detects the intent for audio queries in a local file.`, {},
        (opts) => detectAudioIntent(
            opts.projectId, opts.sessionId, opts.filename,
            opts.encoding, opts.sampleRateHertz, opts.languageCode))
    .command(
        `stream <filename>`,
        `Detects the intent in a local audio file by streaming it to the ` +
            `Conversation API.`,
        {},
        (opts) => streamingDetectIntent(
            opts.projectId, opts.sessionId, opts.filename,
            opts.encoding, opts.sampleRateHertz, opts.languageCode))
    .example(
        `node $0 text -q "Order a large pizza" "tuna" ` +
            `"1600 Amphitheatre Pkwy" "check"`)
    .example(`node $0 event order_pizza`)
    .example(
        `node $0 audio resources/pizza_order.wav -r 22050`)
    .example(
        `node $0 stream resources/pizza_order.wav -r 22050`)
    .wrap(120)
    .recommendCommands()
    .epilogue(
        `For more information, see https://cloud.google.com/conversation/docs`)
    .help()
    .strict();

if (module === require.main) {
  cli.parse(process.argv.slice(2));
}
