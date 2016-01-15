'use strict';

var fs = require('fs');
var path = require('path');
var test = require('tape');

var includeFolder = require('include-folder');
var bulk = require('bulk-require');

var csjs = require('../');

var extensions = {
  source: '.source.js',
  json: '.expected.json',
  css: '.expected.css'
};

var testFiles = fs.readdirSync('test');

var required = bulk(__dirname, [
  '*.source.js',
  '*.expected.json'
]);

var cssFiles = includeFolder('./test', /expected\.css$/, {
  preserveFilenames: true
});

var fixtureRegex = new RegExp(extensions.source + '$');
var matchesFixture = fixtureRegex.test.bind(fixtureRegex);

var tests = testFiles
  .filter(matchesFixture)
  .map(function toName(file) {
    return path.basename(file, extensions.source);
  });

tests.forEach(testFromName);

function testFromName(name) {
  var fixtures = getFixtures(name);
  runTest(name, fixtures.result, fixtures.expected);
}

function runTest(name, result, expected) {
  test('test ' + name, function t(assert) {
    assert.equal(csjs.getCss(result), expected.css, 'css matches expected');
    assert.deepEqual(stringifyVals(result), expected.json, 'object matches expected');
    assert.end();
  });
}

function getFixtures(name) {
  var sourcePath = name + '.source';
  var jsonPath = name + '.expected';
  var cssPath = name + extensions.css;

  return {
    result: required[sourcePath],
    expected: {
      json: required[jsonPath],
      css: cssFiles[cssPath]
    }
  }
}

function moduleExists(name) {
  try {
    return Boolean(require.resolve(name));
  } catch(e) {
    return false;
  }
}

function fixturePath(name, ext) {
  return path.join(__dirname, name + ext);
}

function stringifyVals(obj) {
  return Object.keys(obj).reduce(function(acc, key) {
    acc[key] = obj[key].toString();
    return acc;
  }, {});
}
