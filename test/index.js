'use strict';

var test = require('tape');
var csjs = require('../');

test('basic template string functionality', function t(assert) {
  var result = csjs`foo`;
  assert.equal(result.css, 'foo', 'basic template string works');
  assert.end();
});
