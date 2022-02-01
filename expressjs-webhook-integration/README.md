# ExpressJS example with Usersnap webhook integration

This example showcases how to define and endpoint for Usersnap webhook integration

## Starting up the example

```bash
# install dependencies
$ yarn install

# serve at localhost:3000
$ yarn start

The webhook endpoint is located at http://localhost:3000/webhook-file
```
### Attention!
Webhook URL in the Usersnap dashboard accepts only valid domains (no localhost or 127.0.0.1). Therefore if you want to use this repository for testing, you need to run this application on your domain or use tools like [ngrok](https://ngrok.com/)
