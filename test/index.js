'use strict';

var test = require('tape');
var csjs = require('../');

test('basic template string functionality', function t(assert) {
  var result = csjs`#foo {color: red;}`;
  assert.equal(csjs.getCss(result), '#foo {color: red;}', 'can retrieve basic css');
  assert.end();
});

test('basic scoping functionality', function t(assert) {
  var result = csjs`

    .foo {}
    .bar extends .foo {}

  `;

  assert.ok(result, 'result exists');
  assert.ok(result.bar, 'bar has an extension');
  assert.ok(result.bar == 'bar_1k1sUd foo_1k1sUd', 'bar extends foo');
  assert.end();
});

test('multiple extensions', function t(assert) {
  var one = csjs`

    .foo {}
    .bar extends .foo {}

  `;

  var two = csjs`

    .baz extends ${one.bar} {}
    .fob extends ${one.foo} {}

  `;
  var twoExpected = `

    .baz_4CfzAa {}
    .fob_4CfzAa {}

  `;

  assert.ok(two, 'result exists');
  assert.equal(csjs.getCss(two), twoExpected, 'scoped css matches');
  assert.ok(two.baz, 'baz has an extension');
  assert.ok(two.baz == 'baz_4CfzAa bar_1k1sUd foo_1k1sUd',
    'baz extends both bar and foo');
  assert.ok(two.fob == 'fob_4CfzAa foo_1k1sUd',
    'fob extends foo');
  assert.end();
});

test('keyframes scoping', function t(assert) {
  var one = csjs`

    @keyframes yolo {}

    .foo {
      animation: yolo 5s infinite;
    }

  `;

  var oneExpected = `

    @keyframes yolo_2WD5WP {}

    .foo_2WD5WP {
      animation: yolo_2WD5WP 5s infinite;
    }

  `;

  assert.ok(one.yolo, 'animation yolo is exported');
  assert.ok(one.yolo == 'yolo_2WD5WP', 'animation yolo name matches expected');
  assert.equal(csjs.getCss(one), oneExpected, 'animation is scoped in css output');

  var two = csjs`

    .foo {
      animation: ${one.yolo} 5s infinite;
    }

  `;

  assert.ok(two, 'result exists');
  assert.ok(two.foo, 'class foo is exported');
  assert.ok(two.foo == 'foo_4g9VPD', 'class foo matches expected');

  var twoExpected = `

    .foo_4g9VPD {
      animation: yolo_2WD5WP 5s infinite;
    }

  `;

  assert.equal(csjs.getCss(two), twoExpected,
    'class is scoped and animation imported correctly');
  assert.end();
});
