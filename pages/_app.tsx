import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ClerkProvider } from '@clerk/nextjs'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <div className={'flex flex-row pt-4 justify-center items-center'}>
        <Component {...pageProps} />
      </div>
    </ClerkProvider>
  )
}
