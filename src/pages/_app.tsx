import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AppRouter } from './api/trpc/[trpc]'
import { withTRPC } from '@trpc/next'
import { httpBatchLink } from '@trpc/client/links/httpBatchLink'
import { loggerLink } from '@trpc/client/links/loggerLink'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

function getBaseURL() {
  if (process.browser) return ''
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export default withTRPC<AppRouter>({
  config() {
    const url = `${getBaseURL()}/api/trpc`

    return {
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({
          url,
        }),
      ],
    }
  },
  ssr: false,
})(MyApp)
