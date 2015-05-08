import { createHmac } from 'crypto';
import slowEquals from 'slow-equals';

export default class MessageVerifier {

  constructor(secret, options = {}) {
    this.secret = secret;
    this.algorithm = options.algorithm || 'sha1';
    this.serializer = options.serializer || JSON;
  }

  generate(value) {
    let data = this.encode(this.serializer.stringify(value));
    return `${data}--${this.generateDigest(data)}`
  }

  validMessage(signedMessage) {
    if (!signedMessage) return false;
    let [data, digest] = signedMessage.split('--');
    return !!data && !!digest && this.compare(digest, this.generateDigest(data));
  }

  verified(signedMessage) {
    if (this.validMessage(signedMessage)) {
      let data = signedMessage.split('--')[0];
      return this.serializer.parse(this.decode(data));
    }
    return null;
  }

  verify(signedMessage) {
    return this.verified(signedMessage);
  }

  encode(data, encoding = 'ascii') {
    return new Buffer(data, encoding).toString('base64');
  }

  decode(data, encoding = 'ascii') {
    return new Buffer(data, 'base64').toString(encoding);
  }

  generateDigest(data) {
    return createHmac(this.algorithm, new Buffer(this.secret))
      .update(new Buffer(data))
      .digest('hex');
  }

  compare(a, b) {
    return slowEquals(a, b);
  }
}
