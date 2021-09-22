// Copyright 2021 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


'use strict';

function main(parent) {
  // [START dialogflow_list_knowledge_bases_sample]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The project to list of knowledge bases for.
   *  Format: `projects/<Project ID>/locations/<Location ID>`.
   */
  // const parent = 'abc123'
  /**
   *  The maximum number of items to return in a single page. By
   *  default 10 and at most 100.
   */
  // const pageSize = 1234
  /**
   *  The next_page_token value returned from a previous list request.
   */
  // const pageToken = 'abc123'
  /**
   *  The filter expression used to filter knowledge bases returned by the list
   *  method. The expression has the following syntax:
   *    <field> <operator> <value> [AND <field> <operator> <value>] ...
   *  The following fields and operators are supported:
   *  * display_name with has(:) operator
   *  * language_code with equals(=) operator
   *  Examples:
   *  * 'language_code=en-us' matches knowledge bases with en-us language code.
   *  * 'display_name:articles' matches knowledge bases whose display name
   *    contains "articles".
   *  * 'display_name:"Best Articles"' matches knowledge bases whose display
   *    name contains "Best Articles".
   *  * 'language_code=en-gb AND display_name=articles' matches all knowledge
   *    bases whose display name contains "articles" and whose language code is
   *    "en-gb".
   *  Note: An empty filter string (i.e. "") is a no-op and will result in no
   *  filtering.
   *  For more information about filtering, see
   *  [API Filtering](https://aip.dev/160).
   */
  // const filter = 'abc123'

  // Imports the Dialogflow library
  const {KnowledgeBasesClient} = require('@google-cloud/dialogflow').v2beta1;

  // Instantiates a client
  const dialogflowClient = new KnowledgeBasesClient();

  async function listKnowledgeBases() {
    // Construct request
    const request = {
      parent,
    };

    // Run request
    const iterable = await dialogflowClient.listKnowledgeBasesAsync(request);
    for await (const response of iterable) {
        console.log(response);
    }
  }

  listKnowledgeBases();
  // [END dialogflow_list_knowledge_bases_sample]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
