const crypto = require('crypto');

const empty = () => { };

const hash = (text) => {
    return crypto.createHash('sha1')
        .update(text).digest('base64');
};

const hash256 = (text, secret) => {
    return crypto.createHmac('sha256', secret)
    .update(text)
    .digest('hex');
};

module.exports = {
    empty,
    hash,
    hash256,
};

