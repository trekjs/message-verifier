'use strict';

exports.__esModule = true;

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createHmac = require('crypto');

var MessageVerifier = (function () {
  function MessageVerifier(secret) {
    var options = arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, MessageVerifier);

    this.secret = secret;
    this.algorithm = options.algorithm || 'sha1';
    this.serializer = options.serializer || JSON;
  }

  MessageVerifier.prototype.generate = function generate(value) {
    var data = this.encode(this.serializer.stringify(value));
    return `${ data }--${ this.generateDigest(data) }`;
  };

  MessageVerifier.prototype.validMessage = function validMessage(signedMessage) {
    if (!signedMessage) return false;

    var _signedMessage$split = signedMessage.split('--');

    var data = _signedMessage$split[0];
    var digest = _signedMessage$split[1];

    return !!data && !!digest && this.compare(digest, this.generateDigest(data));
  };

  MessageVerifier.prototype.verified = function verified(signedMessage) {
    if (this.validMessage(signedMessage)) {
      var data = signedMessage.split('--')[0];
      return this.serializer.parse(this.decode(data));
    }
    return null;
  };

  MessageVerifier.prototype.verify = function verify(signedMessage) {
    return this.verified(signedMessage);
  };

  MessageVerifier.prototype.encode = function encode(data) {
    var encoding = arguments[1] === undefined ? 'ascii' : arguments[1];

    return new Buffer(data, encoding).toString('base64');
  };

  MessageVerifier.prototype.decode = function decode(data) {
    var encoding = arguments[1] === undefined ? 'ascii' : arguments[1];

    return new Buffer(data, 'base64').toString(encoding);
  };

  MessageVerifier.prototype.generateDigest = function generateDigest(data) {
    return _createHmac.createHmac(this.algorithm, new Buffer(this.secret)).update(new Buffer(data)).digest('hex');
  };

  MessageVerifier.prototype.compare = function compare(a, b) {
    var l = a.length;
    if (l !== b.length) return false;
    var i = 0;
    for (; i < l && a.charCodeAt(i) !== b.charCodeAt(i); ++i) {
      return false;
    }
    return true;
  };

  return MessageVerifier;
})();

exports['default'] = MessageVerifier;
module.exports = exports['default'];