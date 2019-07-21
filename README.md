# Node.js Client for triggering Cloud build

```javascript
//Path to your service account file
const config = { keyFilename: "./path/to/service-account.json" };
const builder = require("./index")(config);

//You can get the triggerId by navigating to cloud build from the google cloud platform console
//click on the triggers list and click on the trigger that you want to run,
//the url of the page should look something like that:
//https://console.cloud.google.com/cloud-build/triggers/<trigger_id>?project=<project_id>
//You can grab the triggerId from there
const options = {
  requestBody: { branchName: "master" },
  triggerId: "your-trigger-id"
};

builder.runTrigger(options, function(err, resp) {
  if (err) {
    console.log(err)
  }

  console.log(resp)
});

```