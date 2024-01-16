// hooks/useTawkTo.js
import { useEffect } from "react";

const useTawkTo = (isVisible: boolean) => {
  useEffect(() => {
    if (!window.Tawk_API) {
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://embed.tawk.to/65903f6f0ff6374032ba913c/1hitnfimg";
      script.charset = "UTF-8";
      script.setAttribute("crossorigin", "*");

      document.head.appendChild(script);

      script.onload = () => {
        if (isVisible) {
          window.Tawk_API?.showWidget();
        } else {
          window.Tawk_API?.hideWidget();
        }
      };
    } else {
      if (isVisible) {
        window.Tawk_API.showWidget();
      } else {
        window.Tawk_API.hideWidget();
      }
    }
  }, [isVisible]);
};

export default useTawkTo;
