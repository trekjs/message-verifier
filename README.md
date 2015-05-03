# message-verifier

Makes it easy to generate and verify messages which are signed to prevent tampering.

This is useful for cases like remember-me tokens and auto-unsubscribe links where the session store isn't suitable or available.

  [![NPM version][npm-img]][npm-url]
  [![Build status][travis-img]][travis-url]
  [![Test coverage][coveralls-img]][coveralls-url]
  [![License][license-img]][license-url]
  [![Dependency status][david-img]][david-url]


## Usage

```js
import MessageVerifier from 'message-verifier';

let secret = `Hey, I'm a secret!`;
let verifier = new MessageVerifier(secret, options);

// Generate token:
let token = verifier.generate([user.id, twoWeeksFromNow])

// In the authentication filter:
let [id, time] = verifier.verify(token);
if (time < Date.now()) {
  let user = User.find(id);
}
```

## License

  [MIT](LICENSE)

[npm-img]: https://img.shields.io/npm/v/message-verifier.svg?style=flat-square
[npm-url]: https://npmjs.org/package/message-verifier
[travis-img]: https://img.shields.io/travis/trekjs/message-verifier.svg?style=flat-square
[travis-url]: https://travis-ci.org/trekjs/message-verifier
[coveralls-img]: https://img.shields.io/coveralls/trekjs/message-verifier.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/trekjs/message-verifier
[license-img]: https://img.shields.io/badge/license-MIT-green.svg?style=flat-square
[license-url]: LICENSE
[david-img]: https://img.shields.io/david/trekjs/message-verifier.svg?style=flat-square
[david-url]: https://david-dm.org/trekjs/message-verifier
