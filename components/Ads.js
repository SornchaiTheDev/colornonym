import React, { useEffect } from "react";
import Image from "next/image";
import { useWindowSize } from "react-use";

function Ads() {
  return (
    <div className="w-full relative h-16 bg-white text-center flex justify-center items-center">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-5805738859470835"
        data-ad-slot="6921238207"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({})</script>
    </div>
  );
}

export default Ads;
