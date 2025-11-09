import './globals.css'
import ConditionalLayout from '../components/ConditionalLayout'

export const metadata = {
  title: 'KNB Group',
  description: 'Premier real estate, hotels, and travel services',
  charset: 'utf-8',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  )
}