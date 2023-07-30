import * as React from 'react'
import type { AppProps } from 'next/app'

// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'
// global styles shared across the entire site
import 'styles/globals.css'
import 'styles/notion.css'

export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
}