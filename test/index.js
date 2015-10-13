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
  assert.equal(result.bar.className, 'bar_4d3PW foo_4d3PW', 'bar extends foo');
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

    .baz_3qXjB {}
    .fob_3qXjB {}

  `;

  assert.ok(two, 'result exists');
  assert.equal(csjs.getCss(two), twoExpected, 'scoped css matches');
  assert.ok(two.baz, 'baz has an extension');
  assert.equal(two.baz.className, 'baz_3qXjB bar_4d3PW foo_4d3PW',
    'baz extends both bar and foo');
  assert.equal(two.fob.className, 'fob_3qXjB foo_4d3PW',
    'fob extends foo');
  assert.end();
});

test('keyframes scoping', function t(assert) {
  const one = csjs`

    @keyframes yolo {}

  `;

  const oneExpected = `

    @keyframes yolo_5Eq7W {}

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

    .foo_1PI20 {
      animation: yolo_5Eq7W 5s infinite;
    }

  `;

  assert.equal(csjs.getCss(two), twoExpected,
    'class is scoped and animation imported correctly');
  assert.end();
});
