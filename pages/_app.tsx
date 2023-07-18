import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import type { NextComponentType, NextPageContext } from 'next';

interface IProps{
  Component: NextComponentType<NextPageContext, any, any>;
  pageProps: any;
}

export default function App({ Component, pageProps: { session, ...pageProps } }: IProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}