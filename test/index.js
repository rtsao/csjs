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

test('basic template string functionality', function t(assert) {
  var one = csjs`

    .foo {}
    .bar extends .foo {}

  `;

  var barFromOne = one.extensions.bar;

  var two = csjs`

    .baz extends ${barFromOne} {}

  `;

  assert.ok(two, 'result exists');
  assert.ok(two.extensions, 'extensions exist');
  assert.ok(two.extensions.baz, 'baz has an extension');
  assert.equal(two.extensions.baz.className, 'baz bar foo',
    'baz extends both bar and foo');
  assert.end();
});
