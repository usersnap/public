import Document, { Html, Head, Main, NextScript } from 'next/document'

// Replace with the API keys from your widget installation page
const USERSNAP_GLOBAL_API_KEY = '0ec10f93-e744-4e1e-ac5c-d114ab77e4e4'
const USERSNAP_API_KEY = '942dc29d-912c-42be-ac22-495d98115363'

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
