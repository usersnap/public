const bignum = require('bignum');
const crypto = require('crypto');

const USERSNAP_SECURITY_TOKEN = '-pXbyp4f-C2HgeUWQ-OU0Q'
const requestBody = '--f9316626c473a2f251af7f76b136d8f1\r\nContent-Disposition: form-data; name="feedback"\r\nContent-Type: application/json\r\n\r\n{"feedback_number": 182, "link": "https://app.usersnap.best/l/feedback/06e152b3-e848-4972-9a06-eb7ae2dee3cc?utm_medium=integration&utm_campaign=integration&utm_content=open", "client": {"url": "https://stackoverflow.com/questions/52965112/mocking-animation-completion-callback-in-jest", "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36", "screen_width": 1680, "screen_height": 1050, "client": "Chrome"}, "comment": {"text": "This is a sample feedback comment"}, "geo": {"ip_address": "192.168.56.1"}, "fields": [{"order": 0, "label": "Add a comment4", "boolean_value": null, "text_value": "This is a sample feedback comment", "value": "This is a sample feedback comment"}], "state": {"identifier": "open"}, "visitor": {"email": "someone@usersnap.com"}}\r\n--f9316626c473a2f251af7f76b136d8f1--\r\n'
const headerTimestamp = '1643795564507'
const headerSignature = '0055ffa7019e52d44380ad9e417ccb47593dfc0732a3fbb56b973d8869981062'

const timestampBuffer = bignum(headerTimestamp).toBuffer({
  endian: 'little',
  size: 32
});

const hmac = crypto.createHmac('sha256', USERSNAP_SECURITY_TOKEN);
hmac.update(requestBody, 'binary');
hmac.update(timestampBuffer, 'binary');

const expectedSignature = hmac.digest('hex')

if (expectedSignature === headerSignature) {
  console.log('signatures match!');
  return;
}

console.log('signatures do not match!');
