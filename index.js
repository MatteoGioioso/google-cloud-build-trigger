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

'use strict';

var common = require('@google-cloud/common');
var extend = require('extend');
var util = require('util');

function Builder(options) {
  if (!(this instanceof Builder)) {
    options = common.util.normalizeArguments(this, options);
    return new Builder(options);
  }

  var config = {
    baseUrl: 'https://cloudbuild.googleapis.com/v1',
    scopes: [
      'https://www.googleapis.com/auth/cloud-platform'
    ],
    packageJson: require('./package.json')
  };

  common.Service.call(this, config, options);
}

util.inherits(Builder, common.Service);

Builder.prototype.createBuild = function(build, callback) {
  var self = this;

  if (!build && build instanceof Function) {
    throw new Error('A build is required to submit it.');
  }

  if (!build.steps) {
    throw new Error('Build must contain build steps.');
  }

  var body = extend({}, build);

  this.request({
    method: 'POST',
    uri: '/builds',
    json: body
  }, function(err, resp) {
    if (err) {
      callback(err, resp);
      return;
    }

    callback(null, resp);
  });
};

Builder.prototype.getBuilds = function(query, callback) {
  var self = this;

  if (!callback) {
    callback = query;
    query = {};
  }

  this.request({
    uri: '/builds'
  }, function(err, resp) {
    if (err) {
      callback(err, null, null, resp);
      return;
    }

    var builds = resp.builds;

    var nextQuery = null;
    if (resp.nextPageToken) {
      nextQuery = extend({}, query, { pageToken: resp.nextPageToken });
    }

    callback(null, builds, nextQuery, resp);
  });
};

/*! Developer Documentation
 *
 * These methods can be auto-paginated.
 */
common.paginator.extend(Builder, 'getBuilds');

/*! Developer Documentation
 *
 * All async methods (except for streams) will return a Promise in the event
 * that a callback is omitted.
 */
common.util.promisifyAll(Builder, {
  exclude: ['bucket']
});

module.exports = Builder;
