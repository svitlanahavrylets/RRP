import { useCallback } from "react";

export const useAnalytics = () => {
  const hasConsent = localStorage.getItem("cookie-consent") === "true";

  const trackEvent = useCallback(
    (eventName, eventParams = {}) => {
      if (hasConsent && typeof window.gtag === "function") {
        window.gtag("event", eventName, eventParams);
      } else {
        console.warn("gtag is not available or user did not consent.");
      }
    },
    [hasConsent]
  );

  return { trackEvent };
};
