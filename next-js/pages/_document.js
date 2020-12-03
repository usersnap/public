import Document, { Html, Head, Main, NextScript } from 'next/document'

// Replace with the API keys from your widget installation page
const USERSNAP_GLOBAL_API_KEY = '<USERSNAP_GLOBAL_API_KEY>'
const USERSNAP_API_KEY = '<USERSNAP_API_KEY>'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
          <script
            async
            src={`https://widget.usersnap.com/global/load/${USERSNAP_GLOBAL_API_KEY}?onload=onUsersnapCXLoad`}
          />
          <script
            dangerouslySetInnerHTML={{
            __html: `
              window.onUsersnapCXLoad = function(api) {
                // store the Usersnap global api on the window, if case you want to use it in other contexts
                window.Usersnap = api; 
                api.init();
                api.show('${USERSNAP_API_KEY}') 
            }         
            `,
         }}
          />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
