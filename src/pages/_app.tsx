import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { useMDXComponents } from "../mdx-components";
import { MDXProvider } from "@mdx-js/react";
import LayoutIndex from "../layout/layout_index";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import "../styles/global.css";

export default function App({ Component, pageProps }: AppProps) {
  // Obtém os componentes personalizados para MDX
  const components = useMDXComponents({});
  const router = useRouter();
  const base = "https://petricor.xyz";
  const url = `${base}${router.asPath}`;

  // Configuração dos metadados dinâmicos
  const title = pageProps.title ? pageProps.title : "Petricor";
  const description = pageProps.description 
    ? pageProps.description
    : "Blog criado com Next.js e Notion dedicado ao aprendizado da escrita.";
  const image = pageProps.image
    ? pageProps.image
    : `${base}/api/og`;

  // Configuração dos metadados estáticos
  const type = "link";
  const site_name = "Petricor";
  const author = "renribsilva";
  const provider = "Petricor";

  return (
    <ThemeProvider>
      <Head>

        {/*metas globais*/}
        <meta name="title" content={title} />
        <meta name="description" content={description} />

        {/*og*/}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content={type} />
        <meta property="og:site_name" content={site_name} />
        <meta property="og:author_name" content={author} />
        <meta property="og:provider_name" content={provider} />

        {/*twitter*/}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />

        {/*canonical*/}
        <link rel="canonical" href={url} />

      </Head>
      <LayoutIndex>
        <MDXProvider components={components}>
          <Component {...pageProps} />
          <SpeedInsights />
          <Analytics />
        </MDXProvider>
      </LayoutIndex>
    </ThemeProvider>
  );
}

