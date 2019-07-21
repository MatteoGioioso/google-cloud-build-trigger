const config = { keyFilename: "./path/to/service-account.json" };
const builder = require("./index")(config);

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
