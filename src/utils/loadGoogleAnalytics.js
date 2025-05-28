export const loadGoogleAnalytics = () => {
  if (window.gtag) return;

  const script = document.createElement("script");
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-0DPG58DNLF";
  script.async = true;
  document.body.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;

  gtag("js", new Date());
  gtag("config", "G-0DPG58DNLF");
};
