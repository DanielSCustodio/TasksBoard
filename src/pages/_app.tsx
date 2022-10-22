import React from 'react';
import { Provider as Auth } from 'next-auth/client';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { AppProps } from 'next/app';
import '../styles/global.sass';
import Header from '../components/Header';

function MyApp({ Component, pageProps }: AppProps) {
  const initialProps = {
    'client-id':
      'AZF7Bfwof4i_O6T0A9o76HyIOKaMvg-2fU1UthfDaztS4QpGQe_g55oY8QOIuaJliiZlXsLbTALQ3h4j',
    currency: 'BRL',
    intent: 'capture',
  };

  return (
    <Auth>
      <PayPalScriptProvider options={initialProps}>
        <Header />
        <Component {...pageProps} />
      </PayPalScriptProvider>
    </Auth>
  );
}

export default MyApp;
