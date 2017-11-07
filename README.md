<img src="https://avatars2.githubusercontent.com/u/2810941?v=3&s=96" alt="Google Cloud Platform logo" title="Google Cloud Platform" align="right" height="96" width="96"/>

# [Google Cloud Dialogflow: Node.js Client](https://github.com/googleapis/nodejs-dialogflow)

[![release level](https://img.shields.io/badge/release%20level-beta-yellow.svg?style&#x3D;flat)](https://cloud.google.com/terms/launch-stages)
[![CircleCI](https://img.shields.io/circleci/project/github/googleapis/nodejs-dialogflow.svg?style=flat)](https://circleci.com/gh/googleapis/nodejs-dialogflow)
[![AppVeyor](https://ci.appveyor.com/api/projects/status/github/googleapis/nodejs-dialogflow?branch=master&svg=true)](https://ci.appveyor.com/project/googleapis/nodejs-dialogflow)
[![codecov](https://img.shields.io/codecov/c/github/googleapis/nodejs-dialogflow/master.svg?style=flat)](https://codecov.io/gh/googleapis/nodejs-dialogflow)

> Node.js idiomatic client for [Dialogflow][product-docs].

[Google Cloud Dialogflow](https://cloud.google.com/docs/dialogflow/)  is an enterprise-grade NLU platform that makes it easy for developers to design and integrate conversational user interfaces into mobile apps, web applications, devices, and bots.


* [Dialogflow Node.js Client API Reference][client-docs]
* [github.com/googleapis/nodejs-dialogflow](https://github.com/googleapis/nodejs-dialogflow)
* [Dialogflow Documentation][product-docs]

Read more about the client libraries for Cloud APIs, including the older
Google APIs Client Libraries, in [Client Libraries Explained][explained].

[explained]: https://cloud.google.com/apis/docs/client-libraries-explained

**Table of contents:**

* [Quickstart](#quickstart)
  * [Before you begin](#before-you-begin)
  * [Installing the client library](#installing-the-client-library)
  * [Using the client library](#using-the-client-library)
* [Versioning](#versioning)
* [Contributing](#contributing)
* [License](#license)

## Quickstart

### Before you begin

1.  Select or create a Cloud Platform project.

    [Go to the projects page][projects]

1.  Enable billing for your project.

    [Enable billing][billing]

1.  Enable the Google Cloud Dialogflow API.

    [Enable the API][enable_api]

1.  [Set up authentication with a service account][auth] so you can access the
    API from your local workstation.

[projects]: https://console.cloud.google.com/project
[billing]: https://support.google.com/cloud/answer/6293499#enable-billing
[enable_api]: https://console.cloud.google.com/flows/enableapi?apiid=dialogflow.googleapis.com
[auth]: https://cloud.google.com/docs/authentication/getting-started

### Installing the client library

    npm install --save @google-cloud/dialogflow

### Using the client library

```javascript
// Instantiate a DialogFlow client.
const dialogflow = require('@google-cloud/dialogflow');
const client = new dialogflow.SessionsClient();
// TODO: Actually write a meaningful quickstart.
```


The [Dialogflow Node.js Client API Reference][client-docs] documentation
also contains samples.

## Versioning

This library follows [Semantic Versioning](http://semver.org/).

This library is considered to be in **beta**. This means it is expected to be
mostly stable while we work toward a general availability release; however,
complete stability is not guaranteed. We will address issues and requests
against beta libraries with a high priority.

More Information: [Google Cloud Platform Launch Stages][launch_stages]

[launch_stages]: https://cloud.google.com/terms/launch-stages

## Contributing

Contributions welcome! See the [Contributing Guide](https://github.com/googleapis/nodejs-dialogflow/blob/master/.github/CONTRIBUTING.md).

## License

Apache Version 2.0

See [LICENSE](https://github.com/googleapis/nodejs-dialogflow/blob/master/LICENSE)

[client-docs]: https://cloud.google.com/nodejs/docs/reference/dialogflow/latest/
[product-docs]: https://cloud.google.com/docs/dialogflow/
[shell_img]: http://gstatic.com/cloudssh/images/open-btn.png
