import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Provider as RWBProvider } from "react-wrap-balancer";
import cx from "classnames";
import localFont from "@next/font/local";
import { Inter } from "@next/font/google";

import Layout from "@/components/layout";
// import { GalleryProvider } from "@/lib/context/gallery-context";
import { UserProvider } from "@/lib/context/user-context";
import { ArtworksProvider } from "@/lib/context/artworks-context";
import { ToastProvider } from "@/lib/context/toast-context";

// const sfPro = localFont({
//   src: "../styles/SF-Pro-Display-Medium.otf",
//   variable: "--font-sf",
// });

const josefinSans = localFont({
  src: "../styles/JosefinSans-SemiBold.ttf",
  variable: "--font-josefinsans",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <RWBProvider>
        <div className={cx(josefinSans.variable, inter.variable)}>
          <ToastProvider>
            <UserProvider>
              <ArtworksProvider>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </ArtworksProvider>
            </UserProvider>
          </ToastProvider>
        </div>
      </RWBProvider>
      <Analytics />
    </SessionProvider>
  );
}
