'use strict';

const test = require('tape');
const csjs = require('../');

test('basic template string functionality', function t(assert) {
  const result = csjs`#foo {color: red;}`;
  assert.equal(csjs.getCss(result), '#foo {color: red;}', 'can retrieve basic css');
  assert.end();
});

test('basic scoping functionality', function t(assert) {
  const result = csjs`

    .foo {}
    .bar extends .foo {}

  `;

  assert.ok(result, 'result exists');
  assert.ok(result.bar, 'bar has an extension');
  assert.equal(result.bar.className, 'bar_1k1sUd foo_1k1sUd', 'bar extends foo');
  assert.end();
});

test('multiple extensions', function t(assert) {
  const one = csjs`

    .foo {}
    .bar extends .foo {}

  `;

  const two = csjs`

    .baz extends ${one.bar} {}
    .fob extends ${one.foo} {}

  `;
  const twoExpected = `

    .baz_4CfzAa {}
    .fob_4CfzAa {}

  `;

  assert.ok(two, 'result exists');
  assert.equal(csjs.getCss(two), twoExpected, 'scoped css matches');
  assert.ok(two.baz, 'baz has an extension');
  assert.equal(two.baz.className, 'baz_4CfzAa bar_1k1sUd foo_1k1sUd',
    'baz extends both bar and foo');
  assert.equal(two.fob.className, 'fob_4CfzAa foo_1k1sUd',
    'fob extends foo');
  assert.end();
});

test('keyframes scoping', function t(assert) {
  const one = csjs`

    @keyframes yolo {}

    .foo {
      animation: yolo 5s infinite;
    }

  `;

  const oneExpected = `

    @keyframes yolo_2WD5WP {}

    .foo_2WD5WP {
      animation: yolo_2WD5WP 5s infinite;
    }

  `;

  assert.ok(one.yolo, 'animation yolo is exported');
  assert.equal(csjs.getCss(one), oneExpected, 'animation is scoped in css output');

  const two = csjs`

    .foo {
      animation: ${one.yolo} 5s infinite;
    }

  `;

  assert.ok(two, 'result exists');
  assert.ok(two.foo, 'class foo is exported');

  const twoExpected = `

    .foo_4g9VPD {
      animation: yolo_2WD5WP 5s infinite;
    }

  `;

  assert.equal(csjs.getCss(two), twoExpected,
    'class is scoped and animation imported correctly');
  assert.end();
});
