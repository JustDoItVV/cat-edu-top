import '../styles/globals.css';

import Head from 'next/head';
import Router from 'next/router';
import ym, { YMInitializer } from 'react-yandex-metrika';

import type { AppProps } from 'next/app';

Router.events.on('routeChangeComplete', (url: string) => {
  if (typeof window !== 'undefined') ym('hit', url);
});

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Head>
        <title>MyTop</title>
        <link rel='preconnect' href='https://mc.yandex.ru' />
        <meta property='og:url' content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath} />
        <meta property='og:locale' content='ru_RU'/>
        <meta property='og:type' content='article' />
      </Head>
      <YMInitializer accounts={[]} options={{ webvisor: true, defer: true }} version='2' />
      <Component {...pageProps} />
    </>
  );
}
