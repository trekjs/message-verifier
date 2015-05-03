import MessageVerifier from '../src/message-verifier';
import assert from 'assert';

describe('MessageVerifier', () => {

  let verifier = new MessageVerifier('s3Krit');
  let data = {
    some: 'data',
    now: Date.now()
  };

  it('valid message', () => {
    let [d, hash] = verifier.generate('a private message').split('--');
    assert.equal(false, verifier.validMessage(null));
    assert.equal(false, verifier.validMessage(''));
    assert.equal(false, verifier.validMessage(`${d.split('').reverse().join('')}--${hash}`));
    assert.equal(false, verifier.validMessage(`${d}--${hash.split('').reverse().join('')}`));
    assert.equal(false, verifier.validMessage('purejunk'));
  });

  it('simple round tripping', () => {
    let message = verifier.generate(data);
    assert.deepEqual(data, verifier.verified(message));
    assert.deepEqual(data, verifier.verify(message));
  });

  it('invalid', () => {
    assert.equal(null, verifier.verify('purejunk'));
  });

});
