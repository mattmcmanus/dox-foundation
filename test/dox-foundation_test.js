var formcaster = require('../lib/dox-foundation.js'),
    exec = require('child_process').execFile,
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
  'should return its version': function(test) {
    test.expect(1);
    var version = exec(cmd, ['-V'], null, function(err, stdout, stderr){
      test.equal(stdout.trim(), require('../package').version);
      test.done();
    });
  }
};