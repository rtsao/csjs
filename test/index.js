'use strict';

var test = require('tape');
var csjs = require('../');
var getCss = require('../get-css');

test('basic template string functionality', function t(assert) {
  var result = csjs`#foo {color: red;}`;
  assert.equal(getCss(result), '#foo {color: red;}', 'can retrieve basic css');
  assert.end();
});

test('basic template string functionality', function t(assert) {
  var result = csjs`

    .foo {}
    .bar extends .foo {}

  `;

  assert.ok(result, 'result exists');
  assert.ok(result.bar, 'bar has an extension');
  assert.equal(result.bar.className, 'bar_4d3PW foo_4d3PW', 'bar extends foo');
  assert.end();
});

test('basic template string functionality', function t(assert) {
  var one = csjs`

    .foo {}
    .bar extends .foo {}

  `;

  var two = csjs`

    .baz extends ${one.bar} {}
    .fob extends ${one.foo} {}

  `;

  assert.ok(two, 'result exists');
  assert.ok(two, 'extensions exist');
  assert.ok(two.baz, 'baz has an extension');
  assert.equal(two.baz.className, 'baz_1egru bar_4d3PW foo_4d3PW',
    'baz extends both bar and foo');
  assert.equal(two.fob.className, 'fob_1egru foo_4d3PW',
    'fob extends foo');
  assert.end();
});
