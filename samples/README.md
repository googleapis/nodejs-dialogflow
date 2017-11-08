<img src="https://avatars2.githubusercontent.com/u/2810941?v=3&s=96" alt="Google Cloud Platform logo" title="Google Cloud Platform" align="right" height="96" width="96"/>

# Google Dialogflow API Node.js Samples

[Dialogflow](https://dialogflow.com/docs/) is
an enterprise-grade NLU platform that makes it easy for developers to design and
integrate conversational user interfaces into mobile apps, web applications,
devices, and bots.

This sample sets up an agent to handle pizza delivery conversations and shows
how to query the intents.

## Table of Contents

*   [Prerequisite](#prerequisite)
*   [Using the samples](#using-the-samples)
*   [Samples](#samples)
    *   [Sample agent](#sample-agent)
    *   [Detecting intents](#detecting-intents)
    *   [Resources](#resources)
*   [Running the tests](#running-the-tests)

## Prerequisite

1.  Install [Node.js v4.5.0 or greater][node]

1.  Change directory to the samples folder:

        cd samples

1.  Create a new Google Cloud project.

1.  Enable Dialogflow API for your Google Cloud project by doing
    the following:

    *   Go to API Manager > Library.
    *   Search for "Dialogflow API".
    *   Click the API in the search results, then click "ENABLE" button.

1.  Create an dialogflow.com agent and associate it with the Google Cloud project with
    Dialogflow API enabled:

    *   Go to https://dialogflow.com. Log in or sign up
    *   Create an agent
    *   On the [create agent UI][create_agent], set Google project to the Google
        Cloud project with Dialogflow API enabled.

    You can also run sample commands with existing agents. We recommend using a
    new agent because some commands will alter or delete the data of the agent.

1.  Set the `GCLOUD_PROJECT` environment variable to the Google Project ID
    associated with the agent:

    Linux:

        export GCLOUD_PROJECT=your-project-id

    Windows:

        set GCLOUD_PROJECT=your-project-id

    Windows (PowerShell):

        $env:GCLOUD_PROJECT="your-project-id"

1.  Obtain service account authentication credentials.

    Dialogflow v2 requires using service accounts for
    authentication. Follow the instructions below to create a service account
    and use it for authentication:

    *   Go to API Manager -> Credentials
    *   Click "Create Credentials", and create a service account or [click
        here](https://console.cloud.google.com/project/_/apiui/credential/serviceaccount)
    *   Choose "Service Account key" in the pull down menu
    *   In the Service Account pulldown, choose "New service account"
    *   Choose name for "service account name" e.g., "cce-test-account"
    *   Choose role "Project > Owner" for service account
    *   Mark "JSON" as the key type
    *   Click "Create"
    *   Download the JSON for this service account, and set the
        `GOOGLE_APPLICATION_CREDENTIALS` environment variable to point to the
        file containing the JSON credentials.

    Set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable:

    Linux:

        export GOOGLE_APPLICATION_CREDENTIALS=/path/to/service_account_file.json

    Windows:

        set GOOGLE_APPLICATION_CREDENTIALS=/path/to/service_account_file.json

    Windows (PowerShell):

        $env:GOOGLE_APPLICATION_CREDENTIALS="/path/to/service_account_file.json"

    __Note for code running on GCE, GAE, or other environments:__

    On Google App Engine, the credentials should be found automatically.

    On Google Compute Engine, the credentials should be found automatically, but
    require that you create the instance with the correct scopes.

        gcloud compute instances create --scopes="https://www.googleapis.com/auth/cloud-platform,https://www.googleapis.com/auth/compute,https://www.googleapis.com/auth/compute.readonly" test-instance

    If you did not create the instance with the right scopes, you can still
    upload a JSON service account and set `GOOGLE_APPLICATION_CREDENTIALS` as
    described.

    Read more about [Google Cloud Platform Authentication][gcp_auth].

1.  Install dependencies:

    With **npm**:

        npm install

    With **yarn**:

        yarn install

[node]: https://nodejs.org/
[auth_command]: https://cloud.google.com/sdk/gcloud/reference/beta/auth/application-default/login
[create_agent]: https://dialogflow.com/docs/agents#creating
[gcp_auth]: https://cloud.google.com/docs/authentication#projects_and_resources

## Using the samples

1.  Setup the sample
        
        cd samples
        npm install

1.  Setup the agent with sample intents and entity types:

        node resource.js setup-agent

1.  Detect intents with text queries:

        node detect.js text -q "Order a large pizza" "tuna" "1600 Amphitheatre Pkwy, Mountain View" "check"

    You should see intents for ordering a large pizza with tuna topping sent to
    1600 Amphitheatre Pkwy, Mountain View.

1.  Detect intent with event:

        node detect.js event order_pizza

    You should see an intent asking about the size of the pizza.

1.  Detect intent with audio:

        node detect.js audio resources/book_a_room.wav -r 16000
        node detect.js stream resources/book_a_room.wav -r 16000

    You should see intent for ordering a medium pizza with mushroom topping sent
    to 5 2nd Street New York New York.

1.  Setup per-session contexts and session entity types:

    *   Linux:

            SESSION_ID=your-session-id
            node resource.js setup-session $SESSION_ID

    *   Windows:

            set SESSION_ID=your-session-id
            node resource.js setup-session %SESSION_ID%

    *   Windows (PowerShell):

            $SESSION_ID="your-session-id"
            node resource.js setup-session $SESSION_ID

    Detect intent for changing delivery address without ordering pizza:

    *   Linux:

            node detect.js text -s $SESSION_ID -q "Change address to 1 1st St, New York, NY"

    *   Windows:

            node detect.js text -s %SESSION_ID% -q "Change address to 1 1st St, New York, NY"

    *   Windows (PowerShell):

            node detect.js text -s $SESSION_ID -q "Change address to 1 1st St, New York, NY"

    You should see that the delivery address is changed to 1 1st St, New York,
    NY, with size and topping populated. Without calling `setup-session` no
    intent will be detected.

    Detect intent for ordering pizza with tall size:

    *   Linux:

            node detect.js text -s $SESSION_ID -q "Order a tall pizza"

    *   Windows:

            node detect.js text -s %SESSION_ID% -q "Order a tall pizza"

    *   Windows (PowerShell):

            node detect.js text -s $SESSION_ID -q "Order a tall pizza"

    You should see the size parameter of the detected intent to be "tall".
    Without calling `setup-session` the size parameter will be not populated.

1.  Other commands:

    The following commands can follow `node resource.js`:

    *   Show existing resources: `show-agent`, `show-session <sessionId>`.
    *   Update resources: `update-intent`, `update-entity-type`, `update-context
        <sessionId>`, `update-session-entity-type <sessionId>`.
    *   Remove resources: `clear-agent`, `clear-session <sessionId>`.

## Samples

### Sample agent

The [Sample Agent](./SampleAgent.zip) zip file shows how to configure an agent
for a room booking service.

To use the sample agent, go to the [Export and Import][export_and_import] tab of
the agent settings page. Click "Restore from zip" and upload the zip file.

It's recommended to try the examples of the [Detecting
intents](#detecting-intents) samples with this sample agent.

[export_and_import]: https://dialogflow.com/docs/agents#export

### Detecting intents

__Usage:__ `node detect.js --help`

```
Commands:
  text               Detects the intent for text queries.
  event <eventName>  Detects the intent for a client-generated event name.
  audio <filename>   Detects the intent for audio queries in a local file.
  stream <filename>  Detects the intent in a local audio file by streaming it to the Conversation API.

Options:
  --projectId, -p     The Project ID to use. Defaults to the value of the GCLOUD_PROJECT or GOOGLE_CLOUD_PROJECT
                      environment variables.                                                                    [string]
  --sessionId, -s     The identifier of the detect session. Defaults to a random UUID.
                                                              [string] [default: "989694f0-64d0-11e7-ac7a-f9a566980508"]
  --languageCode, -l  The language code of the query. Defaults to "en-US".                   [string] [default: "en-US"]
  --encoding, -e      The encoding of the input audio.
               [choices: "AUDIO_ENCODING_LINEAR16", "AUDIO_ENCODING_FLAC", "AUDIO_ENCODING_MULAW", "AUDIO_ENCODING_AMR",
                  "AUDIO_ENCODING_AMR_WB", "AUDIO_ENCODING_OGG_OPUS", "AUDIO_ENCODING_SPEEX_WITH_HEADER_BYTE"] [default:
                                                                                              "AUDIO_ENCODING_LINEAR16"]
  --sampleRateHertz, -r  The sample rate in Hz of the input audio. Only required if the input audio is in raw format.
                                                                                                                [number]
  --help              Show help                                                                                [boolean]

Examples:
  node detect.js text -q "Order a large pizza" "tuna" "1600 Amphitheatre Pkwy" "check"
  node detect.js event order_pizza
  node detect.js audio resources/pizza_order.wav -r 22050
  node detect.js stream resources/pizza_order.wav -r 22050

For more information, see https://cloud.google.com/conversation/docs
```

### Resources

__Usage:__ `node resource.js --help`

```
Commands:
  setup-agent                                              Create entity types and intent for ordering pizzas.
  clear-agent                                              Delete all intents and entity types from an agent.
  show-agent                                               Show all intents and entity types from an agent.
  update-entity-type <entityTypeId>                        Update an entity type.
  update-intent <intentId>                                 Update an intent.
  setup-session <sessionId>                                Create contexts and session entity types for a session. It
                                                           assumes the agents is set up by setup-agent command.
  show-session <sessionId>                                 Show all contexts and session entity types in a session.
  clear-session <sessionId>                                Delete all contexts and session entity types.
  update-context <sessionId> <contextId>                   Update a context.
  update-session-entity-type <sessionId> <entityTypeName>  Update a session entity type.

Options:
  --projectId, -p  The Project ID to use. Defaults to the value of the GCLOUD_PROJECT or GOOGLE_CLOUD_PROJECT
                   environment variables.                                                                       [string]
  --help           Show help                                                                                   [boolean]

Examples:
  node resource.js setup-agent
  node resource.js show-agent
  node resource.js clear-agent
  node resource.js update-entity-type "my-entity-type-id"
  node resource.js update-intent "my-intent-id"
  node resource.js setup-session "my-session-id"
  node resource.js show-session "my-session-id"
  node resource.js clear-session "my-session-id"
  node resource.js update-context "my-session-id" "my-context-id"
  node resource.js update-session-entity-type "my-session-id" "my-entity-type-name"

For more information, see https://cloud.google.com/conversation/docs
```

## Running the tests

1.  Set the **GCLOUD_PROJECT** and **GOOGLE_APPLICATION_CREDENTIALS**
    environment variables.

1.  Run the tests:

    With **npm**:

        npm test

    With **yarn**:

        yarn test
