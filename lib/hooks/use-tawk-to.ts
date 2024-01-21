// hooks/useTawkTo.js
import { useEffect } from "react";
import { useChat } from "@/lib/context/chat-context";

const useTawkTo = () => {
  const { setChatVisible, isChatVisible, setLoaded, isLoaded } = useChat();
  useEffect(() => {
    if (!window.Tawk_API || !isLoaded) {
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://embed.tawk.to/65903f6f0ff6374032ba913c/1hitnfimg";
      script.charset = "UTF-8";
      script.setAttribute("crossorigin", "*");

      document.head.appendChild(script);

      script.onload = () => {
        setLoaded(true);
        if (isChatVisible) {
          window.Tawk_API?.showWidget();
        } else {
          window.Tawk_API?.hideWidget();
        }
        // if (isVisible) {
        //   window.Tawk_API?.showWidget();
        // } else {
        //   window.Tawk_API?.hideWidget();
        // }
      };
    } else {
      if (isChatVisible) {
        window.Tawk_API.showWidget();
      } else {
        window.Tawk_API.hideWidget();
      }
    }
  }, [isChatVisible, setLoaded, isLoaded]);
};

export default useTawkTo;
