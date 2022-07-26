// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// ** This file is automatically generated by gapic-generator-typescript. **
// ** https://github.com/googleapis/gapic-generator-typescript **
// ** All changes to this file may be overwritten. **



'use strict';

function main(participant) {
  // [START dialogflow_v2beta1_generated_Participants_StreamingAnalyzeContent_async]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The name of the participant this text comes from.
   *  Format: `projects/<Project ID>/locations/<Location
   *  ID>/conversations/<Conversation ID>/participants/<Participant ID>`.
   */
  // const participant = 'abc123'
  /**
   *  Instructs the speech recognizer how to process the speech audio.
   */
  // const audioConfig = {}
  /**
   *  The natural language text to be processed.
   */
  // const textConfig = {}
  /**
   *  Speech synthesis configuration.
   *  The speech synthesis settings for a virtual agent that may be configured
   *  for the associated conversation profile are not used when calling
   *  StreamingAnalyzeContent. If this configuration is not supplied, speech
   *  synthesis is disabled.
   */
  // const replyAudioConfig = {}
  /**
   *  The input audio content to be recognized. Must be sent if `audio_config`
   *  is set in the first message. The complete audio over all streaming
   *  messages must not exceed 1 minute.
   */
  // const inputAudio = 'Buffer.from('string')'
  /**
   *  The UTF-8 encoded natural language text to be processed. Must be sent if
   *  `text_config` is set in the first message. Text length must not exceed
   *  256 bytes for virtual agent interactions. The `input_text` field can be
   *  only sent once.
   */
  // const inputText = 'abc123'
  /**
   *  The DTMF digits used to invoke intent and fill in parameter value.
   *  This input is ignored if the previous response indicated that DTMF input
   *  is not accepted.
   */
  // const inputDtmf = {}
  /**
   *  Parameters for a Dialogflow virtual-agent query.
   */
  // const queryParams = {}
  /**
   *  Parameters for a human assist query.
   */
  // const assistQueryParams = {}
  /**
   *  Additional parameters to be put into Dialogflow CX session parameters. To
   *  remove a parameter from the session, clients should explicitly set the
   *  parameter value to null.
   *  Note: this field should only be used if you are connecting to a Dialogflow
   *  CX agent.
   */
  // const cxParameters = {}
  /**
   *  The unique identifier of the CX page to override the `current_page` in the
   *  session.
   *  Format: `projects/<Project ID>/locations/<Location ID>/agents/<Agent
   *  ID>/flows/<Flow ID>/pages/<Page ID>`.
   *  If `cx_current_page` is specified, the previous state of the session will
   *  be ignored by Dialogflow CX, including the previous
   *  page QueryResult.current_page  and the previous session
   *  parameters QueryResult.parameters. In most cases, `cx_current_page` and
   *  `cx_parameters` should be configured together to direct a session to a
   *  specific state.
   *  Note: this field should only be used if you are connecting to a Dialogflow
   *  CX agent.
   */
  // const cxCurrentPage = 'abc123'
  /**
   *  Enable partial virtual agent responses. If this flag is not enabled,
   *  response stream still contains only one final response even if some
   *  `Fulfillment`s in Dialogflow virtual agent have been configured to return
   *  partial responses.
   */
  // const enablePartialAutomatedAgentReply = true

  // Imports the Dialogflow library
  const {ParticipantsClient} = require('@google-cloud/dialogflow').v2beta1;

  // Instantiates a client
  const dialogflowClient = new ParticipantsClient();

  async function callStreamingAnalyzeContent() {
    // Construct request
    const request = {
      participant,
    };

    // Run request
    const stream = await dialogflowClient.streamingAnalyzeContent();
    stream.on('data', (response) => { console.log(response) });
    stream.on('error', (err) => { throw(err) });
    stream.on('end', () => { /* API call completed */ });
    stream.write(request);
    stream.end(); 
  }

  callStreamingAnalyzeContent();
  // [END dialogflow_v2beta1_generated_Participants_StreamingAnalyzeContent_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
