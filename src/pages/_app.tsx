import React from 'react';
import { Provider as Auth } from 'next-auth/client';
import { AppProps } from 'next/app';
import '../styles/global.sass';
import Header from '../components/Header';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth>
      <Header />
      <Component {...pageProps} />
    </Auth>
  );
}

export default MyApp;
