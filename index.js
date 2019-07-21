/*!
 * Copyright 2017 Michal Hruby
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

const common = require("@google-cloud/common");
const extend = require("extend");
const util = require("util");

function Builder(options) {
  if (!(this instanceof Builder)) {
    options = common.util.normalizeArguments(this, options);
    return new Builder(options);
  }

  const config = {
    baseUrl: "https://cloudbuild.googleapis.com/v1",
    scopes: ["https://www.googleapis.com/auth/cloud-platform"],
    packageJson: require("./package.json")
  };

  common.Service.call(this, config, options);
}

util.inherits(Builder, common.Service);

Builder.prototype.runTrigger = function(options, callback) {
  const self = this;

  if (!options) {
    throw new Error('Missing options object');
  }

  if (!options.triggerId) {
    throw new Error('You must contain a triggerId');
  }

  const body = extend({}, options.requestBody);

  this.request(
    {
      method: "POST",
      uri: `/triggers/${options.triggerId}:run`,
      json: body
    },
    function(err, resp) {
      if (err) {
        callback(err, resp);
        return;
      }

      callback(null, resp);
    }
  );
};

/*! Developer Documentation
 *
 * These methods can be auto-paginated.
 */
common.paginator.extend(Builder, "getBuilds");

/*! Developer Documentation
 *
 * All async methods (except for streams) will return a Promise in the event
 * that a callback is omitted.
 */
common.util.promisifyAll(Builder, {
  exclude: ["bucket"]
});

module.exports = Builder;
