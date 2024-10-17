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

// Defina a URL do host para as imagens padrão
const urlbase = "https://petricor.xyz";
const site_name = "Petricor"; // Nome do site

export default function App({ Component, pageProps }: AppProps) {
  const components = useMDXComponents({});
  const router = useRouter();
  const base = "https://petricor.xyz";
  const url = `${base}${router.asPath}`;

  // Verificação da rota para definir o título e a descrição
  const isRoot = router.pathname === "/";
  const title = isRoot
    ? "Petricor" // Título para a página raiz
    : pageProps.title
    ? pageProps.title
    : site_name; // Título para outras páginas

  const description = pageProps.description 
    ? pageProps.description
    : "Blog criado com Next.js e Notion dedicado ao aprendizado da escrita.";

  const image = pageProps.image
    ? pageProps.image
    : `${urlbase}/api/og`;

  // Metadados Open Graph e Twitter
  return (
    <ThemeProvider>
      <Head>
        <meta name="title" content={title} />
        <meta name="description" content={description} />

        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content={isRoot ? "website" : "article"} />
        <meta property="og:site_name" content={site_name} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />

        {/* Canonical */}
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
