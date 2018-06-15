import synthtool as s
import synthtool.gcp as gcp
import logging
from pathlib import Path
import subprocess

logging.basicConfig(level=logging.DEBUG)

gapic = gcp.GAPICGenerator()

versions = ['v2', 'v2beta1']
for version in versions:
    library = gapic.node_library('dialogflow', version)
    s.copy(library / 'protos')
    s.copy(library / 'src' / version)
    s.copy(library / 'test')

'''
Node.js specific cleanup
'''
# Repo Cleanup/Setup
subprocess.run(['npm', 'install'])

# Generates scaffolding, enters contributors names
subprocess.run(['npm', 'run', 'generate-scaffolding'])

# prettify and lint
subprocess.run(['npm', 'run', 'prettier'])
subprocess.run(['npm', 'run', 'lint'])
