// In route-chat-handler.tsx

import { useEffect } from "react";
import { useRouter } from "next/router";
import { useChat } from "@/lib/context/chat-context";

const RouteChatHandler = () => {
  const router = useRouter();
  const { setChatVisible } = useChat();

  useEffect(() => {
    const handleRouteChange = () => {
      const isArtworkPage =
        router.asPath.startsWith("/artworks/") && router.asPath !== "/artworks";
      setChatVisible(!isArtworkPage);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    handleRouteChange(); // Call it initially for the first load

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router, setChatVisible]);

  return null; // This component does not render anything
};

export default RouteChatHandler;
