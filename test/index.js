'use strict';

var test = require('tape');
var csjs = require('../');

test('basic template string functionality', function t(assert) {
  var result = csjs`foo`;
  assert.equal(result.css, 'foo', 'basic template string works');
  assert.end();
});

test('basic template string functionality', function t(assert) {
  var result = csjs`

    .foo {}
    .bar extends .foo {}

  `;

  assert.ok(result, 'result exists');
  assert.ok(result.extensions, 'extensions exist');
  assert.ok(result.extensions.bar, 'bar has an extension');
  assert.equal(result.extensions.bar.className, 'bar foo', 'bar extends foo');
  assert.end();
});
