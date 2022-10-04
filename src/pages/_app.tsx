import React from 'react';
import { AppProps } from 'next/app';
import '../styles/global.sass';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
