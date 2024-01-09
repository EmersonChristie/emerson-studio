import Head from "next/head";

const DOMAIN = "https://emersoncontemporary.art";

export default function Meta({
  title = "Emerson Studio - Contemporary Art",
  description = "A curated collection of contemporary art.",
  image = `/public/favicon.jpg`,
}: {
  title?: string;
  description?: string;
  image?: string;
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.jpg" />

      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta itemProp="image" content={image} />
      <meta property="og:logo" content={`${DOMAIN}/logo.png`}></meta>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@" />
      <meta name="twitter:creator" content="@" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} /> */}
    </Head>
  );
}
