'use strict';

var _ = require('lodash');
var nex = require('nex-api');
var n = require('n-api');
var log = require('npmlog');
var colors = require('colors');
var resolver = require('node-latest-version');

var handler = module.exports = new nex.Handler('engines');

/**
 * @override
 */
handler.do = function (pkg) {
  var node;
  if (pkg.engines && pkg.engines.node) {
    node = resolver.satisfy.sync(pkg.engines.node);
  }
  else {
    log.warn('package.json engines', 'is not properly set but you seem to think it is');
    node = process.version;
  }
  n(node);
};

/**
 * @override
 */
handler.undo = function (pkg) {
  n('prev');
};

