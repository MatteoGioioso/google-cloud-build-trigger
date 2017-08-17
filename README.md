# Node.js Client for Google Container Builder
> Node.js client for [Google Container Builder](https://cloud.google.com/container-builder/).

This is just a temporary node client for Container Builder while the [official Google client](https://github.com/GoogleCloudPlatform/google-cloud-node) doesn't have support for it.

The semantics are the same as with other GCP clients:
```
var config = { keyFilename: '/path/to/keyfile.json' };
var builder = require('gcp-container-builder')(config);

builder.getBuilds((err, builds) => { /* process builds */ });
```

Currently only `getBuilds` and `createBuild` methods are implemented.
