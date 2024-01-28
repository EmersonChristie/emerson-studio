import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Provider as RWBProvider } from "react-wrap-balancer";
import cx from "classnames";
import localFont from "@next/font/local";
import { Inter } from "@next/font/google";

import { useRouter } from "next/router";

import Layout from "@/components/layout";
import { UserProvider } from "@/lib/context/user-context";
import { ArtworksProvider } from "@/lib/context/artworks-context";
import { ToastProvider } from "@/lib/context/toast-context";
import { ChatProvider } from "@/lib/context/chat-context";
import RouteChatHandler from "@/components/route-chat-handler";

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
  const router = useRouter();
  return (
    <ChatProvider>
      <SessionProvider session={session}>
        <RouteChatHandler />
        <RWBProvider>
          <div className={cx(josefinSans.variable, inter.variable)}>
            <ToastProvider>
              <UserProvider>
                <ArtworksProvider>
                  <Layout>
                    <Component {...pageProps} />
                    <SpeedInsights route={router.pathname} />
                  </Layout>
                </ArtworksProvider>
              </UserProvider>
            </ToastProvider>
          </div>
        </RWBProvider>
        <Analytics />
      </SessionProvider>
    </ChatProvider>
  );
}
