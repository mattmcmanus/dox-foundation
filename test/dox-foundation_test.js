var formcaster = require('../lib/dox-foundation.js'),
    exec = require('child_process').exec,
    cmd = require('path').resolve(__dirname + '/../bin/dox-foundation');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['dox-foundation'] = {
  'should return the correct version': function(test) {
    test.expect(1);
    var version = exec(cmd + ' -V', null, function(err, stdout, stderr){
      test.equal(stdout.trim(), require('../package').version);
      test.done();
    });
  },
  'should not error when using stdio': function(test) {
    test.expect(2);
    var testFile = require('path').resolve(__dirname + '/../lib/dox-foundation.js');
    var version = exec(cmd + '<' + testFile, null, function(err, stdout, stderr){
      test.ok(stdout);
      test.equal(stderr, "");
      test.done();
    });
  },
  'should not error when parsing directories': function(test) {
    test.expect(1);
    var version = exec(cmd + ' --source lib --target docs', null, function(err, stdout, stderr){
      test.equal(stderr, "");
      test.done();
    });
  }
};