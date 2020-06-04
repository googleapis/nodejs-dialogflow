# Copyright 2018 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import synthtool as s
import synthtool.gcp as gcp
import synthtool.languages.node as node
import logging

logging.basicConfig(level=logging.DEBUG)

AUTOSYNTH_MULTIPLE_COMMITS = True


gapic = gcp.GAPICMicrogenerator()
versions = ['v2', 'v2beta1']
default_version = 'v2'

# Rearrange the default version to the last item in the array, to generate appropriate system-test
order_versions = versions.copy()
order_versions.append(order_versions.pop(
    order_versions.index(default_version)))

for version in order_versions:
    library = gapic.typescript_library(
        'dialogflow', version,
        generator_args={
            "grpc-service-config": f"google/cloud/dialogflow/{version}/dialogflow_grpc_service_config.json",
            "package-name": f"@google-cloud/dialogflow",
            "main-service": f"dialogflow",
            "validation": "false",
        },
        proto_path=f'/google/cloud/dialogflow/{version}',
        extra_proto_files=["google/cloud/common_resources.proto"]
    )
    s.copy(library, excludes=['package.json',
                              'README.md', 'system-test/fixtures/sample/src'])

common_templates = gcp.CommonTemplates()
templates = common_templates.node_library(
    source_location='build/src', versions=versions, default_version=default_version)
s.copy(templates, excludes=["README.md", "samples/README.md"])

# TODO: Remove the following replace once Datacatalog is ready to release a break change
# Users should use beta Client with explicitly specify the beta version
# Add beta version DocumentsClient, KnowledgeBasesClient to export
s.replace('src/index.ts',
          '\nexport \{v2\, v2beta1\, AgentsClient\, ContextsClient\, EntityTypesClient\, EnvironmentsClient\, IntentsClient\, SessionEntityTypesClient\, SessionsClient\}\;\nexport default \{v2\, v2beta1\, AgentsClient\, ContextsClient\, EntityTypesClient\, EnvironmentsClient\, IntentsClient\, SessionEntityTypesClient\, SessionsClient\}\;',
          'const DocumentsClient = v2beta1.DocumentsClient;\nconst KnowledgeBasesClient = v2beta1.KnowledgeBasesClient;\n\nexport {v2, v2beta1, AgentsClient, ContextsClient, EntityTypesClient, EnvironmentsClient, IntentsClient, SessionEntityTypesClient, SessionsClient, DocumentsClient, KnowledgeBasesClient};\nexport default {v2, v2beta1, AgentsClient, ContextsClient, EntityTypesClient, EnvironmentsClient, IntentsClient, SessionEntityTypesClient, SessionsClient, DocumentsClient, KnowledgeBasesClient};')

node.postprocess_gapic_library()
