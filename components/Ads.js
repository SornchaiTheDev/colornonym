import React, { useEffect } from "react";
import Image from "next/image";
import { useWindowSize } from "react-use";

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
