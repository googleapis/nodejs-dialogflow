// Copyright 2020 Google LLC
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

import * as gax from 'google-gax';
import {
  APICallback,
  Callback,
  CallOptions,
  Descriptors,
  ClientOptions,
} from 'google-gax';
import * as path from 'path';

import * as protosTypes from '../../protos/protos';
import * as gapicConfig from './sessions_client_config.json';

const version = require('../../../package.json').version;

/**
 *  A session represents an interaction with a user. You retrieve user input
 *  and pass it to the {@link google.cloud.dialogflow.v2.Sessions.DetectIntent|DetectIntent} (or
 *  {@link google.cloud.dialogflow.v2.Sessions.StreamingDetectIntent|StreamingDetectIntent}) method to determine
 *  user intent and respond.
 * @class
 * @memberof v2
 */
export class SessionsClient {
  private _descriptors: Descriptors = {
    page: {},
    stream: {},
    longrunning: {},
    batching: {},
  };
  private _innerApiCalls: {[name: string]: Function};
  private _pathTemplates: {[name: string]: gax.PathTemplate};
  private _terminated = false;
  private _opts: ClientOptions;
  private _gaxModule: typeof gax | typeof gax.fallback;
  private _gaxGrpc: gax.GrpcClient | gax.fallback.GrpcClient;
  private _protos: {};
  private _defaults: {[method: string]: gax.CallSettings};
  auth: gax.GoogleAuth;
  sessionsStub?: Promise<{[name: string]: Function}>;

  /**
   * Construct an instance of SessionsClient.
   *
   * @param {object} [options] - The configuration object. See the subsequent
   *   parameters for more details.
   * @param {object} [options.credentials] - Credentials object.
   * @param {string} [options.credentials.client_email]
   * @param {string} [options.credentials.private_key]
   * @param {string} [options.email] - Account email address. Required when
   *     using a .pem or .p12 keyFilename.
   * @param {string} [options.keyFilename] - Full path to the a .json, .pem, or
   *     .p12 key downloaded from the Google Developers Console. If you provide
   *     a path to a JSON file, the projectId option below is not necessary.
   *     NOTE: .pem and .p12 require you to specify options.email as well.
   * @param {number} [options.port] - The port on which to connect to
   *     the remote host.
   * @param {string} [options.projectId] - The project ID from the Google
   *     Developer's Console, e.g. 'grape-spaceship-123'. We will also check
   *     the environment variable GCLOUD_PROJECT for your project ID. If your
   *     app is running in an environment which supports
   *     {@link https://developers.google.com/identity/protocols/application-default-credentials Application Default Credentials},
   *     your project ID will be detected automatically.
   * @param {string} [options.apiEndpoint] - The domain name of the
   *     API remote host.
   */

  constructor(opts?: ClientOptions) {
    // Ensure that options include the service address and port.
    const staticMembers = this.constructor as typeof SessionsClient;
    const servicePath =
      opts && opts.servicePath
        ? opts.servicePath
        : opts && opts.apiEndpoint
        ? opts.apiEndpoint
        : staticMembers.servicePath;
    const port = opts && opts.port ? opts.port : staticMembers.port;

    if (!opts) {
      opts = {servicePath, port};
    }
    opts.servicePath = opts.servicePath || servicePath;
    opts.port = opts.port || port;
    opts.clientConfig = opts.clientConfig || {};

    const isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      opts.fallback = true;
    }
    // If we are in browser, we are already using fallback because of the
    // "browser" field in package.json.
    // But if we were explicitly requested to use fallback, let's do it now.
    this._gaxModule = !isBrowser && opts.fallback ? gax.fallback : gax;

    // Create a `gaxGrpc` object, with any grpc-specific options
    // sent to the client.
    opts.scopes = (this.constructor as typeof SessionsClient).scopes;
    this._gaxGrpc = new this._gaxModule.GrpcClient(opts);

    // Save options to use in initialize() method.
    this._opts = opts;

    // Save the auth object to the client, for use by other methods.
    this.auth = this._gaxGrpc.auth as gax.GoogleAuth;

    // Determine the client header string.
    const clientHeader = [`gax/${this._gaxModule.version}`, `gapic/${version}`];
    if (typeof process !== 'undefined' && 'versions' in process) {
      clientHeader.push(`gl-node/${process.versions.node}`);
    } else {
      clientHeader.push(`gl-web/${this._gaxModule.version}`);
    }
    if (!opts.fallback) {
      clientHeader.push(`grpc/${this._gaxGrpc.grpcVersion}`);
    }
    if (opts.libName && opts.libVersion) {
      clientHeader.push(`${opts.libName}/${opts.libVersion}`);
    }
    // Load the applicable protos.
    // For Node.js, pass the path to JSON proto file.
    // For browsers, pass the JSON content.

    const nodejsProtoPath = path.join(
      __dirname,
      '..',
      '..',
      'protos',
      'protos.json'
    );
    this._protos = this._gaxGrpc.loadProto(
      opts.fallback ? require('../../protos/protos.json') : nodejsProtoPath
    );

    // This API contains "path templates"; forward-slash-separated
    // identifiers to uniquely identify resources within the API.
    // Create useful helper objects for these.
    this._pathTemplates = {
      agentPathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/agent'
      ),
      contextPathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/agent/sessions/{session}/contexts/{context}'
      ),
      entityTypePathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/agent/entityTypes/{entity_type}'
      ),
      intentPathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/agent/intents/{intent}'
      ),
      projectAgentSessionPathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/agent/sessions/{session}'
      ),
      projectLocationAgentSessionPathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/locations/{location}/agent/sessions/{session}'
      ),
      sessionEntityTypePathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/agent/sessions/{session}/entityTypes/{entity_type}'
      ),
    };

    // Some of the methods on this service provide streaming responses.
    // Provide descriptors for these.
    this._descriptors.stream = {
      streamingDetectIntent: new this._gaxModule.StreamDescriptor(
        gax.StreamType.BIDI_STREAMING
      ),
    };

    // Put together the default options sent with requests.
    this._defaults = this._gaxGrpc.constructSettings(
      'google.cloud.dialogflow.v2.Sessions',
      gapicConfig as gax.ClientConfig,
      opts.clientConfig || {},
      {'x-goog-api-client': clientHeader.join(' ')}
    );

    // Set up a dictionary of "inner API calls"; the core implementation
    // of calling the API is handled in `google-gax`, with this code
    // merely providing the destination and request information.
    this._innerApiCalls = {};
  }

  /**
   * Initialize the client.
   * Performs asynchronous operations (such as authentication) and prepares the client.
   * This function will be called automatically when any class method is called for the
   * first time, but if you need to initialize it before calling an actual method,
   * feel free to call initialize() directly.
   *
   * You can await on this method if you want to make sure the client is initialized.
   *
   * @returns {Promise} A promise that resolves to an authenticated service stub.
   */
  initialize() {
    // If the client stub promise is already initialized, return immediately.
    if (this.sessionsStub) {
      return this.sessionsStub;
    }

    // Put together the "service stub" for
    // google.cloud.dialogflow.v2.Sessions.
    this.sessionsStub = this._gaxGrpc.createStub(
      this._opts.fallback
        ? (this._protos as protobuf.Root).lookupService(
            'google.cloud.dialogflow.v2.Sessions'
          )
        : // tslint:disable-next-line no-any
          (this._protos as any).google.cloud.dialogflow.v2.Sessions,
      this._opts
    ) as Promise<{[method: string]: Function}>;

    // Iterate over each of the methods that the service provides
    // and create an API call method for each.
    const sessionsStubMethods = ['detectIntent', 'streamingDetectIntent'];

    for (const methodName of sessionsStubMethods) {
      const innerCallPromise = this.sessionsStub.then(
        stub => (...args: Array<{}>) => {
          if (this._terminated) {
            return Promise.reject('The client has already been closed.');
          }
          return stub[methodName].apply(stub, args);
        },
        (err: Error | null | undefined) => () => {
          throw err;
        }
      );

      const apiCall = this._gaxModule.createApiCall(
        innerCallPromise,
        this._defaults[methodName],
        this._descriptors.page[methodName] ||
          this._descriptors.stream[methodName] ||
          this._descriptors.longrunning[methodName]
      );

      this._innerApiCalls[methodName] = (
        argument: {},
        callOptions?: CallOptions,
        callback?: APICallback
      ) => {
        return apiCall(argument, callOptions, callback);
      };
    }

    return this.sessionsStub;
  }

  /**
   * The DNS address for this API service.
   */
  static get servicePath() {
    return 'dialogflow.googleapis.com';
  }

  /**
   * The DNS address for this API service - same as servicePath(),
   * exists for compatibility reasons.
   */
  static get apiEndpoint() {
    return 'dialogflow.googleapis.com';
  }

  /**
   * The port for this API service.
   */
  static get port() {
    return 443;
  }

  /**
   * The scopes needed to make gRPC calls for every method defined
   * in this service.
   */
  static get scopes() {
    return [
      'https://www.googleapis.com/auth/cloud-platform',
      'https://www.googleapis.com/auth/dialogflow',
    ];
  }

  getProjectId(): Promise<string>;
  getProjectId(callback: Callback<string, undefined, undefined>): void;
  /**
   * Return the project ID used by this class.
   * @param {function(Error, string)} callback - the callback to
   *   be called with the current project Id.
   */
  getProjectId(
    callback?: Callback<string, undefined, undefined>
  ): Promise<string> | void {
    if (callback) {
      this.auth.getProjectId(callback);
      return;
    }
    return this.auth.getProjectId();
  }

  // -------------------
  // -- Service calls --
  // -------------------
  detectIntent(
    request: protosTypes.google.cloud.dialogflow.v2.IDetectIntentRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      protosTypes.google.cloud.dialogflow.v2.IDetectIntentResponse,
      protosTypes.google.cloud.dialogflow.v2.IDetectIntentRequest | undefined,
      {} | undefined
    ]
  >;
  detectIntent(
    request: protosTypes.google.cloud.dialogflow.v2.IDetectIntentRequest,
    options: gax.CallOptions,
    callback: Callback<
      protosTypes.google.cloud.dialogflow.v2.IDetectIntentResponse,
      protosTypes.google.cloud.dialogflow.v2.IDetectIntentRequest | undefined,
      {} | undefined
    >
  ): void;
  /**
   * Processes a natural language query and returns structured, actionable data
   * as a result. This method is not idempotent, because it may cause contexts
   * and session entity types to be updated, which in turn might affect
   * results of future queries.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.session
   *   Required. The name of the session this query is sent to. Format:
   *   `projects/<Project ID>/agent/sessions/<Session ID>`, or
   *   `projects/<Project ID>/agent/environments/<Environment ID>/users/<User
   *   ID>/sessions/<Session ID>`. If `Environment ID` is not specified, we assume
   *   default 'draft' environment. If `User ID` is not specified, we are using
   *   "-". It's up to the API caller to choose an appropriate `Session ID` and
   *   `User Id`. They can be a random number or some type of user and session
   *   identifiers (preferably hashed). The length of the `Session ID` and
   *   `User ID` must not exceed 36 characters.
   * @param {google.cloud.dialogflow.v2.QueryParameters} request.queryParams
   *   The parameters of this query.
   * @param {google.cloud.dialogflow.v2.QueryInput} request.queryInput
   *   Required. The input specification. It can be set to:
   *
   *   1.  an audio config
   *       which instructs the speech recognizer how to process the speech audio,
   *
   *   2.  a conversational query in the form of text, or
   *
   *   3.  an event that specifies which intent to trigger.
   * @param {google.cloud.dialogflow.v2.OutputAudioConfig} request.outputAudioConfig
   *   Instructs the speech synthesizer how to generate the output
   *   audio. If this field is not set and agent-level speech synthesizer is not
   *   configured, no output audio is generated.
   * @param {google.protobuf.FieldMask} request.outputAudioConfigMask
   *   Mask for {@link google.cloud.dialogflow.v2.DetectIntentRequest.output_audio_config|output_audio_config} indicating which settings in this
   *   request-level config should override speech synthesizer settings defined at
   *   agent-level.
   *
   *   If unspecified or empty, {@link google.cloud.dialogflow.v2.DetectIntentRequest.output_audio_config|output_audio_config} replaces the agent-level
   *   config in its entirety.
   * @param {Buffer} request.inputAudio
   *   The natural language speech audio to be processed. This field
   *   should be populated iff `query_input` is set to an input audio config.
   *   A single request can contain up to 1 minute of speech audio data.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [DetectIntentResponse]{@link google.cloud.dialogflow.v2.DetectIntentResponse}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  detectIntent(
    request: protosTypes.google.cloud.dialogflow.v2.IDetectIntentRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          protosTypes.google.cloud.dialogflow.v2.IDetectIntentResponse,
          | protosTypes.google.cloud.dialogflow.v2.IDetectIntentRequest
          | undefined,
          {} | undefined
        >,
    callback?: Callback<
      protosTypes.google.cloud.dialogflow.v2.IDetectIntentResponse,
      protosTypes.google.cloud.dialogflow.v2.IDetectIntentRequest | undefined,
      {} | undefined
    >
  ): Promise<
    [
      protosTypes.google.cloud.dialogflow.v2.IDetectIntentResponse,
      protosTypes.google.cloud.dialogflow.v2.IDetectIntentRequest | undefined,
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      session: request.session || '',
    });
    this.initialize();
    return this._innerApiCalls.detectIntent(request, options, callback);
  }

  /**
   * Processes a natural language query in audio format in a streaming fashion
   * and returns structured, actionable data as a result. This method is only
   * available via the gRPC API (not REST).
   *
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Stream}
   *   An object stream which is both readable and writable. It accepts objects
   *   representing [StreamingDetectIntentRequest]{@link google.cloud.dialogflow.v2.StreamingDetectIntentRequest} for write() method, and
   *   will emit objects representing [StreamingDetectIntentResponse]{@link google.cloud.dialogflow.v2.StreamingDetectIntentResponse} on 'data' event asynchronously.
   */
  streamingDetectIntent(options?: gax.CallOptions): gax.CancellableStream {
    this.initialize();
    return this._innerApiCalls.streamingDetectIntent(options);
  }

  // --------------------
  // -- Path templates --
  // --------------------

  /**
   * Return a fully-qualified agent resource name string.
   *
   * @param {string} project
   * @returns {string} Resource name string.
   */
  agentPath(project: string) {
    return this._pathTemplates.agentPathTemplate.render({
      project,
    });
  }

  /**
   * Parse the project from Agent resource.
   *
   * @param {string} agentName
   *   A fully-qualified path representing Agent resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromAgentName(agentName: string) {
    return this._pathTemplates.agentPathTemplate.match(agentName).project;
  }

  /**
   * Return a fully-qualified context resource name string.
   *
   * @param {string} project
   * @param {string} session
   * @param {string} context
   * @returns {string} Resource name string.
   */
  contextPath(project: string, session: string, context: string) {
    return this._pathTemplates.contextPathTemplate.render({
      project,
      session,
      context,
    });
  }

  /**
   * Parse the project from Context resource.
   *
   * @param {string} contextName
   *   A fully-qualified path representing Context resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromContextName(contextName: string) {
    return this._pathTemplates.contextPathTemplate.match(contextName).project;
  }

  /**
   * Parse the session from Context resource.
   *
   * @param {string} contextName
   *   A fully-qualified path representing Context resource.
   * @returns {string} A string representing the session.
   */
  matchSessionFromContextName(contextName: string) {
    return this._pathTemplates.contextPathTemplate.match(contextName).session;
  }

  /**
   * Parse the context from Context resource.
   *
   * @param {string} contextName
   *   A fully-qualified path representing Context resource.
   * @returns {string} A string representing the context.
   */
  matchContextFromContextName(contextName: string) {
    return this._pathTemplates.contextPathTemplate.match(contextName).context;
  }

  /**
   * Return a fully-qualified entityType resource name string.
   *
   * @param {string} project
   * @param {string} entity_type
   * @returns {string} Resource name string.
   */
  entityTypePath(project: string, entityType: string) {
    return this._pathTemplates.entityTypePathTemplate.render({
      project,
      entity_type: entityType,
    });
  }

  /**
   * Parse the project from EntityType resource.
   *
   * @param {string} entityTypeName
   *   A fully-qualified path representing EntityType resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromEntityTypeName(entityTypeName: string) {
    return this._pathTemplates.entityTypePathTemplate.match(entityTypeName)
      .project;
  }

  /**
   * Parse the entity_type from EntityType resource.
   *
   * @param {string} entityTypeName
   *   A fully-qualified path representing EntityType resource.
   * @returns {string} A string representing the entity_type.
   */
  matchEntityTypeFromEntityTypeName(entityTypeName: string) {
    return this._pathTemplates.entityTypePathTemplate.match(entityTypeName)
      .entity_type;
  }

  /**
   * Return a fully-qualified intent resource name string.
   *
   * @param {string} project
   * @param {string} intent
   * @returns {string} Resource name string.
   */
  intentPath(project: string, intent: string) {
    return this._pathTemplates.intentPathTemplate.render({
      project,
      intent,
    });
  }

  /**
   * Parse the project from Intent resource.
   *
   * @param {string} intentName
   *   A fully-qualified path representing Intent resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromIntentName(intentName: string) {
    return this._pathTemplates.intentPathTemplate.match(intentName).project;
  }

  /**
   * Parse the intent from Intent resource.
   *
   * @param {string} intentName
   *   A fully-qualified path representing Intent resource.
   * @returns {string} A string representing the intent.
   */
  matchIntentFromIntentName(intentName: string) {
    return this._pathTemplates.intentPathTemplate.match(intentName).intent;
  }

  /**
   * Return a fully-qualified projectAgentSession resource name string.
   *
   * @param {string} project
   * @param {string} session
   * @returns {string} Resource name string.
   */
  projectAgentSessionPath(project: string, session: string) {
    return this._pathTemplates.projectAgentSessionPathTemplate.render({
      project,
      session,
    });
  }

  /**
   * Parse the project from ProjectAgentSession resource.
   *
   * @param {string} projectAgentSessionName
   *   A fully-qualified path representing project_agent_session resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromProjectAgentSessionName(projectAgentSessionName: string) {
    return this._pathTemplates.projectAgentSessionPathTemplate.match(
      projectAgentSessionName
    ).project;
  }

  /**
   * Parse the session from ProjectAgentSession resource.
   *
   * @param {string} projectAgentSessionName
   *   A fully-qualified path representing project_agent_session resource.
   * @returns {string} A string representing the session.
   */
  matchSessionFromProjectAgentSessionName(projectAgentSessionName: string) {
    return this._pathTemplates.projectAgentSessionPathTemplate.match(
      projectAgentSessionName
    ).session;
  }

  /**
   * Return a fully-qualified projectLocationAgentSession resource name string.
   *
   * @param {string} project
   * @param {string} location
   * @param {string} session
   * @returns {string} Resource name string.
   */
  projectLocationAgentSessionPath(
    project: string,
    location: string,
    session: string
  ) {
    return this._pathTemplates.projectLocationAgentSessionPathTemplate.render({
      project,
      location,
      session,
    });
  }

  /**
   * Parse the project from ProjectLocationAgentSession resource.
   *
   * @param {string} projectLocationAgentSessionName
   *   A fully-qualified path representing project_location_agent_session resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromProjectLocationAgentSessionName(
    projectLocationAgentSessionName: string
  ) {
    return this._pathTemplates.projectLocationAgentSessionPathTemplate.match(
      projectLocationAgentSessionName
    ).project;
  }

  /**
   * Parse the location from ProjectLocationAgentSession resource.
   *
   * @param {string} projectLocationAgentSessionName
   *   A fully-qualified path representing project_location_agent_session resource.
   * @returns {string} A string representing the location.
   */
  matchLocationFromProjectLocationAgentSessionName(
    projectLocationAgentSessionName: string
  ) {
    return this._pathTemplates.projectLocationAgentSessionPathTemplate.match(
      projectLocationAgentSessionName
    ).location;
  }

  /**
   * Parse the session from ProjectLocationAgentSession resource.
   *
   * @param {string} projectLocationAgentSessionName
   *   A fully-qualified path representing project_location_agent_session resource.
   * @returns {string} A string representing the session.
   */
  matchSessionFromProjectLocationAgentSessionName(
    projectLocationAgentSessionName: string
  ) {
    return this._pathTemplates.projectLocationAgentSessionPathTemplate.match(
      projectLocationAgentSessionName
    ).session;
  }

  /**
   * Return a fully-qualified sessionEntityType resource name string.
   *
   * @param {string} project
   * @param {string} session
   * @param {string} entity_type
   * @returns {string} Resource name string.
   */
  sessionEntityTypePath(project: string, session: string, entityType: string) {
    return this._pathTemplates.sessionEntityTypePathTemplate.render({
      project,
      session,
      entity_type: entityType,
    });
  }

  /**
   * Parse the project from SessionEntityType resource.
   *
   * @param {string} sessionEntityTypeName
   *   A fully-qualified path representing SessionEntityType resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromSessionEntityTypeName(sessionEntityTypeName: string) {
    return this._pathTemplates.sessionEntityTypePathTemplate.match(
      sessionEntityTypeName
    ).project;
  }

  /**
   * Parse the session from SessionEntityType resource.
   *
   * @param {string} sessionEntityTypeName
   *   A fully-qualified path representing SessionEntityType resource.
   * @returns {string} A string representing the session.
   */
  matchSessionFromSessionEntityTypeName(sessionEntityTypeName: string) {
    return this._pathTemplates.sessionEntityTypePathTemplate.match(
      sessionEntityTypeName
    ).session;
  }

  /**
   * Parse the entity_type from SessionEntityType resource.
   *
   * @param {string} sessionEntityTypeName
   *   A fully-qualified path representing SessionEntityType resource.
   * @returns {string} A string representing the entity_type.
   */
  matchEntityTypeFromSessionEntityTypeName(sessionEntityTypeName: string) {
    return this._pathTemplates.sessionEntityTypePathTemplate.match(
      sessionEntityTypeName
    ).entity_type;
  }

  /**
   * Terminate the GRPC channel and close the client.
   *
   * The client will no longer be usable and all future behavior is undefined.
   */
  close(): Promise<void> {
    this.initialize();
    if (!this._terminated) {
      return this.sessionsStub!.then(stub => {
        this._terminated = true;
        stub.close();
      });
    }
    return Promise.resolve();
  }
}
