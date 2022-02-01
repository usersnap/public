const bignum = require('bignum');
const crypto = require('crypto');
const express = require('express');

const PORT = 3000;
const USERSNAP_SECURITY_TOKEN = '[USERSNAP-SECURITY-TOKEN]';

const app = express();

app.post('/webhook-file', async function (req, res) {
  // put entire request body into array of buffers
  const requestBodyBuffers = [];
  for await (const chunk of req) {
    requestBodyBuffers.push(chunk);
  }
  

  // merge request body buffers into one and convert it to string
  const requestBody = Buffer.concat(requestBodyBuffers).toString();

  // extract timestamp from header
  const headerTimestamp = req.get('X-Usersnap-Timestamp');
  // put timestamp as a number into buffer
  const timestampBuffer = bignum(headerTimestamp).toBuffer({
    endian: 'little',
    size: 32
  });

  // create Hmac instance
  const hmac = crypto.createHmac('sha256', USERSNAP_SECURITY_TOKEN);
  // put request body into Hmac instance
  hmac.update(requestBody, 'binary');
  // put timestamp into Hmac instance
  hmac.update(timestampBuffer, 'binary');

  // get expected Hmac digest in hex encoding
  const expectedSignature = hmac.digest('hex')
  // get received (as part of the request) Hmac digest in hex recording
  const headerSignature = req.get('X-Usersnap-Signature');

  // compare signatures and return 200 in the end
  if (expectedSignature === headerSignature) {
    // here you can be sure that the request came from Usersnap
    return res.status(200).send();
  }

  // if signatures do not match you can reject the request
  res.status(400).send();
})

app.listen(PORT)
