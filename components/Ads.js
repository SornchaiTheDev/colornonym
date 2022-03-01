import React, { useEffect } from "react";
import Script from "next/script";

function Ads() {
  useEffect(() => {
    const ads = document.getElementsByClassName("adsbygoogle");
    try {
      (adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.log(e);
    }
  }, []);
  return (
    <div className="w-full relative h-16 bg-white text-center">
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5805738859470835"
        crossOrigin="anonymous"
      ></script>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-5805738859470835"
        data-ad-slot="6921238207"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}

export default Ads;
