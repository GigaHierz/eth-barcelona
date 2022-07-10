import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render (): React.ReactElement {
    return (
      <Html>
        <Head />
        <body className='bg-yellow-900 text-yellow-300'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
