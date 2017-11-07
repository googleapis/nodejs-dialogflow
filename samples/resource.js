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

const grpc = require('grpc');
const structjson = require('./structjson.js');

// /////////////////////////////////////////////////////////////////////////////
// Operations for entity types.
// /////////////////////////////////////////////////////////////////////////////

function createEntityTypes(projectId) {
  // Imports the Google Cloud client library.
  const Conversation = require('@google-cloud/conversation');

  // Instantiates a client.
  const conversationClient = Conversation.v1alpha();

  // Agent ID must be set to project ID for v1alpha.
  const agentId = projectId;
  // The path to the agent the created entity type belongs to.
  const agentPath = conversationClient.agentPath(projectId, agentId);

  const promises = [];

  // Create an entity type named "size", with possible values of small, medium
  // and large and some synonyms.
  const sizeRequest = {
    parent: agentPath,
    entityType: {
      displayName: 'size',
      kind: 'KIND_MAP',
      autoExpansionMode: 'AUTO_EXPANSION_MODE_UNSPECIFIED',
      entities: [
        {value: 'small', synonyms: ['small', 'petit']},
        {value: 'medium', synonyms: ['medium']},
        {value: 'large', synonyms: ['large', 'big']},
      ],
    },
  };
  promises.push(
    conversationClient
      .createEntityType(sizeRequest)
      .then(responses => {
        console.log('Created size entity type:');
        logEntityType(conversationClient, responses[0]);
      })
      .catch(err => {
        console.error('Failed to create size entity type:', err);
      })
  );

  // Create an entity of type named "topping", with possible values without
  // synonyms.
  const toppingRequest = {
    parent: agentPath,
    entityType: {
      displayName: 'topping',
      kind: 'KIND_LIST',
      autoExpansionMode: 'AUTO_EXPANSION_MODE_UNSPECIFIED',
      entities: [
        {value: 'tomato', synonyms: ['tomato']},
        {value: 'tuna', synonyms: ['tuna']},
        {value: 'cheddar', synonyms: ['cheddar']},
        {value: 'mushrooms', synonyms: ['mushrooms']},
      ],
    },
  };
  promises.push(
    conversationClient
      .createEntityType(toppingRequest)
      .then(responses => {
        console.log('Created topping entity type:');
        logEntityType(conversationClient, responses[0]);
      })
      .catch(err => {
        console.error('Failed to create topping entity type:', err);
      })
  );

  return Promise.all(promises);
}

function listEntityTypes(conversationClient, projectId) {
  // Agent ID must be set to project ID for v1alpha.
  const agentId = projectId;
  // The path to the agent the entity types belong to.
  const agentPath = conversationClient.agentPath(projectId, agentId);

  // The request.
  const request = {
    parent: agentPath,
  };

  // Call the client library to retrieve a list of all existing entity types.
  return conversationClient
    .listEntityTypes(request)
    .then(responses => {
      return responses[0].entityTypes;
    })
    .catch(err => {
      console.error('Failed to list entity types:', err);
    });
}

function clearEntityTypes(projectId) {
  // Imports the Google Cloud client library.
  const Conversation = require('@google-cloud/conversation');

  // Instantiates a client.
  const conversationClient = Conversation.v1alpha();

  // List all entity types then delete all of them.
  return listEntityTypes(conversationClient, projectId).then(entityTypes => {
    return Promise.all(
      entityTypes.map(entityType => {
        return deleteEntityType(conversationClient, entityType);
      })
    );
  });
}

function deleteEntityType(conversationClient, entityType) {
  // The request.
  const request = {
    name: entityType.name,
  };
  // Call the client library to delete the entity type.
  return conversationClient
    .deleteEntityType(request)
    .then(responses => {
      console.log(`Entity type ${entityType.displayName} deleted`);
    })
    .catch(err => {
      console.error(
        `Failed to delete entity type ${entityType.displayName}:`,
        err
      );
    });
}

function showEntityTypes(projectId) {
  // Imports the Google Cloud client library.
  const Conversation = require('@google-cloud/conversation');

  // Instantiates a client.
  const conversationClient = Conversation.v1alpha();

  // List all entity types then delete all of them.
  return listEntityTypes(conversationClient, projectId).then(entityTypes => {
    return Promise.all(
      entityTypes.map(entityType => {
        return getEntityType(conversationClient, entityType);
      })
    );
  });
}

function getEntityType(conversationClient, entityType) {
  // The request.
  const request = {name: entityType.name};

  // Call the client library to retrieve an entity type.
  return conversationClient
    .getEntityType(request)
    .then(responses => {
      console.log('Found entity type:');
      logEntityType(conversationClient, responses[0]);
    })
    .catch(err => {
      console.error(`Failed to get entity type ${entityType.displayName}`, err);
    });
}

function updateEntityType(projectId, entityTypeId) {
  // Imports the Google Cloud client library.
  const Conversation = require('@google-cloud/conversation');

  // Instantiates a client.
  const conversationClient = Conversation.v1alpha();

  // Agent ID must be set to project ID for v1alpha.
  const agentId = projectId;
  // The path to the entity type to be updated.
  const entityTypePath = conversationClient.entityTypePath(
    projectId,
    agentId,
    entityTypeId
  );

  // UpdateEntityType does full snapshot update. For incremental update
  // fetch the entity type first then modify it.
  const getEntityTypeRequest = {
    name: entityTypePath,
  };

  conversationClient
    .getEntityType(getEntityTypeRequest)
    .then(responses => {
      const entityType = responses[0];
      // Add a new entity foo to the entity type.
      entityType.entities.push({value: 'foo', synonyms: 'foo'});
      const request = {
        entityType: entityType,
      };

      return conversationClient.updateEntityType(request);
    })
    .then(responses => {
      console.log('Updated entity type:');
      logEntityType(conversationClient, responses[0]);
    })
    .catch(err => {
      console.error('Failed to update entity type', err);
    });
}

function logEntityType(conversationClient, entityType) {
  console.log(
    '  ID:',
    conversationClient.matchEntityTypeFromEntityTypeName(entityType.name)
  );
  console.log('  Display Name:', entityType.displayName);
  console.log(
    '  Auto expansion:',
    entityType.autoExpansionMode === 'AUTO_EXPANSION_MODE_DEFAULT'
  );
  if (!entityType.entities) {
    console.log('  No entity defined.');
  } else {
    console.log('  Entities: ');
    entityType.entities.forEach(entity => {
      if (entityType.kind === 'KIND_MAP') {
        console.log(`    ${entity.value}: ${entity.synonyms.join(', ')}`);
      } else {
        console.log(`    ${entity.value}`);
      }
    });
  }
  console.log('');
}

// /////////////////////////////////////////////////////////////////////////////
// Operations for intents
// /////////////////////////////////////////////////////////////////////////////

function createIntents(projectId) {
  // Imports the Google Cloud client library
  const Conversation = require('@google-cloud/conversation');

  // Instantiates a client
  const conversationClient = Conversation.v1alpha();

  // Agent ID must be set to project ID for v1alpha.
  const agentId = projectId;
  // The path to identify the agent that owns the created intent.
  const agentPath = conversationClient.agentPath(projectId, agentId);

  // Setup intents for ordering a pizza.

  // First of all, let's create an intent that triggers pizza order flow.

  // Output contexts for ordering pizza. They are used for matching follow-up
  // intents. For pizza ordering intents, a "pizza" output context is used for
  // hinting the conversation is about pizza ordering, not beer or something
  // else. For the first intent, it returns responses asking users to provide
  // size information, with a "size" output context for matching the intent
  // asking for the size of the pizza.

  // Note that session ID is unknown here, using asterisk.
  const pizzaOutputContexts = [
    {
      name: conversationClient.contextPath(
        projectId,
        agentId,
        '*' /* sessionId */,
        'pizza_order'
      ),
      lifespanCount: 5,
    },
  ];

  // The result of the matched intent.
  const pizzaResult = {
    action: 'pizza',
    parameters: [
      {
        displayName: 'size',
        value: '$size',
        entityTypeDisplayName: '@size',
        mandatory: true,
        prompts: [
          'What size pizza would you like to order?',
          'Would you like a large, medium, or small pizza?',
        ],
      },
      {
        displayName: 'topping',
        value: '$topping',
        entityTypeDisplayName: '@topping',
        mandatory: true,
        prompts: ['What toppings would you like?'],
        isList: true,
      },
      {
        displayName: 'address',
        value: '$address',
        // The API provides a built-in entity type @sys.address for addresses.
        entityTypeDisplayName: '@sys.location',
        mandatory: true,
        prompts: ['What is the delivery address?'],
      },
    ],
    messages: [
      {
        text: {
          text: [
            'No problem. Getting a $size pizza with $topping and delivering ' +
              'to $address.',
          ],
        },
      },
      {
        text: {
          text: [
            'Reply "check" to place your order. Reply "cancel" to cancel ' +
              'your order. You can change your delivery address as well.',
          ],
        },
      },
      {
        quickReplies: {
          title:
            'No problem. Getting a $size pizza with $topping and ' +
            'delivering to $address.',
          quickReplies: ['Place order', 'Cancel'],
        },
        platform: 'PLATFORM_FACEBOOK',
      },
    ],
    outputContexts: pizzaOutputContexts,
  };

  // The phrases for training the linguistic model.
  const pizzaPhrases = [
    {type: 'TYPE_EXAMPLE', parts: [{text: 'Order pizza'}]},
    {type: 'TYPE_EXAMPLE', parts: [{text: 'Pizza'}]},
    {
      type: 'TYPE_EXAMPLE',
      parts: [
        {text: 'Get me a '},
        {text: 'large', entityType: '@size', alias: 'size'},
        {text: ' '},
        {text: 'mushrooms', entityType: '@topping', alias: 'topping'},
        {text: ' for '},
        {
          text: '1 1st st, New York, NY',
          entityType: '@sys.location',
          alias: 'address',
        },
      ],
    },
    {
      type: 'TYPE_EXAMPLE',
      parts: [
        {text: "I'd like to order a "},
        {text: 'large', entityType: '@size', alias: 'size'},
        {text: ' pizza with '},
        {text: 'mushrooms', entityType: '@topping', alias: 'topping'},
      ],
    },
    {
      type: 'TYPE_TEMPLATE',
      parts: [{text: "I'd like a @size:size pizza"}],
    },
  ];

  // The intent to be created.
  const pizzaIntent = {
    displayName: 'Pizza',
    events: ['order_pizza'],
    // Webhook is disabled because we are not ready to call the webhook yet.
    webhookState: 'WEBHOOK_STATE_DISABLED',
    trainingPhrases: pizzaPhrases,
    mlEnabled: true,
    priority: 500000,
    result: pizzaResult,
  };

  const pizzaRequest = {
    parent: agentPath,
    intent: pizzaIntent,
  };

  // Create the pizza intent
  conversationClient
    .createIntent(pizzaRequest)
    .then(responses => {
      console.log('Created Pizza intent:');
      logIntent(conversationClient, responses[0]);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });

  // Create an intent to change the delivery address. This intent sets input
  // contexts to make sure it's triggered in the conversation with the pizza
  // intent created above.

  // The input contexts are the output contexts of the pizza intent.
  const changeDeliveryAddressInputContexts = [
    conversationClient.contextPath(
      projectId,
      agentId,
      '*' /* sessionId */,
      'pizza_order'
    ),
  ];

  // Renew the pizza_order intent. Without doing so the lifespan count of the
  // pizza_order intent will decrease and eventually disappear if the user
  // changes the delivery address a couple times.
  const changeDeliveryAddressOutputContexts = [
    {
      name: conversationClient.contextPath(
        projectId,
        agentId,
        '*' /* sessionId */,
        'pizza_order'
      ),
      lifespanCount: 5,
    },
  ];

  // This intent requires the $address parameter to be provided. The other
  // parameters are collected from the pizza_order context.
  const changeDeliveryAddressParameters = [
    {
      displayName: 'address',
      entityTypeDisplayName: '@sys.location',
      mandatory: true,
      prompts: ['What is new address?'],
    },
    {
      displayName: 'size',
      value: '#pizza_order.size',
      entityTypeDisplayName: '@size',
    },
    {
      displayName: 'topping',
      value: '#pizza_order.topping',
      entityTypeDisplayName: '@topping',
      isList: true,
    },
  ];

  const changeDeliveryAddressResult = {
    action: 'change-delivery-address',
    parameters: changeDeliveryAddressParameters,
    messages: [
      {
        text: {
          text: ['OK, the delivery address is changed to $address'],
        },
      },
      {text: {text: ['You ordered a $size pizza with $topping.']}},
      {
        text: {
          text: [
            'Reply "check" to place your order. Reply "cancel" to cancel ' +
              'your order. You can change your delivery address as well.',
          ],
        },
      },
    ],
    outputContexts: changeDeliveryAddressOutputContexts,
  };

  // The triggering phrases. One is an annotated example, the other is a
  // template.
  const changeDeliveryAddressPhrases = [
    {
      type: 'TYPE_EXAMPLE',
      parts: [
        {text: 'Change address to '},
        {
          text: '1 1st st, new york, ny',
          entityType: '@sys.location',
          alias: 'address',
        },
      ],
    },
    {
      type: 'TYPE_EXAMPLE',
      parts: [
        {
          text: '1 1st st, new york, ny',
          entityType: '@sys.location',
          alias: 'address',
        },
      ],
    },
  ];

  const changeDeliveryAddressIntent = {
    displayName: 'ChangeDeliveryAddress',
    webhookState: 'WEBHOOK_STATE_DISABLED',
    trainingPhrases: changeDeliveryAddressPhrases,
    inputContexts: changeDeliveryAddressInputContexts,
    mlEnabled: true,
    priority: 500000,
    result: changeDeliveryAddressResult,
  };

  const changeDeliveryAddressRequest = {
    parent: agentPath,
    intent: changeDeliveryAddressIntent,
  };

  // Create the size intent
  conversationClient
    .createIntent(changeDeliveryAddressRequest)
    .then(responses => {
      console.log('Created ChangeDeliveryAddress intent: ');
      logIntent(conversationClient, responses[0]);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });

  // Finally, create two intents, one to place the order, and the other one to
  // cancel it.

  const placeOrderInputContexts = [
    conversationClient.contextPath(
      projectId,
      agentId,
      '*' /* sessionId */,
      'pizza_order'
    ),
  ];

  // Collect all parameters from the "pizza_output".
  const placeOrderParameters = [
    {
      displayName: 'size',
      value: '#pizza_order.size',
      entityTypeDisplayName: '@size',
    },
    {
      displayName: 'topping',
      value: '#pizza_order.topping',
      entityTypeDisplayName: '@topping',
      isList: true,
    },
    {
      displayName: 'address',
      value: '#pizza_order.address',
      entityTypeDisplayName: '@sys.location',
    },
  ];

  const placeOrderResult = {
    action: 'pizza_confirm',
    parameters: placeOrderParameters,
    messages: [
      {
        text: {
          text: [
            'Sure! Getting a $size pizza with $topping and shipping to $address.',
          ],
        },
      },
    ],
    // Conclude the conversation by setting no output contexts and setting
    // resetContexts to true. This clears all existing contexts.
    outputContexts: [],
    resetContexts: true,
  };

  const placeOrderPhrases = [
    {type: 'TYPE_EXAMPLE', parts: [{text: 'check'}]},
    {type: 'TYPE_EXAMPLE', parts: [{text: 'confirm'}]},
    {type: 'TYPE_EXAMPLE', parts: [{text: 'yes'}]},
    {type: 'TYPE_EXAMPLE', parts: [{text: 'place order'}]},
  ];

  const placeOrderIntent = {
    displayName: 'PlaceOrder',
    webhookState: 'WEBHOOK_STATE_ENABLED',
    trainingPhrases: placeOrderPhrases,
    inputContexts: placeOrderInputContexts,
    mlEnabled: true,
    priority: 500000,
    result: placeOrderResult,
  };

  const placeOrderRequest = {
    parent: agentPath,
    intent: placeOrderIntent,
  };

  conversationClient
    .createIntent(placeOrderRequest)
    .then(responses => {
      console.log('Created PlaceOrder intent: ');
      logIntent(conversationClient, responses[0]);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });

  const cancelOrderInputContexts = [
    conversationClient.contextPath(
      projectId,
      agentId,
      '*' /* sessionId */,
      'pizza_order'
    ),
  ];

  const cancelOrderResult = {
    action: 'cancel-order',
    parameters: [],
    messages: [{text: {text: ['Your order is canceled.']}}],
    outputContexts: [],
    resetContexts: true,
  };

  const cancelOrderPhrases = [
    {type: 'TYPE_EXAMPLE', parts: [{text: 'cancel'}]},
    {type: 'TYPE_EXAMPLE', parts: [{text: 'no'}]},
    {type: 'TYPE_EXAMPLE', parts: [{text: 'cancel order'}]},
    {type: 'TYPE_EXAMPLE', parts: [{text: "I don't want it any more"}]},
  ];

  const cancelOrderIntent = {
    displayName: 'CancelOrder',
    webhookState: 'WEBHOOK_STATE_DISABLED',
    trainingPhrases: cancelOrderPhrases,
    inputContexts: cancelOrderInputContexts,
    mlEnabled: true,
    priority: 500000,
    result: cancelOrderResult,
  };

  const cancelOrderRequest = {
    parent: agentPath,
    intent: cancelOrderIntent,
  };

  conversationClient
    .createIntent(cancelOrderRequest)
    .then(responses => {
      console.log('Created CancelOrder intent: ');
      logIntent(conversationClient, responses[0]);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}

function listIntents(conversationClient, projectId) {
  // Agent ID must be set to project ID for v1alpha.
  const agentId = projectId;
  // The path to identify the agent that owns the intents.
  const agentPath = conversationClient.agentPath(projectId, agentId);

  const request = {
    parent: agentPath,
  };

  // Send the request for listing intents.
  return conversationClient
    .listIntents(request)
    .then(responses => {
      return responses[0].intents;
    })
    .catch(err => {
      console.error('Failed to list intents:', err);
    });
}

function showIntents(projectId) {
  // Imports the Google Cloud client library
  const Conversation = require('@google-cloud/conversation');

  // Instantiates a client
  const conversationClient = Conversation.v1alpha();

  return listIntents(conversationClient, projectId).then(intents => {
    return Promise.all(
      intents.map(intent => {
        return getIntent(conversationClient, intent);
      })
    );
  });
}

function getIntent(conversationClient, intent) {
  const request = {
    // By default training phrases are not returned. If you want training
    // phrases included in the returned intent, uncomment the line below.
    //
    // intentView: 'INTENT_VIEW_FULL',
    name: intent.name,
  };

  // Send the request for retrieving the intent.
  return conversationClient
    .getIntent(request)
    .then(responses => {
      console.log('Found intent:');
      logIntent(conversationClient, responses[0]);
    })
    .catch(err => {
      console.error(`Failed to get intent ${intent.displayName}`, err);
    });
}

function clearIntents(projectId) {
  // Imports the Google Cloud client library
  const Conversation = require('@google-cloud/conversation');

  // Instantiates a client
  const conversationClient = Conversation.v1alpha();

  // Send the request for listing intents.
  return listIntents(conversationClient, projectId)
    .then(intents => {
      return Promise.all(
        intents.map(intent => {
          return deleteIntent(conversationClient, intent);
        })
      );
    })
    .catch(err => {
      console.error('Failed to list intents:', err);
    });
}

function deleteIntent(conversationClient, intent) {
  const request = {name: intent.name};

  // Send the request for retrieving the intent.
  return conversationClient
    .deleteIntent(request)
    .then(responses => {
      console.log(`Intent ${intent.displayName} deleted`);
    })
    .catch(err => {
      console.error(`Failed to delete intent ${intent.displayName}:`, err);
    });
}

function updateIntent(projectId, intentId) {
  // Imports the Google Cloud client library
  const Conversation = require('@google-cloud/conversation');

  // Instantiates a client
  const conversationClient = Conversation.v1alpha();

  // Agent ID must be set to project ID for v1alpha.
  const agentId = projectId;
  // The path to identify the intent to be deleted.
  const intentPath = conversationClient.intentPath(
    projectId,
    agentId,
    intentId
  );

  // UpdateIntent does full snapshot updates. For incremental update
  // fetch the intent first then modify it.
  const getIntentRequest = {
    name: intentPath,
    // It's important to have INTENT_VIEW_FULL here, otherwise the training
    // phrases are not returned and updating will remove all training phrases.
    intentView: 'INTENT_VIEW_FULL',
  };

  conversationClient
    .getIntent(getIntentRequest)
    .then(responses => {
      const intent = responses[0];
      // Add a new response message for telegram to the intent.
      intent.result.messages.push({
        image: {imageUri: 'http://www.example.com/logo.png'},
        platform: 'PLATFORM_TELEGRAM',
      });
      // And make sure telegram uses default messages as well.
      if (
        intent.result.defaultResponsePlatforms.indexOf('PLATFORM_TELEGRAM') < 0
      ) {
        intent.result.defaultResponsePlatforms.push('PLATFORM_TELEGRAM');
      }

      // Now update the intent.
      const updateIntentRequest = {
        intent: intent,
      };

      return conversationClient.updateIntent(updateIntentRequest);
    })
    .then(responses => {
      console.log('Intent updated:');
      logIntent(conversationClient, responses[0]);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}

function logIntent(conversationClient, intent) {
  console.log(
    `  ID:`,
    conversationClient.matchIntentFromIntentName(intent.name)
  );
  console.log(`  Display Name: ${intent.displayName}`);

  const outputContexts = intent.result.outputContexts
    .map(context => {
      return conversationClient.matchContextFromContextName(context.name);
    })
    .join(', ');
  console.log(`  Priority: ${intent.priority}`);
  console.log(`  Output contexts: ${outputContexts}`);

  console.log(`  Action: ${intent.result.action}`);
  console.log(`  Parameters:`);
  intent.result.parameters.forEach(parameter => {
    console.log(
      `    ${parameter.displayName}: ${parameter.entityTypeDisplayName}`
    );
  });

  console.log(`  Responses:`);
  intent.result.messages.forEach(message => {
    const messageContent = JSON.stringify(message[message.message]);
    console.log(
      `    (${message.platform}) ${message.message}: ${messageContent}`
    );
  });

  const defaultResponsePlatforms = intent.result.defaultResponsePlatforms.join(
    ', '
  );
  console.log(
    `  Platforms using default responses: ${defaultResponsePlatforms}`
  );
  console.log('');
}

// /////////////////////////////////////////////////////////////////////////////
// Operations for contexts
// /////////////////////////////////////////////////////////////////////////////

function createContext(projectId, sessionId) {
  // Imports the Google Cloud client library
  const Conversation = require('@google-cloud/conversation');

  // Instantiates a client
  const conversationClient = Conversation.v1alpha();

  // Agent ID must be set to project ID for v1alpha.
  const agentId = projectId;
  const sessionPath = conversationClient.sessionPath(
    projectId,
    agentId,
    sessionId
  );

  // Create a pizza_order context with the same parameters as the Pizza intent
  // created by createIntent().
  const pizzaContextPath = conversationClient.contextPath(
    projectId,
    agentId,
    sessionId,
    'pizza_order'
  );
  const pizzaContextRequest = {
    parent: sessionPath,
    context: {
      name: pizzaContextPath,
      lifespanCount: 5,
      parameters: structjson.jsonToStructProto({
        size: 'large',
        topping: ['tuna', 'cheddar'],
        address: {
          'street-address': '1600 Amphitheatre Pkwy',
          city: 'Mountain View',
          'admin-area': 'California',
          'zip-code': '94043',
        },
      }),
    },
  };

  conversationClient.createContext(pizzaContextRequest).then(responses => {
    console.log('Created pizza_order context');
    logContext(conversationClient, responses[0]);
  });
}

function listContexts(conversationClient, projectId, sessionId) {
  // Agent ID must be set to project ID for v1alpha.
  const agentId = projectId;
  // The path to identify the agent that owns the contexts.
  const sessionPath = conversationClient.sessionPath(
    projectId,
    agentId,
    sessionId
  );

  const request = {
    parent: sessionPath,
  };

  // Send the request for listing contexts.
  return conversationClient
    .listContexts(request)
    .then(responses => {
      return responses[0].contexts;
    })
    .catch(err => {
      console.error('Failed to list contexts:', err);
    });
}

function showContexts(projectId, sessionId) {
  // Imports the Google Cloud client library
  const Conversation = require('@google-cloud/conversation');

  // Instantiates a client
  const conversationClient = Conversation.v1alpha();

  return listContexts(
    conversationClient,
    projectId,
    sessionId
  ).then(contexts => {
    return Promise.all(
      contexts.map(context => {
        return getContext(conversationClient, context);
      })
    );
  });
}

function getContext(conversationClient, context) {
  const request = {
    name: context.name,
  };

  const contextId = conversationClient.matchContextFromContextName(
    context.name
  );

  // Send the request for retrieving the context.
  return conversationClient
    .getContext(request)
    .then(responses => {
      console.log('Found context:');
      logContext(conversationClient, responses[0]);
    })
    .catch(err => {
      console.error(`Failed to get context ${contextId}:`, err);
    });
}

function clearContexts(projectId, sessionId) {
  // Imports the Google Cloud client library
  const Conversation = require('@google-cloud/conversation');

  // Instantiates a client
  const conversationClient = Conversation.v1alpha();

  return listContexts(
    conversationClient,
    projectId,
    sessionId
  ).then(contexts => {
    return Promise.all(
      contexts.map(context => {
        return deleteContext(conversationClient, context);
      })
    );
  });
}

function deleteContext(conversationClient, context) {
  const request = {
    name: context.name,
  };

  const contextId = conversationClient.matchContextFromContextName(
    context.name
  );

  // Send the request for retrieving the context.
  return conversationClient
    .deleteContext(request)
    .then(responses => {
      console.log(`Context ${contextId} deleted`);
    })
    .catch(err => {
      console.error(`Failed to delete context ${contextId}`, err);
    });
}

function updateContext(projectId, sessionId, contextId) {
  // Imports the Google Cloud client library
  const Conversation = require('@google-cloud/conversation');

  // Instantiates a client
  const conversationClient = Conversation.v1alpha();

  // Agent ID must be set to project ID for v1alpha.
  const agentId = projectId;
  // The path to identify the context to be deleted.
  const contextPath = conversationClient.contextPath(
    projectId,
    agentId,
    sessionId,
    contextId
  );

  // UpdateContext does full snapshot updates. For incremental update
  // fetch the context first then modify it.
  const getContextRequest = {
    name: contextPath,
  };

  conversationClient
    .getContext(getContextRequest)
    .then(responses => {
      const context = responses[0];
      // Add a new parameter value.

      const parametersJson = structjson.structProtoToJson(context.parameters);
      parametersJson['foo'] = 'bar';
      context.parameters = structjson.jsonToStructProto(parametersJson);

      // Now update the context.
      const updateContextRequest = {
        context: context,
      };

      return conversationClient.updateContext(updateContextRequest);
    })
    .then(responses => {
      console.log('Context updated:');
      logContext(conversationClient, responses[0]);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}

function logContext(conversationClient, context) {
  console.log(
    `  Name:`,
    conversationClient.matchContextFromContextName(context.name)
  );
  console.log(`  Lifespan: ${context.lifespanCount}`);
  console.log(`  Parameters:`);
  const parameters = structjson.structProtoToJson(context.parameters);
  for (let k in parameters) {
    console.log(`    ${k}: ${parameters[k]}`);
  }
  console.log('');
}

// /////////////////////////////////////////////////////////////////////////////
// Operations for session entity type
// /////////////////////////////////////////////////////////////////////////////

function createSessionEntityType(projectId, sessionId) {
  // Imports the Google Cloud client library.
  const Conversation = require('@google-cloud/conversation');

  // Instantiates a client.
  const conversationClient = Conversation.v1alpha();

  // Agent ID must be set to project ID for v1alpha.
  const agentId = projectId;
  const sessionPath = conversationClient.sessionPath(
    projectId,
    agentId,
    sessionId
  );

  // Create a session entity type that overrides the @size entity type.
  //
  // NOTE: Unlike other resources, the resource name of the session entity type
  // is the display name of the entity type, not the ID.
  const sizeSessionEntityTypePath = conversationClient.sessionEntityTypePath(
    projectId,
    agentId,
    sessionId,
    'size'
  );
  const sizeSessionEntityTypeRequest = {
    parent: sessionPath,
    sessionEntityType: {
      name: sizeSessionEntityTypePath,
      entityOverrideMode: 'ENTITY_OVERRIDE_MODE_OVERRIDE',
      entities: [
        {value: 'short', synonyms: ['short', 'small', 'petit']},
        {value: 'tall', synonyms: ['tall', 'medium']},
        {value: 'grande', synonyms: ['grande', 'large', 'big']},
      ],
    },
  };

  conversationClient
    .createSessionEntityType(sizeSessionEntityTypeRequest)
    .then(responses => {
      console.log('Overrode @size entity type:');
      logSessionEntityType(conversationClient, responses[0]);
    });

  // Create a session entity type that extends the @topping entity type.
  const toppingSessionEntityTypePath = conversationClient.sessionEntityTypePath(
    projectId,
    agentId,
    sessionId,
    'topping'
  );
  const toppingSessionEntityTypeRequest = {
    parent: sessionPath,
    sessionEntityType: {
      name: toppingSessionEntityTypePath,
      entityOverrideMode: 'ENTITY_OVERRIDE_MODE_SUPPLEMENT',
      entities: [
        {value: 'feta', synonyms: ['feta']},
        {value: 'parmesan', synonyms: ['parmesan']},
      ],
    },
  };

  conversationClient
    .createSessionEntityType(toppingSessionEntityTypeRequest)
    .then(responses => {
      console.log('Extended @topping entity type:');
      logSessionEntityType(conversationClient, responses[0]);
    });
}

function showSessionEntityTypes(projectId, sessionId) {
  // Imports the Google Cloud client library
  const Conversation = require('@google-cloud/conversation');

  // Instantiates a client
  const conversationClient = Conversation.v1alpha();

  // There is no listSessionEntityTypes API, use listEntityTypes to get possible
  // entity type names.
  listEntityTypes(conversationClient, projectId).then(entityTypes => {
    return Promise.all(
      entityTypes.map(entityType => {
        return getSessionEntityType(
          conversationClient,
          projectId,
          sessionId,
          entityType.displayName
        );
      })
    );
  });
}

function getSessionEntityType(
  conversationClient,
  projectId,
  sessionId,
  entityTypeName
) {
  // Agent ID must be set to project ID for v1alpha.
  const agentId = projectId;
  // The path to identify the sessionEntityType to be retrieved.
  const sessionEntityTypePath = conversationClient.sessionEntityTypePath(
    projectId,
    agentId,
    sessionId,
    entityTypeName
  );

  const request = {
    name: sessionEntityTypePath,
  };

  // Send the request for retrieving the sessionEntityType.
  return conversationClient
    .getSessionEntityType(request)
    .then(responses => {
      console.log('Found session entity type:');
      logSessionEntityType(conversationClient, responses[0]);
    })
    .catch(err => {
      if (err.code === grpc.status.NOT_FOUND) {
        console.log(`Session entity type ${entityTypeName} is not found.`);
      } else {
        console.error(
          `Failed to get session entity type ${entityTypeName}:`,
          err
        );
      }
    });
}

function clearSessionEntityTypes(projectId, sessionId) {
  // Imports the Google Cloud client library
  const Conversation = require('@google-cloud/conversation');

  // Instantiates a client
  const conversationClient = Conversation.v1alpha();

  // There is no listSessionEntityTypes API, use listEntityTypes to get possible
  // entity type names.
  listEntityTypes(conversationClient, projectId).then(entityTypes => {
    return Promise.all(
      entityTypes.map(entityType => {
        return deleteSessionEntityType(
          conversationClient,
          projectId,
          sessionId,
          entityType.displayName
        );
      })
    );
  });
}

function deleteSessionEntityType(
  conversationClient,
  projectId,
  sessionId,
  entityTypeName
) {
  // Agent ID must be set to project ID for v1alpha.
  const agentId = projectId;
  // The path to identify the sessionEntityType to be deleted.
  const sessionEntityTypePath = conversationClient.sessionEntityTypePath(
    projectId,
    agentId,
    sessionId,
    entityTypeName
  );

  const request = {
    name: sessionEntityTypePath,
  };

  // Send the request for retrieving the sessionEntityType.
  return conversationClient
    .deleteSessionEntityType(request)
    .then(responses => {
      console.log(`Session entity type ${entityTypeName} deleted`);
    })
    .catch(err => {
      if (err.code === grpc.status.NOT_FOUND) {
        console.log(
          `Cannot delete session entity type ${entityTypeName} because ` +
            `it is not found.`
        );
      } else {
        console.error(`Failed to delete ${entityTypeName}:`, err);
      }
    });
}

function updateSessionEntityType(projectId, sessionId, entityTypeName) {
  // Imports the Google Cloud client library
  const Conversation = require('@google-cloud/conversation');

  // Instantiates a client
  const conversationClient = Conversation.v1alpha();

  // Agent ID must be set to project ID for v1alpha.
  const agentId = projectId;
  // The path to identify the sessionEntityType to be deleted.
  const sessionEntityTypePath = conversationClient.sessionEntityTypePath(
    projectId,
    agentId,
    sessionId,
    entityTypeName
  );

  // Update the session entity type.
  //
  // Note: this overrides the existing entities of the session entity type being
  // updated, even if entityOverrideMode is set to
  // ENTITY_OVERRIDE_MODE_SUPPLEMENT.
  const request = {
    sessionEntityType: {
      name: sessionEntityTypePath,
      entityOverrideMode: 'ENTITY_OVERRIDE_MODE_SUPPLEMENT',
      entities: [
        {value: 'foo', synonyms: ['foo']},
        {value: 'bar', synonyms: ['bar']},
      ],
    },
  };
  conversationClient
    .updateSessionEntityType(request)
    .then(responses => {
      console.log('Session entity type updated:');
      logSessionEntityType(conversationClient, responses[0]);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}

function logSessionEntityType(conversationClient, sessionEntityType) {
  console.log(
    `  Name:`,
    conversationClient.matchEntityTypeFromSessionEntityTypeName(
      sessionEntityType.name
    )
  );
  console.log(
    `  Entity override mode: ${sessionEntityType.entityOverrideMode}`
  );
  console.log(`  Entities:`);
  sessionEntityType.entities.forEach(entity => {
    console.log(`    ${entity.value}: ${entity.synonyms.join(', ')}`);
  });
  console.log('');
}

// /////////////////////////////////////////////////////////////////////////////
// Command line interface.
// /////////////////////////////////////////////////////////////////////////////

function setupAgent(projectId) {
  clearAgent(projectId)
    .then(() => createEntityTypes(projectId))
    .then(() => createIntents(projectId));
}

function clearAgent(projectId) {
  return (
    clearIntents(projectId)
      // Give api.ai some time to clean up the references to existing entity
      // types.
      .then(() => {
        console.log('Waiting 10 seconds before deleting entity types.');
        return setTimeoutPromise(10000);
      })
      .then(() => clearEntityTypes(projectId))
  );
}

function showAgent(projectId) {
  showEntityTypes(projectId).then(() => showIntents(projectId));
}

function setupSession(projectId, sessionId) {
  createContext(projectId, sessionId);
  createSessionEntityType(projectId, sessionId);
}

function showSession(projectId, sessionId) {
  showContexts(projectId, sessionId).then(() =>
    showSessionEntityTypes(projectId, sessionId)
  );
}

function clearSession(projectId, sessionId) {
  clearContexts(projectId, sessionId).then(() =>
    clearSessionEntityTypes(projectId, sessionId)
  );
}

function setTimeoutPromise(delayMillis) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), delayMillis);
  });
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
      type: 'string',
    },
  })
  .command(
    `setup-agent`,
    `Create entity types and intent for ordering pizzas.`,
    {},
    opts => setupAgent(opts.projectId)
  )
  .command(
    `clear-agent`,
    `Delete all intents and entity types from an agent.`,
    {},
    opts => clearAgent(opts.projectId)
  )
  .command(
    `show-agent`,
    `Show all intents and entity types from an agent.`,
    {},
    opts => showAgent(opts.projectId)
  )
  .command(
    `update-entity-type <entityTypeId>`,
    `Update an entity type.`,
    {},
    opts => updateEntityType(opts.projectId, opts.entityTypeId)
  )
  .command(`update-intent <intentId>`, `Update an intent.`, {}, opts =>
    updateIntent(opts.projectId, opts.intentId)
  )
  .command(
    `setup-session <sessionId>`,
    `Create contexts and session entity types for a session. It assumes ` +
      `the agents is set up by setup-agent command.`,
    {},
    opts => setupSession(opts.projectId, opts.sessionId)
  )
  .command(
    `show-session <sessionId>`,
    `Show all contexts and session entity types in a session.`,
    {},
    opts => showSession(opts.projectId, opts.sessionId)
  )
  .command(
    `clear-session <sessionId>`,
    `Delete all contexts and session entity types.`,
    {},
    opts => clearSession(opts.projectId, opts.sessionId)
  )
  .command(
    `update-context <sessionId> <contextId>`,
    `Update a context.`,
    {},
    opts => updateContext(opts.projectId, opts.sessionId, opts.contextId)
  )
  .command(
    `update-session-entity-type <sessionId> <entityTypeName>`,
    `Update a session entity type.`,
    {},
    opts =>
      updateSessionEntityType(
        opts.projectId,
        opts.sessionId,
        opts.entityTypeName
      )
  )
  .example(`node $0 setup-agent`)
  .example(`node $0 show-agent`)
  .example(`node $0 clear-agent`)
  .example(`node $0 update-entity-type "my-entity-type-id"`)
  .example(`node $0 update-intent "my-intent-id"`)
  .example(`node $0 setup-session "my-session-id"`)
  .example(`node $0 show-session "my-session-id"`)
  .example(`node $0 clear-session "my-session-id"`)
  .example(`node $0 update-context "my-session-id" "my-context-id"`)
  .example(
    `node $0 update-session-entity-type "my-session-id" ` +
      `"my-entity-type-name"`
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
